"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { copyListSchema } from "./schema"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { createAuditLog } from "@/lib/create-audit-log"


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id, boardId } = data


  // Try to create a board in the database
  let listCopy
  
  try {
    // Get all lists
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId
        },
      },
      include: {
        cards: true
      }
    });

    if (!listToCopy) return { error: "Database Error - Failed to copy, list not found" }

    const lastListOrder = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc"
      },
      select: {
        order: true
      }
    })

    // Calc next order value
    const nextOrderValue = lastListOrder ? lastListOrder.order + 1 : 1

    // Create a copy of the list
    listCopy = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: nextOrderValue,
        cards: {
          createMany: {
            data: listToCopy.cards.map(c => ({
              title: c.title,
              description: c.description,
              order: c.order,
            }))
          }
        }
      },
      include: {
        cards: true
      }
    })

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST, 
      entityId: listCopy.id, 
      entityTitle: listCopy.title
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to copy list."
    }
  }

  // On succes, revalidate the path
  revalidatePath(`/board/${boardId}`);

  return {
    data: listCopy
  }
}

export const copyList = createSafeAction(copyListSchema, handler)
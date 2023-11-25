import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(req: Request, { params }: { params: { cardId: string }}) {
  try {
    const { orgId, userId } = auth()

    if (!orgId || !userId) return new NextResponse("Unauthorized", { status: 401 })

    const cardLogs = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        orgId,
        entityType: ENTITY_TYPE.CARD
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3
    })
    
    return NextResponse.json(cardLogs)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
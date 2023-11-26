import { auth } from "@clerk/nextjs";

import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/lib/db";


const getOrgLimit = async () => {
  const { orgId } = auth()

  if (!orgId) {
    throw new Error("Unauthorized")
  }

  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } })

  if (orgLimit) {
    return {
      orgLimit,
      orgId
    }
  } else {
    return {
      orgLimit: null,
      orgId
    }
  }
}

export const incrementBoardsCount = async () => {
  const { orgLimit, orgId } = await getOrgLimit()

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId: orgLimit.orgId
      },
      data: {
        count: orgLimit.count + 1
      }
    })
  } else {
    await db.orgLimit.create({
      data: {
        orgId: orgId,
        count: 1
      }
    })
  }
}






export const decrementBoardsCount = async () => {
  const { orgLimit, orgId } = await getOrgLimit()

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0
      }
    })
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1
      }
    })
  }
}



export const hasAvailableFreeBoards = async () => {
  const { orgLimit } = await getOrgLimit()

  if (orgLimit && orgLimit?.count >= MAX_FREE_BOARDS) {
    return false
  } else {
    return true
  }
}



// export const getNumberOfAvailableBoards = async () => {
//   const { orgLimit, orgId } = await getOrgLimit()

//   if (!orgId) {
//     return 0
//   }

//   if (orgLimit) {
//     return MAX_FREE_BOARDS - orgLimit.count
//   } else {
//     return MAX_FREE_BOARDS
//   }
// }

export const getNumberOfBoards = async () => {
  const { orgLimit, orgId } = await getOrgLimit()

  if (!orgId || !orgLimit) {
    return 0
  }

  return orgLimit.count
}
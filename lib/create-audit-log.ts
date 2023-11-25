import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/lib/db";


type Props = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!user || !orgId) throw new Error("User or Organization not found!")

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        userName: user?.username || (user.firstName + " " + user.lastName),
        userImage: user.imageUrl,
        ...props
      }
    })

  } catch (error) {
    console.error("[AUDIT_LOG_ERROR]:", error)
  }
}
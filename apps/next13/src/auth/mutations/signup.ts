import db from "../../../prisma"
import {SecurePassword} from "@blitzjs/auth/secure-password"

export default async function signup(input: {password: string; email: string}, ctx: any) {
  const blitzContext = ctx
  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = input.email
  const user = await db.user.create({
    data: {email, hashedPassword},
  })

  await blitzContext.session.$create({
    userId: user.id,
    roles: ["user"],
  })

  return {userId: blitzContext.session.userId, ...user, email: input.email}
}

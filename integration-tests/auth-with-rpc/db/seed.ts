import prisma from "./index"
import SecurePassword from "@blitzjs/auth/secure-password"

const seed = async () => {
  const hashedPassword = await SecurePassword.hash("abcd1234")
  await prisma.user.create({
    data: {
      email: "test@test.com",
      hashedPassword,
      roles: "user",
    },
  })
  process.exit(0)
}

seed()

export default seed

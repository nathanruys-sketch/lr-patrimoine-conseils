import { prisma } from "@/lib/prisma";

export function getAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({ where: { email } });
}

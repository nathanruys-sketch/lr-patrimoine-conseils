import { prisma } from "@/lib/prisma";
import type { ServiceCategory } from "@/generated/prisma/client";
import type { ServiceFormValues } from "@/lib/validations/admin";

export function getPublishedServices(category?: ServiceCategory) {
  return prisma.service.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { order: "asc" },
  });
}

export function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export function getAllServicesAdmin() {
  return prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
}

export function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

export function createService(data: ServiceFormValues) {
  return prisma.service.create({ data });
}

export function updateService(id: string, data: Partial<ServiceFormValues>) {
  return prisma.service.update({ where: { id }, data });
}

export function deleteService(id: string) {
  return prisma.service.delete({ where: { id } });
}

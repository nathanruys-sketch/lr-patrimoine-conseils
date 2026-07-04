import { prisma } from "@/lib/prisma";
import type { LeadSource, LeadStatus } from "@/generated/prisma/client";

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceId?: string | null;
  source?: LeadSource;
};

export function createLead(data: CreateLeadInput) {
  return prisma.lead.create({ data });
}

export function getLeads(filter?: { status?: LeadStatus; search?: string }) {
  return prisma.lead.findMany({
    where: {
      ...(filter?.status ? { status: filter.status } : {}),
      ...(filter?.search
        ? {
            OR: [
              { name: { contains: filter.search, mode: "insensitive" } },
              { email: { contains: filter.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { service: { select: { title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: { service: { select: { title: true, slug: true } } },
  });
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  return prisma.lead.update({ where: { id }, data: { status } });
}

export function deleteLead(id: string) {
  return prisma.lead.delete({ where: { id } });
}

export function countNewLeads() {
  return prisma.lead.count({ where: { status: "NEW" } });
}

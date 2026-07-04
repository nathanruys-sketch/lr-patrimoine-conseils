import { prisma } from "@/lib/prisma";
import type { AppointmentStatus } from "@/generated/prisma/client";

export type CreateAppointmentInput = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  slot: string;
  topic?: string;
  message?: string;
};

export function createAppointment(data: CreateAppointmentInput) {
  return prisma.appointment.create({ data });
}

export function getAppointments(filter?: { status?: AppointmentStatus }) {
  return prisma.appointment.findMany({
    where: filter?.status ? { status: filter.status } : undefined,
    orderBy: { date: "desc" },
  });
}

export function getUpcomingAppointments(limit = 5) {
  return prisma.appointment.findMany({
    where: { date: { gte: new Date() }, status: { in: ["PENDING", "CONFIRMED"] } },
    orderBy: { date: "asc" },
    take: limit,
  });
}

export function getBookedSlots(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.appointment.findMany({
    where: {
      date: { gte: startOfDay, lte: endOfDay },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { slot: true },
  });
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  return prisma.appointment.update({ where: { id }, data: { status } });
}

export function deleteAppointment(id: string) {
  return prisma.appointment.delete({ where: { id } });
}

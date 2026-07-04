import { prisma } from "@/lib/prisma";
import type { TestimonialFormValues } from "@/lib/validations/admin";

export function getPublishedTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getAllTestimonialsAdmin() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAverageRating() {
  const result = await prisma.testimonial.aggregate({
    where: { published: true },
    _avg: { rating: true },
    _count: true,
  });
  return {
    average: result._avg.rating ?? 0,
    count: result._count,
  };
}

export function createTestimonial(data: TestimonialFormValues) {
  return prisma.testimonial.create({ data });
}

export function updateTestimonial(id: string, data: Partial<TestimonialFormValues>) {
  return prisma.testimonial.update({ where: { id }, data });
}

export function deleteTestimonial(id: string) {
  return prisma.testimonial.delete({ where: { id } });
}

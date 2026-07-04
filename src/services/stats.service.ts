import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    totalLeads,
    newLeads,
    convertedLeads,
    upcomingAppointments,
    pendingAppointments,
    testimonialStats,
    publishedArticles,
    publishedServices,
    recentLeads,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.appointment.count({
      where: { date: { gte: new Date() }, status: { in: ["PENDING", "CONFIRMED"] } },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.testimonial.aggregate({
      where: { published: true },
      _avg: { rating: true },
      _count: true,
    }),
    prisma.article.count({ where: { published: true } }),
    prisma.service.count({ where: { published: true } }),
    prisma.lead.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
  ]);

  const leadsByStatus = await prisma.lead.groupBy({
    by: ["status"],
    _count: true,
  });

  const days: { date: string; leads: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 13; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = recentLeads.filter(
      (lead) => lead.createdAt >= day && lead.createdAt < nextDay
    ).length;

    days.push({
      date: day.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      leads: count,
    });
  }

  return {
    totalLeads,
    newLeads,
    convertedLeads,
    upcomingAppointments,
    pendingAppointments,
    averageRating: testimonialStats._avg.rating ?? 0,
    testimonialsCount: testimonialStats._count,
    publishedArticles,
    publishedServices,
    leadsByStatus: leadsByStatus.map((entry) => ({
      status: entry.status,
      count: entry._count,
    })),
    leadsTrend: days,
  };
}

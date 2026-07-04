export type {
  AdminUser,
  Appointment,
  Article,
  Lead,
  Service,
  Simulation,
  Testimonial,
  AppointmentStatus,
  LeadSource,
  LeadStatus,
  ServiceCategory,
  SimulationType,
  UserRole,
} from "@/generated/prisma/client";

export type NavItem = {
  href: string;
  label: string;
};

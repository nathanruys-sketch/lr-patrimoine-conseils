import { prisma } from "@/lib/prisma";
import type { Prisma, SimulationType } from "@/generated/prisma/client";

export type RecordSimulationInput = {
  type: SimulationType;
  inputs: Prisma.InputJsonValue;
  results: Prisma.InputJsonValue;
  leadEmail?: string;
};

export function recordSimulation(data: RecordSimulationInput) {
  return prisma.simulation.create({
    data: {
      type: data.type,
      inputs: data.inputs,
      results: data.results,
      leadEmail: data.leadEmail,
    },
  });
}

export function countSimulationsByType() {
  return prisma.simulation.groupBy({
    by: ["type"],
    _count: true,
  });
}

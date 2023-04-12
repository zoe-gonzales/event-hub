import type { Event } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getEvents() {
  return prisma.event.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      start: true,
      end: true,
      location: true,
    },
  });
}

export async function createEvent(
  event: Pick<
    Event,
    "title" | "description" | "start" | "end" | "location" | "userId"
  >
) {
  return prisma.event.create({ data: event });
}

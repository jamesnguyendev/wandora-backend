import { prisma } from "../libs/db/prismaClient";

interface data {
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  priceBase: number;
  type: "room" | "experience";
}

export const createListing = async (data: data) => {
  return prisma.listing.create({ data });
};

export const getListings = async (page = 1, limit = 10) => {
  return prisma.listing.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      description: true,
      latitude: true,
      longitude: true,
      priceBase: true,
      type: true,
    },
  });
};

export const getListingById = async (id: string) => {
  return prisma.listing.findUnique({ where: { id } });
};

export const deleteListing = async (id: string) => {
  return prisma.listing.delete({ where: { id } });
};

export const updateListing = async (id: string, data: Partial<data>) => {
  return prisma.listing.update({ where: { id }, data });
};

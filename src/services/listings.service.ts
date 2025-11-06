import axios from "axios";
import { redisClient } from "../libs/cache/redisClient";
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
  const skip = (page - 1) * limit;
  const [data, totalItems] = await Promise.all([
    prisma.listing.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        latitude: true,
        longitude: true,
        priceBase: true,
        type: true,
        imageUrl: true,
      },
    }),
    prisma.listing.count(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    page,
    limit,
    totalItems,
    totalPages,
  };
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

export const searchListings = async (query: string, page = 1, limit = 10) => {
  const cacheKey = `search:${query}:page:${page}:limit:${limit}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) return JSON.parse(cached);

  const skip = (page - 1) * limit;

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.listing.count({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  const result = {
    listings,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  await redisClient.set(cacheKey, JSON.stringify(result), "EX", 600);

  return result;
};

export const uploadListingImage = async (
  listingId: string,
  base64Image: string,
) => {
  const lambdaUrl = process.env.LAMBDA_UPLOAD_URL!;

  const response = await axios.post(lambdaUrl, {
    listingId,
    base64Image,
  });

  const imageUrl = response.data.imageUrl;

  const listing = await prisma.listing.update({
    where: { id: listingId },
    data: { imageUrl },
  });

  return listing;
};

import z from "zod";

export const createListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  priceBase: z.number().positive(),
  type: z.enum(["room", "experience"]),
});

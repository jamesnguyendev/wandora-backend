import { prisma } from "../libs/db/prismaClient";

interface booking {
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

export const createBooking = async (booking: booking) => {
  return prisma.booking.create({ data: booking });
};

export const getBookingsByUser = async (userId: string) => {
  return prisma.booking.findMany({
    where: { userId },
    include: { listing: true },
  });
};

export const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: { listing: true, user: true },
  });
};

export const getListBookings = async () => {
  return prisma.booking.findMany({});
};

export const deleteBooking = async (id: string) => {
  return prisma.booking.delete({
    where: { id },
  });
};

export const updateBooking = async (id: string, data: Partial<booking>) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
};

import { createListing } from "../../src/services/listings.service";
import { prisma } from "../../jest.setup";

jest.mock("../../jest.setup", () => ({
  prisma: {
    listing: { create: jest.fn() },
  },
}));

describe("Listings Service Unit Test", () => {
  it("should create listing", async () => {
    (prisma.listing.create as jest.Mock).mockResolvedValue({
      title: "Test Room",
      latitude: 10,
      longitude: 20,
      priceBase: 100,
      type: "room",
    });
    const listing = await createListing({
      title: "Test Room",
      latitude: 10,
      longitude: 20,
      priceBase: 100,
      type: "room",
    });
    expect(listing.id).toBeDefined();
    expect(listing.title).toBe("Test Room");
    expect(listing.latitude).toBe(10);
    expect(listing.longitude).toBe(20);
    expect(listing.priceBase).toBe(100);
    expect(listing.type).toBe("room");
  });
});

import request from "supertest";
import { app } from "../../src/app";

describe("Listings Integration Test", () => {
  it("should create and fetch listing", async () => {
    const createRes = await request(app).post("/listings").send({
      title: "Test",
      latitude: 10,
      longitude: 20,
      priceBase: 100,
      type: "room",
    });

    expect(createRes.status).toBe(201);
    expect(createRes.body.status).toBe("success");
    expect(createRes.body.data.id).toBeDefined();

    const listRes = await request(app).get("/listings");
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBeGreaterThan(0);
  });
});

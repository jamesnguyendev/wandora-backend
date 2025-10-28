import { prisma } from "../../jest.setup";
import bcrypt from "bcrypt";

describe("User Integration Test", () => {
  it("should create a user", async () => {
    const password = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: { email: "test@example.com", passwordHash: password },
    });
    expect(user.id).toBeDefined();
    expect(user.email).toBe("test@example.com");
  });

  it("should find a user by email", async () => {
    const password = await bcrypt.hash("password123", 10);
    await prisma.user.create({
      data: { email: "test@example.com", passwordHash: password },
    });

    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" },
    });
    expect(user).not.toBeNull();
  });
});

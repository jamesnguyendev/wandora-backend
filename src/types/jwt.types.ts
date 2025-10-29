export interface JwtPayload {
  userId: number;
  role: "guest" | "host" | "admin";
}
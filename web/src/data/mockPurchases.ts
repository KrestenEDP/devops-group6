import { mockAuctions } from "./mockAuctions";

export const mockPurchases = [
  {
    id: "p1",
    userId: "1", // matches logged-in user
    paintingId: "1",
    price: 125000,
    purchasedAt: "2025-10-25T15:45:00Z",
  },
  {
    id: "p2",
    userId: "1",
    paintingId: "2",
    price: 89000,
    purchasedAt: "2025-10-28T19:22:00Z",
  },
];
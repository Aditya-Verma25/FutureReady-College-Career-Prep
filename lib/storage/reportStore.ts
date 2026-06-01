import { promises as fs } from "node:fs";
import path from "node:path";
import type { ReportOrderRecord } from "../types";

const STORE_FILE = process.env.REPORT_ORDER_STORE_PATH || path.join(process.cwd(), "data", "report-orders.json");

async function ensureStoreExists() {
  const dir = path.dirname(STORE_FILE);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(STORE_FILE);
  } catch {
    await fs.writeFile(STORE_FILE, "[]", "utf8");
  }
}

async function readOrders(): Promise<ReportOrderRecord[]> {
  await ensureStoreExists();
  const raw = await fs.readFile(STORE_FILE, "utf8");
  return JSON.parse(raw) as ReportOrderRecord[];
}

async function writeOrders(orders: ReportOrderRecord[]) {
  await ensureStoreExists();
  await fs.writeFile(STORE_FILE, JSON.stringify(orders, null, 2), "utf8");
}

export async function saveOrder(order: ReportOrderRecord): Promise<void> {
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
}

export async function getOrderById(orderId: string): Promise<ReportOrderRecord | null> {
  const orders = await readOrders();
  return orders.find((item) => item.orderId === orderId) ?? null;
}

export async function updateOrder(orderId: string, update: Partial<ReportOrderRecord>): Promise<ReportOrderRecord | null> {
  const orders = await readOrders();
  const index = orders.findIndex((item) => item.orderId === orderId);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...update };
  await writeOrders(orders);
  return orders[index];
}

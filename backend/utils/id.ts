import { randomUUID } from "crypto";

export function createId() {
  return randomUUID();
}

export function nowIso() {
  return new Date().toISOString();
}

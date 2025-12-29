// src/lib/store.ts
import { mockDemons } from "@/data/demons";

// This simulates a database that holds both levels and the user records
export let globalRecords = [
  { id: 101, playerName: "Doggie", demonId: 1, videoUrl: "https://youtu.be/...", status: "Verified" }
];

export const addRecord = (newRecord: any) => {
  globalRecords.push({ ...newRecord, id: Date.now(), status: "Pending" });
};
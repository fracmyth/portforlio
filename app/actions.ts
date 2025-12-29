"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const dataDir = path.join(process.cwd(), "src/data");
const dbPath = path.join(dataDir, "db.json");

export async function submitRecordAction(formData: { playerName: string; demonId: number; videoUrl: string }) {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    let db = { records: [] };

    try {
      const fileData = await fs.readFile(dbPath, "utf-8");
      db = JSON.parse(fileData);
    } catch (readError) {
      console.log("Creating new db.json file...");
    }

    const newRecord = {
      ...formData,
      id: Date.now(),
      status: "Pending"
    };

    db.records.push(newRecord);

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    revalidatePath("/list/[id]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Critical Save Error:", error);
    return { success: false };
  }
}
"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// 1. Define the interface so TypeScript understands the object structure
interface Record {
  id: number;
  playerName: string;
  demonId: number;
  videoUrl: string;
  status: string;
}

const dataDir = path.join(process.cwd(), "src/data");
const dbPath = path.join(dataDir, "db.json");

export async function submitRecordAction(formData: { playerName: string; demonId: number; videoUrl: string }) {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    // 2. Explicitly type the db object as an array of Records
    let db: { records: Record[] } = { records: [] };

    try {
      const fileData = await fs.readFile(dbPath, "utf-8");
      db = JSON.parse(fileData);
    } catch (readError) {
      console.log("Initializing new database file.");
    }

    // 3. Create the record with the matching keys
    const newRecord: Record = {
      id: Date.now(),
      playerName: formData.playerName,
      demonId: formData.demonId,
      videoUrl: formData.videoUrl,
      status: "Pending"
    };

    // This push will now work because types match perfectly!
    db.records.push(newRecord);

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    revalidatePath("/list/[id]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Critical Save Error:", error);
    return { success: false };
  }
}
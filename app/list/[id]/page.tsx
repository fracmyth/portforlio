import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { mockDemons } from "@/data/demons";

export default async function LevelDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const demonId = parseInt(resolvedParams.id);

  const demon = mockDemons.find((d) => d.id === demonId);

  let records = [];
  try {
    const dbPath = path.join(process.cwd(), "src/data/db.json");
    const fileData = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(fileData);
    records = db.records.filter((r: any) => r.demonId === demonId);
  } catch (error) {
    console.error("Database read error:", error);
  }

  if (!demon) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 uppercase italic">Level Not Found</h1>
          <Link href="/list" className="text-blue-500 hover:underline">Return to List</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-zinc-800 pb-8 flex justify-between items-start">
          <div>
            <div className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">
              Rank #{demon.position}
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2 leading-none">
              {demon.name}
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
              Published by {demon.publisher.name}
            </p>
          </div>
          <Link 
            href="/list" 
            className="px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-800 text-[10px] font-black uppercase hover:bg-zinc-800 transition-all tracking-tighter"
          >
            ← Back to List
          </Link>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase italic text-zinc-400">Verified Records</h3>
            <Link 
              href="/submit" 
              className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-400 tracking-widest transition-colors"
            >
              Submit a Record +
            </Link>
          </div>

          <div className="space-y-3">
            {records.length > 0 ? (
              records.map((record: any) => (
                <div 
                  key={record.id} 
                  className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 flex justify-between items-center group hover:border-zinc-700 transition-all"
                >
                  <div>
                    <div className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {record.playerName}
                    </div>
                    <div className="text-[10px] uppercase font-black text-zinc-600 tracking-widest mt-1">
                      Status: <span className={record.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'}>
                        {record.status}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={record.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 rounded-xl text-[10px] font-black uppercase hover:bg-red-600/20 hover:text-red-500 transition-all border border-transparent hover:border-red-900/30"
                  >
                    Watch Proof
                  </a>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-zinc-900/10 rounded-3xl border border-dashed border-zinc-800">
                <p className="text-zinc-600 italic font-medium">No verified records for this level yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
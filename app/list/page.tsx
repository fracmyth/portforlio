"use client";

import { useState } from "react";
import Link from "next/link";
import { mockDemons } from "@/data/demons";

export default function DemonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [demons] = useState(mockDemons);

  const filteredDemons = demons.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-zinc-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">
              DEMON <span className="text-blue-600">LIST</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase mt-2">
              Select a level to view records
            </p>
          </div>
          <Link href="/" className="text-xs font-bold uppercase text-zinc-500 hover:text-white transition-colors">
            ← Back
          </Link>
        </header>

        <input
          type="text"
          placeholder="Search Top 50..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-8 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-2xl"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="space-y-2">
          {filteredDemons.map((demon) => (
            <Link 
              href={`/list/${demon.id}`} 
              key={demon.id} 
              className="grid grid-cols-12 items-center p-4 bg-zinc-900/40 rounded-lg border border-zinc-900 hover:border-blue-600 hover:bg-zinc-800/50 transition-all group cursor-pointer"
            >
              <div className="col-span-1 text-xl font-black text-zinc-700 group-hover:text-blue-500 transition-colors">
                #{demon.position}
              </div>
              <div className="col-span-8">
                <h2 className="text-lg font-bold group-hover:text-white">{demon.name}</h2>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                  By {demon.publisher.name}
                </p>
              </div>
              <div className="col-span-3 text-right">
                <div className="text-blue-500 font-mono font-bold">
                  {demon.base_stats.points.toFixed(1)}pt
                </div>
                <div className="text-[10px] uppercase text-zinc-600 font-black group-hover:text-blue-400 transition-colors">
                  View Records →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDemons.length === 0 && (
          <div className="text-center py-20 text-zinc-600 italic">No levels found.</div>
        )}
      </div>
    </main>
  );
}
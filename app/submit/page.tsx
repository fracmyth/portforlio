"use client";

import { useState } from "react";
import Link from "next/link";
import { submitRecordAction } from "../actions";
import { mockDemons } from "@/data/demons";

export default function SubmitRecord() {
  const [formData, setFormData] = useState({
    playerName: "",
    demonId: "",
    videoUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const result = await submitRecordAction({
        playerName: formData.playerName,
        demonId: parseInt(formData.demonId),
        videoUrl: formData.videoUrl,
      });

      if (result.success) {
        setMessage("Success! Record submitted for verification.");
        setFormData({ playerName: "", demonId: "", videoUrl: "" });
      } else {
        throw new Error("Failed to save record.");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Error: Could not connect to the database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-xl mx-auto">
        
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              SUBMIT <span className="text-purple-600">RECORD</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Verification Workflow
            </p>
          </div>
          <Link href="/" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase">
            ← Home
          </Link>
        </header>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-6 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 shadow-2xl"
        >
          <div>
            <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
              Player Name
            </label>
            <input 
              required
              type="text"
              value={formData.playerName}
              onChange={(e) => setFormData({...formData, playerName: e.target.value})}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-sm"
              placeholder="e.g. Doggie"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
              Target Level
            </label>
            <select 
              required
              value={formData.demonId}
              onChange={(e) => setFormData({...formData, demonId: e.target.value})}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-sm text-zinc-400"
            >
              <option value="">Select level from list...</option>
              {mockDemons.map((d) => (
                <option key={d.id} value={d.id}>
                  #{d.position} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">
              Proof Link (YouTube)
            </label>
            <input 
              required
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-sm"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 rounded-xl font-black uppercase tracking-tighter transition-all shadow-lg shadow-purple-900/20 text-sm"
          >
            {isSubmitting ? "Uploading to JSON DB..." : "Submit to Moderators"}
          </button>

          {message && (
            <p className={`text-center font-bold text-xs mt-4 uppercase tracking-widest ${isError ? 'text-red-500' : 'text-green-500 animate-pulse'}`}>
              {message}
            </p>
          )}
        </form>

        <footer className="mt-8 text-center">
            <Link href="/list" className="text-[10px] font-black text-zinc-600 uppercase hover:text-zinc-400 tracking-widest transition-colors">
                View current leaderboard rankings →
            </Link>
        </footer>
      </div>
    </main>
  );
}
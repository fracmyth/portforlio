"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 py-20">

      <div className="max-w-3xl w-full text-center">
        
        <header className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-4">
            DEV<span className="text-blue-600">PORTFOLIO</span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium">
            KOI #4 | Competitive Programmer | Full-Stack Developer
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <Link href="/visualizer" className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-blue-600 transition-all shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 11-4-7"/><path d="m5 11 4-7"/><path d="M11 13v4"/><path d="M15 17v-3"/><path d="M7 17v-2"/><path d="M9 22h6c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V9c0-.5-.2-1-.6-1.4-.4-.4-.9-.6-1.4-.6H9c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4v11c0 .5.2 1 .6 1.4.4.4.9.6 1.4.6z"/></svg>
              </div>
              <span className="text-xs font-black text-zinc-600 group-hover:text-blue-600 uppercase tracking-widest">Logic</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Algorithm Visualizer</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Showcasing $O(n \log n)$ efficiency through interactive sorting. Built with custom async recursion.
            </p>
          </Link>

          <Link href="/list" className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-green-600 transition-all shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-600/10 rounded-xl text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 12H3"/><path d="M16 6H3"/><path d="M16 18H3"/><path d="m19 10-4 4 4 4"/></svg>
              </div>
              <span className="text-xs font-black text-zinc-600 group-hover:text-green-600 uppercase tracking-widest">Data</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Mini-Demon List</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              High-performance Top 50 dashboard. Optimized for rapid data filtering and community-sourced rankings.
            </p>
          </Link>

          <Link href="/submit" className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-purple-600 transition-all shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-600/10 rounded-xl text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M12 12v6"/></svg>
              </div>
              <span className="text-xs font-black text-zinc-600 group-hover:text-purple-600 uppercase tracking-widest">Forms</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Record Submission</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A submission workflow with form validation and dynamic UI feedback for list moderators.
            </p>
          </Link>

          <div className="p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800 flex flex-col justify-center">
            <h2 className="text-xs font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Technical Proficiency</h2>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "Next.js", "C++", "Django", "Python", "Olympiad Math", "Tailwind", "Git"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-bold rounded-full border border-zinc-700">
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-4 text-zinc-500 text-xs leading-relaxed">
              Applying competitive programming rigor to scalable web systems.
            </p>
          </div>
        </div>
        
        <footer className="mt-16 flex justify-center gap-8 text-zinc-600 font-bold uppercase tracking-widest text-xs">
          <a href="https://github.com/fracmyth" className="hover:text-white transition-colors">GitHub</a>
          <span className="text-zinc-800">|</span>
        </footer>

      </div>
    </main>
  );
}
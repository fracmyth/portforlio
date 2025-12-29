"use client";

import { useState, useEffect } from "react";

type AlgoType = "bubble" | "selection" | "insertion" | "quick" | "merge";

export default function Home() {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoType>("bubble");
  const [speed, setSpeed] = useState(50); // Lower is faster animation
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });

  const resetArray = () => {
    if (isSorting) return;
    const newItems = Array.from({ length: 40 }, () => Math.floor(Math.random() * 350) + 20);
    setArray(newItems);
    setComparing([]);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
  };

  useEffect(() => { resetArray(); }, []);

  const sleep = () => new Promise((resolve) => setTimeout(resolve, speed));

  const updateStats = (startTime: number, compInc = 0, swapInc = 0) => {
    setStats(prev => ({
      comparisons: prev.comparisons + compInc,
      swaps: prev.swaps + swapInc,
      time: Math.round(performance.now() - startTime)
    }));
  };

  const bubbleSort = async (arr: number[], startTime: number) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        updateStats(startTime, 1);
        await sleep();
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          updateStats(startTime, 0, 1);
          setArray([...arr]);
        }
      }
    }
  };

  const selectionSort = async (arr: number[], startTime: number) => {
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setComparing([i, j]);
        updateStats(startTime, 1);
        await sleep();
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        updateStats(startTime, 0, 1);
        setArray([...arr]);
      }
    }
  };

  const insertionSort = async (arr: number[], startTime: number) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        setComparing([j, j + 1]);
        updateStats(startTime, 1, 1);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep();
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  const quickSort = async (arr: number[], low: number, high: number, startTime: number) => {
    if (low < high) {
      let pivotIdx = await partition(arr, low, high, startTime);
      await quickSort(arr, low, pivotIdx - 1, startTime);
      await quickSort(arr, pivotIdx + 1, high, startTime);
    }
  };

  const partition = async (arr: number[], low: number, high: number, startTime: number) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      updateStats(startTime, 1);
      await sleep();
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        updateStats(startTime, 0, 1);
        setArray([...arr]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateStats(startTime, 0, 1);
    setArray([...arr]);
    return i + 1;
  };

  const mergeSort = async (arr: number[], l: number, r: number, startTime: number) => {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m, startTime);
    await mergeSort(arr, m + 1, r, startTime);
    await merge(arr, l, m, r, startTime);
  };

  const merge = async (arr: number[], l: number, m: number, r: number, startTime: number) => {
    let leftArr = arr.slice(l, m + 1);
    let rightArr = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < leftArr.length && j < rightArr.length) {
      setComparing([k]);
      updateStats(startTime, 1);
      await sleep();
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      updateStats(startTime, 0, 1);
      setArray([...arr]);
      k++;
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i]; i++; k++;
      setArray([...arr]); await sleep();
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j]; j++; k++;
      setArray([...arr]); await sleep();
    }
  };

  const startSort = async () => {
    setIsSorting(true);
    const arrCopy = [...array];
    const startTime = performance.now();

    if (selectedAlgo === "bubble") await bubbleSort(arrCopy, startTime);
    if (selectedAlgo === "selection") await selectionSort(arrCopy, startTime);
    if (selectedAlgo === "insertion") await insertionSort(arrCopy, startTime);
    if (selectedAlgo === "quick") await quickSort(arrCopy, 0, arrCopy.length - 1, startTime);
    if (selectedAlgo === "merge") await mergeSort(arrCopy, 0, arrCopy.length - 1, startTime);

    setComparing([]);
    setIsSorting(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-white font-sans">
      <div className="max-w-5xl w-full">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Algo<span className="text-blue-600">Viz</span>
            </h1>
          </div>          
          <div className="flex gap-4 bg-zinc-900 p-3 rounded-2xl border border-zinc-800 shadow-2xl">
            <select 
              value={selectedAlgo} 
              onChange={(e) => setSelectedAlgo(e.target.value as AlgoType)}
              disabled={isSorting}
              className="bg-zinc-800 p-2 rounded-lg border border-zinc-700 outline-none text-sm font-bold disabled:opacity-50"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="quick">Quicksort</option>
              <option value="merge">Merge Sort</option>
            </select>

            <div className="flex flex-col justify-center px-2">
              <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Animation Speed</span>
              <input 
                type="range" min="5" max="200" step="5"
                value={speed} onChange={(e) => setSpeed(Number(e.target.value))} 
                className="accent-blue-600 h-1" 
              />
            </div>

            <button onClick={resetArray} disabled={isSorting} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-bold transition-colors disabled:opacity-50">Reset</button>
            <button onClick={startSort} disabled={isSorting} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-black text-sm transition-all disabled:opacity-50 uppercase shadow-lg shadow-blue-900/20">Run Algorithm</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Comparisons", val: stats.comparisons, color: "text-blue-400" },
            { label: "Swaps / Writes", val: stats.swaps, color: "text-red-400" },
            { label: "Time Elapsed", val: `${stats.time}ms`, color: "text-green-400" }
          ].map((s, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1 block">{s.label}</span>
              <span className={`text-2xl font-mono font-bold ${s.color}`}>{s.val}</span>
            </div>
          ))}
        </div>
        
        <div className="flex h-[450px] items-end justify-center gap-[2px] border-b border-zinc-800 pb-2 relative overflow-hidden bg-zinc-900/20 rounded-t-3xl p-6">
          {array.map((value, index) => (
            <div 
              key={index} 
              className="w-full rounded-t-[1px] transition-all duration-75" 
              style={{ 
                height: `${value}px`, 
                backgroundColor: comparing.includes(index) ? "#ef4444" : "#2563eb",
                boxShadow: comparing.includes(index) ? "0 0 15px rgba(239, 68, 68, 0.5)" : "none"
              }} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
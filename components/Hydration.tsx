import React from 'react';
import { WaterLog } from '../types';
import { Plus, Minus, Droplets } from 'lucide-react';

interface HydrationProps {
  data: WaterLog;
  onUpdate: (amount: number) => void;
}

export const Hydration: React.FC<HydrationProps> = ({ data, onUpdate }) => {
  const percentage = Math.min(100, (data.current / data.goal) * 100);
  
  const addWater = (amount: number) => {
    onUpdate(data.current + amount);
  };

  return (
    <div className="p-6 max-w-md mx-auto h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Pelacak Hidrasi</h2>
      
      {/* Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
        
        {/* Circular Progress */}
        <div className="relative w-64 h-64">
           {/* Background Circle */}
           <svg className="w-full h-full transform -rotate-90">
             <circle
               cx="50%" cy="50%" r="45%"
               className="stroke-slate-200 dark:stroke-slate-800 fill-none"
               strokeWidth="20"
             />
             {/* Progress Circle */}
             <circle
               cx="50%" cy="50%" r="45%"
               className="stroke-blue-500 dark:stroke-blue-600 fill-none transition-all duration-1000 ease-out"
               strokeWidth="20"
               strokeDasharray={2 * Math.PI * (128 * 0.45 * 2)} // Approx calculation for demo
               strokeDashoffset={(2 * Math.PI * (128 * 0.45 * 2)) * ((100 - percentage) / 100)}
               strokeLinecap="round"
             />
           </svg>
           
           {/* Center Content */}
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <Droplets size={48} className="text-blue-500 mb-2 animate-bounce" style={{ animationDuration: '3s' }}/>
             <span className="text-4xl font-bold text-slate-900 dark:text-white">{data.current}</span>
             <span className="text-sm text-slate-500">/ {data.goal} ml</span>
           </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mt-8 text-center text-sm px-8">
          Air meningkatkan fokus dan energi. Anda telah mencapai {Math.round(percentage)}% dari target harian.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4 mt-auto">
        <button 
          onClick={() => addWater(250)}
          className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 active:scale-95 transition-all p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={20} className="text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">250ml</span>
          <span className="text-xs text-slate-500">Gelas</span>
        </button>
        <button 
          onClick={() => addWater(500)}
          className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 active:scale-95 transition-all p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={20} className="text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">500ml</span>
          <span className="text-xs text-slate-500">Botol</span>
        </button>
        <button 
          onClick={() => addWater(750)}
          className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 active:scale-95 transition-all p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={20} className="text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">750ml</span>
          <span className="text-xs text-slate-500">Olahraga</span>
        </button>
      </div>
      
      {/* Reset/Adjustment */}
      <button 
        onClick={() => onUpdate(0)}
        className="mt-6 text-xs text-slate-500 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 text-center w-full transition-colors"
      >
        Reset Penghitung
      </button>
    </div>
  );
};
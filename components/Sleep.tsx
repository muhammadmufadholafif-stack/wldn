import React, { useState, useEffect } from 'react';
import { SleepConfig } from '../types';
import { Moon, Sun, Clock, AlarmClock } from 'lucide-react';

interface SleepProps {
  config: SleepConfig;
  onUpdate: (config: SleepConfig) => void;
}

export const SleepModule: React.FC<SleepProps> = ({ config, onUpdate }) => {
  const [bedTime, setBedTime] = useState(config.bedTime);
  const [wakeTime, setWakeTime] = useState(config.wakeTime);
  const [timeLeft, setTimeLeft] = useState('');
  
  // Calculate sleep duration
  const getDuration = (start: string, end: string) => {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h} jam ${m > 0 ? `${m} menit` : ''}`;
  };

  const handleSave = () => {
    onUpdate({ ...config, bedTime, wakeTime });
  };

  useEffect(() => {
    const timer = setInterval(() => {
        const now = new Date();
        const [h, m] = bedTime.split(':').map(Number);
        const target = new Date();
        target.setHours(h, m, 0, 0);
        
        if (target.getTime() < now.getTime()) {
             target.setDate(target.getDate() + 1);
        }

        const diff = target.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours < 0) {
            setTimeLeft("Waktunya tidur!");
        } else {
            setTimeLeft(`${hours} jam ${minutes} menit lagi`);
        }
    }, 1000);
    return () => clearInterval(timer);
  }, [bedTime]);

  return (
    <div className="p-6 max-w-md mx-auto min-h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Istirahat & Tidur</h2>

      {/* Visualizer Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-center text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
            <Moon size={40} className="mx-auto mb-4 text-indigo-300" />
            <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider mb-2">Menuju Waktu Tidur</p>
            <h3 className="text-3xl font-bold mb-1">{timeLeft || "..."}</h3>
            <p className="text-xs text-slate-400">Jadwal: {config.bedTime}</p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <AlarmClock size={18} />
            Atur Jadwal
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Waktu Tidur</label>
                <div className="relative">
                    <input 
                        type="time" 
                        value={bedTime}
                        onChange={(e) => setBedTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                    <Moon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Waktu Bangun</label>
                <div className="relative">
                    <input 
                        type="time" 
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                    <Sun size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex justify-between items-center">
            <span className="text-sm text-indigo-900 dark:text-indigo-200">Total Durasi</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-300">{getDuration(bedTime, wakeTime)}</span>
        </div>

        <button 
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition-colors shadow-sm"
        >
            Simpan Jadwal
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Tips Tidur Berkualitas</h4>
        <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="bg-orange-100 dark:bg-orange-500/10 p-2 rounded-lg h-fit text-orange-600 dark:text-orange-500">
                    <Sun size={18} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Hindari kafein setelah jam 2 siang untuk memastikan tubuh siap beristirahat di malam hari.
                </p>
            </div>
            <div className="flex gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg h-fit text-blue-600 dark:text-blue-500">
                    <Moon size={18} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Kurangi paparan cahaya biru (HP/Laptop) 1 jam sebelum waktu tidur Anda.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { UserProfile, Task, WaterLog, PrayerTime, SleepConfig, FitnessState } from '../types';
import { getDailyInsight } from '../services/geminiService';
import { getGreeting } from '../services/timeService';
import { Sparkles, Droplets, CheckCircle, Moon, ArrowRight, BedDouble, User, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  profile: UserProfile;
  tasks: Task[];
  water: WaterLog;
  prayers: PrayerTime[];
  sleep: SleepConfig;
  fitness: FitnessState;
  setView: (v: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, tasks, water, prayers, sleep, fitness, setView }) => {
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Calculate stats
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const nextPrayer = prayers.find(p => p.isNext) || prayers[0];
  const hydrationPct = Math.min(100, Math.round((water.current / water.goal) * 100));

  const generateInsight = async () => {
    setLoadingInsight(true);
    const text = await getDailyInsight(profile, tasks, water, sleep, fitness, 80);
    setInsight(text);
    setLoadingInsight(false);
  };

  useEffect(() => {
    setInsight(`Selamat datang kembali, ${profile.name}. Siap menjalani hari dengan produktif?`);
  }, [profile.name]);

  // Mock data for chart
  const activityData = [
    { name: 'Sen', completion: 80 },
    { name: 'Sel', completion: 65 },
    { name: 'Rab', completion: 90 },
    { name: 'Kam', completion: hydrationPct }, // Today
    { name: 'Jum', completion: 0 },
    { name: 'Sab', completion: 0 },
    { name: 'Min', completion: 0 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{new Date().toLocaleDateString('id-ID', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{getGreeting()}, <br/> <span className="text-primary-600 dark:text-primary-500">{profile.name}</span></h1>
        </div>
        <button 
          onClick={() => setView('settings')}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary-500 transition-colors text-slate-700 dark:text-slate-200"
          aria-label="Pengaturan"
        >
           <User size={20} />
        </button>
      </header>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles size={80} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 text-primary-400">
            <Sparkles size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Wawasan Harian</span>
          </div>
          <p className="text-slate-100 dark:text-slate-200 text-sm leading-relaxed min-h-[3rem]">
            {loadingInsight ? "Menghubungkan ke AI LifeFlow..." : insight}
          </p>
          {!loadingInsight && (
            <button 
              onClick={generateInsight}
              className="mt-3 text-xs text-slate-300 hover:text-white underline decoration-slate-500 underline-offset-4 transition-colors"
            >
              Perbarui Wawasan
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats Grid - Updated for Fitness */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Hydration */}
        <div 
          onClick={() => setView('hydration')}
          className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-400 dark:hover:border-blue-900/50 shadow-sm transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-lg text-blue-600 dark:text-blue-500">
              <Droplets size={20} />
            </div>
            <span className="text-xs text-slate-500 font-medium">{hydrationPct}%</span>
          </div>
          <h3 className="text-slate-800 dark:text-slate-200 font-medium">Hidrasi</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{water.current}ml / {water.goal}ml</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${hydrationPct}%` }}></div>
          </div>
        </div>

        {/* Fitness Card (New) */}
        <div 
          onClick={() => setView('fitness')}
          className={`p-4 rounded-xl border cursor-pointer shadow-sm transition-all ${
             fitness.completed 
             ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400' 
             : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-900/50'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-lg ${fitness.completed ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500'}`}>
              {fitness.completed ? <CheckCircle size={20} /> : <Activity size={20} />}
            </div>
            <span className={`text-xs font-medium ${fitness.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                {fitness.completed ? 'Selesai' : 'Pending'}
            </span>
          </div>
          <h3 className="text-slate-800 dark:text-slate-200 font-medium">Olahraga</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{fitness.activityType}</p>
        </div>

        {/* Sleep Summary */}
        <div 
          onClick={() => setView('sleep')}
          className="col-span-2 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-900/50 shadow-sm transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
             <div className="bg-indigo-100 dark:bg-indigo-500/10 p-2 rounded-lg text-indigo-600 dark:text-indigo-500">
               <BedDouble size={20} />
             </div>
             <div>
                <h3 className="text-slate-800 dark:text-slate-200 font-medium text-sm">Target Istirahat</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sleep.bedTime} - {sleep.wakeTime}</p>
             </div>
          </div>
          <ArrowRight size={16} className="text-slate-400" />
        </div>
      </div>

      {/* Prayer Row */}
      <div 
        onClick={() => setView('prayer')}
        className="bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-purple-400 dark:hover:border-purple-900/50 shadow-sm transition-all flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
           <div className="bg-purple-100 dark:bg-purple-500/10 p-2 rounded-lg text-purple-600 dark:text-purple-500">
              <Moon size={20} />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-200 font-medium">Jadwal Ibadah</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Selanjutnya: <span className="text-purple-600 dark:text-purple-400 font-semibold">{nextPrayer?.name} {nextPrayer?.time}</span></p>
            </div>
        </div>
        <ArrowRight size={16} className="text-slate-400" />
      </div>

      {/* Tasks Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-500" />
            Tugas
          </h3>
          <button onClick={() => setView('tasks')} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors text-slate-600 dark:text-slate-300">
            <ArrowRight size={16} />
          </button>
        </div>
        
        {pendingTasks === 0 ? (
          <div className="text-center py-4">
            <p className="text-slate-500 text-sm">Semua beres! Nikmati waktu istirahatmu.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.filter(t => !t.completed).slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800/50">
                <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{task.title}</span>
              </div>
            ))}
            {pendingTasks > 3 && (
               <p className="text-xs text-center text-slate-500 mt-2">dan {pendingTasks - 3} lagi...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
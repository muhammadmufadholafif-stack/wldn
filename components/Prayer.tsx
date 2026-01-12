import React from 'react';
import { PrayerTime } from '../types';
import { Moon, Sun, Sunrise, Sunset, MapPin } from 'lucide-react';

interface PrayerProps {
  prayers: PrayerTime[];
  city: string;
}

export const PrayerModule: React.FC<PrayerProps> = ({ prayers, city }) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'subuh': return <Sunrise size={20} />;
      case 'duhur': return <Sun size={20} />;
      case 'asar': return <Sun size={20} className="opacity-70" />;
      case 'magrib': return <Sunset size={20} />;
      default: return <Moon size={20} />;
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto min-h-full">
       <div className="flex justify-between items-end mb-8">
         <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Jadwal Ibadah</h2>
         <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
           <MapPin size={12} />
           <span>{city}</span>
         </div>
       </div>

       <div className="space-y-4">
          {prayers.map((prayer) => (
            <div 
              key={prayer.name}
              className={`relative flex items-center justify-between p-5 rounded-2xl border transition-all shadow-sm ${
                prayer.isNext 
                  ? 'bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-900/40 dark:to-slate-900 border-emerald-200 dark:border-emerald-600/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {prayer.isNext && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
              )}
              
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${prayer.isNext ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {getIcon(prayer.name)}
                </div>
                <div>
                  <h3 className={`font-medium ${prayer.isNext ? 'text-slate-900 dark:text-white' : ''}`}>{prayer.name}</h3>
                  {prayer.isNext && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wider">Akan Datang</span>}
                </div>
              </div>

              <div className={`text-xl font-bold font-mono ${prayer.isNext ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                {prayer.time}
              </div>
            </div>
          ))}
       </div>

       <div className="mt-8 p-4 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
         <p className="text-sm text-slate-600 dark:text-slate-400 italic">"Amalan yang paling dicintai Allah adalah shalat pada waktunya."</p>
       </div>
    </div>
  );
};
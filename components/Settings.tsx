import React, { useState } from 'react';
import { UserProfile, StorageKeys } from '../types';
import { Moon, Sun } from 'lucide-react';

interface SettingsProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const SettingsModule: React.FC<SettingsProps> = ({ profile, setProfile, isDarkMode, toggleTheme }) => {
  const [localName, setLocalName] = useState(profile.name);
  const [localWeight, setLocalWeight] = useState(profile.weight);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newProfile = { ...profile, name: localName, weight: localWeight };
    setProfile(newProfile);
    localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(newProfile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const calculatedGoal = localWeight * 30;

  return (
    <div className="p-6 max-w-md mx-auto min-h-full">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Pengaturan</h2>

      <div className="space-y-6">
        
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-orange-100 text-orange-500'}`}>
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
             </div>
             <div>
               <p className="text-sm font-medium text-slate-900 dark:text-white">Tampilan Aplikasi</p>
               <p className="text-xs text-slate-500">{isDarkMode ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'}</p>
             </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-primary-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-300 shadow-md ${isDarkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-500 dark:text-slate-400">Nama Tampilan</label>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-500 dark:text-slate-400">Berat Badan (kg)</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={localWeight}
              onChange={(e) => setLocalWeight(Number(e.target.value))}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
            />
            <span className="text-slate-500 font-medium">kg</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Digunakan untuk menghitung target air: <span className="text-primary-500">{calculatedGoal}ml</span>
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold transition-all mt-8 shadow-sm ${
            saved 
              ? 'bg-emerald-600 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 text-white'
          }`}
        >
          {saved ? 'Berhasil Disimpan' : 'Simpan Perubahan'}
        </button>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
           <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Tentang LifeFlow</h3>
           <p className="text-xs text-slate-500 dark:text-slate-600">Versi 1.1.0 (Dark/Light Mode)</p>
           <p className="text-xs text-slate-500 dark:text-slate-600 mt-1">
             Pendamping harian terintegrasi untuk membantu Anda menjaga keseimbangan hidup, ibadah, dan kesehatan.
           </p>
        </div>
      </div>
    </div>
  );
};
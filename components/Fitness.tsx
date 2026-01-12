import React, { useState } from 'react';
import { FitnessState } from '../types';
import { Activity, Clock, Check, Trophy, Flame } from 'lucide-react';

interface FitnessProps {
  data: FitnessState;
  onUpdate: (data: FitnessState) => void;
}

export const FitnessModule: React.FC<FitnessProps> = ({ data, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempType, setTempType] = useState(data.activityType);
  const [tempDuration, setTempDuration] = useState(data.duration);
  const [tempTime, setTempTime] = useState(data.scheduledTime);

  const toggleComplete = () => {
    onUpdate({ ...data, completed: !data.completed });
  };

  const handleSaveSettings = () => {
    onUpdate({
      ...data,
      activityType: tempType,
      duration: tempDuration,
      scheduledTime: tempTime,
    });
    setIsEditing(false);
  };

  // Estimasi kalori kasar: 5-8 kalori per menit tergantung aktivitas
  const calories = Math.round(data.duration * 6.5); 

  return (
    <div className="p-6 max-w-md mx-auto min-h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Aktivitas Fisik</h2>

      {/* Main Status Card */}
      <div className={`relative rounded-3xl p-8 text-center mb-6 transition-all duration-500 overflow-hidden shadow-xl ${
          data.completed 
          ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white' 
          : 'bg-gradient-to-br from-rose-500 to-orange-600 text-white'
      }`}>
         <div className="relative z-10 flex flex-col items-center">
             <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                {data.completed ? <Trophy size={48} /> : <Activity size={48} />}
             </div>
             
             <h3 className="text-3xl font-bold mb-2">
                 {data.completed ? "Target Tercapai!" : "Waktunya Bergerak"}
             </h3>
             <p className="text-white/90 text-sm mb-6 max-w-[200px] mx-auto">
                 {data.completed 
                    ? `Luar biasa! Anda telah menyelesaikan ${data.activityType}.` 
                    : `Jadwal: ${data.activityType} selama ${data.duration} menit pada pukul ${data.scheduledTime}.`
                 }
             </p>

             <button 
                onClick={toggleComplete}
                className="bg-white text-rose-600 hover:bg-slate-100 font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
             >
                 {data.completed ? (
                     <><span className="text-teal-600">Batalkan</span></>
                 ) : (
                     <><Check size={20} /><span>Selesai</span></>
                 )}
             </button>
         </div>

         {/* Decorative BG */}
         <Activity size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-500/10 p-2 rounded-xl text-orange-500">
                  <Flame size={20} />
              </div>
              <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Estimasi</p>
                  <p className="font-bold text-slate-900 dark:text-white">{calories} Kkal</p>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-500/10 p-2 rounded-xl text-blue-500">
                  <Clock size={20} />
              </div>
              <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Durasi</p>
                  <p className="font-bold text-slate-900 dark:text-white">{data.duration} Menit</p>
              </div>
          </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-slate-900 dark:text-white">Rencana Latihan</h3>
             {!isEditing && (
                 <button onClick={() => setIsEditing(true)} className="text-xs text-primary-500 font-medium">Ubah</button>
             )}
        </div>

        {isEditing ? (
            <div className="space-y-4 animate-fade-in">
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">Jenis Aktivitas</label>
                    <select 
                        value={tempType}
                        onChange={(e) => setTempType(e.target.value)}
                        className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                    >
                        <option value="Lari">Lari / Jogging</option>
                        <option value="Gym">Gym / Angkat Beban</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Bersepeda">Bersepeda</option>
                        <option value="Renang">Renang</option>
                        <option value="Jalan Kaki">Jalan Kaki</option>
                        <option value="HIIT">HIIT / Kardio</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400">Durasi (Menit)</label>
                        <input 
                            type="number" 
                            value={tempDuration}
                            onChange={(e) => setTempDuration(Number(e.target.value))}
                            className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400">Jadwal</label>
                        <input 
                            type="time" 
                            value={tempTime}
                            onChange={(e) => setTempTime(e.target.value)}
                            className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                        />
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button onClick={handleSaveSettings} className="flex-1 bg-rose-500 text-white py-2 rounded-xl text-sm font-medium">Simpan</button>
                    <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-2 rounded-xl text-sm font-medium">Batal</button>
                </div>
            </div>
        ) : (
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Aktivitas</span>
                    <span className="font-medium text-slate-900 dark:text-white">{data.activityType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Jadwal</span>
                    <span className="font-medium text-slate-900 dark:text-white">{data.scheduledTime} ({data.duration} m)</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
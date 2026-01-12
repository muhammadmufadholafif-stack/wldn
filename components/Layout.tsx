import React from 'react';
import { Home, CheckCircle, Droplets, Moon, BedDouble, Activity } from 'lucide-react';
import { AppState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppState['view'];
  setView: (view: AppState['view']) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Beranda' },
    { id: 'fitness', icon: Activity, label: 'Olahraga' }, // Moved for visibility
    { id: 'tasks', icon: CheckCircle, label: 'Tugas' },
    { id: 'hydration', icon: Droplets, label: 'Air' },
    { id: 'prayer', icon: Moon, label: 'Ibadah' },
    { id: 'sleep', icon: BedDouble, label: 'Istirahat' },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col font-sans transition-colors duration-300 selection:bg-primary-500 selection:text-white">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </main>

      {/* Sticky Bottom Navigation (Mobile First Design) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-50 transition-colors duration-300">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as AppState['view'])}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary-600 dark:text-primary-500' 
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
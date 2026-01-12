import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, Trash2, Check, Circle, AlertCircle } from 'lucide-react';

interface TaskProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TaskModule: React.FC<TaskProps> = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority,
      createdAt: Date.now(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const priorityColors = {
    high: 'text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-500/10',
    medium: 'text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10',
    low: 'text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-500/50 bg-blue-50 dark:bg-blue-500/10',
  };

  const priorityLabels = {
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah'
  };

  return (
    <div className="p-6 max-w-md mx-auto min-h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Daftar Tugas</h2>

      {/* Input */}
      <form onSubmit={addTask} className="mb-8">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Tambah tugas baru..."
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors placeholder:text-slate-400"
          />
          <button 
            type="submit"
            className="bg-primary-600 hover:bg-primary-500 text-white p-3 rounded-xl transition-colors shadow-sm"
          >
            <Plus size={24} />
          </button>
        </div>
        
        {/* Priority Selector */}
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-xs px-3 py-1.5 rounded-full border capitalize transition-all font-medium ${
                priority === p ? priorityColors[p] : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {priorityLabels[p]}
            </button>
          ))}
        </div>
      </form>

      {/* List */}
      <div className="flex-1 space-y-3 overflow-y-auto pb-4">
        {tasks.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-600 mt-20">
            <p>Belum ada tugas.</p>
          </div>
        )}
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 shadow-sm ${
              task.completed 
                ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 opacity-60' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500'
              }`}
            >
              {task.completed && <Check size={14} className="text-white" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                 <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                 </span>
              </div>
            </div>

            <button 
              onClick={() => deleteTask(task.id)}
              className="text-slate-400 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
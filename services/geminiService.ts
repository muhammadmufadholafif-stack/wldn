import { GoogleGenAI } from "@google/genai";
import { Task, WaterLog, UserProfile, SleepConfig, FitnessState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyInsight = async (
  profile: UserProfile,
  tasks: Task[],
  water: WaterLog,
  sleep: SleepConfig,
  fitness: FitnessState,
  prayerCompletion: number // rough percentage estimate
): Promise<string> => {
  try {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const waterPercentage = Math.round((water.current / water.goal) * 100);

    const prompt = `
      Anda adalah LifeFlow, pendamping harian yang tenang, suportif, dan bijaksana.
      Analisis statistik harian pengguna saat ini dan berikan wawasan motivasi singkat (maksimal 2 kalimat) dalam Bahasa Indonesia.
      
      Konteks Pengguna:
      - Nama: ${profile.name}
      - Tugas Selesai: ${completedTasks}/${totalTasks}
      - Hidrasi: ${waterPercentage}%
      - Jadwal Tidur Target: ${sleep.bedTime} - ${sleep.wakeTime}
      - Olahraga Hari Ini: ${fitness.completed ? 'Sudah Selesai' : 'Belum'} (${fitness.activityType} jam ${fitness.scheduledTime})
      - Keseimbangan Spiritual: Estimasi ${prayerCompletion}%

      Nada: Stoik, menyemangati, singkat.
      Saran harus holistik. Jika olahraga belum selesai dan waktu mendekati jadwal, ingatkan dengan halus.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Tetap fokus dan jaga keseimbanganmu.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Fokus pada saat ini. Kemajuanmu adalah milikmu sendiri.";
  }
};
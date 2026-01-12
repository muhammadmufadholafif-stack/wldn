import { GoogleGenAI } from "@google/genai";
import { Task, WaterLog, UserProfile, SleepConfig, FitnessState } from "../types";

// Pastikan ini membaca API Key dari Vite
const apiKey = process.env.API_KEY || "";
const genAI = new GoogleGenAI(apiKey);

export const getDailyInsight = async (
  profile: UserProfile,
  tasks: Task[],
  water: WaterLog,
  sleep: SleepConfig,
  fitness: FitnessState,
  prayerCompletion: number
): Promise<string> => {
  
  // Jika API Key tidak ada, tampilkan pesan ini alih-alih error "Not Found"
  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    return "API Key belum terpasang. Cek file .env.local Anda.";
  }

  try {
    // GANTI KE gemini-1.5-flash (Ini kuncinya agar tidak 'Not Found')
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const completedTasks = tasks.filter(t => t.completed).length;
    const waterPercentage = Math.round((water.current / water.goal) * 100);

    const prompt = `Berikan 1 kalimat motivasi Bahasa Indonesia untuk ${profile.name}. 
    Data: Tugas selesai ${completedTasks}/${tasks.length}, Minum ${waterPercentage}%, Olahraga ${fitness.completed ? 'Sudah' : 'Belum'}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || "Tetap semangat menjalani hari ini!";
  } catch (error) {
    console.error("AI Error:", error);
    return "Gagal memuat insight. Pastikan API Key aktif dan kuota tersedia.";
  }
};
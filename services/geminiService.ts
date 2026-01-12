import { GoogleGenAI } from "@google/genai";
import { Task, WaterLog, UserProfile, SleepConfig, FitnessState } from "../types";

// Mengambil API Key dari env yang sudah kamu setting di vite.config.ts
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
  // Jika API Key kosong, jangan panggil AI agar tidak crash
  if (!apiKey) {
    return "Lengkapi API Key di .env.local untuk mendapatkan insight kesehatan.";
  }

  try {
    // Pakai model gemini-1.5-flash (paling stabil & gratis)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const waterPercentage = Math.round((water.current / water.goal) * 100);

    const prompt = `
      Anda adalah LifeFlow, pendamping harian yang tenang dan bijaksana.
      Berikan 1-2 kalimat motivasi singkat dalam Bahasa Indonesia berdasarkan data ini:
      - Nama: ${profile.name}
      - Tugas: ${completedTasks}/${totalTasks} selesai.
      - Air: ${waterPercentage}% dari target.
      - Olahraga: ${fitness.completed ? 'Sudah' : 'Belum'} dilakukan.
      
      Berikan saran yang menyemangati tapi tetap singkat.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Tetap semangat menjalani hari ini!";
  }
};
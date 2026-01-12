import { GoogleGenAI } from "@google/genai";
import { Task, WaterLog, UserProfile, SleepConfig, FitnessState } from "../types";

// Membaca API Key dari settingan Vite (VITE_GEMINI_API_KEY)
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
  
  // Jika API Key masih bawaan/kosong, jangan panggil Google AI agar tidak crash
  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    return "Atur API Key kamu di file .env.local untuk melihat saran kesehatan harian di sini.";
  }

  try {
    // Pakai model gemini-1.5-flash (Paling stabil, cepat, dan ada versi gratisnya)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const completedTasks = tasks.filter(t => t.completed).length;
    const waterPercentage = Math.round((water.current / water.goal) * 100);

    const prompt = `
      Anda adalah LifeFlow, asisten kesehatan pribadi yang bijaksana. 
      Berikan 1 kalimat motivasi singkat (Bahasa Indonesia) untuk ${profile.name} berdasarkan data harian ini:
      - Tugas: ${completedTasks} selesai dari ${tasks.length} total.
      - Air: ${waterPercentage}% dari target harian.
      - Olahraga: ${fitness.completed ? 'Sudah selesai' : 'Belum dilakukan'}.
      
      Berikan saran yang menyemangati namun tetap padat dan jelas.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Tetap semangat dan jaga kesehatanmu hari ini!";
  }
};
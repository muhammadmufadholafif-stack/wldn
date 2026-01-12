import { GoogleGenAI } from "@google/genai";
import { Task, WaterLog, UserProfile, SleepConfig, FitnessState } from "../types";

// Membaca API Key yang sudah disetting di vite.config.ts
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
  
  // Jika API Key belum diisi, jangan jalankan AI agar tidak error
  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    return "Atur API Key di file .env.local untuk mendapatkan saran kesehatan.";
  }

  try {
    // Menggunakan model Gemini 1.5 Flash (Gratis & Cepat)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const completedTasks = tasks.filter(t => t.completed).length;
    const waterPercentage = Math.round((water.current / water.goal) * 100);

    const prompt = `
      Anda adalah LifeFlow, pendamping kesehatan harian. 
      Tugas Anda: Berikan 1 kalimat motivasi singkat (Bahasa Indonesia) berdasarkan data berikut:
      - Nama: ${profile.name}
      - Progress Tugas: ${completedTasks} selesai dari ${tasks.length}
      - Minum Air: ${waterPercentage}% dari target
      - Olahraga: ${fitness.completed ? 'Sudah dilakukan' : 'Belum dilakukan'}

      Berikan saran yang menyemangati dan singkat.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Tetap semangat menjalani hari ini dan jaga kesehatan!";
  }
};
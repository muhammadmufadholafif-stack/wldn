import { PrayerTime } from "../types";

// Simulating prayer times based on date/location offset to avoid heavy external libraries
// In a real app, this would use 'adhan' library or an API.
export const calculatePrayerTimes = (lat: number, long: number): PrayerTime[] => {
  const now = new Date();
  // Simple offset simulation based on coordinate 'hash' to keep it static for the location but different per user
  const offset = (Math.abs(lat) + Math.abs(long)) % 60; 
  
  const baseTimes = [
    { name: 'Subuh', hour: 4, minute: 45 },
    { name: 'Duhur', hour: 12, minute: 15 },
    { name: 'Asar', hour: 15, minute: 30 },
    { name: 'Magrib', hour: 18, minute: 10 },
    { name: 'Isya', hour: 19, minute: 25 },
  ];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let nextFound = false;

  return baseTimes.map((pt) => {
    // Add fake variance based on location
    let m = pt.minute + Math.floor(offset / 5);
    let h = pt.hour;
    if (m > 59) {
      h += 1;
      m -= 60;
    }
    
    const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    const ptMinutes = h * 60 + m;
    
    let isNext = false;
    if (!nextFound && ptMinutes > currentMinutes) {
      isNext = true;
      nextFound = true;
    }

    return {
      name: pt.name,
      time: timeString,
      isNext,
    };
  });
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
};
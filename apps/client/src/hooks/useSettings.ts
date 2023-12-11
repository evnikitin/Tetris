import { useState } from "react";

export interface UserSettings {
  level: number;
  color: string;
  gridVisibility: boolean;
  music: boolean;
  variant: string;
}

const buildSettings = (level: number, color: string, gridVisibility: boolean, music: boolean, variant: string) => ({
  level,
  color,
  gridVisibility,
  music,
  variant
});

export const useSettings = ( level: number, color: string, gridVisibility: boolean, music: boolean, variant: string) : [UserSettings, React.Dispatch<React.SetStateAction<UserSettings>>]=> {
  const [settings, setSettings] = useState<UserSettings>(buildSettings(level, color, gridVisibility, music, variant));

   

  return [settings, setSettings];
};
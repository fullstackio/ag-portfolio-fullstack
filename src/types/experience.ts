export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  current?: boolean;
}

export interface ExperienceLogLine {
  id: string;
  text: string;
}

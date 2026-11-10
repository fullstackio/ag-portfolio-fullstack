export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  current?: boolean;
  /** Lines shown in the terminal panel when this role is selected. */
  logLines: string[];
}

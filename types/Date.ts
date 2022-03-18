interface DateState {
  date: string;
  setDate: (date: string) => void;
  setDayTo: (day: number) => void;
  getWeek: (date: string) => string[];
  getCurrentWeek: () => string[];
  formatDate: (date: string, format: string) => string;
}

export type { DateState };

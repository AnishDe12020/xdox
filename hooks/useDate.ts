import create from "zustand";
import { DateState } from "../types/Date";
import { DateTime } from "luxon";

const useDate = create<DateState>(set => ({
  date: DateTime.now().toISODate(),
  setDate: date => set(state => ({ ...state, date })),
  setDayTo: (days: number) =>
    set(state => ({
      ...state,
      date: DateTime.fromISO(state.date).plus({ days }).toISODate(),
    })),
  getWeek: date => {
    const week = [];
    const startOfWeek: DateTime = DateTime.fromISO(date).startOf("week");

    for (let i = 0; i < 7; i++) {
      week.push(startOfWeek.plus({ days: i }).toISODate());
    }
    return week;
  },
}));

export default useDate;

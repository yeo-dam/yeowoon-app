import { format } from "date-fns";

export const dateFormatter = (
  date: string | Date = "",
  dateFormat = "yyyy.MM.dd"
) => {
  if (!date) {
    return date;
  }

  if (
    typeof date === "string" ||
    (typeof date === "object" && date instanceof Date)
  ) {
    return format(new Date(date), dateFormat);
  } else {
    return format(date, dateFormat);
  }
};

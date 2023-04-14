import dayjs from "dayjs";

export const formatDate = (start: string, end: string): string => {
  const startDate = dayjs(start).get("date");
  const endDate = dayjs(end).get("date");
  console.log(startDate === endDate);

  let endFormatStr = "";
  if (startDate === endDate) {
    endFormatStr += "h:mma";
  } else {
    endFormatStr += "MMM D h:mma";
  }

  const formattedStart = dayjs(start).format("MMM D h:mma");
  const formattedEnd = dayjs(end).format(endFormatStr);

  return `${formattedStart} - ${formattedEnd}`;
};

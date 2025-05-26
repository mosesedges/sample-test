export const localizedDate = ({ date }: { date: string }) => {
  const userLocale = navigator.language ?? "en-uk";

  return new Intl.DateTimeFormat(userLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const localeTime = (data: string) => data.substring(11, 19);

export const showStatus = (startTime: string) => {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = formatDate(new Date());
  const showDate = formatDate(new Date(startTime));
  let status = "";
  if (currentDate > showDate) {
    status = "Completed";
  } else if (currentDate === showDate) {
    status = "Active";
  } else {
    status = "Scheduled";
  }
  return status;
};

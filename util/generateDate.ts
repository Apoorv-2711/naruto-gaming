export const generateDateList = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const dateList = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    dateList.push(formattedDate);
    date.setDate(date.getDate() + 1);
  }
  return dateList;
};

export const currentDate = () => {
  const date = new Date()
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  return date;
};

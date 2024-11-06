// export const formatDateWithTime = (isoString) => {
//   const date = new Date(isoString);
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
    
//   };
//   return date.toLocaleDateString("en-US", options);
// };

export const formatDateWithTime = (timestamp) => {
  // Convert to a Date object, ensuring compatibility for ISO strings
  const date = new Date(timestamp);

  // Check if the date conversion is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid timestamp provided:", timestamp);
    return "Invalid Date";
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};


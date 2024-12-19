const calculateReadingTime = (text, wordsPerMinute = 250)  => {
    const words = text.split(/\s+/);
    const wordCount = words.length;
    let totalMinutes = wordCount / wordsPerMinute;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.round((totalMinutes % 1) * 60);
    let readingTimeString = "";
    if (hours > 0) {
      readingTimeString += `${hours} hour${hours > 1 ? "s" : ""}, `;
    }
    if (minutes > 0) {
      readingTimeString += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
    }
    readingTimeString += `${seconds} second${seconds > 1 ? "s" : ""}`;

    return readingTimeString;
  }
  module.exports = calculateReadingTime;
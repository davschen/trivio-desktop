export function firestoreTimestampToString(timestampStr) {
  // Extract seconds using regex
  const match = timestampStr.match(/seconds=(\d+),/);
  if (!match) return null; // or handle the error

  const seconds = parseInt(match[1], 10);
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds

  // Format the date as MM/DD/YYYY
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
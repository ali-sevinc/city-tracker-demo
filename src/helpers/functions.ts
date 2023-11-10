export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// export function flagemojiToPNG(flag: string) {
//   const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0))
//     .map((char) => String.fromCharCode(char! - 127397).toLowerCase())
//     .join("");
//   return (
//     <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
//   );
// }

export function flagemojiToPNG(flag: string) {
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0))
    .map((char) => String.fromCharCode(char! - 127397).toLowerCase())
    .join("");
  return countryCode;
}

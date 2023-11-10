import { flagemojiToPNG } from "../../helpers/functions";

import styles from "./CountryItem.module.css";

interface PropsType {
  country: { emoji: string; country: string };
}

function CountryItem({ country }: PropsType) {
  const emoji = flagemojiToPNG(country.emoji);
  return (
    <li className={styles.countryItem}>
      <span>
        {emoji && (
          <img
            src={`https://flagcdn.com/24x18/${emoji}.png`}
            alt={country.country}
          />
        )}
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

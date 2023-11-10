import { MouseEvent } from "react";
import { Link } from "react-router-dom";

import { useCityContext } from "../../store/CityContext";

import { flagemojiToPNG, formatDate } from "../../helpers/functions";
import { CityType } from "../../App";

import styles from "./CityItem.module.css";

interface PropsType {
  city: CityType;
}

export default function CityItem({ city }: PropsType) {
  const { selectedCity, deleteCity } = useCityContext();

  const { cityName, emoji, date, id, position } = city;
  const flagEmoji = flagemojiToPNG(emoji);

  function handleDelete(event: MouseEvent) {
    event.preventDefault();
    deleteCity(Number(id));
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          selectedCity?.id === city.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>
          {flagEmoji && (
            <img
              src={`https://flagcdn.com/24x18/${flagEmoji}.png`}
              alt={city.country}
            />
          )}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

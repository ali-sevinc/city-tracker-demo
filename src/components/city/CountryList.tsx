import { useCityContext } from "../../store/CityContext";

import Message from "../ui/Message";
import Spinner from "../ui/Spinner";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";

type CountryType = { country: string; emoji: string };

const initialArray: CountryType[] = [];
export default function CountryList() {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Found no visited city. Click on the map to add a new city" />
    );

  const counries: CountryType[] = cities.reduce((arr, city) => {
    if (!arr.map((item: CountryType) => item.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, initialArray);

  return (
    <ul className={styles.countryList}>
      {counries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

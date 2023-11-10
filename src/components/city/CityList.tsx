import { useCityContext } from "../../store/CityContext";

import Spinner from "../ui/Spinner";
import CityItem from "./CityItem";
import Message from "../ui/Message";

import styles from "./CityList.module.css";

export default function CityList() {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Found no visited city. Click on the map to add a new city" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

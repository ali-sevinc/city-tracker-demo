import { FormEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCityContext } from "../../store/CityContext";

import { convertToEmoji, flagemojiToPNG } from "../../helpers/functions";
import useUrlPosition from "../../hooks/useUrlPosition";
import { CityType } from "../../App";

import Button from "../ui/Button";
import BackButton from "../ui/BackButton";
import Spinner from "../ui/Spinner";
import Message from "../ui/Message";

import styles from "./Form.module.css";

function Form() {
  const { createNewCity } = useCityContext();

  const navigate = useNavigate();

  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();

  const [geocodeLoading, setGeocodeLoading] = useState<boolean>(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const convertedEmoji = convertToEmoji(emoji);
  const flag = flagemojiToPNG(convertedEmoji);

  useEffect(
    function () {
      if (!lat || !lng) return;
      async function getNewCity() {
        setGeocodeLoading(true);
        setGeocodeError(null);
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) throw new Error("an error occured.");

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (error) {
          setGeocodeError(
            "That doesn't seem to be a city. Click somewhere else"
          );
        } finally {
          setGeocodeLoading(false);
        }
      }
      getNewCity();
    },
    [lat, lng]
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!cityName || !date || !lat || !lng) return;
    const newCity: CityType = {
      cityName,
      country,
      emoji: convertedEmoji,
      date: date.toString(),
      notes,
      position: {
        lat,
        lng,
      },
    };
    // console.log(newCity);
    await createNewCity(newCity);
    navigate("/app/cities");
  }

  if (geocodeError) return <Message message={geocodeError} />;
  if (geocodeLoading) return <Spinner />;
  if (!lat || !lng)
    return <Message message="Starting by clicking on the map." />;
  return (
    <form
      className={`${styles.form} ${geocodeLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {flag && (
            <img src={`https://flagcdn.com/24x18/${flag}.png`} alt={country} />
          )}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {geocodeLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Button type="submit" style="primary">
              Add
            </Button>
            <BackButton />
          </>
        )}
      </div>
    </form>
  );
}

export default Form;

import {
  useCallback,
  useContext,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { CityType } from "../App";

type InitialType = {
  cities: CityType[];
  isLoading: boolean;
  selectedCity: CityType | null;
  handleSelectCity: (id: string | number) => void;
  createNewCity: (cityData: CityType) => void;
  deleteCity: (id: number) => void;
};
const initialState: InitialType = {
  cities: [],
  isLoading: false,
  selectedCity: null,
  handleSelectCity: () => {},
  createNewCity: () => {},
  deleteCity: () => {},
};

const CityContext = createContext(initialState);

export default function CityContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityType | null>(null);

  useEffect(function () {
    async function getCities() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("An error occured...");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function createNewCity(cityData: CityType) {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
      });
      if (!res.ok) throw new Error("Something went wrong.");
      const data = await res.json();
      setCities((prev) => [...prev, data]);
    } catch (error) {
      alert("An error occured...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: number) {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/cities/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong.");

      setCities((prev) => prev.filter((city) => city.id !== id));
    } catch (error) {
      alert("An error occured...");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectCity = useCallback(async function handleSelectCity(
    id: number | string
  ) {
    setIsLoading(true);
    const res = await fetch("http://localhost:8000/cities/" + id);
    const data = await res.json();
    setSelectedCity(data);
    setIsLoading(false);
  },
  []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        selectedCity,
        handleSelectCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  const city = useContext(CityContext);

  return city;
}

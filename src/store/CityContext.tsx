import {
  useCallback,
  useContext,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { CityType } from "../App";

type InitialType = {
  cities: CityType[];
  isLoading: boolean;
  selectedCity: CityType | null;
  error: string;
  handleSelectCity: (id: string | number) => void;
  createNewCity: (cityData: CityType) => void;
  deleteCity: (id: number) => void;
};
type ActionType = {
  type:
    | "city/fetched"
    | "city/selected"
    | "city/created"
    | "city/deleted"
    | "loading"
    | "error"
    | "notLoading";
  cities?: CityType[];
  id?: string | number;
  cityData?: CityType;
  error?: string;
};

const initialState: InitialType = {
  cities: [],
  isLoading: false,
  selectedCity: null,
  error: "",
  handleSelectCity: () => {},
  createNewCity: () => {},
  deleteCity: () => {},
};

const CityContext = createContext(initialState);

function reducer(state: InitialType, action: ActionType) {
  if (action.type === "city/fetched") {
    return {
      ...state,
      cities: action.cities,
    } as InitialType;
  }
  if (action.type === "city/selected") {
    return {
      ...state,
      selectedCity: action.cityData,
    } as InitialType;
  }
  if (action.type === "city/created") {
    const updatedCities = [...state.cities, action.cityData];
    return {
      ...state,
      cities: updatedCities,
      selectedCity: action.cityData,
    } as InitialType;
  }
  if (action.type === "city/deleted") {
    const updatedCities = state.cities.filter((city) => city.id !== action.id);
    return {
      ...state,
      cities: updatedCities,
      selectedCity: null,
    } as InitialType;
  }
  if (action.type === "loading") {
    return {
      ...state,
      isLoading: true,
    } as InitialType;
  }
  if (action.type === "notLoading") {
    return {
      ...state,
      isLoading: false,
    } as InitialType;
  }
  if (action.type === "error") {
    return {
      ...state,
      error: action.error,
    } as InitialType;
  }
  return state;
}

export default function CityContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [{ cities, isLoading, selectedCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      dispatch({ type: "error", error: "" });
      try {
        const res = await fetch("http://localhost:8000/cities");
        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();
        dispatch({ type: "city/fetched", cities: data });
      } catch (error) {
        dispatch({ type: "error", error: "An error occured..." });
      } finally {
        dispatch({ type: "notLoading" });
      }
    }
    getCities();
  }, []);

  async function createNewCity(cityData: CityType) {
    dispatch({ type: "loading" });
    dispatch({ type: "error", error: "" });
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
      dispatch({ type: "city/created", cityData: data });
    } catch (error) {
      dispatch({ type: "error", error: "An error occured..." });
    } finally {
      dispatch({ type: "notLoading" });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    dispatch({ type: "error", error: "" });
    try {
      const res = await fetch("http://localhost:8000/cities/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong.");

      dispatch({ type: "city/deleted", id });
    } catch (error) {
      dispatch({ type: "error", error: "An error occured..." });
    } finally {
      dispatch({ type: "notLoading" });
    }
  }

  const handleSelectCity = useCallback(async function handleSelectCity(
    id: number | string
  ) {
    dispatch({ type: "loading" });
    dispatch({ type: "error", error: "" });
    try {
      const res = await fetch("http://localhost:8000/cities/" + id);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      dispatch({ type: "city/selected", cityData: data });
      dispatch({ type: "notLoading" });
    } catch (error) {
      dispatch({ type: "error", error: "An error occured..." });
    } finally {
      dispatch({ type: "notLoading" });
    }
  },
  []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        error,
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

// eslint-disable-next-line react-refresh/only-export-components
export function useCityContext() {
  const city = useContext(CityContext);

  return city;
}

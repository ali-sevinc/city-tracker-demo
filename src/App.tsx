import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityContextProvider from "./store/CityContext";

import CountryList from "./components/city/CountryList";
import CityList from "./components/city/CityList";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import City from "./components/city/City";
import Form from "./components/user/Form";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AuthContextProvider from "./store/AuthContext";

export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number | string;
    lng: number | string;
  };
  id?: number | string;
};

export default function App() {
  return (
    <AuthContextProvider>
      <CityContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />

            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityContextProvider>
    </AuthContextProvider>
  );
}

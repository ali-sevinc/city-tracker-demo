import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityContextProvider from "./store/CityContext";
import AuthContextProvider from "./store/AuthContext";

import SpinnerFullPage from "./components/ui/SpinnerFullPage";
import CountryList from "./components/city/CountryList";
import CityList from "./components/city/CityList";
import City from "./components/city/City";
import Form from "./components/user/Form";

const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));

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
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CityContextProvider>
    </AuthContextProvider>
  );
}

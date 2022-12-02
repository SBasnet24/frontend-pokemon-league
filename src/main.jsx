import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./assets/main.css";

import { AuthenticationProvider } from "./context/AuthContext";
import { LeagueProvider } from "./context/LeagueContext";
import { PokemonProvider } from "./context/PokemonContext";

import PokemonPage from "./pages/Pokemon";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leagues from './pages/Leagues';
import AddPokemon from './pages/AddPokemon';
import AddLeague from './pages/AddLeague';
import FillSlot from './pages/FIllSlot';
import PrivateRoute from './pages/components/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pokemons",
    element: (
      <PrivateRoute>
        <PokemonPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/league/:id/fill-slot",
    element: (
      <PrivateRoute>
        <FillSlot />
      </PrivateRoute>
    ),
  },
  {
    path: "/leagues",
    element: (
      <PrivateRoute>
        <Leagues />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-pokemon",
    element: (
      <PrivateRoute>
        <AddPokemon />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-league",
    element: (
      <PrivateRoute>
        <AddLeague />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthenticationProvider>
        <PokemonProvider>
          <LeagueProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </LeagueProvider>
        </PokemonProvider>
      </AuthenticationProvider>
  </React.StrictMode>
);

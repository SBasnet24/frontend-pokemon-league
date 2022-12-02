import { createContext, useContext, useReducer } from "react";
import { getPokemons } from "../service/PokemonService";

export const POKEMON_TYPE = {
  GET_POKEMONS: "GET_POKEMONS",
  SET_LOADING: "SET_LOADING",
};

const initialState = {
  pokemons: [],
  isLoading: false,
};
const PokemonContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case POKEMON_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POKEMON_TYPE.GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTrainersPokemons = async () => {
    setLoading();
    const data = await getPokemons();
    dispatch({
      type: POKEMON_TYPE.GET_POKEMONS,
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: POKEMON_TYPE.SET_LOADING });

  const { pokemons, isLoading } = state;

  return (
    <PokemonContext.Provider
      value={{ getTrainersPokemons, isLoading, pokemons }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemonContext = () => useContext(PokemonContext);
export { usePokemonContext, PokemonProvider };

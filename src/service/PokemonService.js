import { get, post } from "../api/client";
import { ENDPOINTS } from "../api/enpoints";

export const getPokemons = async () => {
  try {
    const response = await get(ENDPOINTS.POKEMON, {}, true);
    return response.pokemons;
  } catch (error) {
    throw error;
  }
};

export const addPokemon = async (data) => {
  try {
    const response = await post(ENDPOINTS.POKEMON, data, true);
    return response.pokemon;
  } catch (error) {
    throw error;
  }
};


import { get, post } from "../api/client";
import { ENDPOINTS } from "../api/enpoints";

export const fillPokemonToSlot = async (data, leagueId) => {
  try {
    const response = await post(
      ENDPOINTS.SLOT,
      { leagueId, slots: data },
      true
    );
    return response;
  } catch (error) {
    throw error;
  }
};

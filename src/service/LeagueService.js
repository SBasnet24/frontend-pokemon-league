import { get, post } from "../api/client";
import { ENDPOINTS } from "../api/enpoints";

export const getLeagues = async () => {
  try {
    const data = await get(ENDPOINTS.LEAGUE, {}, true);
    return data.leagues;
  } catch (error) {
    throw error;
  }
};
export const addLeague = async (data) => {
  try {
    const response = await post(ENDPOINTS.LEAGUE, data, true);
    return response.league;
  } catch (error) {
    throw error;
  }
};

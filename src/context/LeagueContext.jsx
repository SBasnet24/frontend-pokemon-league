import { createContext, useContext } from "react";
import { getLeagues } from "../service/LeagueService";
import { useReducer } from "react";

export const LEAGUES_TYPE = {
  GET_LEAGUES: "GET_LEAGUES",
  SET_LOADING: "SET_LOADING",
};

const initialState = {
  leagues: [],
  isLoading: false,
};

const LeagueContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case LEAGUES_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LEAGUES_TYPE.GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const useLeagueContext = () => useContext(LeagueContext);

export const LeagueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllLeagues = async () => {
    setLoading();
    const data = await getLeagues();
    dispatch({
      type: LEAGUES_TYPE.GET_LEAGUES,
      payload: data,
    });
  };
  const setLoading = () => dispatch({ type: LEAGUES_TYPE.SET_LOADING });

  const { leagues, isLoading } = state;
  return (
    <LeagueContext.Provider value={{ leagues, isLoading, getAllLeagues }}>
      {children}
    </LeagueContext.Provider>
  );
};

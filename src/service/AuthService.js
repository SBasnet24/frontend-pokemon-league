import { post } from "../api/client";
import { ENDPOINTS } from "../api/enpoints";

export const login = async ({ username, password }) => {
  try {
    const { token, trainer } = await post(
      ENDPOINTS.LOGIN,
      {
        username,
        password,
      },
      false
    );
    return { token, trainer };
  } catch (error) {
    throw error;
  }
};
export const registerTrainer = async ({ username, password }) => {
  try {
    const { token, trainer } = await post(
      ENDPOINTS.REGISTER,
      {
        username,
        password,
      },
      false
    );
    return { token, trainer };
  } catch (error) {
    throw error;
  }
};

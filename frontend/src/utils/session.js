import axiosInstance from "../services/axios";

export const setSession = (accessToken, refreshToken = null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    removeSessionTokens();
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const resetSession = () => {
  removeSessionTokens();
  localStorage.removeItem("refreshToken");
};

const removeSessionTokens = () => {
  localStorage.removeItem("accessToken");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

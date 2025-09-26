import jwt_decode from "jwt-decode";

export const validateToken = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwt_decode(token);
    if (!decodedToken.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return now < decodedToken.exp;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
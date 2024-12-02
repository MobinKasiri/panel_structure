import Cookies from "js-cookie";
import { LocalNames } from "../constant/local_enums";

export const makeDateFromNow = (expireDurationInSeconds: number) => {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + 1000 * expireDurationInSeconds;
  now.setTime(expireTime);
  return now;
};

export const accessTokenExist = () => {
  return Boolean(Cookies.get(LocalNames.token));
};

export const getToken = (): string | null => {
  return (
    Cookies.get(LocalNames.token) ?? sessionStorage.getItem(LocalNames.token)
  );
};

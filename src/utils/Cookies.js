import Cookies from "js-cookie";

export const setUserCookies = (newUserData) => {  

    Cookies.set('token', newUserData.token, { expires: 1 });
   
};

export const clearUserCookies = () => {
  Cookies.remove("token");
};

export const getUserCookies = () => {
  return {
    token: Cookies.get("token"),
  };
};

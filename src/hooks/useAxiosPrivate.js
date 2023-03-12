import React, { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        // check if this is first attempt or not, if the headers doesn't exist, then it's first attempt
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        // check if we had error in prev req
        // if so then it's time for new access token
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // create new access token
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          return axiosPrivate({
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
            sent: true,
          });
        }
        return Promise.reject(error);
      }
    );

    // prevent many request intercept if we didn't remove them with these cleanup func
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;

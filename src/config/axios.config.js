import axios from "axios";
import { getNameByUsername } from "../utils/utils";

let AUTH_TOKEN = JSON.parse(window.localStorage.getItem("userMe"))?.tk;

const instance = axios.create({
  baseURL: "https://dev-mgmt.beije.it/",
  //"http://localhost:8080/mgmt/",
  headers: {
    Authorization: "Bearer " ,
  },
});

export async function imagesApi(resource, imageObj, method) {
  return await instance(resource, { data: imageObj, method })
    .then((response) => response.data)
    .catch((error) => error);
}

export async function uploadDoc(resource, docObj, method) {
  return await instance(resource, {
    data: docObj,
    method,
    // responseType: "blob",
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
    .then((response) => response.data)
    .catch((error) => error);
}

export async function uploadLink(resource, obj, method) {
  return await instance(resource, {
    data: obj,
    method
  })
}

function setUserMe(response) {
  window.localStorage.setItem("userMe", JSON.stringify({
    tk: response.token,
    refreshToken: response.refreshToken,
    name: getNameByUsername(response.username) || "utente",
    permission: response.authorityList
  }))
}

function handleSuccess(response) {
  if (response.config.url.includes("signin")) {
    setUserMe(response.data)
    instance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  }

  return response;
}

function handleError(error) {
  const { config, response } = error;
  return new Promise(async (resolve, reject) => {
    if (
      response?.status === 401 &&
      !config.url.includes("signin") &&
      !config.url.includes("updateAuthToken")
    ) {
      try {
        const refreshToken = JSON.parse(window.localStorage.getItem("userMe")?.refreshToken);

        const { data } = await instance.post("/updateAuthToken", {refreshToken});
        const userMeCopy = JSON.parse(window.localStorage.getItem("userMe"));
        window.localStorage.setItem("userMe", JSON.stringify({ ...userMeCopy, tk: data.token }));

        instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        await axios.request(config);
        resolve();
      } catch {
        window.localStorage.clear();
        window.location.href = "/login";
        console.log("Unauthorized");
        reject(error);
      }
    }
    reject(error);
  });
}

function handleRequest(config) {
  const token = JSON.parse(window.localStorage.getItem("userMe"))?.tk;
  if (token && config.headers.Authorization === "") {
    config.headers.Authorization = `Bearer ${token}`;
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
}

instance.interceptors.response.use(handleSuccess, handleError);

instance.interceptors.request.use(handleRequest);

export default instance;

import axios from "axios";

export const api = axios.create({
  baseURL: "https://randomuser.me/api",
  headers: {
    "Content-type": "application/json"
  }
});

export const fetchPopulationData = (seed: string, resultsPerPage: number, page: number, nationality: string, ) => {
    api.get(`/?seed=${seed}&page=${page}&results=${resultsPerPage}&nat=${nationality}&exc=login`)
    .then((response) => (response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
};

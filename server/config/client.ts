import {
  ACCEPT_ENCODING_HEADER,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
} from "@/lib/constants";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const clientConfig: AxiosRequestConfig = {
  timeout: 8000,
  // baseURL: SRC_BASE_URL,
  headers: {
    Accept: ACCEPT_HEADER,
    "User-Agent": USER_AGENT_HEADER,
    "Accept-Encoding": ACCEPT_ENCODING_HEADER,
  },
};

const client = axios.create(clientConfig);

export { client, AxiosError };

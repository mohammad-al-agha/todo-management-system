import axios from "axios";
import { RequestType } from "../core/types/request.types";
import { localAction } from "./localAction";

export type RequestConfig = {
  method: RequestType;
  route: string;
  body?: any;
};

axios.defaults.baseURL = "http://localhost:8000";

export const request = async ({ method, route, body }: RequestConfig) => {
  const token = await localAction("token");

  try {
    const { data } = await axios({
      method,
      url: route,
      data: body,
      headers: {
        Authorization: `Bearer ${token!.value}`,
      },
    });

    return data;
  } catch (e: any) {
    const error = { message: "", status: 0 };

    if (e.response) {
      error.message = e.response.data.message;
      error.status = e.response.status;
    } else {
      error.message = e.message;
      error.status = 500;
    }

    throw error;
  }
};

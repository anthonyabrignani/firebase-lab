import axios from "axios";
import ShoutOut from "../model/ShoutOut";

const baseUrl = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("REACT_APP_API_URL environment variable not set.");
}

export function readAllShouts():Promise<ShoutOut[]> {
  return axios.get(baseUrl).then(res => res.data);
}

export function createShout(shout: ShoutOut):Promise<ShoutOut> {
  return axios.post(baseUrl, shout).then(res => res.data);
}
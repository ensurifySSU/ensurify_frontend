import client from "../../client";
import { ILoginValue } from "../types/loginTypes";


export const login = async (loginForm:ILoginValue) => {
  const response = await client.post("/users/login", {
    username: loginForm.username,
    password: loginForm.password,
  });
  return response.data;
};

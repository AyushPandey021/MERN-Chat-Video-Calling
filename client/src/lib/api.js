import { axiosInstance } from "./axios";

export const SignUp = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

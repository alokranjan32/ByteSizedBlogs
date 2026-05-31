import API from "./Axios";

export const registerUser = (data) => API.post("/register", data);

 
export const loginUser = (data) => API.post("/login", data);

 
export const logout = () => API.post("/logout");

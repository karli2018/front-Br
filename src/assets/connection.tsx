import axios from "axios";

const baseURL = "http://localhost:5000";

const administradorApi = axios.create({ baseURL });

export default administradorApi;

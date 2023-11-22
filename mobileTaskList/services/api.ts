import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.2.2:3333" // Grande parte dos IP dos emuladores, caso teste em um celu fisíco, coloque o ip dele antes do :3333
});
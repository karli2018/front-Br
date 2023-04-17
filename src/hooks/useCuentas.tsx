import axios from "axios";
import { useEffect, useState } from "react";
import administradorApi from "../assets/connection";
import { Cuentas } from "../interfaces/interfaceCuentas";

export const useCuentas = () => {
  const [cuentasState, setCuentasState] = useState<Cuentas[]>([]);
  useEffect(() => {
    loadCuentas();
  }, []);

  const loadCuentas = async () => {
    let cancelToken = axios.CancelToken.source().token;
    try {
      const resp = await administradorApi.get("/tipocuenta", { cancelToken });
      setCuentasState([...resp.data]);
      return resp.data;
    } catch (error) {}
  };
  return { cuentasState };
};

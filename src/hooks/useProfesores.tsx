import axios from "axios";
import React, { useEffect, useState } from "react";
import administradorApi from "../assets/connection";
import { Profesores } from "../interfaces/interfaceProfesores";

export const useProfesores = () => {
  const [profesoresState, setProfesoresState] = useState<Profesores[]>([]);
  useEffect(() => {
    loadprofesores();
  }, []);

  const loadprofesores = async () => {
    let cancelToken = axios.CancelToken.source().token;

    try {
      const resp = await administradorApi.get("/profesores", { cancelToken });
      setProfesoresState(resp.data);
      return resp.data;
    } catch (error) {}
  };
  const createProfesor = async (data: any) => {
    const resp = await administradorApi.post("/profesores", { ...data });
    loadprofesores();
    return resp.status;
  };
  return { profesoresState, loadprofesores, createProfesor };
};

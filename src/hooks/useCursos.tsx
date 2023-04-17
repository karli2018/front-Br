import axios from "axios";
import { useEffect, useState } from "react";
import administradorApi from "../assets/connection";
import { Cursos } from "../interfaces/interfaceCursos";

interface Props {
  id?: any | null;
}

export const useCursos = ({ id }: Props) => {
  const [cursosState, setCursosState] = useState<Cursos[]>([]);
  const [cursoState, setCursoState] = useState<Cursos>();
  useEffect(() => {
    loadCursos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCursos = async () => {
    let cancelToken = axios.CancelToken.source().token;

    try {
      if (!id) {
        const resp = await administradorApi.get("/cursos", { cancelToken });
        setCursosState(resp.data);
        return resp.data;
      } else {
        const resp = await administradorApi.get(`/cursos/${id}`, {
          cancelToken,
        });
        setCursoState(resp.data);
        return resp.data;
      }
    } catch (error) {}
  };
  const createCurso = async (data: any) => {
    let cancelToken = axios.CancelToken.source().token;

    const resp = await administradorApi.post(
      "/cursos",
      { ...data },
      { cancelToken }
    );
    loadCursos();
    return resp.status;
  };
  const updateCurso = async (data: any, id: string | undefined) => {
    const resp = await administradorApi.put(`/cursos/${id}`, { ...data });
    loadCursos();
    return resp.status;
  };
  const deleteCurso = async (idCurso: any) => {
    const resp = await administradorApi.delete(`/cursos/${idCurso}`);
    loadCursos();
    return resp.status;
  };
  return {
    cursosState,
    cursoState,
    loadCursos,
    createCurso,
    updateCurso,
    deleteCurso,
  };
};

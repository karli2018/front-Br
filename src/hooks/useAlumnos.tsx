import React, { useCallback, useEffect, useState } from "react";
import administradorApi from "../assets/connection";
import { Alumnos } from "../interfaces/interfaceAlumnos";
import { useCursos } from "./useCursos";
import { Cursos } from "../interfaces/interfaceCursos";
import axios from "axios";

interface Props {
  id?: any | null;
}
interface AlumnoSearch {
  nombre: string;
  identificacion: string;
}
const alumnosSearchInitial: AlumnoSearch = {
  nombre: "",
  identificacion: "",
};
export const useAlumnos = ({ id }: Props) => {
  const [AlumnosState, setAlumnosState] = useState<Alumnos[]>([]);
  const [AlumnoState, setAlumnoState] = useState<Alumnos>();
  const { cursosState } = useCursos({});
  const [search, setSearch] = useState<AlumnoSearch>(alumnosSearchInitial);
  const [alunosFilterState, setAlunosFilterState] = useState<Alumnos[]>([]);

  const loadAlumnos = useCallback(async () => {
    let cancelToken = axios.CancelToken.source().token;
    try {
      if (!id) {
        const resp = await administradorApi.get("/alumnos", { cancelToken });
        setAlumnosState([...resp.data]);
        return resp.data;
      } else {
        const resp = await administradorApi.get(`/alumnos/${id}`, {
          cancelToken,
        });
        setAlumnoState(resp.data);
        return resp.data;
      }
    } catch (error) {}
  }, [id]);

  const filteredInfo = useCallback(() => {
    if (search.nombre.length === 0 && search.identificacion.length === 0) {
      setAlunosFilterState([...AlumnosState]);
    } else if (
      search.nombre.length !== 0 &&
      search.identificacion.length === 0
    ) {
      setAlunosFilterState([
        ...AlumnosState.filter((alumno) =>
          fullName(alumno).includes(search.nombre)
        ),
      ]);
    } else if (
      search.nombre.length === 0 &&
      search.identificacion.length !== 0
    ) {
      setAlunosFilterState(
        AlumnosState.filter((alumno) =>
          alumno.identificacion.includes(search.identificacion)
        )
      );
    } else {
      return AlumnosState.filter(
        (alumno) =>
          fullName(alumno).includes(search.nombre) &&
          alumno.identificacion.includes(search.identificacion)
      );
    }
  }, [AlumnosState, search.identificacion, search.nombre]);

  useEffect(() => {
    loadAlumnos();
  }, [loadAlumnos]);

  useEffect(() => {
    filteredInfo();
  }, [filteredInfo]);

  const fullName = (alumnos: Alumnos | undefined) => {
    return (
      alumnos?.primer_Nombre +
      " " +
      (alumnos?.segundo_Nombre ? alumnos.segundo_Nombre : "") +
      " " +
      alumnos?.primer_Apellido +
      " " +
      alumnos?.segundo_Apellido
    );
  };
  const createAlumnosCursos = async (data: any) => {
    let cancelToken = axios.CancelToken.source().token;

    try {
      const resp = await administradorApi.post(
        "/alumnosCursos",
        { ...data },
        { cancelToken }
      );
      loadAlumnos();
      return resp.status;
    } catch (error) {}
  };
  const createAlumno = async (data: any) => {
    const resp = await administradorApi.post("/alumnos", { ...data });
    loadAlumnos();
    return resp.status;
  };

  const updateAlumno = async (data: any, id: string | undefined) => {
    const resp = await administradorApi.put(`/alumnos/${id}`, { ...data });
    loadAlumnos();
    return resp.status;
  };
  const deleteAlumno = async (idalumno: any) => {
    const resp = await administradorApi.delete(`/alumnos/${idalumno}`);

    setAlumnosState([...AlumnosState.filter((value) => value.id !== idalumno)]);
    return resp.status;
  };
  const deleteAlumnoCurso = async (idalumno: any) => {
    const resp = await administradorApi.delete(`/alumnosCursos/${idalumno}`);
    await loadAlumnos();
    return resp.status;
  };

  const onSearchName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, nombre: target.value.toLowerCase() });
  };

  const onSearchId = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, identificacion: target.value });
  };

  const AlumnoCursoNoRep = (): Cursos[] => {
    if (AlumnoState) {
      const cursosAlumno = AlumnoState.Alumno_cursos.map(
        (alumnoCurso) => alumnoCurso.Curso
      );

      return cursosState.filter(
        (curso) => !cursosAlumno.find((e) => e.id === curso.id)
      );
    }
    return cursosState;
  };
  return {
    AlumnosState,
    fullName,
    AlumnoState,
    alunosFilterState,
    loadAlumnos,
    createAlumnosCursos,
    createAlumno,
    deleteAlumno,
    deleteAlumnoCurso,
    filteredInfo,
    updateAlumno,
    onSearchName,
    onSearchId,
    AlumnoCursoNoRep,
  };
};

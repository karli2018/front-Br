import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import administradorApi from "../assets/connection";
import { Profesores } from "../interfaces/interfaceProfesores";

interface Login {
  user: string;
  pass: string;
}
interface Props {
  id?: any | null;
}

interface ProfesorSearch {
  nombre: string;
}

const profesoresSearchInitial: ProfesorSearch = {
  nombre: "",
};

export const useProfesores = ({ id }: Props) => {
  const [profesoresState, setProfesoresState] = useState<Profesores[]>([]);
  const [search, setSearch] = useState<ProfesorSearch>(profesoresSearchInitial);
  const [profesoresFilterState, setProfesoresFilterState] = useState<Profesores[]>([]);
  useEffect(() => {
    loadprofesores();
  }, []);

  const loadprofesores = async () => {
    let cancelToken = axios.CancelToken.source().token;

    try {
      const resp = await administradorApi.get("/usuarios", { cancelToken });
      setProfesoresState(resp.data);
      return resp.data;
    } catch (error) {}
  };
  const createProfesor = async (data: any) => {
    const resp = await administradorApi.post("/usuarios", { ...data });
    loadprofesores();
    return resp.status;
  };

  const filteredInfo = useCallback(() => {
    if(search.nombre.length === 0) {
      setProfesoresFilterState([...profesoresState]);
    } else {
        profesoresState.filter(
          (profesor) => 
            //return profesor.nombre.toLowerCase().includes(search.nombre.toLowerCase());
            profesor.nombre.includes(search.nombre)
        );
    }
  }, [profesoresState, search.nombre]);

  const deleteProfesor = async (idprofesor: any) => {
    const resp = await administradorApi.delete(`/profesores/${idprofesor}`);
    setProfesoresState([...profesoresState.filter((value) => value.id !== idprofesor)]);
    return resp.status;
  };

  const onSearchName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, nombre: target.value.toLowerCase() });
  };

  const loginP = async(data:Login) => {
try {
      const resp = await administradorApi.post('/profesoresLog', data);
      return resp.data;
} catch (error) {
  console.log(error);
}
  };


  return { 
    profesoresState,
     profesoresFilterState,
     loadprofesores,
     createProfesor,
     deleteProfesor,
     onSearchName, 
     loginP
    };
};

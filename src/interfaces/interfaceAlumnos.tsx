import { Cursos } from "./interfaceCursos";

export interface Alumnos {
  id: number;
  primer_Nombre: string;
  segundo_Nombre: string;
  primer_Apellido: string;
  segundo_Apellido: string;
  identificacion: string;
  id_usuario: number;
  createdAt: string;
  updatedAt: string;
  Alumno_cursos: AlumnoCurso[];
}

export interface AlumnoCurso {
  id: number;
  Curso: Cursos;
}

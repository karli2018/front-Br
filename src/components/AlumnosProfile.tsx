import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CursosTable } from "./CursosTable";
import { NewAlumnoCurso } from "./forms/NewAlumnoCurso";
import { useAlumnos } from "../hooks/useAlumnos";
import { AlumnosCursosTable } from "./AlumnosCursosTable";

export const AlumnosProfile = () => {
  const params = useParams();
  const { AlumnoState, fullName } = useAlumnos({
    id: params.idUser,
  });
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <section className="page">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={2}>Informacion de Alumno</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nombre</td>
            <td>{fullName(AlumnoState)}</td>
          </tr>
          <tr>
            <td>identificacion</td>
            <td>{AlumnoState?.identificacion}</td>
          </tr>
        </tbody>
      </Table>
      <h2>Cursos registrados</h2>
      <AlumnosCursosTable data={AlumnoState?.Alumno_cursos} del />
      <NewAlumnoCurso submit={() => navigate("/Alumnos")} />
    </section>
  );
};

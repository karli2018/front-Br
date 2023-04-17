import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as IconEdit } from "../assets/img/editarimg.svg";
import { ReactComponent as IconDel } from "../assets/img/eliminarimg.svg";
import { useAlumnos } from "../hooks/useAlumnos";
import { Alumnos } from "../interfaces/interfaceAlumnos";
import { ButtonCreate } from "./ButtonCreate";
import { FilterButton } from "./FilterButton";

interface Props {
  del?: boolean;
  edit?: boolean;
  onClickEdit?: () => void;
  onClickDel?: () => void;
}

export const AlumnosTable = ({
  del,
  edit,
  onClickEdit = () => {},
  onClickDel = () => {},
}: Props) => {
  const {
    fullName,
    deleteAlumno,
    onSearchName,
    onSearchId,
    alunosFilterState,
  } = useAlumnos({});
  const [dataState, setDataState] = useState<Alumnos[]>([]);
  const navigate = useNavigate();

  return (
    <>
      <ButtonCreate
        tittle="Crear alumno"
        onClick={() => navigate("/NewAlumno")}
      />
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese el nombre"
          onChange={onSearchName}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>identificacion</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese la identificacion"
          onChange={onSearchId}
        />
      </Form.Group>
      <FilterButton size="50px" />
      <Table variant="dark" hover className="table-edit">
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>identificación</th>
            {edit && <th>Editar</th>}
            {del && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {alunosFilterState.map((item, i) => (
            <tr key={i}>
              <td>
                <Link to={`/AlumnoProfile/${item.id}`} className="link-tabla">
                  {fullName(item)}
                </Link>
              </td>
              <td>{item.identificacion}</td>
              {edit && (
                <td>
                  <IconEdit
                    width={25}
                    onClick={() => {
                      onClickEdit();
                      navigate(`/AlumnoUpdate/${item.id}`);
                    }}
                  />
                </td>
              )}
              {del && (
                <td>
                  <IconDel
                    width={25}
                    onClick={() => {
                      onClickDel();
                      deleteAlumno(item.id);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

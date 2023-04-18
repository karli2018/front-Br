import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as IconEdit } from "../assets/img/editarimg.svg";
import { ReactComponent as IconDel } from "../assets/img/eliminarimg.svg";
import { useProfesores } from "../hooks/useProfesores";
import { Profesores } from "../interfaces/interfaceProfesores";
import { ButtonCreate } from "./ButtonCreate";
import { FilterButton } from "./FilterButton";

interface Props {
  del?: boolean;
  edit?: boolean;
  onClickEdit?: () => void;
  onClickDel?: () => void;
}

export const ProfesoresTable = ({
  del,
  edit,
  onClickEdit = () => {},
  onClickDel = () => {},
}: Props) => {
  const {
    // fullName,
    deleteProfesor,
    onSearchName,
    // onSearchId,
    profesoresFilterState,
  } = useProfesores({});
  const [dataState, setDataState] = useState<Profesores[]>([]);
  const navigate = useNavigate();

  return (
    <>
      {/* <ButtonCreate
        tittle="Crear estudiante"
        onClick={() => navigate("/NewAlumno")}
      /> */}
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese el nombre"
          onChange={onSearchName}
        />
      </Form.Group>
      <FilterButton size="50px" />
      <Table variant="dark" hover className="table-edit">
        <thead>
          <tr>
            <th>Nombre Profesor</th>
            <th>identificación</th>
            {edit && <th>Editar</th>}
            {del && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {profesoresFilterState.map((item, i) => (
            <tr key={i}>
              <td>
                <Link to={`/AlumnoProfile/${item.id}`} className="link-tabla">
                  {item.nombre}
                </Link>
              </td>
              <td>{item.email}</td>
              {edit && (
                <td>
                  <IconEdit
                    width={25}
                    onClick={() => {
                      onClickEdit();
                      navigate(`/ProfesorUpdate/${item.id}`);
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
                      deleteProfesor(item.id);
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

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ReactComponent as IconEdit } from "../assets/img/editarimg.svg";
import { ReactComponent as IconDel } from "../assets/img/eliminarimg.svg";
import { AlumnoCurso } from "../interfaces/interfaceAlumnos";
import { useAlumnos } from "../hooks/useAlumnos";
import { useNavigate } from "react-router-dom";
interface Props {
  data?: AlumnoCurso[];
  del?: boolean;
  edit?: boolean;
  onClickEdit?: () => void;
  onClickDel?: () => void;
}

export const AlumnosCursosTable = ({
  data = [],
  del,
  edit,
  onClickDel,
  onClickEdit,
}: Props) => {
  const { deleteAlumnoCurso } = useAlumnos({});
  const [dataState, setDataState] = useState<AlumnoCurso[]>([]);
  useEffect(() => {
    setDataState([...data]);
  }, [data]);

  const navigate = useNavigate();
  return (
    <Table variant="dark" hover className="table-edit">
      <thead>
        <tr>
          <th>Nombre del Curso</th>
          <th>Codigo</th>
          <th>Creditos</th>
          {edit && <th>Editar</th>}
          {del && <th>Eliminar</th>}
        </tr>
      </thead>
      <tbody>
        {dataState?.map((item) => (
          <tr>
            <td> {item.Curso.curso}</td>
            <td>{item.Curso.codigo}</td>
            <td>{item.Curso.creditos}</td>
            {edit && (
              <td>
                <IconEdit width={25} onClick={onClickEdit} />
              </td>
            )}
            {del && (
              <td>
                <IconDel
                  width={25}
                  onClick={() => {
                    deleteAlumnoCurso(item.id);
                    navigate("/Alumnos");
                  }}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

import { Table } from "react-bootstrap";
import { ReactComponent as IconEdit } from "../assets/img/editarimg.svg";
import { ReactComponent as IconDel } from "../assets/img/eliminarimg.svg";
import { FilterButton } from "./FilterButton";
import { ButtonCreate } from "./ButtonCreate";
import { useNavigate } from "react-router-dom";
import { useCursos } from "../hooks/useCursos";
interface Props {
  del?: boolean;
  edit?: boolean;
  onClickEdit?: () => void;
  onClickDel?: () => void;
}

export const CursosTable = ({
  del,
  edit,
  onClickDel = () => {},
  onClickEdit,
}: Props) => {
  const navigate = useNavigate();
  const { cursosState, deleteCurso } = useCursos({});
  return (
    <>
      <ButtonCreate
        tittle="Crear curso"
        onClick={() => navigate("/NewCurso")}
      />
      <FilterButton size="50px" />
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
          {cursosState.map((item) => (
            <tr>
              <td> {item.curso}</td>
              <td>{item.codigo}</td>
              <td>{item.creditos}</td>
              {edit && (
                <td>
                  <IconEdit
                    width={25}
                    onClick={() => {
                      navigate(`/CursoUpdate/${item.id}`);
                    }}
                  />
                </td>
              )}
              {del && (
                <td>
                  <IconDel
                    width={25}
                    onClick={() => {
                      deleteCurso(item.id);
                      onClickDel();
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

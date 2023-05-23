import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAlumnos } from "../../hooks/useAlumnos";

type Inputs = {
  addCurso: string;
};
interface Props {
  submit: () => void;
}

export const NewAlumnoCurso = ({ submit }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const params = useParams();
  const { createAlumnosCursos, AlumnoCursoNoRep } = useAlumnos({
    id: params.idUser,
  });
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createAlumnosCursos({ ...data, alumno: params.idUser });
    authState.user?.idCuenta === 2 ? navigate("/"): submit();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method={"post"} className="login">
      <Form.Group>
        <Form.Label>Cursos disponibles</Form.Label>
        <Form.Select
          {...register("addCurso", {
            required: true,
            validate: (value) => parseInt(value) !== 0,
          })}
        >
          <option value="0">Seleccione una opcion</option>
          {AlumnoCursoNoRep().map((item) => (
            <option value={item.id}>{item.curso}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button type="submit" className="boton">
        Registrar
      </Button>
    </Form>
  );
};

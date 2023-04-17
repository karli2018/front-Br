import { useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useCursos } from "../../hooks/useCursos";
import { useNavigate, useParams } from "react-router-dom";

type Inputs = {
  curso: string;
  codigo: string;
  creditos: number;
};
interface Props {
  update?: boolean;
}

export const NewCurso = ({ update }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const { authState } = useContext(AuthContext);
  const params = useParams();
  const { createCurso, cursoState } = useCursos({ id: params.id });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createCurso({ ...data });
    navigate("/Cursos");
  };
  useEffect(() => {
    if (cursoState?.id) {
      setValue("curso", cursoState?.curso);
      setValue("codigo", cursoState?.codigo);
      setValue("creditos", cursoState?.creditos);
    }
  }, [cursoState, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method={"post"} className="login">
      <Form.Group>
        <Form.Label>Nombre del Curso</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese nombre de curso"
          {...register("curso", { required: true })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Codigo</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese el codigo"
          {...register("codigo", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>creditos</Form.Label>
        <Form.Control
          type="number"
          placeholder="ingrese el numero de creditos"
          {...register("creditos", {
            required: true,
          })}
        />
      </Form.Group>
      <Button type="submit" className="boton">
        {authState.isLogged ? "Registrar" : "Enviar"}
      </Button>
    </Form>
  );
};

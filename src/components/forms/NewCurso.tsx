import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
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
  const { register, formState: { errors}, handleSubmit, setValue } = useForm<Inputs>();
  const { authState } = useContext(AuthContext);
  const params = useParams();
  const { createCurso, cursoState, updateCurso } = useCursos({ id: params.id });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if(update) {
      console.log('a actualizar');
     const response = await updateCurso( {...data}, params.id);
     console.log('update'+response);
     
    } else {
      const response = await createCurso({ ...data });
      console.log(response);
      
      if(response === 200) {
        
        toast.success("El curso se creó correctamente", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
      }

    }
    setTimeout(() => {
      navigate("/Cursos");
    }, 2000);
  };
  useEffect(() => {
    if (cursoState?.id) {
      setValue("curso", cursoState?.curso);
      setValue("codigo", cursoState?.codigo);
      setValue("creditos", cursoState?.creditos);
    }
  }, [cursoState, setValue]);

  return (
    <>
      <ToastContainer />
        <Form onSubmit={handleSubmit(onSubmit)} method={"post"} className="login">
          <Form.Group>
            <Form.Label>Nombre del Curso</Form.Label>
            <Form.Control
              type="text"
              placeholder="ingrese nombre de curso"
              {...register("curso", { 
                required: true,
                pattern: /^[A-Za-z0-9\s]+$/
              })}
            />
          {errors.curso?.type === 'pattern' && <p className="messages">Ingrese solo letras y números</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="ingrese una breve descripción del curso"
              {...register("codigo", {
                required: true,
                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s.,]+$/
              })}
            />
            {errors.codigo?.type === 'pattern' && <p className="messages">Solo se permiten letras, puntos, comas y espacios.</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>creditos</Form.Label>
            <Form.Control
              type="number"
              placeholder="ingrese el numero de creditos"
              {...register("creditos", {
                required: false,
              })}
            />
          </Form.Group>
          <Button type="submit" className="boton">
            {authState.isLogged ? "Registrar" : "Enviar"}
          </Button>
        </Form>
    </>
  );
};

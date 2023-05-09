import React, { useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useAlumnos } from "../../hooks/useAlumnos";
import { useNavigate, useParams } from "react-router-dom";
type Inputs = {
  fname: string;
  sname?: string;
  flastname: string;
  slastname: string;
  identificacion: string;
  correo: string;
  usuario: string;
  contrasena: string;
};
interface Props {
  update?: boolean;
}
export const NewAlumno = ({ update }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const { authState } = useContext(AuthContext);
  const params = useParams();
  const { createAlumno, AlumnoState, updateAlumno } = useAlumnos({
    id: params.idUser,
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    update
      ? updateAlumno({ ...data, idUser: AlumnoState?.Usuario?AlumnoState.Usuario.id:null}, params?.idUser)
      : createAlumno({ ...data });
    navigate("/Alumnos");
  };

  useEffect(() => {
    if (AlumnoState?.id) {
      setValue("fname", AlumnoState.primer_Nombre);
      setValue("sname", AlumnoState.segundo_Nombre);
      setValue("flastname", AlumnoState.primer_Apellido);
      setValue("slastname", AlumnoState.segundo_Apellido);
      setValue("identificacion", AlumnoState.identificacion);
      if(AlumnoState.Usuario)
      {
        setValue("correo", AlumnoState.Usuario.email);
        setValue("usuario", AlumnoState.Usuario.usuario);
      }
    }
  }, [AlumnoState, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method={"post"} className="login">
      <Form.Group>
        <Form.Label>Primer nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su nombre"
          {...register("fname", {
            required: true,
          })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Segundo nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su segundo nombre"
          {...register("sname", {})}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Primer apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su primer apellido"
          {...register("flastname", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Segundo apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su segundo apellido"
          {...register("slastname", { required: true })}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Numero de identificacion</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su identificacion"
          {...register("identificacion", { required: true })}
        />
      </Form.Group>
      
      <Form.Group>
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese correo"
          {...register("correo", {})}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese usuario"
          {...register("usuario", {})}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="ingrese contraseña"
          {...register("contrasena", {})}
        />
      </Form.Group>

      <Button type="submit" className="boton">
        {authState.isLogged ? "Registrar" : "Enviar"}
      </Button>
    </Form>
  );
};

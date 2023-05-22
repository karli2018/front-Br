import React, { useContext, useEffect } from "react";
import "../../App.css";
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
  const { register, formState: { errors},
   handleSubmit, setValue } = useForm<Inputs>();
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
          placeholder="Ingrese su nombre"
          {...register("fname", {
            required: true,
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Solo letras"
            }
          })}
        />
        {errors.fname?.type === 'pattern' && <p className="messages">Ingrese solo letras</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Segundo nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su segundo nombre"
          {...register("sname", {
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Solo letras"
            }
          })}
        />
        {errors.sname?.type === 'pattern' && <p className="messages">Ingrese solo letras</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Primer apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su primer apellido"
          {...register("flastname", {
            required: true,
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Ingrese solo letras"
            }
          })}
        />
        {errors.flastname?.type === 'pattern' && <p className="messages">Ingrese solo letras</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Segundo apellido</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su segundo apellido"
          {...register("slastname", { 
            required: true,
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Ingrese solo letras"
            }
           })}
        />
        {errors.slastname?.type === 'pattern' && <p className="messages">Ingrese solo letras</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Numero de identificacion</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su identificacion"
          {...register("identificacion", { required: true, maxLength: 10 })}
        />
        {errors.identificacion?.type === 'required' && <p className="messages" >Número de identificación es requerido</p>}
        {errors.identificacion?.type === 'maxLength' && <p className="messages" >Número de máximo 10 dígitos</p>}
      </Form.Group>
      
      <Form.Group>
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese correo"
          {...register("correo", {
            pattern: {
              value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}/,
              message: "Correo inválido"
            }

          })}
        />
        {errors.correo?.type === 'pattern' && <p className="messages">Correo inválido</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese usuario"
          {...register("usuario", {
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: "Ingrese solo letras"
            }
          })}
        />
        {errors.usuario?.type === 'pattern' && <p className="messages">Ingrese solo letras, números y guiones bajos</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese contraseña"
          {...register("contrasena", {
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
              message: "Debe contener más de 8 caracteres, almenos 1 minuscula, mayuscula, número y caracter especial"
            }
          })}
        />
        {errors.contrasena?.type === "pattern" && <p className="messages">Debe contener más de 8 caracteres, almenos 1 minuscula, mayuscula, número y caracter especial</p>}
      </Form.Group>

      <Button type="submit" className="boton">
        {authState.isLogged ? "Registrar" : "Enviar"}
      </Button>
    </Form>
  );
};

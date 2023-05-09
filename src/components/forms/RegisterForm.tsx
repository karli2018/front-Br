import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useCuentas } from "../../hooks/useCuentas";
import { useProfesores } from "../../hooks/useProfesores";
import { useNavigate } from "react-router-dom";

type Inputs =
  | {
      user: string;
      pass: string;
      email: string;
      name: string;
      confirm: string;
      acountType: string;
    }
  | { user: string; pass: string };

export const RegisterForm = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const { authState, singIn } = useContext(AuthContext);
  const { cuentasState } = useCuentas();
  const { createProfesor } = useProfesores({});
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (authState.isLogged) {
      createProfesor({ ...data });
      navigate("/");
    } else {
      console.log(authState);
      singIn(data);
    }
  };
  const validatePassword = (value: string) => {
    return watch("pass") === value;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method={"post"} className="login">
      <Form.Group>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="ingrese su usuario"
          {...register("user", { required: true })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="ingrese su contraseña"
          {...register("pass", {
            required: true,
            minLength: 6,
          })}
        />
      </Form.Group>
      {authState.isLogged && (
        <>
          <Form.Group>
            <Form.Label>Confirmar la contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="ingrese su contraseña"
              {...register("confirm", {
                required: true,
                minLength: 6,
                validate: validatePassword,
              })}
            />
            <Form.Text>Ingrese la de nuevo la contraseña</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="ingrese su nombre"
              {...register("name", { required: true })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="ingrese su email"
              {...register("email", { required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de rol</Form.Label>
            <Form.Select
              {...register("acountType", {
                required: true,
                validate: (value) => parseInt(value) !== 0,
              })}
            >
              <option value={0}>Seleccione una opción</option>
              {cuentasState.length > 0 &&
                cuentasState.filter((item)=> item.id == 1).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.cuenta}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </>
      )}

      <Button type="submit" className="boton">
        {authState.isLogged ? "Registrar" : "Enviar"}
      </Button>
    </Form>
  );
};

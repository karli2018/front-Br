import { useNavigate } from "react-router-dom";
import { AlumnosTable } from "./AlumnosTable";
import { FilterButton } from "./FilterButton";
import { ButtonCreate } from "./ButtonCreate";
import { useAlumnos } from "../hooks/useAlumnos";
import { Form } from "react-bootstrap";

export const AlumnosPage = () => {
  return (
    <section className="page">
      <AlumnosTable edit del />
    </section>
  );
};

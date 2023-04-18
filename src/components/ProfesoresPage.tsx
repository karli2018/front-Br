import { useNavigate } from "react-router-dom";
import { ProfesoresTable } from "./ProfesoresTable";
import { FilterButton } from "./FilterButton";
import { ButtonCreate } from "./ButtonCreate";
import { useAlumnos } from "../hooks/useAlumnos";
import { Form } from "react-bootstrap";

export const ProfesoresPage = () => {
  return (
    <section className="page">
      <ProfesoresTable edit del />
    </section>
  );
};

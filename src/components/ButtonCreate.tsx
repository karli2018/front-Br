import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  onClick?: () => void;
  tittle: string;
}

export const ButtonCreate = ({ onClick, tittle }: Props) => {
  return (
    <Button variant="primary" onClick={onClick} className={"boton-largo"}>
      {tittle}
    </Button>
  );
};

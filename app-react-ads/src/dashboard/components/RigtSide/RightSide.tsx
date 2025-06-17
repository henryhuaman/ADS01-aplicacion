import React from "react";
import BasicTable from "../Table/Table"; // Importa la tabla
import "./RightSide.css";

interface RightSideProps {
  setSelectedSolicitud: (solicitud: any) => void;
}

const RightSide: React.FC<RightSideProps> = ({ setSelectedSolicitud }) => {
  return (
    <div className="RightSide">
      <div className="tableContainer">
        <BasicTable setSelectedSolicitud={setSelectedSolicitud} />
      </div>
    </div>
  );
};

export default RightSide;

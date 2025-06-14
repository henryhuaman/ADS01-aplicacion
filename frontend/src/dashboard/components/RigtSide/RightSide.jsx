import React from "react";
import BasicTable from "../Table/Table"; // Importa la tabla
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="tableContainer">
        <BasicTable />
      </div>
    </div>
  );
};

export default RightSide;
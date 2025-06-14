import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./Table.css";

function createData(idSolicitud, fechaSolicitud, documentoSolicitado) {
  return { idSolicitud, fechaSolicitud, documentoSolicitado };
}

const rows = [
  createData("#1000006", "19/05/2025", "Diferencia curricular"),
  createData("#1000005", "19/05/2025", "Causal académico"),
  createData("#1000004", "18/05/2025", "Diferencia curricular"),
  createData("#1000003", "18/05/2025", "Causal académico"),
  createData("#1000002", "17/05/2025", "Diferencia curricular"),
  createData("#1000001", "16/05/2025", "Causal académico"),
  createData("#1000000", "16/05/2025", "Diferencia curricular"),
  createData("#10005", "16/05/2025", "Causal académico"),
  createData("#10003", "16/05/2025", "Diferencia curricular"),
  createData("#10004", "16/05/2025", "Causal académico"),
  createData("#10006", "16/05/2025", "Diferencia curricular"),
  createData("#10000", "16/05/2025", "Causal académico"),
  createData("#1000", "16/05/2025", "Diferencia curricular"),
  
  
];

const makeStyle = (documentoSolicitado) => {
  if (documentoSolicitado === "Diferencia curricular") {
    return {
      background: "rgba(255, 99, 71, 0.2)", // Rojo coral claro
      color: "#ff6347", // Rojo coral
      border: "1px solid #ff6347",
      fontWeight: "500",
    };
  } else {
    return {
      background: "rgba(30, 144, 255, 0.2)", // Azul dodger claro
      color: "#1e90ff", // Azul dodger
      border: "1px solid #1e90ff",
      fontWeight: "500",
    };
  }
};

export default function BasicTable() {
  const [selectedRow, setSelectedRow] = React.useState(null);

  return (
    <div className="Table">
      <h3>Seleccionar Solicitud</h3>
      {/* Nuevas cajas de información del estudiante */}
      <div className="student-info-container">
        <div className="info-box">
          <Typography variant="subtitle1">Nombre:</Typography>
          <Typography variant="body1" className="info-text">Juan Pérez</Typography>
        </div>
        <div className="info-box">
          <Typography variant="subtitle1">Código:</Typography>
          <Typography variant="body1" className="info-text">202310045</Typography>
        </div>
        <div className="info-box">
          <Typography variant="subtitle1">Curso:</Typography>
          <Typography variant="body1" className="info-text">Geografia</Typography>
        </div>
      </div>
      <div className="tableContainer-inner">
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem",
      width: "100%", /* Asegura que ocupe el 100% */
      overflowX: "auto" /* Scroll horizontal en móviles */ }}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID Solicitud</TableCell>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Documento Solicitado</TableCell>
                <TableCell align="left">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
                {rows.map((row) => (
                  <TableRow
                    key={row.idSolicitud}
                    onClick={() => setSelectedRow(row.idSolicitud)}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: selectedRow === row.idSolicitud ? "rgba(74, 20, 140, 0.1)" : "inherit",
                      borderLeft: selectedRow === row.idSolicitud ? "3px solid #4a148c" : "none",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        cursor: "pointer"
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idSolicitud}
                    </TableCell>
                    <TableCell align="left">{row.fechaSolicitud}</TableCell>
                    <TableCell align="left">
                      <span className="status" style={makeStyle(row.documentoSolicitado)}>
                        {row.documentoSolicitado}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="Details">
                      {selectedRow === row.idSolicitud ? "Seleccionado" : "Seleccionar"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
      </div>
    </div>
  );
}
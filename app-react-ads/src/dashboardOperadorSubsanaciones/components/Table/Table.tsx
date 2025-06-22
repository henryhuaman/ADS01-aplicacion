import * as React from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./Table.css";

interface BasicTableProps {
  setSelectedSolicitud: (solicitud: any) => void;
}

interface SolicitudData {
  idSolicitud: number;
  fechaSolicitudEgresado: string;
  descripcion: string;
  estudiante: {
    idEstudiante: number;
    nombreEstudiante: string;
    apellidoEstudiante: string;
    codigoMatricula: string;
  };
  curso: {
    nombreCurso: string;
  };
}

const makeStyle = (descripcion: string): React.CSSProperties => {
  if (descripcion.toLowerCase().includes("diferencia")) {
    return {
      background: "rgba(255, 99, 71, 0.2)",
      color: "#ff6347",
      border: "1px solid #ff6347",
      fontWeight: "500",
    };
  } else {
    return {
      background: "rgba(30, 144, 255, 0.2)",
      color: "#1e90ff",
      border: "1px solid #1e90ff",
      fontWeight: "500",
    };
  }
};

const BasicTable: React.FC<BasicTableProps> = ({ setSelectedSolicitud }) => {

  const handleRowClick = (row: any) => {
    setSelectedSolicitud(row);
  };
  const [solicitudes, setSolicitudes] = React.useState<SolicitudData[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  React.useEffect(() => {
    axios
      .get<SolicitudData[]>("http://localhost:3000/solicitudes-dirigida-estudiante")
      .then((res) => {
        setSolicitudes(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener solicitudes:", err);
      });
  }, []);

  const selectedSolicitud = solicitudes.find((s) => s.idSolicitud === selectedRow);

  return (
    <div className="Table">
      <h3>Seleccionar Solicitud</h3>
      <div className="student-info-container">
        <div className="info-box">
          <Typography variant="subtitle1">Nombre:</Typography>
          <Typography variant="body1" className="info-text">
            {selectedSolicitud
              ? `${selectedSolicitud.estudiante.nombreEstudiante} ${selectedSolicitud.estudiante.apellidoEstudiante}`
              : "—"}
          </Typography>
        </div>
        <div className="info-box">
          <Typography variant="subtitle1">Código:</Typography>
          <Typography variant="body1" className="info-text">
            {selectedSolicitud?.estudiante.codigoMatricula || "—"}
          </Typography>
        </div>
        <div className="info-box">
          <Typography variant="subtitle1">Curso:</Typography>
          <Typography variant="body1" className="info-text">
            {selectedSolicitud?.curso.nombreCurso || "—"}
          </Typography>
        </div>
      </div>

      <div className="tableContainer-inner">
        <TableContainer component={Paper} style={{ borderRadius: "0.7rem", width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID Solicitud</TableCell>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Causa</TableCell>
                <TableCell align="left">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {solicitudes.map((row) => (
                <TableRow
                  key={row.idSolicitud}
                  onClick={() => {
                    setSelectedRow(row.idSolicitud);
                    setSelectedSolicitud(row); // ← esto actualiza el estado global en Dashboard
                  }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      selectedRow === row.idSolicitud ? "rgba(74, 20, 140, 0.1)" : "inherit",
                    borderLeft: selectedRow === row.idSolicitud ? "3px solid #4a148c" : "none",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">#{row.idSolicitud}</TableCell>
                  <TableCell align="left">{new Date(row.fechaSolicitudEgresado).toLocaleDateString()}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.descripcion)}>{row.descripcion}</span>
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
};

export default BasicTable;
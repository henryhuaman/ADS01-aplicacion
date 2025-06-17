// BlocksData.ts

export interface BlockDetails {
  curso: string;
  profesor: string;
  correoProfesor: string;
  horario: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface BlockData {
  id: number;
  idDisplay: string;
  name: string;
  idCurso: number;
  idProfesor: number;
  details: BlockDetails;
}

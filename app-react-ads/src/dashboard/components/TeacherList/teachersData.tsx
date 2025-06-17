// teacherData.ts
import img1 from "../../imgs/teacher.jpg";
import img2 from "../../imgs/teacher1.jpg";

export interface Teacher {
  id: number;
  name: string;
  specialty: string;
  photo: string; // o `StaticImageData` si usas Next.js Image
}

export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Abanto Guiop, Franklin Manuel",
    specialty: "Cirugía de tórax y cardiovascular",
    photo: img1,
  },
  {
    id: 2,
    name: "Abuhadba Rondón, Giafar",
    specialty: "Cirugía vascular",
    photo: img2,
  },
  {
    id: 3,
    name: "PROFE3",
    specialty: "Cirugía vascular",
    photo: img2,
  },
  {
    id: 4,
    name: "Profe4",
    specialty: "Cirugía vascular",
    photo: img2,
  },
  {
    id: 5,
    name: "Profe5",
    specialty: "Cirugía vascular",
    photo: img2,
  },
  {
    id: 6,
    name: "Profe6",
    specialty: "Cirugía vascular",
    photo: img2,
  },
  {
    id: 7,
    name: "Profe7",
    specialty: "Cirugía vascular",
    photo: img2,
  },
];

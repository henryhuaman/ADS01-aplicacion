import React, { useEffect, useState } from "react";
import axios from "axios";
import Block from "./Block";
import BlockModal from "./BlockModal"; // asegúrate de importar el modal
import type { BlockData } from "./BlocksData";

interface BlocksListProps {
  selectedTeacherId: number | null;
  onBlockSelect: (block: BlockData) => void;
}

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const BlocksList: React.FC<BlocksListProps> = ({ selectedTeacherId, onBlockSelect }) => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [confirmedBlockId, setConfirmedBlockId] = useState<number | null>(null);
  const [modalBlock, setModalBlock] = useState<BlockData | null>(null);


  useEffect(() => {
    if (!selectedTeacherId) return;

    axios.get(`http://localhost:3000/bloques/profesor/${selectedTeacherId}`)
      .then(async (res) => {
        const rawBlocks = res.data;

        const mappedBlocks: BlockData[] = await Promise.all(
          rawBlocks.map(async (block: any) => {
            const nombreCurso = block.curso?.nombreCurso || "Curso desconocido";
            const profesor = block.profesor
              ? `${block.profesor.nombreProfesor} ${block.profesor.apellidoProfesor}`
              : "No disponible";
            const correoProfesor = block.profesor?.correoProfesor || "No disponible";

            let horario = "No disponible";
            try {
              const diaHoraRes = await axios.get(`http://localhost:3000/dia-horas/bloque/${block.idBloque}`);
              const diasMap = new Map<string, string[]>();

              diaHoraRes.data.forEach((dh: any) => {
                const fecha = new Date(dh.dia);
                const diaSemana = capitalize(
                  fecha.toLocaleDateString("es-PE", { weekday: "long" })
                );

                const franja = `${dh.horaInicio} a ${dh.horaFin}`;

                if (!diasMap.has(diaSemana)) {
                  diasMap.set(diaSemana, []);
                }
                diasMap.get(diaSemana)!.push(franja);
              });

              const horarioFormateado = Array.from(diasMap.entries()).map(
                ([dia, franjas]) => `${dia}: ${franjas.join(", ")}`
              );

              horario = horarioFormateado.join(" | ");
            } catch (err) {
              console.error(`Error obteniendo horario para bloque ${block.idBloque}:`);
            }

            return {
              id: block.idBloque, // <- número real para lógica
              idDisplay: `CODIGO BLOQUE: ${block.idBloque}`, // <- string decorativo para mostrar
              name: nombreCurso,
              idCurso: block.curso.idCurso,
              idProfesor: block.profesor.idProfesor,
              details: {
                curso: nombreCurso,
                profesor,
                correoProfesor,
                horario,
                fechaInicio: block.fechaInicio?.slice(0, 10) || "-",
                fechaFin: block.fechaFin?.slice(0, 10) || "-",
              }
            };
          })
        );

        setBlocks(mappedBlocks);
      })
      .catch((err) => {
        console.error("Error cargando bloques:", err.message);
        setBlocks([]);
      });
  }, [selectedTeacherId]);

  const handleBlockClick = (block: BlockData) => {
    setModalBlock(block);
    setSelectedBlockId(block.id);
  };

  const handleConfirm = () => {
    if (modalBlock) {
      setConfirmedBlockId(modalBlock.id);
      onBlockSelect(modalBlock)
    }
    setModalBlock(null); // cerrar modal
  };

  return (
    <div className="blocks-container">
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onClick={handleBlockClick}
          isSelected={block.id === confirmedBlockId}
        />
      ))}

      {modalBlock && (
        <BlockModal
          block={modalBlock}
          onClose={() => setModalBlock(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default BlocksList;

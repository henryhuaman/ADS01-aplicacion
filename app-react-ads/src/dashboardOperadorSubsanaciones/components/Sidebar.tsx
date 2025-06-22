import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/image-removebg-preview.png";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";

// Definición de tipo para los elementos de Sidebar
type SidebarItem = {
  icon: React.ElementType;
  heading: string;
  iconSize?: number;
};

const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>

      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? (expanded ? "true" : "false") : undefined}
      >
        {/* Logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            <span className="ees">EES</span>
            <span className="ppl">PPL</span>
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item: SidebarItem, index: number) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon size={item.iconSize} />
              <span>{item.heading}</span>
            </div>
          ))}
          <div className="menuItem">
            
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

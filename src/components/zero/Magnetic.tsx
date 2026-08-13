import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  magneticPull?: number; // How strongly it pulls towards mouse (default 0.3)
  magneticRadius?: number; // Area around button that triggers magnet (default 150px)
}

export function Magnetic({ children, magneticPull = 0.35, magneticRadius = 150 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
      style={{ padding: `0` }} // You can add padding here if you want a larger hover area
    >
      {children}
    </motion.div>
  );
}

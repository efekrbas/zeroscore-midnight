import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotX = useSpring(
    useTransform(mouseX, (m) => m + 13),
    { damping: 40, stiffness: 600 },
  );
  const dotY = useSpring(
    useTransform(mouseY, (m) => m + 13),
    { damping: 40, stiffness: 600 },
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(16, 185, 129, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-1.5 w-1.5 rounded-full bg-primary mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}

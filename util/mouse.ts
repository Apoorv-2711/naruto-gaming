import { useEffect, useState } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handelGyroMove = (event: DeviceOrientationEvent) => {
      setMousePosition({ x: event.gamma, y: event.beta });
    };

    window.addEventListener("deviceorientation", handelGyroMove);

    return () => {
      window.removeEventListener("deviceorientation", handelGyroMove);
    };
  }, []);

  return mousePosition;
}

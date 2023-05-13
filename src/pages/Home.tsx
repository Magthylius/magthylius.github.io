import { useEffect, useRef, useState } from "react";
import "./Home.scss"

interface Vector2 {
  x: number,
  y: number
}

export default function Home() {
  const [centerNormalizedMousePos, setCenterNormalizedMousePos] = useState<Vector2>({ x: 0, y: 0 });
  const refWindowSize = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const windowSize: Vector2 = { x: refWindowSize.current[0], y: refWindowSize.current[1] };
    const halfWindowSize: Vector2 = { x: windowSize.x * 0.5, y: windowSize.y * 0.5 };

    const handleMouseMove = (event: MouseEvent) => {
      const offsetMousePos: Vector2 = { x: event.clientX - halfWindowSize.x, y: event.clientY - halfWindowSize.y };
      setCenterNormalizedMousePos({ x: offsetMousePos.x / windowSize.x, y: offsetMousePos.y / windowSize.y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div id="parallax-bg"
      style={
        { transform: `translate(${centerNormalizedMousePos.x * 50}px, ${centerNormalizedMousePos.y * 50}px)` }
      }
    >
      <div>
        <p id="parallax-label">
          MAGTHYLIUS<br />
        </p>
      </div>
    </div>
  );
}
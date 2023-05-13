import { useEffect, useRef, useState } from "react";
import "./Home.scss"
import { Vector2 } from "../HeaderInterfaces"

export default function Home() {
  const PARALLAX_MOVE_RANGE: number = 25;
  const PARALLAX_HOVER_SCALE: number = 1.05;

  const [centerNormalizedMousePos, setCenterNormalizedMousePos] = useState<Vector2>({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState<boolean>(false);
  const refWindowSize = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const windowSize: Vector2 = { x: refWindowSize.current[0], y: refWindowSize.current[1] };
    const halfWindowSize: Vector2 = { x: windowSize.x * 0.5, y: windowSize.y * 0.5 };

    const handleMouseMove = (event: MouseEvent) => {
      const offsetMousePos: Vector2 = { x: event.clientX - halfWindowSize.x, y: event.clientY - halfWindowSize.y };
      const centerizedMousePos: Vector2 = { x: offsetMousePos.x / windowSize.x, y: offsetMousePos.y / windowSize.y };
      const magnitude: number = Math.sqrt(Math.pow(centerizedMousePos.x, 2) + Math.pow(centerizedMousePos.y, 2));

      setCenterNormalizedMousePos({ x: centerizedMousePos.x / magnitude, y: centerizedMousePos.y / magnitude });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div id="parallax-bg"
      onMouseEnter={() => setIsHoveringLogo(true)}
      onMouseLeave={() => setIsHoveringLogo(false)}
      style={
        { 
          transform: 
            `translate(${centerNormalizedMousePos.x * PARALLAX_MOVE_RANGE}px, ${centerNormalizedMousePos.y * PARALLAX_MOVE_RANGE}px)
            scale(${isHoveringLogo ? PARALLAX_HOVER_SCALE : 1})` 
        }
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
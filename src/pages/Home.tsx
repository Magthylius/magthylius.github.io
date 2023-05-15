import { useEffect, useRef, useState } from "react";
import { Vector2 } from "../HeaderInterfaces"
import "./Home.scss"

export default function Home() {
  const PARALLAX_MOVE_RANGE: number = 50;
  const PARALLAX_SCALE_SIZE: number = 1.05;

  const [logoTranslationPos, setLogoTranslationPos] = useState<Vector2>({ x: 0, y: 0 });
  const [wantsScaledLogo, setWantsScaledLogo] = useState<boolean>(false);
  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const refWindowSize = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const windowSize: Vector2 = { x: refWindowSize.current[0], y: refWindowSize.current[1] };
    const halfWindowSize: Vector2 = { x: windowSize.x * 0.5, y: windowSize.y * 0.5 };

    const handleMouseMove = (event: MouseEvent) => {
      const offsetMousePos: Vector2 = { x: event.clientX - halfWindowSize.x, y: event.clientY - halfWindowSize.y };
      const magnitude: number = Math.sqrt(Math.pow(offsetMousePos.x, 2) + Math.pow(offsetMousePos.y, 2));

      if (magnitude < PARALLAX_MOVE_RANGE)
        setLogoTranslationPos({ x: offsetMousePos.x, y: offsetMousePos.y });
      else
      {
        //! Normalizes it and mults with move range
        const moveRange = magnitude / PARALLAX_MOVE_RANGE;
        setLogoTranslationPos({ x: offsetMousePos.x / moveRange, y: offsetMousePos.y / moveRange });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  function handleOnLogoClick() {
    setLogoClickCount(logoClickCount + 1);
  }

  return (
    <div id="parallax-bg"
      onMouseEnter={() => setWantsScaledLogo(true)}
      onMouseLeave={() => setWantsScaledLogo(false)}
      onMouseDown={() => setWantsScaledLogo(false)}
      onMouseUp={() => setWantsScaledLogo(true)}
      onClick={handleOnLogoClick}
      style={
        { 
          transform: 
            `translate(${logoTranslationPos.x}px, ${logoTranslationPos.y}px)
            scale(${wantsScaledLogo ? PARALLAX_SCALE_SIZE : 1})` 
        }
      }
    >
      <div id="parallax-label">
        MAGTHYLIUS
        <div id="clickcount">
          {logoClickCount <= 0 ? "" : `You have clicked me ${logoClickCount} time${logoClickCount === 1 ? "" : "s"}!`}
        </div>
      </div>
    </div>
  );
}
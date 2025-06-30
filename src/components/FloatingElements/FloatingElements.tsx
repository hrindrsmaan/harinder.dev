// @ts-nocheck

import { useEffect, useState } from "react";
import "./FloatingElements.css";

const FloatingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Create initial floating elements
    const initialElements = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      left: (i + 1) * 10,
      delay: i * 2,
    }));
    setElements(initialElements as any);

    // Add new elements periodically
    const interval = setInterval(() => {
      const newElement = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: 0,
      };

      setElements((prev) => [...prev, newElement]);

      // Remove element after animation
      setTimeout(() => {
        setElements((prev) => prev.filter((el) => el.id !== newElement.id));
      }, 25000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;

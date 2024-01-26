import { useEffect, useRef, useState } from 'react';
import { Draw, Point } from './IDraw';

export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  const handlerMouseMove = (e: MouseEvent) => {
    if (!mouseDown) return;

    const currentPoint = computePointCanvas(e);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !currentPoint) return;

    onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
    prevPoint.current = currentPoint;
  };

  const handlerMouseUp = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  const computePointCanvas = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  useEffect(() => {
    canvasRef.current?.addEventListener('mousemove', handlerMouseMove);
    window.addEventListener('mouseup', handlerMouseUp);

    return () => {
      canvasRef.current?.removeEventListener('mousemove', handlerMouseMove);
      window.removeEventListener('mouseup', handlerMouseUp);
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown };
};

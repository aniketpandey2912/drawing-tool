import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from "../slice/menuSlice";

export const Board = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  // draw history - for undo and redo
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      console.log("URL::", URL);
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.png";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointer.current > 0) historyPointer.current -= 1;
      const lastImageData = drawHistory.current[historyPointer.current];
      context.putImageData(lastImageData, 0, 0);
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const lastImageData = drawHistory.current[historyPointer.current];
      context.putImageData(lastImageData, 0, 0);
    }
    dispatch(actionItemClick(null));
    console.log("actionMenuItem::", actionMenuItem);
  }, [actionMenuItem, dispatch]);

  // after browser paints,when state changes
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  // before browser paints, useLayoutEffect runs before useEffect
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
    };
    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    };
    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const currentImageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      drawHistory.current.push(currentImageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

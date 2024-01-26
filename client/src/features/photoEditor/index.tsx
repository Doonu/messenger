import React, { FC, useEffect, useState } from 'react';
import { IFilesPost } from '../../shared/models/IPost';
import { SActionChange, SActions, SaveImage, SContainer } from './photoEditor.styled';
import Toolbar from './ui/Toolbar';
import { IActionType } from './model/IToolbar';
import { useDraw } from '../../hooks/draw/draw';
import { Draw } from '../../hooks/draw/IDraw';
import BaseButton from '../../components/ui/buttons/baseButton';

interface IPhotoEditor {
  image: IFilesPost;
  onEditionImage: (url: string | undefined, id: string) => void;
}

const PhotoEditor: FC<IPhotoEditor> = ({ image, onEditionImage }) => {
  const [tool, setTool] = useState<IActionType>(null);

  const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
    if (tool !== 'burch') return;
    const { x, y } = currentPoint;
    const lineColor = '#000';
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const { canvasRef, onMouseDown } = useDraw(drawLine);

  const handlerOnloadImageInCanvas = () => {
    const context = canvasRef.current?.getContext('2d');
    const newImage = new Image();
    newImage.src = image?.url;
    newImage.onload = () => context?.drawImage(newImage, 0, 0, 600, 800);
  };

  const handlerSaveImage = () => {
    const imageCanvas = canvasRef.current?.toDataURL('image/png');
    onEditionImage(imageCanvas, image.id);
  };

  useEffect(() => {
    handlerOnloadImageInCanvas();
  }, []);

  return (
    <SContainer>
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={600} height={800} />
      <SActions>
        <Toolbar tool={tool} setTool={setTool} />
        {tool === 'burch' && <SActionChange>Кисточка</SActionChange>}
        <SaveImage>
          <BaseButton bgTransparent>Отменить</BaseButton>
          <BaseButton onClick={handlerSaveImage}>Сохранить</BaseButton>
        </SaveImage>
      </SActions>
    </SContainer>
  );
};

export default PhotoEditor;

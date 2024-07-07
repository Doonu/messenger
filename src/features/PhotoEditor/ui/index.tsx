import React, { FC, useEffect, useState } from 'react';
import { useDraw, Draw } from '@shared/hooks';
import { BaseButton } from '@shared/components';

import { SActionChange, SActions, SaveImage, SContainer, SPicture } from './photoEditor.styled';
import { Toolbar } from './Toolbar';
import { IActionType, IPhotoEditor } from '../model/IToolbar';

export const PhotoEditor: FC<IPhotoEditor> = ({ image, onEditionImage, canselEdit }) => {
  const [tool, setTool] = useState<IActionType>(null);

  const drawLine = ({ ctx, currentPoint, prevPoint }: Draw) => {
    if (tool !== 'burch') return;
    const { x, y } = currentPoint;
    const lineColor = '#000';
    const lineWidth = 5;

    const startPoint = prevPoint ?? currentPoint;
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
    newImage.onload = () =>
      context?.drawImage(
        newImage,
        0,
        0,
        image.dimensions.width / 1.5,
        image.dimensions.height / 1.5
      );
  };

  const handlerSaveImage = async () => {
    const result = await new Promise((resolve) => canvasRef?.current?.toBlob(resolve, 'image/png'));
    onEditionImage(result, image.id);
  };

  useEffect(() => {
    handlerOnloadImageInCanvas();
  }, []);

  return (
    <SContainer>
      <SPicture>
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={image.dimensions.width / 1.5}
          height={image.dimensions.height / 1.5}
        />
      </SPicture>
      <SActions>
        <Toolbar tool={tool} setTool={setTool} />
        {tool === 'burch' && <SActionChange>Кисточка</SActionChange>}
        <SaveImage>
          <BaseButton onClick={() => canselEdit()} bgTransparent>
            Отменить
          </BaseButton>
          <BaseButton onClick={handlerSaveImage}>Сохранить</BaseButton>
        </SaveImage>
      </SActions>
    </SContainer>
  );
};

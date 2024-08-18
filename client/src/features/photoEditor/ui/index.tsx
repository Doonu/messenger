import React, { FC, useEffect, useState } from 'react';
import { useDraw, Draw } from '@shared/hooks';
import { BaseButton } from '@shared/components';
import { RcFile } from 'antd/es/upload';

import { SActionChange, SActions, SaveImage, SContainer, SPicture } from './photoEditor.styled';
import { Toolbar } from './Toolbar';
import { IActionType, IPhotoEditor } from '../model/IToolbar';

// TODO: доделать
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
    const url = image && image.url ? image.url : URL.createObjectURL(image.originFileObj as File);

    newImage.src = url;
    newImage.onload = () =>
      context?.drawImage(
        newImage,
        0,
        0,
        500,
        500
        // image.dimensions.width / 1.5,
        // image.dimensions.height / 1.5
      );
  };

  const handlerSaveImage = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], image?.name, { type: blob.type });

          onEditionImage({
            ...image,
            status: 'done',
            url: URL.createObjectURL(file),
            originFileObj: file as RcFile,
          });
        }
      });
    }
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
          width={500}
          height={500}
          // width={image.dimensions.width / 1.5}
          // height={image.dimensions.height / 1.5}
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

import React, { FC, useEffect, useState } from 'react';
import { getProfile, replace } from '@shared/api';
import { useAppDispatch } from '@shared/hooks';
import { MainPost, Like, Slice, Carousel } from '@shared/components';
import { IUser } from '@shared/models';
import { PhotoEditor } from '@features/PhotoEditor';

import {
  Descriptions,
  SContainer,
  SContainerInfo,
  SContainerProfile,
  SContent,
  SEdit,
  SFooter,
  SInfoPic,
  SLeft,
  SRight,
} from './previewPhoto.styled';
import { IPreviewPhotoProps } from '../model/IPreviewPhoto';

export const PreviewPhoto: FC<IPreviewPhotoProps> = ({
  list,
  setList,
  description,
  currentIndex,
  setCurrentIndex,
}) => {
  const [userPhoto, setUserPhoto] = useState<IUser>();
  const [isLike, setIsLike] = useState(false);

  const [isEditorPhoto, setIsEditorPhoto] = useState(false);

  const dispatch = useAppDispatch();

  const handlerGetProfile = () => {
    dispatch(getProfile())
      .unwrap()
      .then((fetchedUser) => {
        setUserPhoto(fetchedUser);
      });
  };

  const handleLikeClick = () => {
    setIsLike((prev) => !prev);
  };

  const canselEdit = () => setIsEditorPhoto(false);

  const handlerEditionImage = (image: any, id: string) => {
    if (!image) return;

    dispatch(replace({ file: image, idPhoto: id, status: 2 }))
      .unwrap()
      .then((data) => {
        const currentList = list.map((item) => {
          if (item.id === id) {
            return data;
          }
          return item;
        });

        setList((prev) => ({ ...prev, photos: currentList }));
      });

    setIsEditorPhoto(false);
  };

  useEffect(() => {
    handlerGetProfile();
  }, []);

  return (
    <SContainer>
      {isEditorPhoto && (
        <PhotoEditor
          canselEdit={canselEdit}
          onEditionImage={handlerEditionImage}
          image={list[currentIndex - 1]}
        />
      )}
      {!isEditorPhoto && (
        <SContent>
          <SLeft>
            <Carousel
              speed={0}
              fixedMinHeight={800}
              dots={false}
              infinite
              currentSlide={currentIndex}
              photoList={list}
              setCurrentSlide={setCurrentIndex}
            />
          </SLeft>
          <SRight>
            <SContainerProfile>
              {userPhoto && (
                <MainPost
                  status={userPhoto.statusConnected}
                  statusTime={userPhoto.timeConnected}
                  time="прямо сейчас"
                  name={userPhoto.name}
                  avatar={userPhoto.avatar}
                  id={userPhoto.id}
                />
              )}
            </SContainerProfile>
            <SContainerInfo>
              <Like onClick={handleLikeClick} isLike={isLike}>
                0
              </Like>
            </SContainerInfo>
            <Descriptions>
              <Slice content={description} />
            </Descriptions>
          </SRight>
        </SContent>
      )}
      <SFooter>
        {!isEditorPhoto && (
          <SEdit onClick={() => setIsEditorPhoto((prev) => !prev)}>Редактировать</SEdit>
        )}
        <SInfoPic>
          {list.length > 1
            ? `Фотографии для публикации поста ${currentIndex} из ${list.length}`
            : `Фотография для публикации поста`}
        </SInfoPic>
        {!isEditorPhoto && <div />}
      </SFooter>
    </SContainer>
  );
};

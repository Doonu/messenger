import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Descriptions,
  SContainer,
  SContainerInfo,
  SContainerProfile,
  SContent,
  SFooter,
  SInfoPic,
  SLeft,
  SRight,
} from './previewPhoto.styled';
import getProfile from '../../../../../../shared/api/user/getProfile';
import { useAppDispatch } from '../../../../../../hooks/redux';
import MainPostProfile from '../../../../../custom/profiles/mainPost';
import { Like } from '../../../../../ui/buttons/likesButton/like';
import { Slice } from '../../../../../custom/slice';
import { IAllFiles, IFilesPost } from '../../../../../../shared/models/IPost';
import PhotoEditor from '../../../../../../features/photoEditor';
import Carousel from '../../../../../ui/carousel/ui';
import { IUser } from '../../../../../../shared/models/IUser';

interface PreviewPhotoProps {
  list: IFilesPost[];
  setList: Dispatch<SetStateAction<IAllFiles>>;
  description: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

export const PreviewPhoto: FC<PreviewPhotoProps> = ({
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

  const handlerEditionImage = (url: string | undefined, id: string) => {
    if (!url) return;

    const currentList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          url: url,
        };
      }
      return item;
    });

    setList((prev) => {
      return { ...prev, photos: currentList };
    });

    setIsEditorPhoto(false);
  };

  useEffect(() => {
    handlerGetProfile();
  }, []);

  return (
    <SContainer>
      {isEditorPhoto && (
        <PhotoEditor onEditionImage={handlerEditionImage} image={list[currentIndex - 1]} />
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
                <MainPostProfile
                  time={'прямо сейчас'}
                  name={userPhoto.name}
                  avatar={userPhoto.avatar}
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
        <div onClick={() => setIsEditorPhoto((prev) => !prev)}>hello</div>
        <SInfoPic>
          {list.length > 1
            ? `Фотографии для публикации поста ${currentIndex} из ${list.length}`
            : `Фотография для публикации поста`}
        </SInfoPic>
        <div>this</div>
      </SFooter>
    </SContainer>
  );
};

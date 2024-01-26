import React, {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Descriptions,
  SArrowLeft,
  SArrowRight,
  SCarousel,
  SContainer,
  SContainerInfo,
  SContainerProfile,
  SContent,
  SFooter,
  SImg,
  SImgContainer,
  SInfoPic,
  SLeft,
  SRight,
} from './previewPhoto.styled';
import getProfile from '../../../../../../shared/api/user/getProfile';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { authState } from '../../../../../../entities/user/user.slice';
import MainPostProfile from '../../../../../ui/profiles/mainPost';
import { CarouselRef } from 'antd/es/carousel';
import { Like } from '../../../../../ui/buttons/likesButton/like';
import { Slice } from '../../../../../ui/slice';
import { IAllFiles, IFilesPost } from '../../../../../../shared/models/IPost';
import PhotoEditor from '../../../../../../features/photoEditor';

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
  const [userPhoto, setUserPhoto] = useState<authState>();
  const [isLike, setIsLike] = useState(false);

  const [isEditorPhoto, setIsEditorPhoto] = useState(false);

  const slider = useRef<CarouselRef>(null);

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

  const handleLeft = () => {
    slider?.current?.prev();
    if (currentIndex !== 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(list.length);
    }
  };

  const handleRight = () => {
    slider?.current?.next();
    if (currentIndex < list.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'ArrowRight') handleRight();
    if (e.code === 'ArrowLeft') handleLeft();
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
    slider?.current?.goTo(currentIndex - 1);
  }, [currentIndex]);

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
          <SLeft onKeyDown={handleKeyDown}>
            <SCarousel ref={slider} dots={false} speed={0} infinite>
              {list.map(({ url, id }) => (
                <SImgContainer key={id}>
                  {list.length > 1 && (
                    <>
                      <SArrowLeft onClick={handleLeft} />
                      <SArrowRight onClick={handleRight} />
                    </>
                  )}
                  <SImg draggable="false" src={url} alt="" />
                </SImgContainer>
              ))}
            </SCarousel>
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
                12
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

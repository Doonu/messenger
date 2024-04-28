import { IScroll, IScrollToRef } from './scrollTo.types';

export const index = (id?: number) => {
  // @ts-ignore
  document.getElementById(`${id}`).scrollIntoView({ behavior: 'smooth' });
};

export const scrollToRef = ({ ref, isScrollFast }: IScrollToRef) => {
  const height = ref.current?.scrollHeight;

  let configScroll: IScroll = {
    top: height,
    left: 0,
  };

  if (!isScrollFast) {
    configScroll = {
      ...configScroll,
      behavior: 'smooth',
    };
  }

  if (height && configScroll) {
    ref.current?.scrollTo(configScroll);
  }
};

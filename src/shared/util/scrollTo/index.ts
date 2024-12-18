import { IScroll, IScrollToRef } from './scrollTo.type';

export const scrollToById = (id?: number) => {
  document.getElementById(`${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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

import 'styled-components';

export interface ITheme {
  type: ThemeEnum;
  colors: {
    active: string;
    secondary: string;
    success: string;
    danger: string;
    bg: string;
    text: string;
    secondaryBg: string;
    white: string;
    blue: string;
    link: string;
    secondaryText: string;
  };
  transition: {
    base: string;
    long: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    oldDesktop: string;
    desktop: string;
    bigDesktop: string;
  };
  radius: {
    base: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme {
    type: ThemeEnum;
    colors: {
      active: string;
      secondary: string;
      success: string;
      danger: string;
      bg: string;
      text: string;
      secondaryBg: string;
      white: string;
      blue: string;
      link: string;
      secondaryText: string;
    };
    transition: {
      base: string;
      long: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      oldDesktop: string;
      desktop: string;
      bigDesktop: string;
    };
    radius: {
      base: string;
    };
  }
}

export enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}

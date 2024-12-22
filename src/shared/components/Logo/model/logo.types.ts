import { IconBaseProps } from 'react-icons';

type ILogoTitle = 'left' | 'right';

export interface ILogo extends IconBaseProps {
  sizeBg?: string;
  size?: number;
  pulse?: boolean;
  shadow?: boolean;
  title?: ILogoTitle;
}

export interface ILogoStyle {
  $pulse: boolean;
  $sizeBg: string;
  $shadow: boolean;
}

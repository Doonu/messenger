export interface IPhotoProfile {
  img: string;
  name: string;
  status?: boolean;
  statusTime?: number;
  size?: number;
  isAbsolute?: boolean;
  top?: number;
  left?: number;
  fontSize?: number;
}

export interface IImgProps {
  $color: string;
  $size: number;
  $isAbsolute: boolean;
  $top: number;
  $left: number;
  $fontSize: number;
}

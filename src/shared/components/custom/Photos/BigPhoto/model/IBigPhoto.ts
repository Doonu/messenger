export interface IBigPhoto {
  fixedMinSize: number;
  url: string;
  onClick?: () => void;
  dimensions: {
    height: number;
    width: number;
  };
}

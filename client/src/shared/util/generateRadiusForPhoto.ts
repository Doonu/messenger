/*
 *   Генерация радиусов фотографии в грид сетке
 * */

export const generateRadiusForPhoto = (index: number, length: number) => {
  if (index === 0 && length > 2) return '15px 0 0 0';
  if (index === 0 && length === 2) return '15px 0 0 15px';
  if (index === 1 && length > 2) return '0 15px 0 0';
  if (index === 1 && length === 2) return '0 15px 15px 0';
  if (length % 2 === 1 && index === length - 1) return '0 0 15px 15px';
  if (length % 2 !== 1 && index === length - 2) return '0 0 0 15px';
  if (length % 2 !== 1 && index === length - 1) return '0 0 15px 0';
  return '';
};

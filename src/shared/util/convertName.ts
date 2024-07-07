/*
   Удаление идентификатора у имени.
   expect: Oleg#3333
   result: Oleg
*/
export const convertName = (name: string | undefined) => {
  if (name) {
    return name.slice(0, name.length - 5);
  }
  return '';
};

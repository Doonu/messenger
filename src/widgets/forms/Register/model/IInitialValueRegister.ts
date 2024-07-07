import { IRegister } from '@shared/models';

export interface IInitialValue extends IRegister {
  repeatPassword: string;
}

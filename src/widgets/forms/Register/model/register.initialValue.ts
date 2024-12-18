import { IRegister } from '@shared/models';

export interface RegisterInitialValue extends IRegister {
  repeatPassword: string;
}

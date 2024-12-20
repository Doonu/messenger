import { IRegister } from '@entities/auth';

export interface RegisterInitialValue extends IRegister {
  repeatPassword: string;
}

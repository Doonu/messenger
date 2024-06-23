import { IRegister } from 'shared/api/http/auth/postRegistration/postRegistration.type';

export interface IInitialValue extends IRegister {
  repeatPassword: string;
}

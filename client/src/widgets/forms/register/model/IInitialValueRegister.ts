import { IRegister } from '../../../../shared/api/http/auth/model/register';

export interface IInitialValue extends IRegister {
  repeatPassword: string;
}

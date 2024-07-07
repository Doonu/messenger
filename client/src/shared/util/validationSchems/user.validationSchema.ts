import { array, boolean, number, object, string } from 'yup';

export const userValidationSchema = () =>
  object()
    .shape({
      name: string().required(),
      id: number().required(),
      email: string().required(),
      banned: boolean().required(),
      banReason: string().required().nullable(),
      statusConnected: boolean().required(),
      timeConnected: string().required(),
      imgSubstitute: string().required(),
      friends: array(number().required()).required(),
      roles: array(
        object({
          id: number().required(),
          description: string().required(),
          value: string().required(),
          createdAt: string().required(),
        })
      ),
    })
    .required();

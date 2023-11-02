import { yupResolver } from '@hookform/resolvers/yup';

const useYupValidationResolver = (validationSchema) =>
  yupResolver(validationSchema) as any;

export default useYupValidationResolver;

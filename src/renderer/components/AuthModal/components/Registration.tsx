import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useBoolean,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  validateFirstName,
  validateLastName,
} from '../../../../utils/validates/validateName';
import validateAge from '../../../../utils/validates/validateAge';
import validateEmail from '../../../../utils/validates/validateEmail';
import validatePass from '../../../../utils/validates/validatePass';

export interface IRegistrationValues {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

interface IRegistrationProps {
  setAuth: () => void;
  onRegistration: (values: IRegistrationValues) => Promise<void>;
}

const Registration = ({ setAuth, onRegistration }: IRegistrationProps) => {
  const [isVisible, { toggle }] = useBoolean(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: 0,
      email: '',
      password: '',
    },
    onSubmit: onRegistration,
  });

  return (
    <FormikProvider value={formik}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading textAlign="center">Регистрация</Heading>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={
                !!(formik.errors.firstName && formik.touched.firstName)
              }
            >
              <FormLabel htmlFor="firstName">Имя</FormLabel>
              <Field
                as={Input}
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                validate={validateFirstName}
              />
              <FormErrorMessage>
                (<>{formik.errors.firstName}</>)
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}
            >
              <FormLabel htmlFor="lastName">Фамилия</FormLabel>
              <Field
                as={Input}
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                validate={validateLastName}
              />
              <FormErrorMessage>
                (<>{formik.errors.lastName}</>)
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!(formik.errors.age && formik.touched.age)}
            >
              <FormLabel htmlFor="age">Возраст</FormLabel>
              <Field
                as={Input}
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
                validate={validateAge}
              />
              <FormErrorMessage>
                (<>{formik.errors.age}</>)
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!(formik.errors.email && formik.touched.email)}
            >
              <FormLabel htmlFor="email">Электронная почта</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                validate={validateEmail}
              />
              <FormErrorMessage>
                (<>{formik.errors.email}</>)
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!(formik.errors.password && formik.touched.password)}
            >
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <InputGroup>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={isVisible ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  validate={validatePass}
                />
                <InputRightElement>
                  <IconButton
                    onClick={toggle}
                    aria-label="Make visible"
                    icon={
                      isVisible ? (
                        <HiEye size="1rem" />
                      ) : (
                        <HiEyeOff size="1rem" />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                (<>{formik.errors.password}</>)
              </FormErrorMessage>
            </FormControl>

            <Center pt={5}>
              <Button width="10rem" type="submit" colorScheme="blue">
                Регистрация
              </Button>
            </Center>
          </form>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button mr={3} variant="link" onClick={setAuth}>
            Если вы уже зарегистрированы - нажмите сюда
          </Button>
        </ModalFooter>
      </ModalContent>
    </FormikProvider>
  );
};

export default Registration;

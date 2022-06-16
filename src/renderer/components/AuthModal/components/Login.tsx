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
import { HiEyeOff, HiEye } from 'react-icons/hi';
import validateEmail from '../../../../utils/validates/validateEmail';
import validatePass from '../../../../utils/validates/validatePass';

export interface ILoginValues {
  email: string;
  password: string;
}

interface ILoginProps {
  setAuth: () => void;
  onLogin: (values: ILoginValues) => void;
}

const Login = ({ setAuth, onLogin }: ILoginProps) => {
  const [isVisible, { toggle }] = useBoolean(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onLogin,
  });

  return (
    <FormikProvider value={formik}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading textAlign="center">Логин</Heading>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={!!(formik.errors.email && formik.touched.email)}
            >
              <FormLabel htmlFor="email">Электронная почта</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="text"
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
                Вход
              </Button>
            </Center>
          </form>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button mr={3} variant="link" onClick={setAuth}>
            Чтобы зарегистрироваться - нажмите сюда
          </Button>
        </ModalFooter>
      </ModalContent>
    </FormikProvider>
  );
};

export default Login;

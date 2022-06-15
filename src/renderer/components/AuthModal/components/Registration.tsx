import React from 'react';
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
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
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
	console.log({onRegistration});
  return (
    <ModalContent>
      <ModalCloseButton />
      <ModalHeader>
        <Heading textAlign="center">Регистрация</Heading>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            firstName: 'Артем',
            lastName: 'Соболев',
            age: 12,
            email: 'mrsnakeworld@gmail.com',
            password: '1234',
          }}
          onSubmit={onRegistration}
        >
          {(props: FormikProps<unknown>) => (
            <Form {...props}>
              <Field name="firstName" validate={validateFirstName}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.firstName && form.touched.firstName)
                    }
                  >
                    <FormLabel htmlFor="firstName">Имя</FormLabel>
                    <Input {...field} id="firstName" type="text" />
                    <FormErrorMessage>
                      (<>{form.errors.firstName}</>)
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="lastName" validate={validateLastName}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.lastName && form.touched.lastName)
                    }
                  >
                    <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                    <Input {...field} id="lastName" type="text" />
                    <FormErrorMessage>
                      (<>{form.errors.lastName}</>)
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="age" validate={validateAge}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.age && form.touched.age)}
                  >
                    <FormLabel htmlFor="age">Возраст</FormLabel>
                    <Input {...field} id="age" type="number" />
                    <FormErrorMessage>
                      (<>{form.errors.age}</>)
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={validateEmail}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.email && form.touched.email)}
                  >
                    <FormLabel htmlFor="email">Электронная почта</FormLabel>
                    <Input {...field} id="email" type="email" />
                    <FormErrorMessage>
                      (<>{form.errors.email}</>)
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password" validate={validatePass}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
                  >
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="password"
                        type={isVisible ? 'text' : 'password'}
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
                      (<>{form.errors.password}</>)
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Center pt={5}>
                <Button width="10rem" type="submit" colorScheme="blue">
                  Регистрация
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Button mr={3} variant="link" onClick={setAuth}>
          Если вы уже зарегистрированы - нажмите сюда
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Registration;

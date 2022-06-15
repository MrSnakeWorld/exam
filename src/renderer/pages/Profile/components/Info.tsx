import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  Text,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import useSize from 'utils/hooks/useSize';
import { IUser } from 'utils/interfaces/IUser';
import validateAge from 'utils/validates/validateAge';
import validateEmail from 'utils/validates/validateEmail';
import {
  validateFirstName,
  validateLastName,
} from 'utils/validates/validateName';
import validatePass from 'utils/validates/validatePass';

interface IInfoProps {
  user: IUser;
}

export interface IUpdateValues {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  password?: string;
  isAdmin?: unknown;
}

const Info = ({ user }: IInfoProps) => {
  const [isVisible, { toggle }] = useBoolean(false);
  const [isChange, setChange] = useState(false);
  const { isDesktop } = useSize();

  const handleApply = (values: IUpdateValues) => {
    setChange(false);
    console.log(values);
  };

  const formik = useFormik<IUpdateValues>({
    initialValues: {
      ...user,
      isAdmin: true,
    },
    onSubmit: handleApply,
  });

  const handleEdit = () => setChange(true);
  const handleCancel = () => setChange(false);

  return (
    <Flex className="user__info" justifyContent="space-between">
      {!isChange ? (
        <Box className="user__info-content">
          <Text size={isDesktop ? '4xl' : 'md'}>
            <b>Имя: </b>
            {user.firstName}
          </Text>
          {user.lastName && (
            <Text size={isDesktop ? '4xl' : 'md'}>
              <b>Фамилия: </b>
              {user.lastName}
            </Text>
          )}
          <Text size={isDesktop ? '4xl' : 'md'}>
            <b>Возраст: </b>
            {user.age}
          </Text>
          <Text size={isDesktop ? '4xl' : 'md'}>
            <b>Электронная почта: </b>
            {user.email}
          </Text>
          {user.isAdmin ? (
            <Text size={isDesktop ? '4xl' : 'md'}>
              <b> Роль: </b>Администратор
            </Text>
          ) : (
            <Text size={isDesktop ? '4xl' : 'md'}>
              <b>Роль: </b>Пользователь
            </Text>
          )}
        </Box>
      ) : (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="user__info-content">
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
                (<>{formik.errors.lastName}</>)
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

            <Field
              id="isAdmin"
              name="isAdmin"
              as={Checkbox}
              value={formik.values.isAdmin}
            >
              Администратор
            </Field>

            <Box className="user__info-buttons" pt={3}>
              <Button colorScheme="blue" type="submit" borderRadius={15}>
                Подтвердить
              </Button>
              {isChange && (
                <Button
                  colorScheme="red"
                  borderRadius={15}
                  position="absolute"
                  right={0}
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              )}
            </Box>
          </form>
        </FormikProvider>
      )}
      {!isChange && (
        <Box className="user__info-buttons" pt={3}>
          <Button colorScheme="blue" borderRadius={15} onClick={handleEdit}>
            Редактировать
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Info;

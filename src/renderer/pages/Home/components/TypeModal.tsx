import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import IType from '../../../../utils/interfaces/IType';
import validateType from '../../../../utils/validates/validateType';

interface ITypetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: IType) => Promise<void>;
  types: IType[];
}

const TypeModal = ({ isOpen, onClose, onSubmit, types }: ITypetModalProps) => {
  const formik = useFormik<IType>({
    initialValues: {
      id: Math.random() * new Date().valueOf(),
      name: '',
      description: '',
    },
    onSubmit,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <FormikProvider value={formik}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Heading textAlign="center">Добавить категорию</Heading>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={!!(formik.errors.name && formik.touched.name)}
              >
                <FormLabel htmlFor="name">Название</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  validate={(name: string) => validateType(name, types)}
                />
                <FormErrorMessage>
                  (<>{formik.errors.name}</>)
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  !!(formik.errors.description && formik.touched.description)
                }
              >
                <FormLabel htmlFor="description">Описание</FormLabel>
                <Field
                  as={Input}
                  id="description"
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                <FormErrorMessage>
                  (<>{formik.errors.description}</>)
                </FormErrorMessage>
              </FormControl>

              <Center pt={5}>
                <Button width="10rem" type="submit" colorScheme="blue">
                  Добавить
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </FormikProvider>
    </Modal>
  );
};

export default TypeModal;

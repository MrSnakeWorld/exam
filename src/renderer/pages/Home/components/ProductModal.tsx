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
import IProduct, { IEditableProduct } from '../../../../utils/interfaces/IProduct';
import IType from '../../../../utils/interfaces/IType';
import {
  validateName,
  validatePrice,
  validateType,
} from '../../../../utils/validates/validateProduct';

interface IProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: IEditableProduct) => Promise<void>;
  products: IProduct[];
  types: IType[];
}

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  products,
  types,
}: IProductModalProps) => {
  const formik = useFormik<IEditableProduct>({
    initialValues: {
      id: Math.random() * new Date().valueOf(),
      name: '',
      description: '',
      price: 0,
      type: '',
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
            <Heading textAlign="center">Добавить товар</Heading>
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
                  validate={(name: string) => validateName(name, products)}
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

              <FormControl
                isInvalid={!!(formik.errors.price && formik.touched.price)}
              >
                <FormLabel htmlFor="price">Цена</FormLabel>
                <Field
                  as={Input}
                  id="price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  validate={validatePrice}
                />
                <FormErrorMessage>
                  (<>{formik.errors.price}</>)
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!(formik.errors.type && formik.touched.type)}
              >
                <FormLabel htmlFor="type">Категория</FormLabel>
                <Field
                  as={Input}
                  id="type"
                  name="type"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  validate={(val: string) => validateType(val, types)}
                />
                <FormErrorMessage>
                  (<>{formik.errors.type}</>)
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

export default ProductModal;

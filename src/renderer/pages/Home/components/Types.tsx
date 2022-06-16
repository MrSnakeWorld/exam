import {
  Button,
  Center,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import useAppDispatch from '../../../../utils/hooks/useAppDispatch';
import IType from '../../../../utils/interfaces/IType';
import { IUser } from '../../../../utils/interfaces/IUser';
import { AiOutlinePlus } from 'react-icons/ai';
import { deleteType } from '../../../store/types/actions/delete';
import { createType } from '../../../store/types/actions/create';
import TypeModal from './TypeModal';

interface ITypesProps {
  types: IType[];
  user?: IUser;
}

const Types = ({ types, user }: ITypesProps) => {
  const dispatch = useAppDispatch();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const handleCreate = useCallback(() => {
    onOpen();
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await deleteType(dispatch, id);
  }, []);

  const submitCreate = useCallback(async (type: IType) => {
    await createType(dispatch, type);
    onClose();
  }, []);

  return (
    <div>
      <Center position="relative">
        <Heading pb="5">Список категорий</Heading>
        {user?.isAdmin ? (
          <Button
            leftIcon={<AiOutlinePlus />}
            position="absolute"
            right="0"
            bgColor="#C62E3E"
            color="white"
            onClick={handleCreate}
          >
            Добавить
          </Button>
        ) : null}
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Th>Описание</Th>
            </Tr>
          </Thead>
          <Tbody>
            {types.map((type) => (
              <Tr key={type.id}>
                <Th>{type.name ? type.name : ''}</Th>
                <Th>{type.description ? type.description : ''}</Th>
                <Th>
                  {user && user.isAdmin ? (
                    <Menu>
                      <MenuButton as={IconButton} icon={<TbDotsVertical />} />
                      <MenuList>
                        <MenuItemOption onClick={() => handleDelete(type.id)}>
                          Удалить категорию
                        </MenuItemOption>
                      </MenuList>
                    </Menu>
                  ) : null}
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <TypeModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={submitCreate}
          types={types}
        />
      </TableContainer>
    </div>
  );
};

export default Types;

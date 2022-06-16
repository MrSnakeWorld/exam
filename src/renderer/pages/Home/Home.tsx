import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import {
  getTypesAsArray,
  getTypesData,
} from '../../store/products/selectors';
import { getProductsAsArray } from '../../store/types/selectors';
import { getCurrentUser } from '../../store/users/selectors';
import useAppSelector from '../../../utils/hooks/useAppSelector';
import Products from './components/Products';
import Types from './components/Types';
import './Home.css';

const Home = () => {
  const user = useAppSelector(getCurrentUser);
  const products = useAppSelector(getProductsAsArray);
  const types = useAppSelector(getTypesAsArray);
  const typesData = useAppSelector(getTypesData);

  return (
    <Tabs isFitted variant="enclosed-colored">
      <TabList>
        <Tab>Товары</Tab>
        <Tab>Категории</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Products
            types={types}
            products={products}
            typesData={typesData}
            user={user}
          />
        </TabPanel>
        <TabPanel>
          <Types types={types} user={user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;

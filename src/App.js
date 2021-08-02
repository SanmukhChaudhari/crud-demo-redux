import logo from './logo.svg';
import './App.css';
import Header from './screens/layouts/Header';
import ProductList from './screens/products/ProductList';
import AddProduct from './screens/products/AddProduct';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const products = [
    {
    name:"First Item",
    price:12500,
    desc:"Description of the product"
    },
    {
      name:"Second Item",
      price:13000,
      desc:"Description of the product2   "
    }
  ];
  return (
    <div className="App">
      {/* <Header/> */}
      <Provider store={store}>
      <AddProduct/>
      <ProductList/>
      </Provider>
    </div>
  );
}

export default App;

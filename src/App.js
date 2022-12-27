
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Shop from './components/Shop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Signup from './login/Signup';
import Nav from './components/Nav';
import { UserProvider } from './components/userContext';
import ProductAdmin from './components/ProductAdmin';
import EditProducts from './components/EditProducts';
import Cart from './components/Cart';
import PaymentSuccess from './components/PaymentSuccess';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <UserProvider>
    <Routes>
      <Route path="/" element={<Nav/>}>
<Route index element={<Shop/>} />
<Route path="products" element={<ProductAdmin/>} />
<Route path="cart-item" element={<Cart/>} />
<Route path="edit-products/:proid" element={<EditProducts/>} />
<Route path="pay-success" element={<PaymentSuccess/>} />
      </Route>
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup/>} />
     
    </Routes>
    </UserProvider>

    </BrowserRouter>
    </div>
  );
}

export default App;

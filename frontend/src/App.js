import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Navbar from './Component/Navbar';
import Cart from './Pages/Cart';
import Footer from './Component/Footer'
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import ProductPreview from './Pages/ProductPreview';
// import { AuthProvider } from './Context/AuthContext';

const product = {
  title: 'Cool Sneakers',
  description: 'These are the coolest sneakers you will ever find!',
  price: 129.99,
  images: [
    'https://via.placeholder.com/400x400?text=Main+Image',
    'https://via.placeholder.com/400x400?text=Image+1',
    'https://via.placeholder.com/400x400?text=Image+2',
    'https://via.placeholder.com/400x400?text=Image+3'
  ]
};


function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/product/:id" element={<ProductPreview product={product} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;

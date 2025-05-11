// App.js
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';
import About from './Pages/About';
import Navbar from './Component/Navbar';
import Cart from './Pages/Cart';
import Footer from './Component/Footer';
import Product from './Pages/Product';
import Contact from './Pages/Contact';
import ProductPreview from './Pages/ProductPreview';
import { AuthProvider } from './Context/AuthContext'; // Import AuthProvider

const AppContent = () => {
  const location = useLocation();
  const noNavbarPaths = ['/login', '/signup'];
  const noFooterPaths = ['/login', '/signup']; 

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductPreview />} />
      </Routes>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav'
import Maincomp from './components/home/Maincomp';
import Banner from './components/home/Banner';
import Footer from './components/footer/Footer';
import SignUp from './components/signup_sign/SignUp';
import Signin from './components/signup_sign/Sign_in';
import { Routes,Route} from "react-router-dom";
import Cart from './components/cart/cart';
import Buynow from './components/buynow/Buynow';
function App() {
  return (
  <>
    <Navbar/>
    <Newnav/>
    <Routes>
      <Route path="/" element={<Maincomp/>} />
      <Route path="/login" element={<Signin/>} />
      <Route path="/register" element={<SignUp/>} />
      <Route path="/getproductsone/:id" element={<Cart/>} />
      <Route path="/buynow" element={<Buynow/>} />
    </Routes>
    <Footer/>
  </>
  );
}

export default App;

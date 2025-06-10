import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Registro from "./Components/Registro";
import Productos from "./Components/Productos";
import Productores from "./Components/Productores";
import ProductorDetail from "./Components/ProductorDetail";
import ProductoDetail from "./Components/ProductoDetail";
import Carrito from "./Components/Carrito";
import Login from "./Components/Login";
import QuienesSomos from "./Components/QuienesSomos"; // ✅ Agregado

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Productos />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/productores/:productorId" element={<ProductorDetail />} />
        <Route path="/productos/:productoId" element={<ProductoDetail />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} /> {/* ✅ NUEVA ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

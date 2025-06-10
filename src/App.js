import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Productos from "./Components/Productos";
import Productores from "./Components/Productores";
import ProductorDetail from "./Components/ProductorDetail";
import ProductoDetail from "./Components/ProductoDetail";
import Carrito from "./Components/Carrito"; // 👈 Importa el nuevo componente
import RegistroEmp from "./Components/RegistroEmp";
import RegistroProducto from "./Components/RegistroProducto";
import CompraProducto from "./Components/CompraProducto";

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
        <Route path="/carrito" element={<Carrito />} /> {/* 👈 Nueva ruta */}
        <Route path="/formulario" element={<RegistroEmp/>} />
        <Route path="/registro-producto" element={<RegistroProducto />} />
        <Route path="/compra" element={<CompraProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

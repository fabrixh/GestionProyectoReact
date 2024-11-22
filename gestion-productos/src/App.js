import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const mockData = [
  { id: 1, nombre: "Auriculares Inalámbricos", precio: 120, categoria: "Electrónica" },
  { id: 2, nombre: "Silla de Escritorio", precio: 300, categoria: "Muebles" },
  { id: 3, nombre: "Cafetera Espresso", precio: 250, categoria: "Electrodomésticos" },
  { id: 4, nombre: "Juego de Mesa - Monopoly", precio: 50, categoria: "Juguetes" },
  { id: 5, nombre: "Libro de Programación en JavaScript", precio: 35, categoria: "Libros" },
];

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    categoria: "",
  });

  useEffect(() => {
    // Simula un timeout de carga inicial
    setTimeout(() => {
      setProducts(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.nombre || !newProduct.precio || !newProduct.categoria) {
      alert("Todos los campos son obligatorios");
      return;
    }
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...newProduct,
        precio: parseFloat(newProduct.precio),
      },
    ]);
    setNewProduct({ nombre: "", precio: "", categoria: "" });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Gestión de Productos</h1>
      {isLoading ? (
        <ClipLoader size={50} color="#123abc" />
      ) : (
        <table style={{ margin: "0 auto", border: "1px solid black" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>${product.precio}</td>
                <td>{product.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={newProduct.nombre}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={newProduct.categoria}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default App;

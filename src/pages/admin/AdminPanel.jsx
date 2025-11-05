import React, { useState, useEffect } from "react";
import { productos as productosIniciales } from "../../data/data";

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    oferta: false,
    imagen: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("productos"));
    if (almacenados && almacenados.length > 0) {
      setProductos(almacenados);
    } else {
      setProductos(productosIniciales);
      localStorage.setItem("productos", JSON.stringify(productosIniciales));
    }
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar producto (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.categoria) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    let nuevosProductos;
    if (modoEdicion) {
      nuevosProductos = productos.map((p) =>
        p.id === formData.id ? { ...formData } : p
      );
    } else {
      const nuevoProducto = {
        ...formData,
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
      };
      nuevosProductos = [...productos, nuevoProducto];
    }

    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    setFormData({
      id: null,
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      oferta: false,
      imagen: "",
    });
    setModoEdicion(false);
  };

  // Editar producto
  const handleEdit = (producto) => {
    setFormData(producto);
    setModoEdicion(true);
  };

  // Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const actualizados = productos.filter((p) => p.id !== id);
      setProductos(actualizados);
      localStorage.setItem("productos", JSON.stringify(actualizados));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Panel de Administración</h2>
      <div className="row">
        {/* Formulario */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">
              {modoEdicion ? "Editar Producto" : "Nuevo Producto"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Precio *</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Categoría *</label>
                <select
                  className="form-select"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Higiene">Higiene</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-2 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="oferta"
                  checked={formData.oferta}
                  onChange={handleChange}
                />
                <label className="form-check-label">En oferta</label>
              </div>

              <div className="mb-3">
                <label className="form-label">URL de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {modoEdicion ? "Guardar cambios" : "Agregar producto"}
              </button>
            </form>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Lista de productos ({productos.length})</h5>
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Oferta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString("es-CL")}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.oferta ? "Sí" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(producto)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(producto.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No hay productos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

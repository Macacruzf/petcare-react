// src/pages/auth/Perfil.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerUsuarioPorId, cambiarPassword } from '../../services/usuarioService';
import { Link } from 'react-router-dom';

export default function Perfil() {
  const { usuario } = useAuth();

  const [datosCompletos, setDatosCompletos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados cambio contraseña
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [exitoPassword, setExitoPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

  // ==============================
  // CARGAR DATOS DEL USUARIO
  // ==============================
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      if (!usuario?.id) {
        setError('No se encontró información del usuario');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const datos = await obtenerUsuarioPorId(usuario.id);
        setDatosCompletos(datos);
      } catch (err) {
        setError('Error al cargar los datos del perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosUsuario();
  }, [usuario]);

  // ==============================
  // CAMBIAR CONTRASEÑA
  // ==============================
  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    setErrorPassword('');
    setExitoPassword('');

    if (!passwordActual || !passwordNueva || !passwordConfirmar) {
      setErrorPassword('Todos los campos son obligatorios');
      return;
    }

    if (passwordNueva !== passwordConfirmar) {
      setErrorPassword('Las contraseñas nuevas no coinciden');
      return;
    }

    if (passwordNueva.length < 4) {
      setErrorPassword('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    if (passwordActual === passwordNueva) {
      setErrorPassword('La nueva contraseña debe ser distinta a la actual');
      return;
    }

    try {
      setLoadingPassword(true);

      // ✅ SIN ID — el backend usa el JWT
      await cambiarPassword(passwordActual, passwordNueva);

      setExitoPassword('Contraseña cambiada exitosamente');
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordConfirmar('');

      setTimeout(() => {
        setMostrarCambioPassword(false);
        setExitoPassword('');
      }, 2000);

    } catch (err) {
      setErrorPassword(err.message || 'Error al cambiar la contraseña');
    } finally {
      setLoadingPassword(false);
    }
  };

  // ==============================
  // ESTADOS DE CARGA / ERROR
  // ==============================
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" />
        <p className="text-muted mt-2">Cargando perfil...</p>
      </div>
    );
  }

  if (error || !datosCompletos) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error || 'No se pudo cargar la información del perfil'}
        </div>
        <Link to="/" className="btn btn-success">Volver al inicio</Link>
      </div>
    );
  }

  // ==============================
  // RENDER
  // ==============================
  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>

      {/* ENCABEZADO */}
      <div className="text-center mb-5">
        <i className="fa-solid fa-user-circle fa-5x text-success mb-3"></i>
        <h2 className="fw-bold text-success">Mi Perfil</h2>
        <p className="text-muted">Información de tu cuenta</p>
      </div>

      {/* INFO USUARIO */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold text-success border-bottom pb-2 mb-3">
            <i className="fa-solid fa-id-card me-2"></i>
            Información Personal
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <strong>Nombre</strong>
              <div className="bg-light p-2 rounded">{datosCompletos.nombre}</div>
            </div>

            <div className="col-md-6">
              <strong>Email</strong>
              <div className="bg-light p-2 rounded">{datosCompletos.email}</div>
            </div>

            <div className="col-md-6">
              <strong>Teléfono</strong>
              <div className="bg-light p-2 rounded">
                {datosCompletos.telefono || 'No especificado'}
              </div>
            </div>

            {datosCompletos.direccion && (
              <div className="col-12">
                <strong>Dirección</strong>
                <div className="bg-light p-2 rounded">{datosCompletos.direccion}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEGURIDAD */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-success mb-0">
              <i className="fa-solid fa-lock me-2"></i>
              Seguridad
            </h5>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => {
                setMostrarCambioPassword(!mostrarCambioPassword);
                setErrorPassword('');
                setExitoPassword('');
                setPasswordActual('');
                setPasswordNueva('');
                setPasswordConfirmar('');
              }}
            >
              {mostrarCambioPassword ? 'Cancelar' : 'Cambiar Contraseña'}
            </button>
          </div>

          {mostrarCambioPassword && (
            <form onSubmit={handleCambiarPassword}>
              {errorPassword && <div className="alert alert-danger">{errorPassword}</div>}
              {exitoPassword && <div className="alert alert-success">{exitoPassword}</div>}

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Contraseña actual"
                value={passwordActual}
                onChange={e => setPasswordActual(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Nueva contraseña"
                value={passwordNueva}
                onChange={e => setPasswordNueva(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirmar nueva contraseña"
                value={passwordConfirmar}
                onChange={e => setPasswordConfirmar(e.target.value)}
              />

              <button className="btn btn-success w-100" disabled={loadingPassword}>
                {loadingPassword ? 'Cambiando...' : 'Cambiar contraseña'}
              </button>
            </form>
          )}

          {!mostrarCambioPassword && (
            <p className="text-muted mb-0">
              Haz clic en “Cambiar Contraseña” para actualizarla de forma segura.
            </p>
          )}
        </div>
      </div>

      {/* BOTONES */}
      <div className="d-flex justify-content-center gap-2 mt-4">
        <Link to="/" className="btn btn-outline-success">Inicio</Link>
        {usuario?.rol !== 'ADMIN' && (
          <Link to="/mis-pedidos" className="btn btn-success">Mis pedidos</Link>
        )}
      </div>
    </div>
  );
}

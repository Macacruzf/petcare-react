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
  
  // Estados para cambiar contraseña
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmar, setPasswordConfirmar] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [exitoPassword, setExitoPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

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
        setError('Error al cargar los datos del perfil: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosUsuario();
  }, [usuario]);

  const handleCambiarPassword = async (e) => {
    e.preventDefault();
    setErrorPassword('');
    setExitoPassword('');

    // Validaciones
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
      setErrorPassword('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    try {
      setLoadingPassword(true);
      await cambiarPassword(usuario.id, passwordActual, passwordNueva);
      
      setExitoPassword('Contraseña cambiada exitosamente');
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordConfirmar('');
      
      // Ocultar formulario después de 2 segundos
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

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
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

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      {/* Encabezado */}
      <div className="text-center mb-5">
        <div className="mb-3">
          <i className="fa-solid fa-user-circle fa-5x text-success"></i>
        </div>
        <h2 className="fw-bold text-success mb-2">Mi Perfil</h2>
        <p className="text-muted">Información de tu cuenta</p>
      </div>

      {/* Tarjeta de información */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          {/* Información Personal */}
          <div className="mb-4">
            <h5 className="fw-bold text-success mb-3 border-bottom pb-2">
              <i className="fa-solid fa-id-card me-2"></i>
              Información Personal
            </h5>
            
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">Nombre Completo</label>
                <div className="p-2 bg-light rounded">
                  <i className="fa-solid fa-user me-2 text-success"></i>
                  {datosCompletos.nombre}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">Correo Electrónico</label>
                <div className="p-2 bg-light rounded">
                  <i className="fa-solid fa-envelope me-2 text-success"></i>
                  {datosCompletos.email}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">Teléfono</label>
                <div className="p-2 bg-light rounded">
                  <i className="fa-solid fa-phone me-2 text-success"></i>
                  {datosCompletos.telefono || 'No especificado'}
                </div>
              </div>
            </div>
          </div>

          {/* Dirección */}
          {datosCompletos.direccion && (
            <div className="mb-4">
              <h5 className="fw-bold text-success mb-3 border-bottom pb-2">
                <i className="fa-solid fa-location-dot me-2"></i>
                Dirección
              </h5>
              <div className="p-3 bg-light rounded">
                <i className="fa-solid fa-map-marker-alt me-2 text-success"></i>
                {datosCompletos.direccion}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sección de Cambio de Contraseña */}
      <div className="card border-0 shadow-sm mt-4">
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
              {errorPassword && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="fa-solid fa-exclamation-circle me-2"></i>
                  {errorPassword}
                  <button type="button" className="btn-close" onClick={() => setErrorPassword('')}></button>
                </div>
              )}

              {exitoPassword && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fa-solid fa-check-circle me-2"></i>
                  {exitoPassword}
                  <button type="button" className="btn-close" onClick={() => setExitoPassword('')}></button>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-bold">Contraseña Actual</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                  disabled={loadingPassword}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  disabled={loadingPassword}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  disabled={loadingPassword}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-success w-100"
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Cambiando...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-key me-2"></i>
                    Cambiar Contraseña
                  </>
                )}
              </button>
            </form>
          )}

          {!mostrarCambioPassword && (
            <p className="text-muted mb-0">
              <i className="fa-solid fa-info-circle me-2"></i>
              Haz clic en "Cambiar Contraseña" para actualizar tu contraseña de forma segura.
            </p>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="d-flex gap-2 mt-4 justify-content-center">
        <Link to="/" className="btn btn-outline-success">
          <i className="fa-solid fa-home me-2"></i>
          Volver al inicio
        </Link>
        {usuario?.rol !== 'ADMIN' && (
          <Link to="/mis-pedidos" className="btn btn-success">
            <i className="fa-solid fa-box me-2"></i>
            Ver mis pedidos
          </Link>
        )}
      </div>

      {/* Nota informativa */}
      <div className="alert alert-info mt-4 text-center">
        <i className="fa-solid fa-info-circle me-2"></i>
        Si necesitas actualizar tu información, contacta con el administrador.
      </div>
    </div>
  );
}

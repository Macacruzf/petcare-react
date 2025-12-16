// src/pages/auth/Perfil.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerUsuarioPorId, cambiarPassword } from '../../services/usuarioService';
import { Link } from 'react-router-dom';
import ojo from '../../assets/images/ojo.png';

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

  // Estados para mostrar/ocultar contraseñas
  const [mostrarPasswordActual, setMostrarPasswordActual] = useState(false);
  const [mostrarPasswordNueva, setMostrarPasswordNueva] = useState(false);
  const [mostrarPasswordConfirmar, setMostrarPasswordConfirmar] = useState(false);

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

      // SIN ID — el backend usa el JWT
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
    <div className="container py-5" style={{ maxWidth: '900px' }}>

      {/* ENCABEZADO */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success mb-2">Mi Perfil</h2>
        <p className="text-muted">Administra la información de tu cuenta</p>
      </div>

      {/* INFO USUARIO */}
      <div className="card border-0 shadow mb-4">
        <div className="card-header bg-success text-white py-3">
          <h5 className="mb-0 fw-bold">
            <i className="fa-solid fa-id-card me-2"></i>
            Información Personal
          </h5>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            {/* Nombre */}
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                  <i className="fa-solid fa-user text-success"></i>
                </div>
                <div className="flex-grow-1">
                  <small className="text-muted d-block mb-1">Nombre</small>
                  <p className="mb-0 fw-semibold">{datosCompletos.nombre}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                  <i className="fa-solid fa-envelope text-success"></i>
                </div>
                <div className="flex-grow-1">
                  <small className="text-muted d-block mb-1">Email</small>
                  <p className="mb-0 fw-semibold">{datosCompletos.email}</p>
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                  <i className="fa-solid fa-phone text-success"></i>
                </div>
                <div className="flex-grow-1">
                  <small className="text-muted d-block mb-1">Teléfono</small>
                  <p className="mb-0 fw-semibold">
                    {datosCompletos.telefono || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Dirección */}
            {datosCompletos.direccion && (
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                    <i className="fa-solid fa-location-dot text-success"></i>
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted d-block mb-1">Dirección</small>
                    <p className="mb-0 fw-semibold">{datosCompletos.direccion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEGURIDAD */}
      <div className="card border-0 shadow">
        <div className="card-header bg-success text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">
              <i className="fa-solid fa-lock me-2"></i>
              Seguridad
            </h5>
            <button
              className="btn btn-light btn-sm"
              onClick={() => {
                setMostrarCambioPassword(!mostrarCambioPassword);
                setErrorPassword('');
                setExitoPassword('');
                setPasswordActual('');
                setPasswordNueva('');
                setPasswordConfirmar('');
              }}
            >
              <i className={`fa-solid ${mostrarCambioPassword ? 'fa-times' : 'fa-key'} me-2`}></i>
              {mostrarCambioPassword ? 'Cancelar' : 'Cambiar Contraseña'}
            </button>
          </div>
        </div>
        <div className="card-body p-4">
          {mostrarCambioPassword ? (
            <form onSubmit={handleCambiarPassword}>
              {errorPassword && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="fa-solid fa-exclamation-circle me-2"></i>
                  {errorPassword}
                </div>
              )}
              {exitoPassword && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fa-solid fa-check-circle me-2"></i>
                  {exitoPassword}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="fa-solid fa-lock me-2 text-success"></i>
                  Contraseña Actual
                </label>
                <div className="input-group">
                  <input
                    type={mostrarPasswordActual ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Ingresa tu contraseña actual"
                    value={passwordActual}
                    onChange={e => setPasswordActual(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setMostrarPasswordActual(!mostrarPasswordActual)}
                  >
                    <img src={ojo} alt="Ver contraseña" style={{ width: '20px', height: '20px', opacity: mostrarPasswordActual ? 0.5 : 1 }} />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="fa-solid fa-key me-2 text-success"></i>
                  Nueva Contraseña
                </label>
                <div className="input-group">
                  <input
                    type={mostrarPasswordNueva ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Ingresa tu nueva contraseña"
                    value={passwordNueva}
                    onChange={e => setPasswordNueva(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setMostrarPasswordNueva(!mostrarPasswordNueva)}
                  >
                    <img src={ojo} alt="Ver contraseña" style={{ width: '20px', height: '20px', opacity: mostrarPasswordNueva ? 0.5 : 1 }} />
                  </button>
                </div>
                <small className="text-muted">Mínimo 4 caracteres</small>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fa-solid fa-check-double me-2 text-success"></i>
                  Confirmar Nueva Contraseña
                </label>
                <div className="input-group">
                  <input
                    type={mostrarPasswordConfirmar ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Confirma tu nueva contraseña"
                    value={passwordConfirmar}
                    onChange={e => setPasswordConfirmar(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setMostrarPasswordConfirmar(!mostrarPasswordConfirmar)}
                  >
                    <img src={ojo} alt="Ver contraseña" style={{ width: '20px', height: '20px', opacity: mostrarPasswordConfirmar ? 0.5 : 1 }} />
                  </button>
                </div>
              </div>

              <button 
                className="btn btn-success btn-lg w-100" 
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Cambiando contraseña...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-save me-2"></i>
                    Guardar Nueva Contraseña
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <i className="fa-solid fa-shield-halved fa-3x text-success mb-3"></i>
              <p className="text-muted mb-0">
                Tu contraseña está protegida. Haz clic en "Cambiar Contraseña" para actualizarla.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTONES */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/" className="btn btn-outline-success btn-lg">
          <i className="fa-solid fa-home me-2"></i>
          Inicio
        </Link>
        {usuario?.rol !== 'ADMIN' && (
          <Link to="/mis-pedidos" className="btn btn-success btn-lg">
            <i className="fa-solid fa-box me-2"></i>
            Mis Pedidos
          </Link>
        )}
      </div>
    </div>
  );
}

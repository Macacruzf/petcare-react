export default function Footer() {
  return (
    <footer className="mt-auto py-4 bg-light border-top">
      <div className="container text-center small">
        <div>© {new Date().getFullYear()} PetCare. Todos los derechos reservados.</div>
        <div className="text-muted">Hecho con React + Vite + Bootstrap</div>
      </div>
    </footer>
  )
}

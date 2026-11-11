function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-surface p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          StudyFlow Frontend
        </h1>
        <p className="text-neutral-medium">
          React, Vite y Tailwind configurados correctamente.
        </p>
        <button className="mt-6 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-colors">
          Probar Botón
        </button>
      </div>
    </div>
  )
}

export default App
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Test Yatalko Colors */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Bienvenue sur Yatalko
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            La plateforme d&apos;entraide academique pour les etudiants de l&apos;UCAD
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Rejoindre gratuitement
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette Test Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Palette de couleurs Yatalko
          </h2>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Couleurs Primaires (Vert)</h3>
            <div className="flex flex-wrap gap-2">
              <div className="w-20 h-20 bg-primary-50 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">50</span>
              </div>
              <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">100</span>
              </div>
              <div className="w-20 h-20 bg-primary-200 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">200</span>
              </div>
              <div className="w-20 h-20 bg-primary-300 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">300</span>
              </div>
              <div className="w-20 h-20 bg-primary-400 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">400</span>
              </div>
              <div className="w-20 h-20 bg-primary-500 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">500</span>
              </div>
              <div className="w-20 h-20 bg-primary-600 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">600</span>
              </div>
              <div className="w-20 h-20 bg-primary-700 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">700</span>
              </div>
              <div className="w-20 h-20 bg-primary-800 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">800</span>
              </div>
              <div className="w-20 h-20 bg-primary-900 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">900</span>
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Couleurs Accent (Jaune)</h3>
            <div className="flex flex-wrap gap-2">
              <div className="w-20 h-20 bg-accent-50 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">50</span>
              </div>
              <div className="w-20 h-20 bg-accent-100 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">100</span>
              </div>
              <div className="w-20 h-20 bg-accent-200 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">200</span>
              </div>
              <div className="w-20 h-20 bg-accent-300 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">300</span>
              </div>
              <div className="w-20 h-20 bg-accent-400 rounded-lg flex items-end p-2">
                <span className="text-xs text-gray-700">400</span>
              </div>
              <div className="w-20 h-20 bg-accent-500 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">500</span>
              </div>
              <div className="w-20 h-20 bg-accent-600 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">600</span>
              </div>
              <div className="w-20 h-20 bg-accent-700 rounded-lg flex items-end p-2">
                <span className="text-xs text-white">700</span>
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Couleurs Semantiques</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-success text-white px-4 py-2 rounded-lg">Success</div>
              <div className="bg-error text-white px-4 py-2 rounded-lg">Error</div>
              <div className="bg-warning text-white px-4 py-2 rounded-lg">Warning</div>
              <div className="bg-info text-white px-4 py-2 rounded-lg">Info</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Yatalko - Phase 0 Setup Complete
          </p>
        </div>
      </footer>
    </main>
  );
}

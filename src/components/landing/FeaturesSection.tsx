"use client";

import {
  BookOpen,
  MessageSquare,
  HelpCircle,
  Trophy,
  CheckCircle,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Bibliothèque complète",
    description:
      "Accede à des centaines d'anciens sujets d'examen, cours et exercices corrigés, organisés par matière.",
    color: "text-primary-500",
    bgColor: "bg-primary-100",
  },
  {
    icon: MessageSquare,
    title: "Discussions par matière",
    description:
      "Échange avec tes camarades dans des espaces dédiés à chaque matière. Fini le chaos des groupes WhatsApp !",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: HelpCircle,
    title: "Questions / Réponses",
    description:
      "Pose tes questions et obtiens des réponses de qualité. Les meilleures réponses sont mises en avant.",
    color: "text-accent-500",
    bgColor: "bg-accent-100",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description:
      "Gagne des points et des badges en aidant les autres. Monte dans le classement et deviens un expert reconnu !",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    icon: CheckCircle,
    title: "Documents vérifiés",
    description:
      "Les ambassadeurs vérifient la qualité des documents partagés. Tu peux faire confiance aux ressources.",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description:
      "Accède à Yatalko depuis ton téléphone, même avec une connexion 3G. Optimise pour l'Afrique.",
    color: "text-rose-500",
    bgColor: "bg-rose-100",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont tu as besoin pour réussir
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yatalko reunit tous les outils essentiels pour faciliter ton
            parcours académique et t&apos;aider à exceller dans tes études.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

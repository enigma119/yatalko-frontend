"use client";

import { UserPlus, BookMarked, Share2, Award } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Inscris-toi",
    description:
      "Cree ton compte gratuit en 30 secondes avec ton email. Aucune carte bancaire requise.",
  },
  {
    number: 2,
    icon: BookMarked,
    title: "Rejoins tes matieres",
    description:
      "Selectionne ta filiere et ton niveau, puis rejoins les matieres qui t'interessent.",
  },
  {
    number: 3,
    icon: Share2,
    title: "Participe",
    description:
      "Pose des questions, reponds aux autres, partage tes documents. Chaque action compte !",
  },
  {
    number: 4,
    icon: Award,
    title: "Gagne des badges",
    description:
      "Accumule des points, debloque des badges et monte dans le classement de ton universite.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ca marche ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rejoindre Yatalko est simple et rapide. En quelques minutes, tu fais
            partie de la communaute.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-primary-200" />
              )}

              <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mt-2">
                  <step.icon className="w-7 h-7 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

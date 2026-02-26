"use client";

import { GraduationCap } from "lucide-react";

const universities = [
  {
    name: "UCAD",
    fullName: "Universite Cheikh Anta Diop",
    city: "Dakar",
    students: "80,000+",
    active: true,
  },
  {
    name: "UGB",
    fullName: "Universite Gaston Berger",
    city: "Saint-Louis",
    students: "15,000+",
    active: false,
  },
  {
    name: "UASZ",
    fullName: "Universite Assane Seck",
    city: "Ziguinchor",
    students: "8,000+",
    active: false,
  },
  {
    name: "UGBB",
    fullName: "Universite Alioune Diop",
    city: "Bambey",
    students: "5,000+",
    active: false,
  },
];

export default function UniversitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Universites partenaires
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yatalko grandit avec les universites senegalaises. Rejoins la
            communaute de ton campus !
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((uni, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-6 border-2 transition-all ${
                uni.active
                  ? "border-primary-500 bg-primary-50 shadow-md"
                  : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              {/* Active Badge */}
              {uni.active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Actif
                </div>
              )}

              {/* Coming Soon Badge */}
              {!uni.active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Bientot
                </div>
              )}

              {/* University Logo Placeholder */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  uni.active ? "bg-primary-500" : "bg-gray-400"
                }`}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </div>

              {/* University Info */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                {uni.name}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-2">
                {uni.fullName}
              </p>
              <p className="text-xs text-gray-500 text-center">
                {uni.city} - {uni.students} etudiants
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Ton universite n&apos;est pas encore sur Yatalko ?{" "}
            <a
              href="mailto:contact@yatalko.com"
              className="text-primary-600 font-semibold hover:underline"
            >
              Contacte-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

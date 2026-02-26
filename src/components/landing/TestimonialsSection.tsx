"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Yatalko m'a sauve la vie pendant les révisions ! J'ai trouve tous les anciens sujets d'algorithmique en 5 minutes au lieu de chercher pendant des heures sur WhatsApp.",
    author: "Fatou Sarr",
    role: "L3 Informatique",
    avatar: "FS",
    color: "bg-primary-500",
  },
  {
    quote:
      "Enfin une plateforme ou je peux poser mes questions sans me faire ignorer. Les réponses sont rapides et de qualité. Et en plus, je gagne des points !",
    author: "Mamadou Diallo",
    role: "L2 Informatique",
    avatar: "MD",
    color: "bg-blue-500",
  },
  {
    quote:
      "En tant qu'ambassadeur, je suis fier de pouvoir aider les étudiants de ma filière. Yatalko a vraiment change la façon dont on partage les ressources.",
    author: "Aminata Ndiaye",
    role: "M1 Informatique - Ambassadeur",
    avatar: "AN",
    color: "bg-accent-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent les étudiants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des centaines d&apos;étudiants utilisent déjà Yatalko pour réussir
            leurs études. Découvre leurs témoignages.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 relative hover:shadow-md transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary-200 absolute top-6 right-6" />

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

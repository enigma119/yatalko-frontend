"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

export default function CTASection() {
  return (
    <section className="py-20 bg-linear-to-r from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>100% gratuit, pour toujours</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pret a rejoindre la communaute ?
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Inscription gratuite en 30 secondes. Aucune carte bancaire requise.
          Commence a partager et apprendre des maintenant !
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50 w-full sm:w-auto"
            >
              Creer mon compte gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="secondary"
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
            >
              J&apos;ai deja un compte
            </Button>
          </Link>
        </div>

        {/* Trust Badge */}
        <p className="text-primary-200 text-sm mt-8">
          Deja plus de 500+ etudiants nous font confiance
        </p>
      </div>
    </section>
  );
}

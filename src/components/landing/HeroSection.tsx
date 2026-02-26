"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Ton espace d&apos;entraide academique à l&apos;
              <span className="text-accent-400">UCAD</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Trouve des anciens sujets d&apos;examen, pose tes questions, partage
              tes documents. Rejoins la communauté étudiante Yatalko et reussis
              ensemble.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50 w-full sm:w-auto"
                >
                  Rejoindre gratuitement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white text-white hover:bg-white/10 bg-primary-600  w-full sm:w-auto"
                >
                  Découvrir
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-400" />
                <span>500+ étudiants</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-400" />
                <span>1000+ documents</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent-400" />
                <span>50+ matières</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 z-10 bg-white rounded-xl shadow-xl p-4 transform -rotate-6 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      Sujet Algo 2024
                    </p>
                    <p className="text-gray-500 text-xs">Vérifié</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 z-10 bg-white rounded-xl shadow-xl p-4 transform rotate-6 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <span className="text-accent-600 font-bold">+15</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      Points gagnes!
                    </p>
                    <p className="text-gray-500 text-xs">Réponse acceptée</p>
                  </div>
                </div>
              </div>

              {/* Main Illustration */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
                <Image
                  src="/images/illustration.webp"
                  alt="Etudiants collaborant sur Yatalko"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain rounded-2xl"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
}

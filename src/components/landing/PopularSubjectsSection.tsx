"use client";

import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui";

const subjects = [
  {
    name: "Algorithmique",
    code: "INFO201",
    level: "L2",
    semester: "S3",
    posts: 128,
    documents: 45,
    members: 234,
  },
  {
    name: "Bases de Données",
    code: "INFO203",
    level: "L2",
    semester: "S3",
    posts: 96,
    documents: 38,
    members: 189,
  },
  {
    name: "Programmation Orientée Objet",
    code: "INFO202",
    level: "L2",
    semester: "S3",
    posts: 112,
    documents: 52,
    members: 256,
  },
  {
    name: "Réseaux",
    code: "INFO204",
    level: "L2",
    semester: "S4",
    posts: 78,
    documents: 29,
    members: 167,
  },
  {
    name: "Systèmes d'Exploitation",
    code: "INFO205",
    level: "L2",
    semester: "S4",
    posts: 64,
    documents: 23,
    members: 145,
  },
  {
    name: "Développement Web",
    code: "INFO206",
    level: "L2",
    semester: "S4",
    posts: 89,
    documents: 41,
    members: 198,
  },
];

export default function PopularSubjectsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Matières populaires
            </h2>
            <p className="text-gray-600">
              Découvre les matières les plus actives sur Yatalko
            </p>
          </div>
          <Link href="/subjects">
            <Button variant="ghost" className="group">
              Voir toutes les matières
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Subjects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Link
              key={index}
              href={`/subjects/${index + 1}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {subject.code} - {subject.level} - {subject.semester}
                  </p>
                </div>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                  {subject.level}
                </span>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{subject.posts}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{subject.documents}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{subject.members}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

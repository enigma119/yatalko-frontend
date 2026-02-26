"use client";

import { Users, FileText, MessageSquare, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Étudiants actifs",
    color: "text-primary-500",
    bgColor: "bg-primary-100",
  },
  {
    icon: FileText,
    value: "1,200+",
    label: "Documents partagés",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    value: "3,000+",
    label: "Questions résolues",
    color: "text-accent-500",
    bgColor: "bg-accent-100",
  },
  {
    icon: Award,
    value: "15K+",
    label: "Points attribués",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div
                className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

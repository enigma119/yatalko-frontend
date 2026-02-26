"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: {
    title: "Produit",
    links: [
      { label: "Fonctionnalites", href: "#features" },
      { label: "Comment ca marche", href: "#how-it-works" },
      { label: "Temoignages", href: "#testimonials" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  resources: {
    title: "Ressources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guide etudiant", href: "/guide" },
      { label: "Centre d'aide", href: "/help" },
      { label: "Devenir ambassadeur", href: "/ambassador" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique de confidentialite", href: "/privacy" },
      { label: "Mentions legales", href: "/legal" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/yatalko", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/yatalko", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/yatalko", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/yatalko", label: "LinkedIn" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <span className="text-xl font-bold">Yatalko</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              La plateforme d&apos;entraide des etudiants universitaires au
              Senegal. Partage, apprends, reussis ensemble.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:contact@yatalko.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  contact@yatalko.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Dakar, Senegal</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              {currentYear} Yatalko. Tous droits reserves.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

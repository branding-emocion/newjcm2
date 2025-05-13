"use client";

import { motion } from "framer-motion";
import { Facebook, Globe, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <motion.h3
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              JCM CONSTRUCCIONES SAC{" "}
            </motion.h3>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Calidad y diseño de construcciones en el Perú
            </motion.p>
          </div>
          <div className="flex space-x-6">
            <motion.a
              href="https://www.facebook.com/jcmtrujillo/"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook />
            </motion.a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} JCM Constructora Inmobiliaria. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Globe,
  Instagram,
  InstagramIcon,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";

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
              href="https://www.instagram.com/jcm_constructorainmobiliaria/"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-6 w-6 flex justify-center items-center" />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@jcminmobiliariaperu"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex justify-center items-center"
              >
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/jcmtrujillo/"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-6 w-6 flex justify-center items-center" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@jcminmobiliaria3542"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube cclassName="h-7 w-7 flex justify-center items-center" />
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

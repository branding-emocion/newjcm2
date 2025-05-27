"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  InstagramIcon,
  Facebook,
  Youtube,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <ContactSection />
      <MapSection />
    </main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative h-[50vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Contacto.jpg"
          alt="Contáctenos - JCM Constructora Inmobiliaria"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            CONTÁCTENOS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={
              isInView
                ? { opacity: 1, width: "100px" }
                : { opacity: 0, width: 0 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1 bg-blue-500 mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl text-white/90 leading-relaxed"
          >
            Estamos aquí para responder a todas sus consultas y ayudarle a
            encontrar la propiedad de sus sueños. Contáctenos hoy mismo y
            descubra por qué somos la mejor opción inmobiliaria en Trujillo.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formStatus, setFormStatus] = useState({ state: null, message: "" });
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: "",
    // proyecto: "general",
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Cambiar estado a cargando
    setFormStatus({ state: "loading", message: "Enviando mensaje..." });

    try {
      // Enviar datos a la API real
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        setFormStatus({
          state: "success",
          message:
            "¡Mensaje enviado con éxito! Nos pondremos en contacto con usted a la brevedad.",
        });
        // Resetear el formulario
        setFormData({
          nombres: "",
          apellidos: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        // Si hubo un error en la respuesta
        const errorData = await response.json();
        setFormStatus({
          state: "error",
          message:
            errorData.message ||
            "Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus({
        state: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.",
      });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Dirección",
      details: [
        "Calle Los Granados Nº 403 Sub Lote 18 Dpto 801",
        "Urb. California, Victor Larco Herrera",
        "Trujillo, Perú",
      ],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Teléfonos",
      details: ["Oficina: 044 545783", "Ventas: 947 455 553"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@jcmconstructora.com", "ventas@jcmconstructora.com"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horario de Atención",
      details: [
        "Lunes a Viernes: 9:00 am - 6:00 pm",
        "Sábados: 9:00 am - 1:00 pm",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Datos de Contacto
            </h2>
            <div className="w-20 h-1 bg-[#193148] mb-8"></div>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center #193148 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <div className="text-gray-600">
                      {item.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Síguenos en redes sociales
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/jcm_constructorainmobiliaria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-[#193148] text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <InstagramIcon className="h-6 w-6 flex justify-center items-center" />
                </a>
                <a
                  href="https://www.tiktok.com/@jcminmobiliariaperu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-[#193148] text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
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
                </a>
                <a
                  href="https://www.facebook.com/jcmtrujillo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-[#193148] text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-6 w-6 flex justify-center items-center" />
                </a>
                <a
                  href="https://www.youtube.com/@jcminmobiliaria3542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-[#193148] text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Youtube cclassName="h-7 w-7 flex justify-center items-center" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-xl border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envíenos un mensaje
            </h2>

            {formStatus.state === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start mb-6"
              >
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{formStatus.message}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombres"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombres *
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apellidos"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono o Celular *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="proyecto"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Proyecto de interés
                  </label>
                  <select
                    id="proyecto"
                    name="proyecto"
                    value={formData.proyecto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="general">Información general</option>
                    <option value="hortensias">Las Hortensias 269</option>
                    <option value="begonias">Las Begonias</option>
                    <option value="otro">Otro proyecto</option>
                  </select>
                </div> */}

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="h-4 w-4 #193148 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Acepto la{" "}
                    <a href="#" className="#193148 hover:underline">
                      política de privacidad
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.state === "loading"}
                  className="w-full bg-[#193148] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {formStatus.state === "loading" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestra Ubicación
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visítenos en nuestra oficina central ubicada en una zona estratégica
            de Trujillo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="rounded-lg overflow-hidden shadow-xl h-[500px] relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.659273825501!2d-79.03345089999999!3d-8.136127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d69b4d39025%3A0x9f42288207e9ca5a!2sAv.%20Huam%C3%A1n%20830%2C%20V%C3%ADctor%20Larco%20Herrera%2013009%2C%20Per%C3%BA!5e0!3m2!1ses-419!2sco!4v1747081577285!5m2!1ses-419!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center #193148 mr-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  JCM Constructora Inmobiliaria
                </h3>
                <p className="text-gray-600">
                  Calle Los Granados Nº 403 Sub Lote 18 Dpto 801, Urb.
                  California, Victor Larco Herrera - Trujillo
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

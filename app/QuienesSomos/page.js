"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Building, Users, Award, Target, Clock } from "lucide-react";

export default function QuienesSomosPage() {
  return (
    <main className="pt-20">
      <HeroSection />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
      <MilestonesSection />
    </main>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/equipo.jpg"
          alt="Equipo JCM Constructora Inmobiliaria"
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
            NOSOTROS
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
            Estamos presente en el sector de la construcción desde el inicio del
            crecimiento inmobiliario en el Perú, dimos vida a la empresa de
            construcciones C&D Construcciones S.R.L a fines del año 2005, hoy
            Gruppo CADEZA CONSTRUCTORA INMOBILIARIA.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function HistorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nuestra Historia
            </h2>
            <div className="w-20 h-1 bg-blue-600 mb-8"></div>

            <div className="space-y-6 text-gray-700">
              <p>
                En el 2011, un periodo en el que comenzó un largo proceso de
                construcciones en el Perú, se dio vida a una empresa de
                construcción denominada Cadeza Construcciones s.a.c con el
                objetivo de ser innovador y construir edificios con modernos
                departamentos, poniendo una especial atención a sus acabados.
              </p>
              <p>
                La compañía sigue existiendo hasta la fecha, y se han realizado
                exitosos proyectos, entre las que se mencionan la construcción
                de varios edificios multifamiliares en el Departamento de la
                Libertad, provincia de Trujillo, distrito de Trujillo.
              </p>
              <p>
                Estas iniciativas conducen a la construcción y venta de una
                docena de edificios residenciales de nuevo diseño, la
                intervención dura desde 1998 hasta la fecha.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/equipo.jpg"
                alt="Historia de JCM Constructora"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const values = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Excelencia",
      description:
        "Buscamos la perfección en cada detalle de nuestros proyectos inmobiliarios.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Compromiso",
      description:
        "Nos comprometemos con nuestros clientes para superar sus expectativas.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Calidad",
      description:
        "Utilizamos materiales y acabados de primera calidad en todas nuestras construcciones.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Innovación",
      description:
        "Implementamos las últimas tendencias y tecnologías en diseño y construcción.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Valores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estos principios fundamentales guían nuestro trabajo diario y nos
            ayudan a ofrecer proyectos inmobiliarios de la más alta calidad.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-blue-600 mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contamos con profesionales altamente calificados y comprometidos con
            la excelencia en cada proyecto.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/equipo.jpg"
              alt="Equipo de JCM Constructora"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Con el grupo CADEZA CONSTRUCTORA INMOBILIARIA asume un
                compromiso con sus clientes
              </h3>
              <p className="text-white/90 max-w-3xl">
                A partir del año 2018, se funda JCM CONSTRUCCIONES E
                INMOBILIARIA S.A.C. empresa que tiene como visión ser líder en
                la ciudad de Trujillo en el diseño, construcción y venta de
                amplios departamentos bien iluminados con una excelente
                ubicación, acabados europeos de lujo, pero sobre todo nuestra
                misión es alcanzar un óptimo aporte calidad-precio.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MilestonesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const milestones = [
    {
      year: "1998",
      title: "Primeros Pasos",
      description:
        "Inicio de actividades en el sector de la construcción en Perú.",
    },
    {
      year: "2005",
      title: "Fundación C&D",
      description:
        "Creación de C&D Construcciones S.R.L., nuestra primera empresa formal.",
    },
    {
      year: "2011",
      title: "Expansión",
      description:
        "Fundación de Cadeza Construcciones s.a.c. enfocada en edificios modernos.",
    },
    {
      year: "2018",
      title: "JCM Nace",
      description:
        "Fundación de JCM CONSTRUCCIONES E INMOBILIARIA S.A.C. en Trujillo.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestra Trayectoria
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Un recorrido por los momentos más importantes que han definido
            nuestra historia y crecimiento.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700"></div>

          <div className="relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-8"
                      : "md:text-left md:pl-8"
                  }`}
                >
                  <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
                    <div className="text-blue-300 text-sm font-semibold mb-1">
                      <Clock className="inline-block h-4 w-4 mr-1" />
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-blue-900"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dada la experiencia adquirida en el sector de la construcción,
            tomamos algunas iniciativas como la importación de nuestros acabados
            desde Italia y España, tales como Inodoros Suspendidos, Puertas de
            interiores, Puertas Blindadas, artefactos, electrodomésticos, entre
            otros.
          </p>
          <Link
            href="/ProyectosEnVenta"
            className="inline-flex items-center px-6 py-3 mt-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver nuestros proyectos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

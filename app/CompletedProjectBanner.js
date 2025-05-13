"use client";
import { CheckCircle, Award } from "lucide-react";

export default function CompletedProjectBanner() {
  return (
    <section className="bg-[#0077be] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-white text-center md:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-white" />
            <span className="font-bold">PROYECTO FINALIZADO Y ENTREGADO</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/30 mx-2"></div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-white" />
            <span>Oportunidades de reventa disponibles</span>
          </div>
        </div>
      </div>
    </section>
  );
}

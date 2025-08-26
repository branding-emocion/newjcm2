import { Button } from "@/components/ui/button";
import { MessageCircle, Eye } from "lucide-react";

export default function GolfViewSalesPage() {
  const whatsappNumber = "+51947455553";
  const whatsappMessage = "me interesa el proyecto Golf View";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(whatsappMessage)}`;
  const view3DUrl =
    "https://kuula.co/share/collection/7bNp1?logo=-1&info=0&fs=0&vr=1&sd=1&initload=0&thumbs=-1&inst=es&keys=0";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center items-center gap-6">
            {/* Logo 1 */}
            <div className="w-auto h-auto flex items-center justify-center">
              <img
                src="/logo-jcm.png"
                alt="Logo JCM"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Logo 2 */}
            <div className="w-auto h-auto flex items-center justify-center">
              <img
                src="/logo-golf.png"
                alt="Logo Golf View 2"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground">Golf View</h1>
          <p className="text-muted-foreground">Proyecto Inmobiliario</p>
        </div>

        <div className="space-y-4">
          {/* Botón 1: WhatsApp */}
          <Button
            asChild
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-6"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </Button>

          {/* Botón 2: Vista 3D */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg py-6 bg-transparent"
          >
            <a href={view3DUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="w-5 h-5 mr-2" />
              Vista 3D
            </a>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Contacto: {whatsappNumber}</p>
          <p className="italic">&quot;{whatsappMessage}&quot;</p>
        </div>
      </div>
    </div>
  );
}

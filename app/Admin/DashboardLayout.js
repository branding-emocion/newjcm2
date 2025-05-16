"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Building, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Login from "./Login";

const DashboardLayout = ({ children, marcas = [], cantReservas = 0 }) => {
  const [{ user, claims }, loading, error] = useAuthState(auth);
  const pathname = usePathname();

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!user) return <Login />;

  const menu = [
    {
      name: "Proyectos",
      link: "/Admin/Proyectos",
      icon: <Building className="size-5" />,
    },
  ];

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL || "https://github.com/shadcn.png"}
                      alt={user.displayName || "User"}
                    />
                    <AvatarFallback>
                      {user.displayName?.substring(0, 2) || "UN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user.displayName || "No Disponible"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {claims?.Rol || "Usuario"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menu.map(
                    (item, index) =>
                      !item.hidden && (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname.includes(item.link)}
                          >
                            <Link href={item.link}>
                              {item.icon}
                              <span>{item.name}</span>
                              {item.Cant && cantReservas > 0 && (
                                <span className="ml-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-600 px-2 text-xs font-medium">
                                  {cantReservas}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {marcas.length > 0 && (
              <SidebarGroup>
                <SidebarGroupLabel>Marcas</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {marcas.map((marca, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.includes(marca.id)}
                        >
                          <Link href={`/Admin/Marca/${marca.id}`}>
                            {marca.Imagenes && marca.Imagenes.length > 0 ? (
                              <div className="flex h-5 w-5 items-center justify-center">
                                <Image
                                  src={marca.Imagenes[0] || "/placeholder.svg"}
                                  alt={marca.NombreMarca}
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <Building className="size-5" />
                            )}
                            <span>{marca.NombreMarca}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut className="size-5" />
                  <span>Cerrar sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <p className="py-3 text-center text-xs text-muted-foreground">
              Copyright @{new Date().getFullYear()} -{" "}
              {new Date().getFullYear() + 1}
            </p>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

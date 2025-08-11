"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "./NavMenu";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "./AuthProvider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = ["/login", "/register"].includes(pathname);
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            {!hideNavbar && <NavMenu />}
            <div style={{ margin: "15px" }}>{children}</div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}

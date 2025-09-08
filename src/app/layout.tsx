import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | RSVP by Offbeats",
    default: "RSVP by Offbeats - Student Event Discovery & Management",
  },
  description: "Discover and manage offbeat events with the simplicity students deserve. Zero fees for student organizations, mobile-first design, and smart features.",
  keywords: ["events", "student events", "campus events", "RSVP", "event management", "university", "college"],
  authors: [{ name: "Offbeats Team" }],
  creator: "Offbeats",
  publisher: "Offbeats",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://rsvpoffbeats.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "RSVP by Offbeats - Student Event Discovery & Management",
    description: "Discover and manage offbeat events with the simplicity students deserve",
    siteName: "RSVP by Offbeats",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RSVP by Offbeats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RSVP by Offbeats - Student Event Discovery & Management",
    description: "Discover and manage offbeat events with the simplicity students deserve",
    images: ["/og-image.png"],
    creator: "@offbeats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#111827",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

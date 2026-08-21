import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { graph, jsonLdProps, organizationSchema } from "@/lib/schema";

const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "thiết kế kiến trúc",
    "thi công trọn gói",
    "xây nhà trọn gói",
    "thiết kế nội thất",
    "công ty xây dựng",
    "cải tạo nhà",
    site.name,
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.slogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Khong dat maximumScale/userScalable=no — nguoi dung phai duoc phep phong to
  themeColor: "#002e6e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${archivo.variable} ${beVietnam.variable}`}>
      <body>
        {/* Doanh nghiep + website: dung chung cho moi trang */}
        <script
          {...jsonLdProps(
            graph(organizationSchema(), {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              inLanguage: "vi-VN",
              publisher: { "@id": `${site.url}/#organization` },
            })
          )}
        />

        <Header />
        <main id="noi-dung-chinh">{children}</main>
        <Footer />
        <FloatingContact />

        {site.gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

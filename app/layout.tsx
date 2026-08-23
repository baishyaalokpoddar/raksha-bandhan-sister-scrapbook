import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raksha Bandhan Sibling Scrapbook 🧵✨",
  description: "A personalized, humorous, scrapbook-style greeting experience for your sister on Raksha Bandhan.",
  icons: {
    icon: "/assets/rakhi_logo.jpg",
    shortcut: "/assets/rakhi_logo.jpg",
    apple: "/assets/rakhi_logo.jpg",
  },
  openGraph: {
    title: "Raksha Bandhan Surprise for You! 🎁✨",
    description: "Your brother made a special interactive scrapbook surprise for you!",
    type: "website",
    images: ["/assets/rakhi_logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/rakhi_logo.jpg" />
        <link rel="apple-touch-icon" href="/assets/rakhi_logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Kalam:wght@400;700&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-scrapbook-cream text-scrapbook-darkText selection:bg-scrapbook-ginghamRed selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

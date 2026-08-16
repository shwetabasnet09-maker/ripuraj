import "./globals.css";
import Header from "./component/global/header";
import Footer from "./component/global/footer";
import DownloadButtons from "./component/global/DownloadButtons";
import WhatsAppFloat from "./component/global/WhatsAppFloat";

export const metadata = {
  title: "Ripuraj",
  icons: {
    icon: "/RipurajFavicon.png",
    apple: "/RipurajFavicon.png",
  },
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer/>
        <DownloadButtons />
        <WhatsAppFloat />

      </body>
    </html>
  );
}
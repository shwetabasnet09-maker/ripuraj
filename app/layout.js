import "./globals.css";
import Header from "./component/global/header";
import Footer from "./component/global/footer";

export const metadata = {
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
      </body>
    </html>
  );
}
import "./globals.css";
import Header from "./component/gobal/header";
import Footer from "./component/gobal/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}

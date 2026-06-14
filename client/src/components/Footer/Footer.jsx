import { useMemo } from "react";
import "./Footer.css";
const Footer = () => {
  const year = useMemo(() => {
    const currentYear = new Date().getUTCFullYear();
    return currentYear;
  }, []);
  return (
    <footer>
      <p>© {year} Banana Blackjack Bananza Boys inc. All Rights Reserved</p>
      <p className="hidden">This is a licensed Mad Dog Richardson & CJ Doyle Product</p>
    </footer>
  );
};

export default Footer;

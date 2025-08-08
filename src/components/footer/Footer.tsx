// src/Footer.jsx
import Link from 'next/link';
import { VStack } from "@/components/stack-layout";
import "./lytude-footer-style.css";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <VStack align='center'>
        <div className="divider-fade" style={{ height: "1px", width: "clamp(100px,75vw,2200px)", justifyContent: "center", backgroundColor: "red" }} />
      </VStack>
      <footer className="footer">
        <div className="footer-content">
          {/* <div className="footer-section"> */}
          <VStack align="flex-start" style={{ width: "100%", margin: "20px 0" }}>
            <Image src="/assets/images/logos/(cropped) Soundlytude full logo.png" alt="Lytude" 
            height={40} width={512} style={{ width: "auto", height: "auto", maxWidth: "50%", maxHeight: "80px" }} />
          </VStack>
          {/* </div> */}
          <div className="footer-section">
            <h3 style={{ color: '#808080' }}>Entity</h3>
            <ul>
              <li><Link href="https://www.lytude.com/about" target='_blank'>About</Link></li>
              <li><Link href="https://www.lytude.com/contact" target='_blank'>Contact</Link></li>
              <li><Link href="https://www.lytude.com/lytude-news" target='_blank'>Lytude News</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 style={{ color: '#808080' }}>Community</h3>
            <ul>
              <li><Link href="https://www.gofundme.com/f/investing-in-progress-donate-and-support-lytude" target='_blank'>Donate</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 style={{ color: '#808080' }}>Other Useful Links</h3>
            <ul>
              <li><Link href="mailto:lytude@gmail.com">Email</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ color: "#808080" }}> 2025 Lytude</p>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;

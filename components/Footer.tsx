import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer container">
      <div className="grid grid--footer">
        <div className="logo-col">
          <p className="footer-heading">Social Media</p>
          <ul className="social-links">
            <li>
              <a
                className="footer-link"
                href="https://www.instagram.com/mia_learning_center/"
                target="_blank"
                rel="noreferrer"
              >
                <ion-icon className="social-icon" name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a
                className="footer-link"
                href="https://m.facebook.com/MulticulturalImmersionAcademy"
                target="_blank"
                rel="noreferrer"
              >
                <ion-icon className="social-icon" name="logo-facebook"></ion-icon>
              </a>
            </li>
          </ul>
        </div>

        <div className="logo-col">
          <p className="footer-heading">Contact us</p>

          <address className="contacts">
            <div className="flex-add">
              <a
                href="https://www.google.com/maps/place/1444+Remount+Rd,+North+Charleston,+SC+29406/@32.9021167,-79.9998931,21z/data=!4m5!3m4!1s0x88fe6487862631ef:0x270ba91b275bc270!8m2!3d32.902185!4d-79.999701"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                <ion-icon className="social-icon" name="location-outline"></ion-icon>
              </a>
              <p className="address">
                1444 Remount Rd,
                <br />
                North Charleston, SC. 29405
              </p>
            </div>

            <div className="flex-add">
              <ion-icon
                className="footer-link social-icon icon-color"
                name="call-outline"
              ></ion-icon>
              <a className="footer-link call-email" href="tel:803-829-6262">
                (803) 829-6262
              </a>
              <br />
            </div>
            <br />
            <div className="flex-add">
              <ion-icon
                className="footer-link social-icon icon-color"
                name="mail-outline"
              ></ion-icon>
              <a className="call-email" href="mailto:multiculturalimmersionacademy@gmail.com">
                Multicultural Immersion Academy
              </a>
            </div>
          </address>
        </div>
        <div className="logo-col">
          <p className="footer-heading">Links</p>
          <ul className="li-footer2">
            <li>
              <Link className="footer-link2" href="/programs">
                Our Three Programs
              </Link>
            </li>
            <li>
              <a className="footer-link2" href="/MIA-Parent-Agreement.pdf" download>
                Download MIA Parent Agreement
              </a>
            </li>
            <li>
              <Link className="footer-link2" href="/register">
                MIA Registration Form
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">
        Copyright &copy; {year} by Multicultural Immersion Academy. All rights reserved.
      </p>
    </footer>
  );
}

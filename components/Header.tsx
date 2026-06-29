import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={navOpen ? "header nav-open" : "header"}>
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" alt="Multicultural Immersion Academy Logo" src="/img/mia.png" />
      </Link>

      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <div className="nav-center">
              <ion-icon className="nav-icon" name="home-outline"></ion-icon>
              <Link className="main-nav-link" href="/" onClick={() => setNavOpen(false)}>
                Home
              </Link>
            </div>
          </li>
          <li>
            <div className="nav-center">
              <ion-icon className="nav-icon" name="book-outline"></ion-icon>
              <Link className="main-nav-link" href="/programs" onClick={() => setNavOpen(false)}>
                Programs
              </Link>
            </div>
          </li>
          <li>
            <div className="nav-center">
              <ion-icon className="nav-icon" name="images-outline"></ion-icon>
              <Link className="main-nav-link" href="/gallery" onClick={() => setNavOpen(false)}>
                Gallery
              </Link>
            </div>
          </li>
          <li>
            <div className="nav-center">
              <ion-icon className="nav-icon" name="people-outline"></ion-icon>
              <Link className="main-nav-link" href="/staff" onClick={() => setNavOpen(false)}>
                Staff
              </Link>
            </div>
          </li>
          <li>
            <Link className="main-nav-link nav-cta" href="/register" onClick={() => setNavOpen(false)}>
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <button className="btn-mobile-nav" onClick={() => setNavOpen((open) => !open)}>
        <ion-icon className="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon className="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
}

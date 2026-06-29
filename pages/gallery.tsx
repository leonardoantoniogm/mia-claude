import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStickyNav } from "@/hooks/useStickyNav";

const playGallery = [
  { src: "gal2.jpg", alt: "Creativity on the yard", title: '"Creativity on the Yard"' },
  { src: "gal3.jpg", alt: "Great Smile", title: '"Great Smiles "' },
  { src: "gal4.jpg", alt: "Individual Attention", title: '"Individual Attention"' },
  { src: "gal5.jpg", alt: "Friendship", title: '"Friendship"' },
  { src: "gal6.jpg", alt: "Two girls seed a plant", title: '"Love for Plants"' },
  { src: "gal7.jpg", alt: "Passion for Gardening", title: '"Passion for Gardening"' },
  { src: "gal8.jpg", alt: "Our first flying", title: '"Our First Flying"' },
  { src: "gal9.jpg", alt: "Taking care the plants", title: '"Taking Care of the Plants"' },
  { src: "gal10.jpg", alt: "Dancing on the Sand", title: '"Dancing on the Sand"' },
  { src: "gal11.jpg", alt: "Games on the Yard", title: '"Games on the Yard"' },
  { src: "gal12.jpg", alt: "Together We Climb", title: '"Together We Climb"' },
  { src: "gal13.jpg", alt: "Power of Play", title: '"Power of Play"' },
];

const spanishGallery = [
  { src: "gal14.jpg", alt: "Anatomy Class in Spanish", title: '"Science Class in Spanish"' },
  {
    src: "gal15.jpg",
    alt: "Recognize the face in Spanish",
    title: '"Recognize the Face in Spanish "',
  },
  { src: "gal16.jpg", alt: "Building a Tower", title: '"Building a Tower"' },
  { src: "gal17.jpg", alt: "Playing with Primary Colors", title: '"Playing with Primary Colors"' },
  { src: "gal18.jpg", alt: "Princess Dreaming", title: '"Princess Dreaming"' },
  { src: "gal19.jpg", alt: "Finding a Talent", title: '"Finding a Talent"' },
  { src: "gal20.jpg", alt: "A Future Sculpture", title: '"A Future Artist"' },
  { src: "gal21.jpg", alt: "Tea and Snack Time", title: '"Tea and Snack Time"' },
  { src: "gal22.jpg", alt: "Spanish Art", title: '"Spanish Art"' },
  { src: "gal23.jpg", alt: "My First Spanish Word", title: '"My First Spanish Word"' },
  { src: "gal24.jpg", alt: "Drawing his Dreams", title: '"Drawing His Dreams"' },
  { src: "gal25.jpg", alt: "Building Together", title: '"Building Together"' },
  { src: "gal26.jpg", alt: "Inventive Spelling", title: '"Inventive Spelling"' },
  { src: "gal27.jpg", alt: "Total Dedication", title: '"Total Dedication"' },
  { src: "gal28.jpg", alt: "Painting Carefully", title: '"Painting Carefully"' },
  { src: "gal29.jpg", alt: "Making their Team", title: '"Making their Team"' },
  { src: "gal30.jpg", alt: "Cultivate Patience", title: '"Cultivate Patience"' },
  { src: "gal31.jpg", alt: "Creating her World", title: '"Creating Her World"' },
  { src: "gal32.jpg", alt: "Nature and Art", title: '"Nature and Art"' },
  { src: "gal33.jpg", alt: "Painting Masterpiece", title: '"Painting a Masterpiece"' },
  { src: "gal34.jpg", alt: "A great Dress Designer", title: '"A great Dress Designer"' },
  { src: "gal35.jpg", alt: "A great Dress Designer", title: '"Her Dress Designer is Ready!"' },
  { src: "gal36.jpg", alt: "My first Hand Job", title: '" AfterSchool Art"' },
  {
    src: "gal37.jpg",
    alt: "Choosing my Musical Instrument",
    title: '"Choosing my Musical Instrument"',
  },
];

const landscapeGallery = [
  { src: "gallandscp1.jpg", alt: "Children in Class in Spanish", title: '"Welcome to MIA"' },
  { src: "gallandscp2.jpg", alt: "A place for Friendship", title: '"A place for Friendship"' },
  { src: "gallandscp4.jpg", alt: "Playing Outdoor II", title: '"It is funnier Outdoors"' },
];

export default function Gallery() {
  useStickyNav(".gallery-inst");

  return (
    <>
      <Head>
        <title>MIA — and our Gallery is our best reference</title>
      </Head>

      <Header />

      <main>
        <div className="container">
          <h2 className="heading-secondary h2-center">In MIA, We Teach in the Natural World</h2>
          <p className="step-description">
            We want MIA Learning Center to be a place where differences are embraced and
            celebrated and being unique or different is a gift. We want it to be a place where
            the community comes to speak and learn Spanish. We want to be a leader in
            afterschool multicultural and immersive education and a community that is always
            listening, sharing, learning, and positively growing.
          </p>
        </div>

        <div className="container gallery-inst">
          {playGallery.map((g) => (
            <figure className="gallery-item gallery-distance effect-shadow" key={g.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/${g.src}`} alt={g.alt} />
              <span className="title-gallery">{g.title}</span>
            </figure>
          ))}
        </div>

        <div className="container">
          <h2 className="heading-secondary h2-center">
            In MIA, Spanish is integrated in all the programs
          </h2>
          <p className="step-description">
            Themes and topics cycle through about every 3 months and focus on instilling an
            appreciation for the arts, culture and the Spanish language.
          </p>
          <ul className="gallery-top-ul">
            <li className="gallery-top-li">
              <ion-icon className="list-icon-blue" name="musical-notes-outline"></ion-icon>
              <span>Music</span>
            </li>
            <li className="gallery-top-li">
              <ion-icon className="list-icon-red" name="color-palette-outline"></ion-icon>
              <span>Painting</span>
            </li>
            <li className="gallery-top-li">
              <ion-icon className="list-icon-green" name="hand-left-outline"></ion-icon>
              <span>Crafts</span>
            </li>
            <li className="gallery-top-li">
              <ion-icon className="list-icon-yellow" name="body-outline"></ion-icon>
              <span>Science</span>
            </li>
          </ul>
        </div>
        <div className="container gallery-inst">
          {spanishGallery.map((g) => (
            <figure className="gallery-item gallery-distance effect-shadow" key={g.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/${g.src}`} alt={g.alt} />
              <span className="title-gallery">{g.title}</span>
            </figure>
          ))}
        </div>

        <h2 className="heading-secondary h2-center">
          Socializing <br />
          We Build Friendships and Share Values
        </h2>

        <div className="container">
          {landscapeGallery.map((g) => (
            <figure
              className="gallery-item gallery-distance effect-shadow size-landscp"
              key={g.src}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="img-gallery" src={`/img/${g.src}`} alt={g.alt} />
              <span className="title-gallery-2">{g.title}</span>
            </figure>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

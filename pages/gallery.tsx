import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playGallery = [
  { src: "gal2.jpg",  title: "Creativity on the Yard" },
  { src: "gal3.jpg",  title: "Great Smiles" },
  { src: "gal4.jpg",  title: "Individual Attention" },
  { src: "gal5.jpg",  title: "Friendship" },
  { src: "gal6.jpg",  title: "Love for Plants" },
  { src: "gal7.jpg",  title: "Passion for Gardening" },
  { src: "gal8.jpg",  title: "Our First Flying" },
  { src: "gal9.jpg",  title: "Taking Care of the Plants" },
  { src: "gal10.jpg", title: "Dancing on the Sand" },
  { src: "gal11.jpg", title: "Games on the Yard" },
  { src: "gal12.jpg", title: "Together We Climb" },
  { src: "gal13.jpg", title: "Power of Play" },
];

const spanishGallery = [
  { src: "gal14.jpg", title: "Science Class in Spanish" },
  { src: "gal15.jpg", title: "Recognize the Face in Spanish" },
  { src: "gal16.jpg", title: "Building a Tower" },
  { src: "gal17.jpg", title: "Playing with Primary Colors" },
  { src: "gal18.jpg", title: "Princess Dreaming" },
  { src: "gal19.jpg", title: "Finding a Talent" },
  { src: "gal20.jpg", title: "A Future Artist" },
  { src: "gal21.jpg", title: "Tea and Snack Time" },
  { src: "gal22.jpg", title: "Spanish Art" },
  { src: "gal23.jpg", title: "My First Spanish Word" },
  { src: "gal24.jpg", title: "Drawing His Dreams" },
  { src: "gal25.jpg", title: "Building Together" },
  { src: "gal26.jpg", title: "Inventive Spelling" },
  { src: "gal27.jpg", title: "Total Dedication" },
  { src: "gal28.jpg", title: "Painting Carefully" },
  { src: "gal29.jpg", title: "Making Their Team" },
  { src: "gal30.jpg", title: "Cultivate Patience" },
  { src: "gal31.jpg", title: "Creating Her World" },
  { src: "gal32.jpg", title: "Nature and Art" },
  { src: "gal33.jpg", title: "Painting a Masterpiece" },
  { src: "gal34.jpg", title: "A Great Dress Designer" },
  { src: "gal35.jpg", title: "Her Dress Designer is Ready!" },
  { src: "gal36.jpg", title: "AfterSchool Art" },
  { src: "gal37.jpg", title: "Choosing my Musical Instrument" },
];

const activities = [
  { icon: "🎵", label: "Music", color: "bg-brand-blue text-white" },
  { icon: "🎨", label: "Painting", color: "bg-brand-red text-white" },
  { icon: "✂️", label: "Crafts", color: "bg-brand-green text-white" },
  { icon: "🔬", label: "Science", color: "bg-brand-yellow text-gray-900" },
];

const landscape = [
  { src: "gallandscp1.jpg", title: "Welcome to MIA" },
  { src: "gallandscp2.jpg", title: "A Place for Friendship" },
  { src: "gallandscp4.jpg", title: "It is Funnier Outdoors" },
];

function GalleryGrid({ images }: { images: { src: string; title: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {images.map((img) => (
        <div key={img.src} className="group relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/img/${img.src}`}
            alt={img.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
            <p className="text-white text-xs font-bold px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery — MIA Learning Center</title>
      </Head>

      <Header />

      <main>
        {/* HERO */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="section-subtitle">Our Moments</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Life at MIA 📸
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We want MIA to be a place where differences are celebrated and being
              unique is a gift. Here is a glimpse into the joy, creativity and
              learning that happen every day.
            </p>
          </div>
        </section>

        {/* PLAY SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">Outdoors & Play</p>
            <h2 className="section-title mb-8">We Teach in the Natural World</h2>
            <GalleryGrid images={playGallery} />
          </div>
        </section>

        {/* SPANISH SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">Spanish Integrated in Everything</p>
            <h2 className="section-title mb-6">Art, Music, Science &amp; More</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {activities.map((a) => (
                <span key={a.label} className={`${a.color} px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2`}>
                  {a.icon} {a.label}
                </span>
              ))}
            </div>
            <GalleryGrid images={spanishGallery} />
          </div>
        </section>

        {/* SOCIALIZING SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">Socializing</p>
            <h2 className="section-title mb-8">We Build Friendships &amp; Share Values</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {landscape.map((img) => (
                <div key={img.src} className="group relative overflow-hidden rounded-3xl aspect-video bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/img/${img.src}`}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-sm">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

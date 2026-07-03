import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const programs = [
  {
    icon: "🌞",
    code: "SA",
    title: "Seasonal Activities",
    color: "bg-brand-yellow",
    textColor: "text-gray-900",
    description:
      "Holiday camps, Parents Night Out and seasonal events where children learn Spanish through themed parties and creative activities.",
  },
  {
    icon: "🏫",
    code: "OOSH",
    title: "Out Of School Hours",
    color: "bg-brand-blue",
    textColor: "text-white",
    description:
      "Fun, supportive after-school program for children up to 12 years old. Homework help, play, and Spanish immersion — all in one place.",
  },
  {
    icon: "📚",
    code: "PTC",
    title: "Private Tutoring Class",
    color: "bg-brand-green",
    textColor: "text-white",
    description:
      "1-on-1 or small group Spanish lessons tailored to any age or skill level, at our facility or your preferred location.",
  },
];

const values = [
  { icon: "🌍", title: "Who We Are", text: "A learning center with a fun, creative and adaptive approach to teach Spanish as a second language." },
  { icon: "🎯", title: "What We Want", text: "We offer families an immersive and flexible Spanish learning program in a fun, engaging, and inclusive environment." },
  { icon: "💎", title: "Our Values", text: "At our core is the idea that differences and diversity make everything better and stronger." },
];

const testimonials = [
  { img: "testimonio1.png", name: "Kelli Rawls", quote: "Mrs. Claudia and her staff are simply amazing. My daughter is always happy when I pick her up and very excited to tell me about the Spanish she is learning. Priceless!" },
  { img: "testimonio2.png", name: "Rachel Gandee", quote: "My son begs me to go when he realizes I'm not driving him to MIA! I know he's not only in safe hands but being nurtured and exposed to culture he doesn't get at home!" },
  { img: "testimonio3.png", name: "Jennifer Strang", quote: "We are so grateful to have afterschool care our children look forward to everyday. The teachers are so wonderful and our kids' Spanish has really improved!" },
  { img: "testimonio4.jpg", name: "Laura Westby Cannon", quote: "MIA is an incredibly kind and competent group of people. Everyone's utmost concern is for the children — their safety, educational play, and emotional well-being." },
  { img: "testimonio6.jpg", name: "Julies Groves", quote: "Her teaching style is extremely inventive. She continually comes up with new and creative ways to get lessons across. I wholeheartedly recommend Claudia!" },
  { img: "testimonio8.jpg", name: "Tammy Groher", quote: "MIA and Claudia have become like family to us. Her energy and genuine love for kids is infectious and pervades her teaching." },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>MIA Learning Center — Spanish Immersion in North Charleston, SC</title>
        <meta name="description" content="Multicultural Immersion Academy is a fun, creative Spanish learning center in North Charleston, South Carolina." />
      </Head>

      <Header />

      <main>
        {/* HERO */}
        <section className="bg-gradient-to-br from-sky-50 via-white to-yellow-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-brand-yellow text-gray-900 font-bold text-xs px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                  🇺🇸 North Charleston, SC
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Spanish is the{" "}
                  <span className="text-brand-blue">2nd most spoken</span>{" "}
                  language in the USA
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  At MIA Learning Center we instill a love for Spanish and fire
                  up a curiosity for other cultures — through play, creativity,
                  and immersive learning.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/register" className="btn-primary text-base">
                    ✏️ Register Now
                  </Link>
                  <Link href="/programs" className="btn-outline text-base">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/hero.png"
                  alt="Children learning Spanish at MIA"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-brand-yellow rounded-2xl px-4 py-3 shadow-lg">
                  <p className="font-extrabold text-gray-900 text-sm">🎉 3 Programs Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="card border border-gray-100 text-center">
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">How We Work</p>
            <h2 className="section-title mb-12">Three programs for your children</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <div
                  key={p.code}
                  className={`${p.color} ${p.textColor} rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}
                >
                  <div className="text-5xl mb-4">{p.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">{p.code}</span>
                  <h3 className="text-xl font-extrabold mt-1 mb-3">{p.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{p.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/programs" className="btn-outline">
                See Full Program Details →
              </Link>
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">Our Moments</p>
            <h2 className="section-title mb-8">Life at MIA</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="relative overflow-hidden rounded-2xl aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/img/galleria${n}.png`}
                    alt="MIA Learning Center"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/gallery" className="btn-outline">
                View Full Gallery →
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-sky-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-subtitle">Testimonials</p>
            <h2 className="section-title mb-12">Families love MIA ❤️</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="card border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/img/${t.img}`}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-blue"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <div className="text-brand-yellow text-xs">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">&quot;{t.quote}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-blue">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to start your child&apos;s Spanish journey?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Register today and join the MIA Learning Center family.
            </p>
            <Link href="/register" className="btn-secondary text-lg px-8 py-4">
              ✏️ Register Now — It&apos;s Free!
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

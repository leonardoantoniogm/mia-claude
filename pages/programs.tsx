import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const programs = [
  {
    icon: "🏫",
    code: "OOSH",
    color: "bg-brand-blue",
    textColor: "text-white",
    title: "Out Of School Hours",
    img: "/img/program2.jpg",
    imgAlt: "Children playing at MIA",
    features: [
      "Fun, supportive after-school program for children up to 12 years old.",
      "Structured homework time with teacher support plus unstructured play time.",
      "Develops social skills: communication, conflict resolution and teamwork.",
      "Intra-personal growth through autonomy, critical thinking and personal responsibility.",
      "Activities include gardening, exploration, exercise, farm animals and more.",
    ],
  },
  {
    icon: "📚",
    code: "PTC",
    color: "bg-brand-green",
    textColor: "text-white",
    title: "Private Tutoring Class",
    img: "/img/program3.jpg",
    imgAlt: "Student learning Spanish",
    features: [
      "1:1 or small group Spanish classes for all learners — children, teenagers, adults.",
      "Builds Spanish skills through explicit instruction and engaging activities.",
      "Lessons are developmentally appropriate and tailored to each student.",
      "Classes at MIA facilities or any location of your preference.",
      "Currently serving homeschooling families with a wide range of Spanish tutoring.",
    ],
  },
  {
    icon: "🌞",
    code: "SA",
    color: "bg-brand-yellow",
    textColor: "text-gray-900",
    title: "Seasonal Activities",
    img: "/img/program1.jpg",
    imgAlt: "Children at a seasonal activity",
    features: [
      "Seasonal activities so your children never miss out on Spanish learning.",
      "Parents Night Out — once per month, a themed Spanish party for the kids.",
      "A relaxing night for parents while children are cared for and learning.",
      "Fully designed camps for every school holiday throughout the year.",
      "Christmas, Spring Break, Summer and Fall Camps.",
    ],
  },
];

export default function Programs() {
  return (
    <>
      <Head>
        <title>Our Programs — MIA Learning Center</title>
      </Head>

      <Header />

      <main>
        {/* PAGE HERO */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-100 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="section-subtitle">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Three programs for your family
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MIA Learning Center we believe learning Spanish is a generous path
              to acquire essential human skills — critical thinking, creativity,
              communication and collaboration. We designed three programs to fit
              every family&apos;s needs.
            </p>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {programs.map((p, i) => (
              <div
                key={p.code}
                className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image side — alternate left/right */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.imgAlt}
                    className="rounded-3xl shadow-xl w-full object-cover aspect-video"
                  />
                </div>

                {/* Text side */}
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className={`inline-flex items-center gap-2 ${p.color} ${p.textColor} rounded-2xl px-4 py-2 mb-4`}>
                    <span className="text-2xl">{p.icon}</span>
                    <span className="font-extrabold text-sm uppercase tracking-wide">{p.code}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{p.title}</h2>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-gray-600">
                        <span className="text-brand-blue font-bold mt-0.5 shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Questions? We&apos;re happy to help!
            </h2>
            <p className="text-gray-500 mb-8">
              Contact us at{" "}
              <a href="mailto:multiculturalimmersionacademy@gmail.com" className="text-brand-blue font-bold hover:underline">
                multiculturalimmersionacademy@gmail.com
              </a>
            </p>
            <Link href="/register" className="btn-primary text-lg px-8 py-4">
              ✏️ Register Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

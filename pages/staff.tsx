import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const staff = [
  {
    img: "Staff1.jpg",
    name: "Claudia Gonzalez",
    title: "Language Facilitator & Founder",
    badge: "🇻🇪",
    color: "border-brand-blue",
    description:
      "Originally from Venezuela, Claudia is a Sociologist with a Master Degree in Public Policy from Nottingham University. She has 10+ years teaching Spanish in schools and homeschooling environments across the Lowcountry, including Lowcountry Language Academy, Charles Towne Montessori, and Growing Spirits. She founded MIA to help families embrace Spanish as a second language.",
  },
  {
    img: "Staff2.jpg",
    name: "Paola Signorini",
    title: "Educational Advisor",
    badge: "🇿🇦",
    color: "border-brand-green",
    description:
      "Originally from South Africa, Paola holds a PhD in Education (England) and an AMI Montessori Diploma. She is fluent in English, Spanish, German, Portuguese and Italian. After years in educational research, she retrained as an AMI Montessori Early Years Teacher. She supports MIA in curriculum design, educational methodologies and staff training.",
  },
  {
    img: "Staff3.jpg",
    name: "Carlos Gonzalez",
    title: "Administrator",
    badge: "🇻🇪",
    color: "border-brand-yellow",
    description:
      "Originally from Venezuela, Carlos is bilingual in English and Spanish. He holds an Accounting degree and a Master's in Public Administration, and coordinates all office activities and operations at MIA. His background as a Firefighter-EMT adds an invaluable safety dimension to the team.",
  },
  {
    img: "Staff4.jpg",
    name: "Renata Aristimuno",
    title: "Facilitator",
    badge: "🇻🇪",
    color: "border-brand-purple",
    description:
      "Originally from Venezuela, Renata lived in England for two years before moving to the USA in 2018. Currently studying English at Trident Technical College, she supports all MIA programs as needed and assists with public relations.",
  },
  {
    img: "Staff5.jpg",
    name: "Patricia Gonzalez",
    title: "Social Media Manager",
    badge: "🇻🇪",
    color: "border-brand-orange",
    description:
      "With a Social Communication degree from Andres Bello Catholic University (Caracas) and a Sound & Image Design degree from Buenos Aires, Patricia manages MIA's Instagram and Facebook presence. She is also a passionate freelance photographer responsible for capturing MIA's best moments.",
  },
];

export default function Staff() {
  return (
    <>
      <Head>
        <title>Our Staff — MIA Learning Center</title>
      </Head>

      <Header />

      <main>
        {/* HERO */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="section-subtitle">Our Team</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Meet the MIA Family 👋
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A passionate, multicultural team dedicated to making Spanish learning
              joyful, effective and inclusive for every child and family.
            </p>
          </div>
        </section>

        {/* STAFF GRID */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((s) => (
                <div key={s.name} className={`card border-2 ${s.color} flex flex-col`}>
                  <div className="relative mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/img/${s.img}`}
                      alt={s.name}
                      className="w-full aspect-square object-cover object-top rounded-2xl"
                    />
                    <span className="absolute top-3 right-3 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg">{s.name}</h3>
                  <p className="text-brand-blue font-bold text-sm mb-3">{s.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Want your child to learn from our team?
            </h2>
            <p className="text-gray-500 mb-8">Register today and join the MIA family.</p>
            <a href="/register" className="btn-primary text-lg px-8 py-4 inline-block">
              ✏️ Register Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

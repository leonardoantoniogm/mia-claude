import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStickyNav } from "@/hooks/useStickyNav";

const staff = [
  {
    img: "Staff1.jpg",
    imgClass: "card-img",
    alt: "Claudia Gonzalez Language Facilitator",
    name: "Claudia Gonzalez",
    title: "Language Facilitator",
    cardClass: "claudia",
    description:
      "Originally from Venezuela, Claudia is a Sociologist with a Master Degree in Public Policy in Nottigham University. The last 10 years Claudia have been teaching different subjects such as public policy in education, sociology, methodology and History in her home country (in Universities and High School), since Claudia moved to USA she started to teach Spanish to children not only in schools but in homeschooling environments, among these we can mention: Lowcountry Language Academy (Mount Pleasant), Charles Towne Montesori (West Ashley), Growing Spirits (John Island) and work for some families too. Due to the growing interest as well as the social sensitivity of the people among the Spanish as a second language in their children MIA was constituted to help families in this regard.",
  },
  {
    img: "Staff2.jpg",
    imgClass: "card-img",
    alt: "Paola Language Facilitator in MIA Learning Center",
    name: "Paola Signorini",
    title: "Educational Advisor",
    cardClass: "paola",
    description:
      "Originally from South Africa, Paola is a Sociologist with a PhD in Education in England and AMI Montessori Diploma in Casa dei Bambini Education (3-6 years old). She is fluent in English, Spanish, German, Portuguese and Italian. After devoting most of her career to educational research, in 2019, she found herself that her true vocation and retrained as an AMI Montessori Early Years Teacher. Due to her experience in both fields, research and teaching as well as her contact with different cultures we consider she is an asset to MIA, supporting us in curriculum design, developing educational methodologies and staff training programmes.",
  },
  {
    img: "Staff3.jpg",
    imgClass: "card-img",
    alt: "Carlos Gonzalez Administrator in MIA Learning Center",
    name: "Carlos Gonzalez",
    title: "Administrator",
    cardClass: "carlos",
    description:
      "Originally from Venezuela, Carlos is father of two. Bilingual in English and Spanish. Accountant with a Master’s Degree in Public Administration. He is supporting the team coordinating office activities and operations. His recent experience as a Firefighter-EMT is a plus due his knowledge to take over any situation in this area.",
  },
  {
    img: "Staff4.jpg",
    imgClass: "card-img2",
    alt: "Renata Aristimuno, Facilitator in MIA Learning Center",
    name: "Renata Aristimuno",
    title: "Facilitator in MIA",
    cardClass: "renata",
    description:
      "Originally from Venezuela, Renata lived in England for two years and moved to the USA in 2018. Currently, she is studying English at Trident Technical College. Renata supports us with all our programmes as required, and assists us with PR.",
  },
  {
    img: "Staff5.jpg",
    imgClass: "card-img2",
    alt: "Patricia Gonzalez, Social Media Manager in MIA Learning Center",
    name: "Patricia Gonzalez",
    title: "Social Media Manager",
    cardClass: "patricia",
    description:
      "With a Social Communication bachelor degree from Andres Bello Catholic University in Caracas, Venezuela and a Sound & Image Design degree from Buenos Aires, Argentina, Patricia has contributed by promoting our activities and publishing our stories and reels on Instagram and Facebook. Also, Patricia is a passionate freelance photographer who is responsible, proactive and creative offering her best expertise at MIA Learning Center.",
  },
];

export default function Staff() {
  useStickyNav(".staff");

  return (
    <>
      <Head>
        <title>MIA — and its Staff for any kind of support</title>
      </Head>

      <Header />

      <main>
        <h2 className="heading-secondary h2-center">MIA Learning Center Staff</h2>
        <div className="container">
          <div className="grid staff">
            {staff.map((member) => (
              <div className={`card ${member.cardClass}`} key={member.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={member.imgClass} src={`/img/${member.img}`} alt={member.alt} />
                <p className="card-name">{member.name}</p>
                <p className="card-title">{member.title}</p>
                <p className="card-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

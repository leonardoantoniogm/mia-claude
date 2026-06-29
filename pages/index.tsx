import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStickyNav } from "@/hooks/useStickyNav";

const testimonials = [
  {
    img: "testimonio1.png",
    quote: "We love MIA.",
    rest: "My daughter is 3 and has been attending since the soft opening in December. Mrs. Claudia and her staff are simply amazing. My daugther is always happy when I pick her up and very excited to tell me about the Spanish she is learning. Priceless!",
    name: "Kelli Rawls",
  },
  {
    img: "testimonio2.png",
    quote: "MIA has been such a blessing to us!",
    rest: "Claudia and her team are phenomenal with the kids. I started out only going 2 days a week, but my son begs me to go when he realizes I'm not driving him to MIA! I know he's not only in safe hands but being nurtured and being exposed to culture and language that he doesn't get at home! We love MIA!",
    name: "Rachel Gandee",
  },
  {
    img: "testimonio3.png",
    quote: "We are so grateful",
    rest: "to have afterschool care our children look forward to everyday and that we can rely on. The teachers are so wonderful and kind and our kids Spanish has really improved since starting. This place is a godsend!",
    name: "Jennifer Strang",
  },
  {
    img: "testimonio4.jpg",
    quote:
      "Multicultural Immersion Academy is an incredibly kind and competent group of people.",
    rest: "We adore the high energy from the caretakers while working with the children, and felt incredibly loved by their care and attention to our daughter. Everyone's utmost concern is for the children, whether that be their safety, educational play, or emotional well-being. Thank you, MIA, for everything you do!",
    name: "Laura Westby Cannon",
  },
  {
    img: "testimonio5.jpg",
    quote: "Theacher's from MIA have been amazing to my two girls (6,3).",
    rest: "using multiple methods when teaching them Spanish. They have done projects following the live cycle of a seed and plant including planting and taking care of a plant and butterflies. They play games in Spanish to reinforce and introduce new topics. She also uses video songs at the end of the sessions to cover fundamentals. One of my favorite lessons I observed was my daughter was so excited to show her teacher her baby book.",
    name: "Jackie Epping",
  },
  {
    img: "testimonio6.jpg",
    quote: "Claudia and her approach have been working with my boys for a few years now.",
    rest: "They look forward to their lesson every week as she makes learning FUN! Her teaching style is extremely inventive. She continually comes up with new and creative ways to get the lessons across. She is very patient and constantly gives positive reinforcement. I wholeheartedly recommend starting lessons with Claudia-the earlier the better!",
    name: "Julies Groves",
  },
  {
    img: "testimonio7.jpg",
    quote:
      "Iam an educational consultant and I am throughly impressed by MIA's Spanish lessons,",
    rest: "specifically Mrs. Claudia's classes week after week. She has taught my son for over two years and he enjoys every minute of it. Her love for children shines in each class! From an educational perspective MIA's lessons are well planned, address all types of learning styles! Another outstanding aspect about MIA's approach, is it can adapt teaching to tie into whatever I am doing at home with my little man! I highly recommend trying a class with her because she is the absolute best!!",
    name: "Grace Bradham",
  },
  {
    img: "testimonio8.jpg",
    quote: "MIA has been tutoring my two kids for over three years.",
    rest: "MIA and Claudia have become like family to us. Her energy and genuine love for kids is infectious and pervades her teaching. This is the quality that has been most valuable to us and what has enabled the kids to continue wanting to learn Spanish. When the kids were younger, Claudia used play, cooking, crafts, and other activities to introduce and reinforce vocabulary. Now she engages them with clever games designed to review and learn new vocabulary. I love that she moves at their own pace and, yet, gently challenges them to learn more.",
    name: "Tammy Groher",
  },
];

export default function Home() {
  useStickyNav(".section-hero");

  return (
    <>
      <Head>
        <title>MIA — Learning Center in North Charleston, South Carolina.</title>
        <meta
          name="description"
          content="Multicultural Immersion Academy is a learning center with a fun, creative and adaptive approach to teaching and learning Spanish as a second language. We are located in North Charleston, South Carolina."
        />
      </Head>

      <Header />

      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">
                Did you know that Spanish is the second most spoken language in the USA, after
                English?
              </h1>
              <p className="hero-description">
                For this reason, we are an important resource for you and your family! At MIA
                Learning Center, we instill a love for Spanish and fire up a curiosity for other
                cultures!
              </p>
              <Link href="/programs" className="btn btn--outline">
                More Info...
              </Link>
              <Link href="/register" className="btn btn--full margin-left-small">
                Register
              </Link>
            </div>
            <div className="hero-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/hero.png"
                className="hero-img"
                alt="Three girls are painting and learning Spanish as second language"
              />
            </div>
          </div>
        </section>

        <section className="section-featured">
          <div className="container grid grid--3-cols">
            <div className="section-def">
              <h2 className="heading-featured-in">Who we are</h2>
              <hr className="marker" />
              <ion-icon className="social-icon icon-color" name="people-outline"></ion-icon>
              <p className="step-description">
                A Learning Center with a fun, creative and adaptive approach to teach and learn
                Spanish as a second language.
              </p>
            </div>

            <div className="section-def">
              <h2 className="heading-featured-in">What We want</h2>
              <hr className="marker" />
              <ion-icon className="social-icon icon-color" name="book-outline"></ion-icon>
              <p className="step-description">
                We offer families an immersive and flexible Spanish learning program. As well as
                a multicultural afterschool education in a fun, engaging, and inclusive
                environment.
              </p>
            </div>

            <div className="section-def">
              <h2 className="heading-featured-in">Our values</h2>
              <hr className="marker" />
              <ion-icon className="social-icon icon-color" name="diamond-outline"></ion-icon>
              <p className="step-description">
                At our core is the idea that differences and diversity make everything better and
                stronger. As in the animal and natural world, diversity is not only necessary but
                it creates better communities and environments in which we can flourish, develop
                and grow both as individuals.
              </p>
            </div>
          </div>
        </section>

        <section className="section-how">
          <div className="container">
            <span className="subheading">How we work</span>
            <h2 className="heading-secondary">
              We offer three programs that care for and educate your children
            </h2>
          </div>
          <div className="container grid grid--3-cols">
            <div className="how-program">
              <h2 className="subheading">Seasonal Activities (SA)</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="program-img"
                src="/img/program1.png"
                alt="two kids take cares at MIA Learning Center"
              />
              <p className="step-description">
                Because we want to teach Spanish as much as we can, there is no chance you can
                miss to be part of MIA, that is why we designed seasonal activities, which allow
                your children to get involved with a second language.
              </p>
            </div>

            <div className="how-program">
              <h2 className="subheading">Out Of School Hours (OOSH)</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="program-img"
                src="/img/program4.png"
                alt="Chidren learn at MIA Learning Center"
              />
              <p className="step-description">
                After-school hours childcare for children until 12 years old.
              </p>
            </div>

            <div className="how-program">
              <h2 className="subheading">Private Tutoring Class (PTC)</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="program-img"
                src="/img/program2.png"
                alt="A teacher teaches Spanish to children at MIA Learning Center"
              />
              <p className="step-description">
                Differentiated lessons designed for Spanish as a second language students of any
                age or ability.
              </p>
            </div>
          </div>
          <div className="icon-center">
            <Link href="/programs" className="btn btn--outline">
              More Info...
            </Link>
          </div>
        </section>

        <section className="section-testimonials">
          <div className="container testimonials-container">
            <div className="center-testimonial">
              <span className="subheading">Testimonials</span>
              <h2 className="heading-tertiary">Grateful, Blessings, and Love for MIA</h2>
            </div>
            <div className="gallery">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <figure className="gallery-item" key={n}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/img/galleria${n}.png`} alt="Children and teachers at MIA" />
                </figure>
              ))}
            </div>
            <div className="testimonials">
              {testimonials.map((t) => (
                <figure className="testimonial" key={t.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="testimonial-img" src={`/img/${t.img}`} alt="" />
                  <blockquote className="testimonial-text">
                    <strong className="remark">&quot;{t.quote}</strong> {t.rest}
                    <strong className="remark">&quot;</strong>
                  </blockquote>
                  <p className="testimonial-name">&mdash;{t.name}</p>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

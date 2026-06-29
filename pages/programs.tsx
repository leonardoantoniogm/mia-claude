import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStickyNav } from "@/hooks/useStickyNav";

export default function Programs() {
  useStickyNav(".section-how");

  return (
    <>
      <Head>
        <title>MIA — is a Spanish Learning Center that offers three programs</title>
      </Head>

      <Header />

      <main>
        <section className="section-how">
          <div className="container">
            <span className="subheading program-span">Our Three programs</span>
            <h2 className="heading-secondary">
              MIA Learning Center Offers Three Unique Programs
            </h2>
            <p className="step-description">
              That provide childcare for working/busy parents and Spanish language instruction
              for students. Humans are smarter, develop stronger skills, and solve problems
              faster when they take time to stop and learn from those who are different from
              themselves, or from those whose cultures have different belief systems than their
              own or from ideas that couldn&apos;t be any further from their own. Also, research
              tells us that humans are more fulfilled and feel better about themselves when they
              are learning. At MIA Learning Center, not only do we believe that learning Spanish
              as a second language a wonderful way to embrace differences and work toward
              bettering life for all, but we believe it is also a generous path in which to
              acquire essential human skills such as critical thinking, creativity, communication
              and collaboration. We also believe that educating our children with this
              philosophy is a way to genuinely create positive change.
            </p>
          </div>

          <div className="container grid grid--2-cols grid--center-v">
            <div className="step-img-box program-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/program2.jpg" className="step-img" alt="A boy and girl playing" />
            </div>

            <div className="step-text-box">
              <p className="step-number">01</p>
              <h3 className="heading-tertiary program-ter">Out Of School Hours (OOSH)</h3>
              <ul className="step-description">
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Fun, supportive and productive after-school program for children until 12 years
                  old.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Includes structured homework time with teacher support as well as unstructured
                  time for play, exploring interests and growing friendships.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Designed to foster and develop social skills/abilities such as effective
                  communication, conflict resolution and teamwork.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Intra-personal growth and positive identity formation, through activities that
                  encourage autonomy, critical thinking and personal responsibility.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  We offer activities such as gardening, exploration, exercise and coordination,
                  food and environment, farm animals and so forth.
                </li>
              </ul>
            </div>

            <div className="step-text-box">
              <p className="step-number">02</p>
              <h3 className="heading-tertiary program-ter">Private Tutoring Class (PTC)</h3>
              <ul className="step-description">
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  1:1 or small group Spanish language classes for all learners (children,
                  teenagers, adults).
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Designed to build Spanish language skills through explicit instruction and
                  engaging activities.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Lessons are developmentally appropriate and are catered to meet the individual
                  Spanish needs of each student.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  These classes can be placed at MIA facilities or any other locations of your
                  preferences.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Currently our wide range of Spanish tutoring classes are addressed at
                  homeschooling families.
                </li>
              </ul>
            </div>

            <div className="step-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/program3.jpg"
                className="step-img"
                alt="A boy listens his teacher at a school"
              />
            </div>

            <div className="step-text-box">
              <p className="step-number">03</p>
              <h3 className="heading-tertiary program-ter">Seasonal Activities (SA)</h3>
              <ul className="step-description">
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Because we want to teach Spanish as much as we can, there is no chance you can
                  miss to be part of MIA, that is why we designed seasonal activities, which
                  allow your children to get involved with a second language.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Parents Night Out, once per month we give you the chance to bring your children
                  to a special activity where we introduce the basic vocabulary while we have a
                  theme party.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  This night can be special too for you and your partner to take away from
                  routine and with the tranquility that your children are taking care of and
                  still immerse in the educational process.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  Camps: we fully designed a plan for each occasion of the year where regular
                  schools are closed.
                </li>
                <li>
                  <ion-icon className="list-icon" name="checkmark-outline"></ion-icon>
                  These are Christmas, Spring Break, Summer and Fall Camps.
                </li>
              </ul>
            </div>

            <div className="step-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/program1.jpg"
                className="step-img"
                alt="A baby photo captured by Christian Bowen, check it unsplash.com"
              />
            </div>
          </div>
        </section>

        <div>
          <hr />
        </div>
        <div className="question container">
          <h1 className="cta-h2" style={{ color: "#5f3dc4" }}>
            Comments?
          </h1>
          <p className="cta-h3">
            For any inquiries, feel free to contact us at{" "}
            <a href="mailto:multiculturalimmersionacademy@gmail.com">
              multiculturalimmersionacademy@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

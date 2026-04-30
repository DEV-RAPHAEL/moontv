import Image from "next/image";
import Link from "next/link";
import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programmes } from "@/lib/programmes";

export default function Home() {
  const featuredProgramme = programmes[0];

  return (
    <main>
      <Header />

      <section className="hero">
        <div className="heroBackground animate-scale-in">
          <Image src="/hero_bg.jpg" alt="Moon TV Background" fill priority style={{ objectFit: 'cover' }} />
        </div>
        <div className="heroOverlay animate-fade-in delay-200"></div>
        <div className="container heroContent">
          <div className="heroLeft animate-fade-left delay-300">
            <span className="section-subtitle">MOON TV IS NIGERIA</span>
            <h1 className="heroTitle">
              Stories that
              <span>unite a nation.</span>
            </h1>
            <p className="heroDescription">
              Moon TV is a cultural and unity-driven television network dedicated to reshaping Nigeria&apos;s narrative. We showcase authentic stories, celebrate diversity and spotlight the nation&apos;s talent and potential.
            </p>
            <div className="heroButtons animate-fade-up delay-500">
              <button className="btn btn-green">Watch Live on Web</button>
              <Link href="/programs" className="btn btn-outline-gold">View Programmes</Link>
            </div>
          </div>
          <div className="heroRight animate-fade-right delay-400">
            <div className="statItem">
              <span className="statNumber">{programmes.length}</span>
              <span className="statLabel">Batch 1 Programmes</span>
            </div>
            <div className="statItem">
              <span className="statNumber">BATCH 1</span>
              <span className="statLabel">Programme Details</span>
            </div>
            <div className="statItem">
              <span className="statNumber">PNG</span>
              <span className="statLabel">Series Images</span>
            </div>
          </div>
        </div>
      </section>

      <section className="playerSection animate-fade-up delay-300">
        <div className="playerContainer">
          <Image src={featuredProgramme.image} alt={featuredProgramme.title} fill style={{ objectFit: "cover" }} />
          <div className="playPauseBtn">▶</div>
        </div>
      </section>

      <section className="scheduleSection" id="schedule">
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">MOON TV PROGRAM DETAILS - BATCH 1</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Programmes</h2>
            </div>
            <Link href="/programs" className="btn btn-outline-gold">View All Programmes</Link>
          </div>
          <div className="scheduleGrid">
            {programmes.slice(0, 4).map((programme) => (
              <div className="scheduleCard" key={programme.slug}>
                <div className="cardTime">{programme.category}</div>
                <h3 className="cardTitle">{programme.title}</h3>
                <p className="cardDesc">{programme.synopsis}</p>
                <Link href={`/program/${programme.slug}`} className="btn btn-outline-green" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="helloSection">
        <div className="container">
          <div className="helloContainer animate-fade-up delay-200">
            <div className="helloLeft">
              <span className="section-subtitle">BATCH 1 PROGRAMME</span>
              <h2 className="helloTitle">{featuredProgramme.title}</h2>
              <p className="helloDesc">
                {featuredProgramme.synopsis}
              </p>
              <div className="helloGrid">
                {featuredProgramme.purpose.slice(0, 4).map((f, i) => (
                  <div className="helloFeature" key={i}>
                    <div className="featureIcon">✓</div>
                    <div className="featureTitle">Show Purpose</div>
                    <div className="featureDesc">{f}</div>
                  </div>
                ))}
              </div>
              <div>
                <Link href={`/program/${featuredProgramme.slug}`} className="btn btn-outline-gold">View Show Details →</Link>
              </div>
            </div>
            <div className="helloRight">
              <Image src={featuredProgramme.image} alt={featuredProgramme.title} fill style={{ objectFit: "cover" }} />
              <div className="helloBadge">
                <div className="helloBadgeTitle">{featuredProgramme.title}</div>
                <div className="helloBadgeText">{featuredProgramme.category}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="programmesSection" id="programmes">
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">MOON TV ORIGINAL</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Our Programmes</h2>
            </div>
            <Link href="/programs" className="btn btn-outline-gold">View All Programmes →</Link>
          </div>
          <div className="programmesGrid">
            {programmes.slice(0, 8).map((programme) => (
              <Link href={`/program/${programme.slug}`} className="programmeCard" key={programme.slug}>
                <Image src={programme.image} alt={programme.title} fill style={{ objectFit: "cover" }} />
                <div className="programmeOverlay">
                  <span className="programmeCategory">{programme.category}</span>
                  <h3 className="programmeTitle">{programme.title}</h3>
                  <div className="programmeTime">Programme Details - Batch 1</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

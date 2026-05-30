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
              <span className="statLabel">Original Programmes</span>
            </div>
            <div className="statItem">
              <span className="statNumber">HD</span>
              <span className="statLabel">Broadcast Quality</span>
            </div>
            <div className="statItem">
              <span className="statNumber">24/7</span>
              <span className="statLabel">Live Streaming</span>
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
              <span className="section-subtitle">MOON TV PROGRAMMES</span>
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
              <span className="section-subtitle">FEATURED PROGRAMME</span>
              <h2 className="helloTitle">{featuredProgramme.title}</h2>
              <p className="helloDesc">
                {featuredProgramme.synopsis}
              </p>
              {featuredProgramme.notableCast.length > 0 && (
                <div className="helloGrid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
                  {featuredProgramme.notableCast.map((castMember, i) => (
                    <div className="helloFeature" key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: '0.8rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: 0 }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(216, 182, 66, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>
                        {castMember.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                          {featuredProgramme.category.includes("TALK") || featuredProgramme.category.includes("CULINARY") || featuredProgramme.category.includes("AVIATION") || featuredProgramme.category.includes("HEALTH") ? "Host" : "Starring"}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white', marginTop: '2px' }}>{castMember}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <div className="programmeTime">{programme.category}</div>
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

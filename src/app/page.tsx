import Image from "next/image";
import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="heroBackground">
          <Image src="/hero_bg.png" alt="Moon TV Background" fill priority />
        </div>
        <div className="heroOverlay"></div>
        <div className="container heroContent">
          <div className="heroLeft">
            <span className="section-subtitle">MOON TV IS NIGERIA</span>
            <h1 className="heroTitle">
              Stories that
              <span>unite a nation.</span>
            </h1>
            <p className="heroDescription">
              Moon TV is a cultural and unity-driven television network dedicated to reshaping Nigeria's narrative. We showcase authentic stories, celebrate diversity and spotlight the nation's talent and potential.
            </p>
            <div className="heroButtons">
              <button className="btn btn-green">Watch Live on Web</button>
              <button className="btn btn-outline-gold">View Programmes</button>
            </div>
          </div>
          <div className="heroRight">
            <div className="statItem">
              <span className="statNumber">30+</span>
              <span className="statLabel">Local Programs</span>
            </div>
            <div className="statItem">
              <span className="statNumber">24/7</span>
              <span className="statLabel">Live EPG</span>
            </div>
            <div className="statItem">
              <span className="statNumber">100%</span>
              <span className="statLabel">Original Content</span>
            </div>
          </div>
        </div>
      </section>

      <section className="playerSection">
        <div className="playerContainer">
          <Image src="/mountain.png" alt="Moon TV Player" fill style={{ objectFit: "cover" }} />
          <div className="playPauseBtn">▶</div>
        </div>
      </section>

      <section className="scheduleSection" id="schedule">
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">MOON TV ORIGINAL</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Today's Schedule</h2>
            </div>
            <button className="btn btn-outline-gold">View Full EPG</button>
          </div>
          <div className="scheduleGrid">
            {[
              { time: "08:00 AM", title: "Cultural Crossroads", desc: "Exploring the intersections of culture and modern society in today's fast-paced world." },
              { time: "10:30 AM", title: "Innovations Hub", desc: "Discover the latest tech startups and innovations shaping the future of the continent." },
              { time: "01:00 PM", title: "Cultural Crossroads", desc: "A deep dive into traditional stories and how they influence the new generation." },
              { time: "04:30 PM", title: "Innovations Hub", desc: "Roundtable discussion with leading entrepreneurs and tech visionaries." }
            ].map((item, idx) => (
              <div className="scheduleCard" key={idx}>
                <div className="cardTime">{item.time}</div>
                <h3 className="cardTitle">{item.title}</h3>
                <p className="cardDesc">{item.desc}</p>
                <button className="btn btn-outline-green" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Watch</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="helloSection">
        <div className="container">
          <div className="helloContainer">
            <div className="helloLeft">
              <span className="section-subtitle">FLAGSHIP CONTENT</span>
              <h2 className="helloTitle">Hello Nigeria</h2>
              <p className="helloDesc">
                Hello Nigeria is our flagship show celebrating Nigerian innovation, excellence and leadership across sectors. A national talk show designed to reposition Nigeria through truth, progress, and pride.
              </p>
              <div className="helloGrid">
                {[
                  { title: "Innovation", desc: "Highlighting Nigerian breakthroughs" },
                  { title: "Leadership", desc: "Accountability without hostility" },
                  { title: "Culture", desc: "Safeguarding our heritage" },
                  { title: "Progress", desc: "Shifting the narrative to hope" }
                ].map((f, i) => (
                  <div className="helloFeature" key={i}>
                    <div className="featureIcon">✓</div>
                    <div className="featureTitle">{f.title}</div>
                    <div className="featureDesc">{f.desc}</div>
                  </div>
                ))}
              </div>
              <div>
                <button className="btn btn-outline-gold">View Show Details →</button>
              </div>
            </div>
            <div className="helloRight">
              <Image src="/microphone.png" alt="Hello Nigeria" fill style={{ objectFit: "contain" }} />
              <div className="helloBadge">
                <div className="helloBadgeTitle">Hello<br />Nigeria</div>
                <div className="helloBadgeText">LIVE Mon - Fri 18:00 WAT</div>
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
            <button className="btn btn-outline-gold">View All Programmes →</button>
          </div>
          <div className="programmesGrid">
            <div className="programmeCard">
              <Image src="/mountain.png" alt="Show" fill style={{ objectFit: "cover" }} />
              <div className="programmeOverlay">
                <span className="programmeCategory">CULTURE</span>
                <h3 className="programmeTitle">Hello Nigeria</h3>
                <div className="programmeTime">Mon - Fri • 18:00 WAT</div>
              </div>
            </div>
            <div className="programmeCard">
              <Image src="/program_1.png" alt="Show" fill style={{ objectFit: "cover" }} />
              <div className="programmeOverlay">
                <span className="programmeCategory">DANCE</span>
                <h3 className="programmeTitle">Cultural Crossroads</h3>
                <div className="programmeTime">Saturdays • 20:00 WAT</div>
              </div>
            </div>
            <div className="programmeCard">
              <Image src="/program_2.png" alt="Show" fill style={{ objectFit: "cover" }} />
              <div className="programmeOverlay">
                <span className="programmeCategory">TECH</span>
                <h3 className="programmeTitle">Innovations Hub</h3>
                <div className="programmeTime">Sundays • 16:00 WAT</div>
              </div>
            </div>
            <div className="programmeCard">
              <Image src="/program_3.png" alt="Show" fill style={{ objectFit: "cover" }} />
              <div className="programmeOverlay">
                <span className="programmeCategory">DRAMA</span>
                <h3 className="programmeTitle">The Rise of Africa</h3>
                <div className="programmeTime">Fridays • 21:00 WAT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="movementSection" id="about">
        <div className="container">
          <span className="section-subtitle">WHERE NIGERIA'S ENERGY BEGINS</span>
          <h2 className="movementTitle">"Moon TV reflects our pride, dignity, and <span>possibility.</span>"</h2>
          <div className="movementIcons">
            <div className="movementIconWrapper">
              <div className="mIcon">🤝</div>
              <span className="mLabel">UNITY</span>
            </div>
            <div className="movementIconWrapper">
              <div className="mIcon">⚖️</div>
              <span className="mLabel">TRUTH</span>
            </div>
            <div className="movementIconWrapper">
              <div className="mIcon">📈</div>
              <span className="mLabel">PROGRESS</span>
            </div>
            <div className="movementIconWrapper">
              <div className="mIcon">⭐</div>
              <span className="mLabel">EXCELLENCE</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

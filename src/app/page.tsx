'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programmes } from "@/lib/programmes";

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Load favorites from local storage
    const storedFavs = localStorage.getItem('moon_favorites');
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e) {
        // ignore
      }
    }

    // Check user session
    const storedUser = localStorage.getItem('moon_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleFavorite = (slug: string, title: string) => {
    if (!localStorage.getItem('moon_user')) {
      alert('Please Sign In first to add programmes to your EPG favorites list.');
      return;
    }

    let updated: string[];
    if (favorites.includes(slug)) {
      updated = favorites.filter(s => s !== slug);
    } else {
      updated = [...favorites, slug];
      // Trigger a beautiful live simulated EPG reminder notification!
      setShowNotification(`🔔 REMINDER: "${title}" is now LIVE on Moon TV!`);
      setTimeout(() => {
        setShowNotification(null);
      }, 5000);
    }
    setFavorites(updated);
    localStorage.setItem('moon_favorites', JSON.stringify(updated));
  };

  const featuredProgramme = programmes[0];
  const favoriteProgrammes = programmes.filter(p => favorites.includes(p.slug));

  return (
    <main style={{ position: 'relative' }}>
      <Header />

      {/* Floating EPG Notification Alert Toast */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '20px',
          backgroundColor: '#1a5c2b',
          border: '1.5px solid var(--accent-gold)',
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          color: 'white',
          fontWeight: 'bold',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📺</span>
          <span>{showNotification}</span>
          <button 
            onClick={() => setShowNotification(null)} 
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: 'bold', marginLeft: '1rem' }}
          >
            ✕
          </button>
        </div>
      )}

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

      {/* 2. My Favorite EPG Channels / Shows Section */}
      {favoriteProgrammes.length > 0 && (
        <section className="scheduleSection" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(26,92,43,0.02)' }}>
          <div className="container">
            <div className="scheduleHeader">
              <div>
                <span className="section-subtitle">YOUR FAVORITES</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>My Favorited EPG Shows</h2>
              </div>
            </div>
            <div className="scheduleGrid">
              {favoriteProgrammes.map((programme) => (
                <div className="scheduleCard" key={programme.slug} style={{ position: 'relative' }}>
                  <button 
                    onClick={() => toggleFavorite(programme.slug, programme.title)} 
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}
                  >
                    ❤️
                  </button>
                  <div className="cardTime">{programme.category}</div>
                  <h3 className="cardTitle">{programme.title}</h3>
                  <p className="cardDesc">{programme.synopsis}</p>
                  <Link href={`/program/${programme.slug}`} className="btn btn-outline-green" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View Details</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            {programmes.slice(0, 4).map((programme) => {
              const isFav = favorites.includes(programme.slug);
              return (
                <div className="scheduleCard" key={programme.slug} style={{ position: 'relative' }}>
                  <button 
                    onClick={() => toggleFavorite(programme.slug, programme.title)} 
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, outline: 'none' }}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>
                  <div className="cardTime">{programme.category}</div>
                  <h3 className="cardTitle">{programme.title}</h3>
                  <p className="cardDesc">{programme.synopsis}</p>
                  <Link href={`/program/${programme.slug}`} className="btn btn-outline-green" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View Details</Link>
                </div>
              );
            })}
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

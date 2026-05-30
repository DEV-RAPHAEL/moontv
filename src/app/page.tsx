'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programmes } from "@/lib/programmes";
import { weeklySchedule, getNigeriaDayName, getNigeriaHourMinute, enrichSlotsWithNigeriaTime } from "@/lib/schedule";
import type { ScheduleSlot } from "@/lib/schedule";

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [onAirSlots, setOnAirSlots] = useState<ScheduleSlot[]>([]);
  const [nigeriaTimeDisplay, setNigeriaTimeDisplay] = useState<string>('');

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

    // Compute Nigeria on-air schedule
    const computeSchedule = () => {
      const day = getNigeriaDayName();
      const { hour, minute } = getNigeriaHourMinute();
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} WAT`;
      setNigeriaTimeDisplay(timeStr);

      const slots = weeklySchedule[day] || [];
      const enriched = enrichSlotsWithNigeriaTime(slots);
      // Filter to currently playing + future slots, up to 5
      const currentMinutes = hour * 60 + minute;
      const relevant = enriched.filter(s => (s.endMinutes ?? 0) > currentMinutes);
      setOnAirSlots(relevant.slice(0, 5));
    };

    computeSchedule();
    // Refresh every minute to keep Nigeria time accurate
    const interval = setInterval(computeSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = async (slug: string, title: string) => {
    const session = localStorage.getItem('moon_user');
    if (!session) {
      alert('Please Sign In first to add programmes to your EPG favorites list.');
      return;
    }

    const { email } = JSON.parse(session);
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

    try {
      await fetch('/api/favorites/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, favorites: updated })
      });
    } catch (e) {
      console.error('Failed to sync favorites with backend:', e);
    }
  };

  const featuredProgramme = programmes[0];
  const favoriteProgrammes = programmes.filter(p => favorites.includes(p.slug));

  // Resolve programme image from slug
  const getProgrammeImage = (slug?: string) => {
    if (!slug) return '/hero_bg.jpg';
    const found = programmes.find(p => p.slug === slug);
    return found ? found.image : '/hero_bg.jpg';
  };

  // Section Curation Lists from the 29 programmes
  const trendingProgrammes = programmes.slice(5, 10);
  const culturalGems = programmes.slice(10, 14);
  const recentlyDiscovered = programmes.slice(14, 18);

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

      {/* 1. Hero Section */}
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
              <Link href="/epg" className="btn btn-outline-gold">View Weekly Schedule</Link>
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

      {/* 2. ON AIR NOW & UPCOMING TIMELINE (Next 5 Shows — Nigeria Standard Time) */}
      <section className="scheduleSection" style={{ borderBottom: '1px solid var(--border-color)', padding: '5rem 0' }}>
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle" style={{ color: 'var(--accent-gold)' }}>🔴 BROADCASTING TODAY</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>On Air Now & Upcoming</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Real-time broadcast queue — Nigeria Standard Time (WAT){nigeriaTimeDisplay ? ` · ${nigeriaTimeDisplay}` : ''}
              </p>
            </div>
            <Link href="/epg" className="btn btn-outline-gold">View Full Weekly Schedule</Link>
          </div>

          {onAirSlots.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
              {onAirSlots.map((slot, idx) => {
                const isFav = slot.slug ? favorites.includes(slot.slug) : false;
                const imgSrc = getProgrammeImage(slot.slug);
                return (
                  <div key={`${slot.slug ?? slot.title}-${idx}`} style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: slot.isNowPlaying ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                    padding: '1.25rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    boxShadow: slot.isNowPlaying ? '0 8px 30px rgba(216, 182, 66, 0.15)' : 'none'
                  }}>
                    {/* Heart EPG Sync Button */}
                    {slot.slug && (
                      <button 
                        onClick={() => toggleFavorite(slot.slug!, slot.title)} 
                        style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', zIndex: 10, outline: 'none' }}
                      >
                        {isFav ? '❤️' : '🤍'}
                      </button>
                    )}

                    <div style={{ width: '100%', height: '110px', position: 'relative', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#050b07' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt={slot.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {slot.isNowPlaying && (
                        <div style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          backgroundColor: '#c82333',
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.65rem',
                          fontWeight: 'bold',
                          borderRadius: '3px',
                          letterSpacing: '0.5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white', display: 'inline-block' }} />
                          LIVE NOW
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ color: 'var(--accent-gold)', fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                        {slot.time} WAT
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slot.title}</h3>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{slot.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--border-color)',
              marginTop: '2rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📺</div>
              <p style={{ fontWeight: 'bold' }}>No broadcast scheduled for this time slot.</p>
              <p style={{ fontSize: '0.9rem' }}>Moon TV broadcasts from 6:00 AM – 10:00 PM WAT daily.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. MY EPG FAVORITES SECTION (Blank & Full State) */}
      <section className="scheduleSection" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(26,92,43,0.01)', padding: '5rem 0' }}>
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">PERSONALIZED EPG</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>My Favorited Channels & Shows</h2>
            </div>
          </div>

          {favoriteProgrammes.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {favoriteProgrammes.map((programme) => (
                <div key={programme.slug} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  padding: '1.5rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <button 
                    onClick={() => toggleFavorite(programme.slug, programme.title)} 
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}
                  >
                    ❤️
                  </button>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{programme.category}</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>{programme.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', flex: 1, marginBottom: '1.5rem' }}>{programme.synopsis}</p>
                  <Link href={`/program/${programme.slug}`} className="btn btn-outline-green" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', width: 'fit-content' }}>
                    View Show Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '2px dashed rgba(216, 182, 66, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <div style={{ fontSize: '2.5rem', filter: 'grayscale(0.5)' }}>❤️</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>No EPG Favorites Added Yet</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                Build your personalized guide. Toggle the heart icon on any program cards below to synchronize shows and receive EPG Live reminder alert notifications when they broadcast live.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. PREMIUM CURATED SECTION: TRENDING NOW */}
      <section className="scheduleSection" id="trending" style={{ borderBottom: '1px solid var(--border-color)', padding: '5rem 0' }}>
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">TRENDING NOW</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Most Watched EPG Channels</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {trendingProgrammes.map((prog) => {
              const isFav = favorites.includes(prog.slug);
              return (
                <div key={prog.slug} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <button 
                    onClick={() => toggleFavorite(prog.slug, prog.title)} 
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', zIndex: 10, outline: 'none' }}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>

                  <div style={{ width: '100%', height: '140px', position: 'relative', backgroundColor: '#050b07' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.image} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>{prog.category}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', marginTop: '4px', marginBottom: '8px' }}>{prog.title}</h4>
                    <Link href={`/program/${prog.slug}`} style={{ fontSize: '0.8rem', color: 'var(--button-green)', fontWeight: 'bold', display: 'inline-block' }}>
                      Learn More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PREMIUM CURATED SECTION: CULTURAL & FAMILY GEMS */}
      <section className="scheduleSection" id="cultural" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(26,92,43,0.01)', padding: '5rem 0' }}>
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">CULTURAL HIGHLIGHTS</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Heritage & Family Gems</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {culturalGems.map((prog) => {
              const isFav = favorites.includes(prog.slug);
              return (
                <div key={prog.slug} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <button 
                    onClick={() => toggleFavorite(prog.slug, prog.title)} 
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', zIndex: 10 }}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>

                  <div style={{ width: '100%', height: '150px', position: 'relative', backgroundColor: '#050b07' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.image} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(26, 92, 43, 0.2)', color: 'var(--button-green)', padding: '0.2rem 0.5rem', borderRadius: '4px', width: 'fit-content', fontWeight: 'bold' }}>
                      {prog.category}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'white', margin: 0 }}>{prog.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0, flex: 1 }}>{prog.synopsis}</p>
                    <Link href={`/program/${prog.slug}`} style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      Show Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FEATURED DETAILED SPOTLIGHT BANNER */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featuredProgramme.image} alt={featuredProgramme.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              <div className="helloBadge">
                <div className="helloBadgeTitle">{featuredProgramme.title}</div>
                <div className="helloBadgeText">{featuredProgramme.category}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREMIUM CURATED SECTION: RECENTLY DISCOVERED */}
      <section className="scheduleSection" id="recently" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="scheduleHeader">
            <div>
              <span className="section-subtitle">NEWLY DISCOVERED</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Recently Added EPG Channels</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {recentlyDiscovered.map((prog) => {
              const isFav = favorites.includes(prog.slug);
              return (
                <div key={prog.slug} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <button 
                    onClick={() => toggleFavorite(prog.slug, prog.title)} 
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', zIndex: 10 }}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>

                  <div style={{ width: '100%', height: '150px', position: 'relative', backgroundColor: '#050b07' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prog.image} alt={prog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(216, 182, 66, 0.1)', color: 'var(--accent-gold)', padding: '0.2rem 0.5rem', borderRadius: '4px', width: 'fit-content', fontWeight: 'bold' }}>
                      {prog.category}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'white', margin: 0 }}>{prog.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4', margin: 0, flex: 1 }}>{prog.synopsis}</p>
                    <Link href={`/program/${prog.slug}`} style={{ fontSize: '0.85rem', color: 'var(--button-green)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      Show Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

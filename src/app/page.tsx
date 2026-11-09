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
  const [onAirSlots, setOnAirSlots] = useState<ScheduleSlot[]>([]);
  const [nigeriaTimeDisplay, setNigeriaTimeDisplay] = useState<string>('');

  useEffect(() => {
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

  const featuredProgramme = programmes[0];

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

      {/* 3. PREMIUM CURATED SECTION: TRENDING NOW */}
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
              return (
                <div key={prog.slug} style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
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

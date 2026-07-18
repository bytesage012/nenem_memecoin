'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  // ---------- State for active nav link ----------
  const [activeSection, setActiveSection] = useState('home');

  // ---------- Refs for sections (to observe) ----------
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // ---------- Intersection Observer for nav active state ----------
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section[id], .hero[id]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.main-nav a');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ---------- Smooth scroll for anchor links ----------
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleClick = (e: MouseEvent) => {
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.slice(1);
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    links.forEach((link) => link.addEventListener('click', handleClick));
    return () => links.forEach((link) => link.removeEventListener('click', handleClick));
  }, []);

  // ---------- Copy contract address ----------
  useEffect(() => {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-btn');
    copyButtons.forEach((btn) => {
      const handler = () => {
        const bar = btn.closest('.contract-bar');
        const addressEl = bar?.querySelector('.contract-address');
        if (!addressEl) return;
        const address = addressEl.textContent?.trim() || '';
        navigator.clipboard.writeText(address).then(() => {
          btn.classList.add('copied');
          btn.textContent = '✓';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = '⧉';
          }, 1500);
        }).catch(() => {
          // fallback
          const temp = document.createElement('textarea');
          temp.value = address;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        });
      };
      btn.addEventListener('click', handler);
      return () => btn.removeEventListener('click', handler);
    });
  }, []);

  // ---------- Play circle click animation ----------
  useEffect(() => {
    const circles = document.querySelectorAll<HTMLElement>('.play-circle');
    circles.forEach((circle) => {
      const handler = () => {
        circle.style.transform = circle.classList.contains('sm')
          ? 'translate(-50%,-50%) scale(0.9)'
          : 'scale(0.9)';
        setTimeout(() => {
          circle.style.transform = '';
        }, 150);
      };
      circle.addEventListener('click', handler);
      return () => circle.removeEventListener('click', handler);
    });
  }, []);

  // ---------- Image fallback for cataas images ----------
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src.includes('cataas.com')) {
      img.src = '/cat-master.svg';
    }
  };

  return (
    <>
      {/* Decorative floating rail */}
      <div className="side-rail" aria-hidden="true">
        <span className="rail-icon gold">👑</span>
        <span className="rail-icon gold">🚀</span>
        <span className="rail-icon gold">📣</span>
        <span className="rail-icon dark">💻</span>
        <span className="rail-icon gold">❤️</span>
        <span className="rail-icon gold">🪙</span>
      </div>

      <div className="top-banner">
        <header className="site-header">
          <div className="header-inner">
            <a className="brand" href="#home">
              <span className="brand-avatar">
                <img
                  src="/images/cat.jpg"
                  alt="Neném"
                  loading="lazy"
                  width="200"
                  height="200"
                  onError={handleImageError}
                />
              </span>
              <span className="brand-text">
                <span className="brand-name">NENÉM</span>
                <span className="brand-sub">THE LEGENDARY GATOELHO</span>
              </span>
            </a>

            <nav className="main-nav">
              <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
              <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
              <a href="#tokenomics" className={activeSection === 'tokenomics' ? 'active' : ''}>Tokenomics</a>
              <a href="#roadmap" className={activeSection === 'roadmap' ? 'active' : ''}>Roadmap</a>
              <a href="#community" className={activeSection === 'community' ? 'active' : ''}>Community</a>
            </nav>

            <a href="#buy" className="btn btn-primary header-buy">
              <span className="paw">🐾</span> Buy $NENEM
            </a>
          </div>
        </header>

        <section className="hero" id="home">
          <div className="hero-copy">
            <h1>
              Meet Neném,<br />The World-Famous<br />Gatoelho <span className="cat-emoji">🐱</span>
            </h1>
            <p className="hero-desc">
              The most beloved cat on the internet is now<br />a memecoin on the blockchain.<br />
              <span className="accent-line">A legend. A vibe. A movement.</span>
            </p>
            <a href="#buy" className="btn btn-primary btn-lg">
              <span className="paw">🐾</span> Buy $NENEM
            </a>
            <div className="contract-bar inline">
              <span className="contract-label">Contract Address</span>
              <span className="contract-address">BCDgN5Jgnkbjs8oRHivko5dcf18sPsSmPVKAsDnMpump</span>
              <button className="copy-btn" title="Copy contract address" aria-label="Copy contract address">⧉</button>
            </div>
            <div className="badge-row wrap">
              <span className="pill"><span className="pill-ic">❤️</span> Loved by Millions Worldwide</span>
              <span className="pill"><span className="pill-ic">🐾</span> Viral Star from Brazil <span className="flag">🇧🇷</span></span>
              <span className="pill"><span className="pill-ic">✨</span> Strong Community Big Future</span>
            </div>
          </div>
        </section>
      </div>

      <main>
        {/* STORY */}
        <section className="story" id="about">
          <div className="story-card">
            <div className="story-photo">
              <img
                src="/images/cat1.jpg"
                alt="Neném portrait"
                loading="lazy"
                width="500"
                height="500"
                onError={handleImageError}
              />
              <span className="photo-heart">🤍</span>
            </div>
            <div className="story-text">
              <span className="eyebrow">✦ Our Legend</span>
              <h2>The Story of Neném <span className="paw">🐾</span></h2>
              <div className="story-cols">
                <p>
                  Neném was born in Taió, Brazil, with Short Spine Syndrome, a rare genetic condition linked to a Manx type mutation that left his spine shorter and compressed. He was also born from inbreeding, making his story even more unique.
                </p>
                <p>
                  But none of that stops him. Neném spends his days climbing trees, hunting, playing, and living life like any other happy cat. <span className="accent">His incredible personality and unmistakable look have made him go viral across social media, earning him fans from all around the world.</span>
                </p>
              </div>
              <div className="tag-row">
                <span className="tag">📍 From Taió, Brazil <span className="flag">🇧🇷</span></span>
                <span className="tag">❤️ Born Different, Lives Happy</span>
                <span className="tag">🌲 Explorer &amp; Hunter</span>
                <span className="tag">⭐ Viral Icon Worldwide</span>
              </div>
            </div>
          </div>
        </section>

        {/* VIRAL MOMENTS */}
        <section className="viral">
          <span className="eyebrow center">✦ Viral Moments</span>
          <h2 className="center">Neném's Most Viral Moments <span className="heart">🤍</span></h2>

          <div className="viral-grid">
            {[...Array(6)].map((_, i) => (
              <div className="viral-card" key={i}>
                <img
                  src={`/images/cat${i + 2}.jpg`}
                  alt=""
                  loading="lazy"
                  width="400"
                  height="520"
                  onError={handleImageError}
                />
                <span className="play-circle sm">▶</span>
                <span className="views">▶ {['2.3M', '1.8M', '3.2M', '2.1M', '2.7M', '1.9M'][i]}</span>
              </div>
            ))}
          </div>

          <div className="center">
            <a href="#" className="btn btn-primary">
              <span className="yt">▶</span> Watch More on YouTube
            </a>
          </div>
        </section>

        {/* TOKENOMICS */}
        <section className="tokenomics" id="tokenomics">
          <span className="eyebrow center">🪙 Tokenomics</span>
          <h2 className="center">Built for the Community</h2>

          <div className="token-grid">
            <div className="token-card">
              <span className="token-ic">🪙</span>
              <span className="token-label">Supply</span>
              <span className="token-value">1,000,000,000</span>
              <span className="token-sub gold">$NENEM</span>
              <hr />
              <span className="token-foot">Total Supply<br />100% Fair Launch</span>
            </div>

            <div className="token-card">
              <span className="token-ic">💧</span>
              <span className="token-label">Taxes</span>
              <div className="tax-row"><span>Buy Tax</span><span className="gold">0%</span></div>
              <div className="tax-row"><span>Sell Tax</span><span className="gold">0%</span></div>
              <span className="token-foot">No Tax. Just Love.<br />More for the Community.</span>
            </div>

            <div className="token-card dist-card">
              <span className="token-label">Distribution</span>
              <div className="dist-body">
                <svg viewBox="0 0 120 120" className="pie" aria-hidden="true">
                  <circle r="60" cx="60" cy="60" fill="transparent" stroke="#e8b84b" strokeWidth="120" strokeDasharray="0 251.2" transform="rotate(-90 60 60)" />
                  <g className="pie-g" transform="rotate(-90 60 60)">
                    <circle r="30" cx="60" cy="60" fill="transparent" stroke="#e8b84b" strokeWidth="60" strokeDasharray="100.48 251.2" strokeDashoffset="0" />
                    <circle r="30" cx="60" cy="60" fill="transparent" stroke="#3fc6c1" strokeWidth="60" strokeDasharray="62.8 251.2" strokeDashoffset="-100.48" />
                    <circle r="30" cx="60" cy="60" fill="transparent" stroke="#e07b4f" strokeWidth="60" strokeDasharray="37.68 251.2" strokeDashoffset="-163.28" />
                    <circle r="30" cx="60" cy="60" fill="transparent" stroke="#8b7ee0" strokeWidth="60" strokeDasharray="25.12 251.2" strokeDashoffset="-200.96" />
                    <circle r="30" cx="60" cy="60" fill="transparent" stroke="#7fd48a" strokeWidth="60" strokeDasharray="25.12 251.2" strokeDashoffset="-226.08" />
                  </g>
                  <circle r="15" cx="60" cy="60" fill="#0d0d0d" />
                  <text x="60" y="65" textAnchor="middle" fontSize="14">🐾</text>
                </svg>
                <ul className="dist-legend">
                  <li><i style={{ background: '#e8b84b' }}></i>Liquidity <b>40%</b></li>
                  <li><i style={{ background: '#3fc6c1' }}></i>Community Rewards <b>25%</b></li>
                  <li><i style={{ background: '#e07b4f' }}></i>Marketing <b>15%</b></li>
                  <li><i style={{ background: '#8b7ee0' }}></i>Team <b>10%</b></li>
                  <li><i style={{ background: '#7fd48a' }}></i>Airdrops <b>10%</b></li>
                </ul>
              </div>
              <span className="sr-only">Token distribution: liquidity 40%, community rewards 25%, marketing 15%, team 10%, airdrops 10%</span>
            </div>

            <div className="token-card community-card">
              <img
                src="/images/cat8.jpg"
                alt="Community"
                loading="lazy"
                width="500"
                height="300"
                onError={handleImageError}
              />
              <span className="cc-title">100% Community Driven</span>
              <span className="cc-sub">Together, we make Neném's legacy eternal. 🤍</span>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="roadmap" id="roadmap">
          <div className="roadmap-header">
            <span className="eyebrow center">✦ The Journey Ahead</span>
            <h2 className="center">Roadmap <span className="paw">🐾</span></h2>
            <p className="roadmap-sub center">Every great story has a path. Here's ours — step by step, phase by phase.</p>
          </div>

          <div className="roadmap-timeline">
            {[
              { phase: 'Phase 1', title: 'The Beginning', bg: '#e8b84b', icon: '/images/cat9.jpg', items: ['🚀 Launch $NENEM', '🤝 Build Community', '🌐 Website & Socials'] },
              { phase: 'Phase 2', title: 'Spread the Love', bg: '#3fc6c1', icon: '/images/cat10.jpg', items: ['📢 Marketing & Outreach', '🤳 Influencer Partnerships', '🎉 Community Contests'] },
              { phase: 'Phase 3', title: 'Grow the Family', bg: '#e07b4f', icon: '/images/cat11.jpg', items: ['📊 More Listings', '📈 CMC & CG Listings', '🌍 Expand Global Reach'] },
              { phase: 'Phase 4', title: 'Take Off', bg: '#8b7ee0', icon: '/images/cat12.jpg', items: ['🤝 Major Partnerships', '🏦 CEX Listings', '🛍️ Utility & Merch'] },
              { phase: 'Phase 5', title: 'Legendary Status', bg: '#7fd48a', icon: '/images/cat13.jpg', items: ['🏆 Neném Brand Expansion', '🐾 Charity for Animals', '🌟 The Legacy Continues'] },
            ].map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div className={`rm-item ${isLeft ? 'rm-left' : 'rm-right'}`} key={index}>
                  <div className="rm-dot" style={{ background: item.bg, boxShadow: `0 0 0 4px ${item.bg}4D` }}>
                    <span>{index + 1}</span>
                  </div>
                  <div className="rm-card">
                    <div className="rm-card-icon">
                      <img src={item.icon} alt="" loading="lazy" width="200" height="200" onError={handleImageError} />
                    </div>
                    <div className="rm-card-body">
                      <span className="rm-phase gold">{item.phase}</span>
                      <h3 className="rm-title">{item.title}</h3>
                      <ul>
                        {item.items.map((li, idx) => (
                          <li key={idx}>{li}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMMUNITY */}
        <section className="community" id="community">
          <h2 className="center">Join the Neném Family <span className="heart">🤍</span></h2>
          <p className="center sub">Be part of the most wholesome community in crypto.</p>

          <div className="community-grid">
            <a className="social-card" href="#">
              <span className="social-ic ig">📷</span>
              <span className="social-name">Instagram<br /><b>@gato.elho</b></span>
              <span className="social-count">112K+<br /><small>Followers</small></span>
            </a>
            <a className="social-card" href="#">
              <span className="social-ic yt">▶</span>
              <span className="social-name">YouTube<br /><b>Neném the Gatoelho</b></span>
              <span className="social-count">250K+<br /><small>Subscribers</small></span>
            </a>
            <a className="social-card" href="#">
              <span className="social-ic x">𝕏</span>
              <span className="social-name">X (Twitter)<br /><b>@NenemGatoelho</b></span>
              <span className="social-count">85K+<br /><small>Followers</small></span>
            </a>
            <div className="join-card">
              <span className="join-ic">🐾</span>
              <span className="join-title">Join Our Community</span>
              <span className="join-sub">Together, we're not just building a memecoin. We're building a legacy.</span>
              <a href="#" className="btn btn-primary"><span className="tg">✈</span> Join on Telegram</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <a className="brand" href="#home">
              <span className="brand-avatar sm">
                <img src="/images/cat14.jpg" alt="Neném" loading="lazy" width="200" height="200" onError={handleImageError} />
              </span>
              <span className="brand-text">
                <span className="brand-name">NENÉM</span>
                <span className="brand-sub">THE LEGENDARY GATOELHO</span>
              </span>
            </a>
            <p className="footer-tagline">A legend with a short spine and a giant heart. Loved by millions worldwide.</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram" className="social-link"><span>📷</span></a>
              <a href="#" aria-label="YouTube" className="social-link"><span>▶</span></a>
              <a href="#" aria-label="X (Twitter)" className="social-link"><span>𝕏</span></a>
              <a href="#" aria-label="Telegram" className="social-link"><span>✈</span></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#tokenomics">Tokenomics</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">How to Buy</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Whitepaper</a></li>
              <li><a href="#">Contract</a></li>
              <li><a href="#">Media Kit</a></li>
            </ul>
          </div>

          <div className="footer-cta-col">
            <h4>Join the Movement</h4>
            <p className="footer-cta-text">Be part of the most wholesome community in crypto. Neném is waiting for you.</p>
            <a href="#" className="btn btn-primary footer-cta-btn"><span>🐾</span> Join on Telegram</a>
            <div className="footer-legal">
              <a href="#">Disclaimer</a>
              <span className="sep">·</span>
              <a href="#">Terms</a>
              <span className="sep">·</span>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 NENÉM – The Legendary Gatoelho. All rights reserved.</span>
          <span className="footer-heart">Made with ❤️ for Neném and his family.</span>
        </div>
      </footer>
    </>
  );
}

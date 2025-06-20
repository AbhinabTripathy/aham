'use client';
import React from 'react';
import Image from 'next/image';

const footerLinks = [
  { label: 'ABOUT', href: '#' },
  { label: 'CONTACT', href: '#' },
  { label: 'HELP', href: '#' },
  { label: 'PRIVACY', href: '#' },
  { label: 'TERMS', href: '#' },
];

const Footer = () => {
  return (
    <footer
      className="aham-footer"
      style={{
        background: '#2d2d2d',
        color: '#fff',
        padding: '40px 0 24px 0',
        textAlign: 'center',
        fontFamily: 'Montserrat, Arial, sans-serif',
        animation: 'aham-fadein 1.2s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="aham-social"
          style={{ margin: '0 32px', display: 'inline-block', transition: 'transform 0.3s' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="none" />
            <rect x="8" y="8" width="24" height="24" rx="8" stroke="#fff" strokeWidth="2" />
            <circle cx="20" cy="20" r="6" stroke="#fff" strokeWidth="2" />
            <circle cx="27.5" cy="12.5" r="1.5" fill="#fff" />
          </svg>
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="aham-social"
          style={{ margin: '0 32px', display: 'inline-block', transition: 'transform 0.3s' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="none" />
            <rect x="8" y="8" width="24" height="24" rx="8" stroke="#fff" strokeWidth="2" />
            <polygon points="18,16 26,20 18,24" fill="#fff" />
          </svg>
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {footerLinks.slice(0, 3).map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="aham-link"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: 2,
                  fontSize: 28,
                  fontWeight: 500,
                  transition: 'color 0.3s, transform 0.3s',
                  display: 'inline-block',
                }}
              >
                {link.label}
              </a>
              {idx < 2 && (
                <span style={{ color: '#fff', fontSize: 28, margin: '0 8px' }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {footerLinks.slice(3).map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="aham-link"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: 2,
                  fontSize: 28,
                  fontWeight: 500,
                  transition: 'color 0.3s, transform 0.3s',
                  display: 'inline-block',
                }}
              >
                {link.label}
              </a>
              {idx < 1 && (
                <span style={{ color: '#fff', fontSize: 28, margin: '0 8px' }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span className="aham-logo-float" style={{ display: 'inline-block' }}>
          <Image
            src={require('./assets/images/A Astro Logor.png')}
            alt="aham core logo"
            width={120}
            height={120}
            style={{ borderRadius: '50%' }}
          />
        </span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 400, letterSpacing: 2 }}>aham core</div>
      <style>{`
        @keyframes aham-fadein {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes aham-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .aham-footer {
          animation: aham-fadein 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .aham-social:hover {
          transform: scale(1.18) rotate(-8deg);
          filter: drop-shadow(0 2px 8px #fff2);
        }
        .aham-link:hover {
          color: #00bfff;
          transform: scale(1.08) translateY(-2px);
          text-shadow: 0 2px 8px #00bfff44;
        }
        .aham-logo-float {
          animation: aham-float 2.5s ease-in-out infinite;
        }
        @media (max-width: 600px) {
          .aham-link, .aham-footer span {
            font-size: 18px !important;
          }
          .aham-logo-float img {
            width: 80px !important;
            height: 80px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 
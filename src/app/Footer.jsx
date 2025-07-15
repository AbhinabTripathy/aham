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
        background: '#ffffff',
        color: '#2d2d2d',
        padding: '24px 0 16px 0',
        textAlign: 'center',
        fontFamily: 'Montserrat, Arial, sans-serif',
        animation: 'aham-fadein 1.2s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <hr style={{
          width: '95%',
          margin: '0 auto 20px auto',
          border: 'none',
          height: '1px',
          backgroundColor: '#2d2d2d',
          opacity: 0.5
        }} />
        <a
          href="https://www.instagram.com/aham.core?igsh=MXRseDNiY2F1b3Q5dw=="
          target="_blank"
          rel="noopener noreferrer"
          className="aham-social"
          style={{ margin: '0 16px', display: 'inline-block', transition: 'transform 0.3s' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="none" />
            <rect x="8" y="8" width="24" height="24" rx="8" stroke="#2d2d2d" strokeWidth="2" />
            <circle cx="20" cy="20" r="6" stroke="#2d2d2d" strokeWidth="2" />
            <circle cx="27.5" cy="12.5" r="1.5" fill="#2d2d2d" />
          </svg>
        </a>
        <a
          href="https://youtube.com/@samarpratapnayak07?si=0C5itPmQX0J9ygOt"
          target="_blank"
          rel="noopener noreferrer"
          className="aham-social"
          style={{ margin: '0 16px', display: 'inline-block', transition: 'transform 0.3s' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="none" />
            <rect x="8" y="8" width="24" height="24" rx="8" stroke="#2d2d2d" strokeWidth="2" />
            <polygon points="18,16 26,20 18,24" fill="#2d2d2d" />
          </svg>
        </a>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {footerLinks.slice(0, 3).map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="aham-link"
                style={{
                  color: '#2d2d2d',
                  textDecoration: 'none',
                  letterSpacing: 1,
                  fontSize: 18,
                  fontWeight: 500,
                  transition: 'color 0.3s, transform 0.3s',
                  display: 'inline-block',
                }}
              >
                {link.label}
              </a>
              {idx < 2 && (
                <span style={{ color: '#2d2d2d', fontSize: 18, margin: '0 6px' }}>|</span>
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
            gap: 16,
          }}
        >
          {footerLinks.slice(3).map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="aham-link"
                style={{
                  color: '#2d2d2d',
                  textDecoration: 'none',
                  letterSpacing: 1,
                  fontSize: 18,
                  fontWeight: 500,
                  transition: 'color 0.3s, transform 0.3s',
                  display: 'inline-block',
                }}
              >
                {link.label}
              </a>
              {idx < 1 && (
                <span style={{ color: '#2d2d2d', fontSize: 18, margin: '0 6px' }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <span className="aham-logo-float" style={{ display: 'inline-block' }}>
          <Image
            src={require('./assets/images/A Astro Logor.png')}
            alt="aham core logo"
            width={80}
            height={80}
            style={{ borderRadius: '50%' }}
          />
        </span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 400, letterSpacing: 1 }}>ahamcore</div>
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
          filter: drop-shadow(0 2px 8px #2d2d2d22);
        }
        .aham-link:hover {
          color: #00bfff;
          transform: scale(1.08) translateY(-2px);
          text-shadow: 0 2px 8px #00bfff44;
        }
        .aham-logo-float {
          animation: aham-float 2.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 
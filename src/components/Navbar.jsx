import { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = ['Home', 'Body-Type', 'Try-On', 'Collections', 'About']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#f5f5f5',
              letterSpacing: '-0.5px',
            }}
          >
            FitVision
          </span>
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            gap: '36px',
            listStyle: 'none',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace('-', '')}`}
                style={{
                  color: 'rgba(245,245,245,0.7)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.3px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f5f5f5')}
                onMouseLeave={(e) =>
                  (e.target.style.color = 'rgba(245,245,245,0.7)')
                }
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(245,245,245,0.7)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 16px',
            }}
            className="hidden md:block"
          >
            Sign In
          </button>
          <button className="btn-primary" style={{ padding: '10px 22px', fontSize: '13px' }}>
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f5f5f5',
              fontSize: '22px',
              padding: '4px',
            }}
            className="md:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(10,10,10,0.98)',
            padding: '16px 24px 24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace('-', '')}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(245,245,245,0.8)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {link}
            </a>
          ))}
          <button
            style={{
              marginTop: '16px',
              width: '100%',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#f5f5f5',
              padding: '12px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

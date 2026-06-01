const footerLinks = {
  Product: ['Try-On', 'Collections', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Support: ['Help Center', 'Contact Us', 'Status', 'Community'],
}

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 24px 32px',
        background: '#080808',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                ✦
              </div>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f5f5f5',
                }}
              >
                FitVision
              </span>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(245,245,245,0.45)',
                lineHeight: '1.7',
                maxWidth: '220px',
              }}
            >
              The future of fashion retail — try any outfit virtually before you
              commit to buying.
            </p>

            {/* Social icons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px',
              }}
            >
              {['𝕏', 'in', 'ig', 'yt'].map((s) => (
                <button
                  key={s}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(245,245,245,0.6)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '700',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(167,139,250,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)'
                    e.currentTarget.style.color = '#c4b5fd'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor =
                      'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(245,245,245,0.6)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#f5f5f5',
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(245,245,245,0.45)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = 'rgba(245,245,245,0.85)')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = 'rgba(245,245,245,0.45)')
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(245,245,245,0.35)',
            }}
          >
            © {new Date().getFullYear()} FitVision. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(245,245,245,0.35)',
            }}
          >
            Made with ♥ for the future of fashion
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

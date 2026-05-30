const floatingImages = [
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80',
    style: { top: '8%', left: '2%', width: '160px', height: '210px', rotate: '-6deg' },
  },
  {
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=80',
    style: { top: '2%', right: '4%', width: '145px', height: '195px', rotate: '5deg' },
  },
  {
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80',
    style: { bottom: '6%', left: '5%', width: '135px', height: '180px', rotate: '4deg' },
  },
  {
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&q=80',
    style: { bottom: '10%', right: '3%', width: '150px', height: '200px', rotate: '-4deg' },
  },
]

const Hero = () => {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '68px',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating fashion images */}
      {floatingImages.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...img.style,
            transform: `rotate(${img.style.rotate})`,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          className="hidden lg:block"
        >
          <img
            src={img.src}
            alt="fashion"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ))}

      {/* Center Content */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '720px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(167,139,250,0.12)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '50px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}
        >
          <span style={{ fontSize: '14px' }}>✨</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#c4b5fd',
              letterSpacing: '0.5px',
            }}
          >
            AI-Powered Virtual Try-On
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-2px',
            marginBottom: '24px',
          }}
        >
          Try Any Outfit.{' '}
          <span className="gradient-text">Look Amazing.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'rgba(245,245,245,0.6)',
            lineHeight: '1.7',
            marginBottom: '40px',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Upload your photo, detect your body type, pick any garment and see
          exactly how it looks on you — before you buy. No guesswork. Just confidence.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a href="#tryon">
            <button className="btn-primary">
              <span>Start Trying Now</span>
              <span>→</span>
            </button>
          </a>
          <a href="#collections">
            <button className="btn-secondary">Browse Collections</button>
          </a>
        </div>

        {/* College project badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            marginTop: '60px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '👗', label: 'No Fitting Room Drama' },
            { icon: '🪞', label: 'Mirror Never Lies' },
            { icon: '🛍️', label: 'Zero Bad Outfit Days' },
          ].map((badge) => (
            <div
              key={badge.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                padding: '8px 20px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{badge.icon}</span>
              <span style={{ fontSize: '13px', color: 'rgba(245,245,245,0.7)', fontWeight: '500' }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(transparent, #0a0a0a)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

export default Hero

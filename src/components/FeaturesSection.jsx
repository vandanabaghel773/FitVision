const features = [
  {
    icon: '🪄',
    title: 'Virtual Fitting Room',
    description:
      'Experience clothes on your actual body without stepping into a store. Our AI overlays garments with precise alignment to your pose and proportions.',
    accent: '#7c3aed',
    delay: '0ms',
  },
  {
    icon: '📐',
    title: 'Body Type Detection',
    description:
      'MediaPipe-powered pose estimation detects 33 key body landmarks in real time, ensuring the outfit aligns perfectly with your unique shape.',
    accent: '#db2777',
    delay: '80ms',
  },
  {
    icon: '✨',
    title: 'Smart Recommendations',
    description:
      'Our style engine learns your taste and body type over time, surfacing outfits most likely to look great on you — reducing returns and saving time.',
    accent: '#0891b2',
    delay: '160ms',
  },
  {
    icon: '⚡',
    title: 'Real-Time Processing',
    description:
      'Canvas-based rendering delivers smooth, low-latency preview of any outfit change. No page reloads, no waiting — instant fashion feedback.',
    accent: '#d97706',
    delay: '240ms',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description:
      'All processing happens in your browser. Your photos are never stored on our servers. What you try on stays between you and your screen.',
    accent: '#059669',
    delay: '320ms',
  },
  {
    icon: '📱',
    title: 'Cross-Platform',
    description:
      'Works flawlessly on desktop, tablet, and mobile. Try on a whole wardrobe from your phone during your lunch break or from your laptop at home.',
    accent: '#9333ea',
    delay: '400ms',
  },
]

const FeaturesSection = () => {
  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="section-label">Why FitVision</span>
        <h2
          style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            marginTop: '12px',
            color: '#f5f5f5',
          }}
        >
          Built for the{' '}
          <span className="gradient-text">future of fashion</span>
        </h2>
        <p
          style={{
            color: 'rgba(245,245,245,0.5)',
            fontSize: '16px',
            marginTop: '14px',
            maxWidth: '480px',
            margin: '14px auto 0',
          }}
        >
          Every feature is designed to make online shopping feel as real as
          standing in front of a mirror.
        </p>
      </div>

      {/* Feature cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            className="glass card-hover"
            style={{
              borderRadius: '20px',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent top bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${f.accent}, transparent)`,
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: `${f.accent}20`,
                border: `1px solid ${f.accent}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              {f.icon}
            </div>

            <h3
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#f5f5f5',
                marginBottom: '12px',
                letterSpacing: '-0.3px',
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(245,245,245,0.5)',
                lineHeight: '1.7',
              }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA band */}
      <div
        style={{
          marginTop: '80px',
          borderRadius: '24px',
          padding: '60px 40px',
          background:
            'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(168,85,247,0.12) 50%, rgba(236,72,153,0.1) 100%)',
          border: '1px solid rgba(167,139,250,0.2)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'rgba(167,139,250,0.08)',
            pointerEvents: 'none',
          }}
        />
        <h3
          style={{
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: '800',
            color: '#f5f5f5',
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}
        >
          Ready to try before you buy?
        </h3>
        <p
          style={{
            color: 'rgba(245,245,245,0.55)',
            fontSize: '16px',
            marginBottom: '32px',
            maxWidth: '420px',
            margin: '0 auto 32px',
          }}
        >
          A college project built with React, FastAPI, MediaPipe and AI —
          try it out and give us feedback!
        </p>
        <a href="#tryon">
          <button
            className="btn-primary"
            style={{ fontSize: '16px', padding: '16px 40px' }}
          >
            <span>Start Your Free Try-On</span>
            <span>→</span>
          </button>
        </a>
      </div>
    </section>
  )
}

export default FeaturesSection

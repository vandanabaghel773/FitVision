const steps = [
  {
    number: '01',
    icon: '📸',
    title: 'Upload Your Photo',
    description: 'Take or upload a clear full-body photo of yourself. Front-facing works best for accurate detection.',
    color: '#7c3aed',
  },
  {
    number: '02',
    icon: '🔍',
    title: 'Detect Your Body Type',
    description: 'Our AI analyses your proportions using pose estimation and tells you your exact body shape with style tips.',
    color: '#db2777',
  },
  {
    number: '03',
    icon: '👗',
    title: 'Pick a Garment',
    description: 'Browse our collection or upload any clothing image you want to try on — dresses, tops, jackets, anything.',
    color: '#0891b2',
  },
  {
    number: '04',
    icon: '✨',
    title: 'See the Result',
    description: 'Our AI fits the garment onto your photo in seconds. Download the result or try another outfit.',
    color: '#059669',
  },
]

const HowItWorks = () => {
  return (
    <section
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="section-label">How It Works</span>
        <h2
          style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            marginTop: '12px',
            color: '#f5f5f5',
          }}
        >
          From photo to{' '}
          <span className="gradient-text">perfect fit</span>
          {' '}in 4 steps
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          position: 'relative',
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="glass card-hover"
            style={{
              borderRadius: '20px',
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
              borderTop: `3px solid ${step.color}`,
            }}
          >
            {/* Big faded number */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '20px',
                fontSize: '64px',
                fontWeight: '900',
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: `${step.color}20`,
                border: `1px solid ${step.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              {step.icon}
            </div>

            {/* Step number pill */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                color: step.color,
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Step {step.number}
            </span>

            <h3
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#f5f5f5',
                marginBottom: '12px',
                letterSpacing: '-0.3px',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(245,245,245,0.5)',
                lineHeight: '1.7',
              }}
            >
              {step.description}
            </p>

            {/* Connector arrow (not on last) */}
            {i < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-16px',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                  color: 'rgba(167,139,250,0.4)',
                  zIndex: 10,
                }}
                className="hidden lg:block"
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '56px' }}>
        <a href="#bodytype">
          <button className="btn-primary" style={{ fontSize: '15px', padding: '16px 40px' }}>
            Get Started Now →
          </button>
        </a>
      </div>
    </section>
  )
}

export default HowItWorks

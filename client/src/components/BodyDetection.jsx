import { useState, useRef } from 'react'

const API_URL = 'https://tryon.hackship.cloud'

const SHAPES = {
  'Hourglass':            { icon: '⌛', bg: 'rgba(168,85,247,0.12)',  border: 'rgba(168,85,247,0.4)' },
  'Pear (Triangle)':      { icon: '🔻', bg: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.4)' },
  'Inverted Triangle':    { icon: '🔺', bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.4)' },
  'Rectangle (Straight)': { icon: '▬', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.4)' },
  'Apple (Oval)':         { icon: '🟡', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.4)' },
}

const BodyDetection = () => {
  const [image, setImage]       = useState(null)
  const [preview, setPreview]   = useState(null)
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const handleDetect = async () => {
    if (!image || loading) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const form = new FormData()
      form.append('person_image', image)

      const res = await fetch(`${API_URL}/detect-body-type`, {
        method: 'POST',
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Detection failed')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const shapeStyle = result ? SHAPES[result.shape] || SHAPES['Hourglass'] : null

  return (
    <section
      id="bodytype"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span className="section-label">Body Analysis</span>
        <h2
          style={{
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            marginTop: '12px',
            color: '#f5f5f5',
          }}
        >
          Discover your{' '}
          <span className="gradient-text">body shape</span>
        </h2>
        <p
          style={{
            color: 'rgba(245,245,245,0.55)',
            fontSize: '17px',
            marginTop: '16px',
            maxWidth: '500px',
            margin: '16px auto 0',
          }}
        >
          Upload a full-body photo and our AI will detect your body type and
          give personalised style tips.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1.4fr' : '1fr',
          gap: '32px',
          maxWidth: result ? '960px' : '480px',
          margin: '0 auto',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Upload box */}
        <div>
          <div
            onClick={() => inputRef.current.click()}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            style={{
              minHeight: '380px',
              borderRadius: '20px',
              border: `2px dashed ${dragging ? 'rgba(167,139,250,0.9)' : preview ? '#a855f7' : 'rgba(167,139,250,0.35)'}`,
              background: dragging ? 'rgba(167,139,250,0.12)' : preview ? 'rgba(168,85,247,0.06)' : 'rgba(167,139,250,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.25s ease',
            }}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null); setResult(null); inputRef.current.value = '' }}
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', borderRadius: '50%', width: '30px', height: '30px',
                    cursor: 'pointer', fontSize: '13px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(167,139,250,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '28px',
                }}>🧍</div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px' }}>
                  Upload a full-body photo
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(245,245,245,0.4)', marginBottom: '20px' }}>
                  Stand straight, front-facing works best
                </p>
                <span style={{
                  background: 'rgba(167,139,250,0.2)', color: '#c4b5fd',
                  padding: '8px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: '500',
                }}>Browse Files</span>
              </div>
            )}
            <input ref={inputRef} type="file" accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])} style={{ display: 'none' }} />
          </div>

          {/* Detect button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              className="btn-primary"
              onClick={handleDetect}
              disabled={!image || loading}
              style={{
                fontSize: '15px', padding: '14px 36px',
                opacity: image && !loading ? 1 : 0.4,
                cursor: image && !loading ? 'pointer' : 'not-allowed',
                width: '100%',
              }}
            >
              {loading ? '🔍 Analysing…' : '🔍 Detect My Body Type'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginTop: '16px', padding: '14px 18px', borderRadius: '12px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            }}>
              <p style={{ color: '#fca5a5', fontSize: '13px' }}>⚠️ {error}</p>
            </div>
          )}
        </div>

        {/* Result card */}
        {result && shapeStyle && (
          <div
            style={{
              borderRadius: '20px',
              border: `1px solid ${shapeStyle.border}`,
              background: shapeStyle.bg,
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Shape header */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '56px', marginBottom: '12px',
                filter: 'drop-shadow(0 0 20px rgba(167,139,250,0.4))',
              }}>
                {result.emoji}
              </div>
              <h3 style={{
                fontSize: '28px', fontWeight: '800',
                color: result.color, letterSpacing: '-0.5px', marginBottom: '8px',
              }}>
                {result.shape}
              </h3>
              <p style={{
                fontSize: '15px', color: 'rgba(245,245,245,0.65)',
                lineHeight: '1.6', maxWidth: '340px', margin: '0 auto',
              }}>
                {result.description}
              </p>
            </div>

            {/* Measurements bar */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '14px', padding: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{
                fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'rgba(245,245,245,0.4)',
                marginBottom: '16px',
              }}>Proportions Detected</p>
              {[
                { label: 'Shoulders', value: result.measurements.shoulder, max: 0.5 },
                { label: 'Waist',     value: result.measurements.waist,    max: 0.5 },
                { label: 'Hips',      value: result.measurements.hip,      max: 0.5 },
              ].map((m) => (
                <div key={m.label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: 'rgba(245,245,245,0.7)' }}>{m.label}</span>
                    <span style={{ fontSize: '13px', color: result.color, fontWeight: '600' }}>
                      {Math.round((m.value / m.max) * 100)}%
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((m.value / m.max) * 100, 100)}%`,
                      background: result.color,
                      borderRadius: '3px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Style tips */}
            <div>
              <p style={{
                fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'rgba(245,245,245,0.4)',
                marginBottom: '14px',
              }}>Style Tips For You</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      background: `${result.color}30`, border: `1px solid ${result.color}60`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: '700', color: result.color,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: '14px', color: 'rgba(245,245,245,0.65)', lineHeight: '1.5', paddingTop: '2px' }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll to try-on CTA */}
            <a href="#tryon" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>
                Try Outfits For Your Shape →
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default BodyDetection

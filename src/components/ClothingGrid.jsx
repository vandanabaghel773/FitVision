import { useState } from 'react'

const categories = ['All', 'Tops', 'Dresses', 'Jackets', 'Casual', 'Formal']

const items = [
  {
    id: 1,
    name: 'Banana Suit 🍌',
    category: 'Casual',
    price: '$49',
    tag: 'Hot',
    src: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&q=80',
  },
  {
    id: 2,
    name: 'Grandma Floral Dress',
    category: 'Dresses',
    price: '$35',
    tag: 'Vintage',
    src: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
  },
  {
    id: 3,
    name: 'Astronaut Fit 🚀',
    category: 'Formal',
    price: '$999',
    tag: 'Limited',
    src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80',
  },
  {
    id: 4,
    name: 'Neon Rave Jacket',
    category: 'Jackets',
    price: '$89',
    tag: 'Hot',
    src: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80',
  },
  {
    id: 5,
    name: 'Cowboy Yeehaw 🤠',
    category: 'Casual',
    price: '$119',
    tag: 'Trending',
    src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80',
  },
  {
    id: 6,
    name: 'Puffy Cloud Jacket',
    category: 'Jackets',
    price: '$159',
    tag: 'New',
    src: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80',
  },
  {
    id: 7,
    name: 'Zebra Print Top 🦓',
    category: 'Tops',
    price: '$55',
    tag: 'Wild',
    src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80',
  },
  {
    id: 8,
    name: 'Dinosaur Onesie 🦕',
    category: 'Casual',
    price: '$69',
    tag: 'Wild',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 9,
    name: 'Disco Ball Dress ✨',
    category: 'Dresses',
    price: '$199',
    tag: 'Trending',
    src: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&q=80',
  },
  {
    id: 10,
    name: 'Hawaiian Dad Shirt 🌺',
    category: 'Tops',
    price: '$29',
    tag: 'Hot',
    src: 'https://images.unsplash.com/photo-1562572159-4efd90232e7a?w=400&q=80',
  },
  {
    id: 11,
    name: 'Viking Cape 🪖',
    category: 'Jackets',
    price: '$249',
    tag: 'Limited',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
  },
  {
    id: 12,
    name: 'Invisible Pants 👻',
    category: 'Casual',
    price: '$0',
    tag: 'New',
    src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  },
  {
    id: 13,
    name: 'Bubble Wrap Jacket 🫧',
    category: 'Jackets',
    price: '$79',
    tag: 'Wild',
    src: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80',
  },
  {
    id: 14,
    name: 'Grandpa Cardigan 🧓',
    category: 'Tops',
    price: '$39',
    tag: 'Vintage',
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
  },
  {
    id: 15,
    name: 'Unicorn Hoodie 🦄',
    category: 'Casual',
    price: '$59',
    tag: 'Hot',
    src: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
  },
  {
    id: 16,
    name: 'Pirate Coat 🏴‍☠️',
    category: 'Jackets',
    price: '$189',
    tag: 'Limited',
    src: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&q=80',
  },
  {
    id: 17,
    name: 'Sushi Roll Dress 🍣',
    category: 'Dresses',
    price: '$99',
    tag: 'Trending',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
  },
  {
    id: 18,
    name: 'Tinfoil Tuxedo 🤖',
    category: 'Formal',
    price: '$399',
    tag: 'Premium',
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
  },
  {
    id: 19,
    name: 'Cactus Crop Top 🌵',
    category: 'Tops',
    price: '$44',
    tag: 'New',
    src: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=400&q=80',
  },
  {
    id: 20,
    name: 'Cloud Pyjamas ☁️',
    category: 'Casual',
    price: '$34',
    tag: 'Hot',
    src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80',
  },
]

const tagColors = {
  New:      { bg: 'rgba(124,58,237,0.25)',  text: '#c4b5fd' },
  Trending: { bg: 'rgba(236,72,153,0.25)',  text: '#f9a8d4' },
  Hot:      { bg: 'rgba(239,68,68,0.25)',   text: '#fca5a5' },
  Limited:  { bg: 'rgba(234,179,8,0.25)',   text: '#fde047' },
  Premium:  { bg: 'rgba(16,185,129,0.25)',  text: '#6ee7b7' },
  Wild:     { bg: 'rgba(251,146,60,0.25)',  text: '#fdba74' },
  Vintage:  { bg: 'rgba(167,139,250,0.25)', text: '#c4b5fd' },
}

const ClothingGrid = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedId, setSelectedId] = useState(null)

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  const handleSelect = (item) => {
    setSelectedId(item.id === selectedId ? null : item.id)
    if (onSelectItem) onSelectItem(item)
  }

  return (
    <section
      id="collections"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="section-label">Collections</span>
        <h2
          style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            marginTop: '12px',
            color: '#f5f5f5',
          }}
        >
          Explore the{' '}
          <span className="gradient-text">Latest Styles</span>
        </h2>
        <p
          style={{
            color: 'rgba(245,245,245,0.5)',
            fontSize: '16px',
            marginTop: '14px',
          }}
        >
          Click any item to select it for your virtual try-on session.
        </p>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: isActive
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.12)',
                background: isActive
                  ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                  : 'rgba(255,255,255,0.04)',
                color: isActive ? 'white' : 'rgba(245,245,245,0.6)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {filtered.map((item) => {
          const isSelected = selectedId === item.id
          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="card-hover"
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isSelected
                  ? '2px solid #a855f7'
                  : '1px solid rgba(255,255,255,0.07)',
                background: isSelected
                  ? 'rgba(168,85,247,0.08)'
                  : 'rgba(255,255,255,0.03)',
                position: 'relative',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                />

                {/* Tag badge */}
                {item.tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 12px',
                      borderRadius: '50px',
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      background: tagColors[item.tag]?.bg,
                      color: tagColors[item.tag]?.text,
                    }}
                  >
                    {item.tag}
                  </span>
                )}

                {/* Selected check */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '700',
                    }}
                  >
                    ✓
                  </div>
                )}

                {/* Try-on overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(124,58,237,0.35)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(0,0,0,0)')
                  }
                >
                  <span
                    style={{
                      background: 'white',
                      color: '#1a1a1a',
                      padding: '8px 18px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '700',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      pointerEvents: 'none',
                    }}
                    className="try-label"
                  >
                    Try On
                  </span>
                </div>
              </div>

              {/* Info */}
              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isSelected ? '#c4b5fd' : '#f5f5f5',
                      marginBottom: '2px',
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'rgba(245,245,245,0.4)',
                    }}
                  >
                    {item.category}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#a78bfa',
                  }}
                >
                  {item.price}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load more */}
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button className="btn-secondary">Load More Styles</button>
      </div>
    </section>
  )
}

export default ClothingGrid

import { useState } from 'react';
import logoTransparent from '../assets/logo-transparent.png';

function BrandDivider() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'var(--color-gray-light)',
      }}
    >
      <img
        src={logoTransparent}
        alt="Expresso Leonidas - Logística Premium"
        style={{
          maxWidth: '350px',
          width: '100%',
          height: 'auto',
          filter: `drop-shadow(0 12px 30px rgba(11, 61, 145, 0.12))`,
          transition: 'transform 0.4s var(--ease-out-expo), filter 0.4s var(--ease-out-expo)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          cursor: 'pointer',
        }}
        loading="lazy"
        width="350"
        height="auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}

export default BrandDivider;

'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  light?: boolean;
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export default function Logo({ size = 'md', onClick, light }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className={`font-display font-light tracking-tight cursor-pointer ${sizeClasses[size]} ${
        light ? 'text-paper hover:text-accent' : 'text-ink hover:text-accent'
      }`}
      type="button"
      aria-label="Go to home"
    >
      We The <span className="text-accent">Me</span>
    </button>
  );
}

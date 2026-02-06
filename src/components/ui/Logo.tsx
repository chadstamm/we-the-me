'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export default function Logo({ size = 'md', onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className={`font-display font-normal tracking-tight text-ink hover:text-accent cursor-pointer ${sizeClasses[size]}`}
      type="button"
      aria-label="Go to home"
    >
      We The <span className="text-accent">Me</span>
    </button>
  );
}

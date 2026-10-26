import React, { useState } from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = 'User',
  size = 'md',
  status,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Compute initials from name: e.g. "Soeun Kongsovann" -> "SK", "Dara" -> "D"
  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Deterministic pleasant gradient based on name hash
  const getAvatarGradient = (n: string) => {
    const gradients = [
      'from-teal-600 to-teal-800 text-white',
      'from-emerald-600 to-teal-700 text-white',
      'from-amber-600 to-amber-800 text-white',
      'from-cyan-600 to-teal-700 text-white',
      'from-indigo-600 to-slate-800 text-white',
    ];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-caption font-bold',
    md: 'w-10 h-10 text-small font-bold',
    lg: 'w-12 h-12 text-body font-bold',
    xl: 'w-16 h-16 text-h3 font-extrabold',
  }[size];

  const statusSize = {
    sm: 'w-2 h-2 ring-1.5',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
    xl: 'w-3.5 h-3.5 ring-2',
  }[size];

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-amber-500',
  };

  const showImage = src && !imageError;

  return (
    <div className={`relative inline-flex shrink-0 select-none ${className}`}>
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center ring-1 ring-black/5 shadow-xs ${sizeStyles} ${
          !showImage ? `bg-gradient-to-tr ${getAvatarGradient(name)}` : 'bg-slate-100'
        }`}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="tracking-wider">{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-white dark:ring-slate-900 ${
            statusSize
          } ${statusColors[status]}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
};

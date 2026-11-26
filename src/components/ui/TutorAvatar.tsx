import React from 'react';
import { tutorPhoto } from '../../data/sitePhotos';

/** The tutor's photo when one exists, otherwise their initials. Fills its (sized, round) parent. */
export const TutorAvatarContent: React.FC<{ tutor: { id: string; name: string; initials: string } }> = ({ tutor }) => {
  const src = tutorPhoto(tutor.id);
  if (!src) return <>{tutor.initials}</>;
  return <img src={src} alt={tutor.name} className="w-full h-full rounded-full object-cover" loading="lazy" />;
};

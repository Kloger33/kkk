/**
 * Photos are picked up automatically from src/assets/photos (see the README there).
 * Missing photos are simply not shown, so the site never displays empty boxes.
 */
const files = import.meta.glob('../assets/photos/**/*.{jpg,jpeg,webp,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function find(name: string): string | undefined {
  const hit = Object.entries(files).find(([path]) =>
    new RegExp(`/photos/${name}\\.(jpg|jpeg|webp|png)$`, 'i').test(path)
  );
  return hit?.[1];
}

export const placePhotos = {
  market: find('market'),
  tuktuk: find('tuktuk'),
  lesson: find('lesson'),
};

export const welcomePhoto = find('welcome');

export function tutorPhoto(tutorId: string): string | undefined {
  return find(`tutors/${tutorId}`);
}

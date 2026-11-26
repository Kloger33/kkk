import React from 'react';
import { placePhotos } from '../data/sitePhotos';
import { useLanguage } from '../context/LanguageContext';

/**
 * "Khmer for the places you'll go": real photos of Phnom Penh, each with the phrase you use there.
 * Renders only when all three photos exist in src/assets/photos, so it never shows empty boxes.
 */
export const PlacesSection: React.FC = () => {
  const { language } = useLanguage();
  const km = language === 'km';
  const { market, tuktuk, lesson } = placePhotos;
  if (!market || !tuktuk || !lesson) return null;

  const places = [
    {
      src: market,
      alt: 'A market stall in Phnom Penh',
      place: km ? 'នៅផ្សារ' : 'At the market',
      phrase: 'ថ្លៃប៉ុន្មាន?',
      roman: 'thlai ponmaan?',
      meaning: km ? 'សួរតម្លៃ' : 'How much is it?',
    },
    {
      src: tuktuk,
      alt: 'A tuk-tuk on a street in Phnom Penh',
      place: km ? 'ក្នុងតុកតុក' : 'In a tuk-tuk',
      phrase: 'ឈប់នៅទីនេះ',
      roman: 'chhup nov tii nih',
      meaning: km ? 'ប្រាប់ឲ្យឈប់' : 'Stop here, please',
    },
    {
      src: lesson,
      alt: 'A KhmerTutors tutor teaching an online lesson',
      place: km ? 'ក្នុងមេរៀន' : 'In your lesson',
      phrase: 'សូមនិយាយយឺតៗបន្តិច',
      roman: 'som niyiay yeut yeut bontech',
      meaning: km ? 'សុំឲ្យនិយាយយឺត' : 'Please speak a little slower',
    },
  ];

  return (
    <section className="bg-white" aria-labelledby="places-heading">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-14 sm:pb-20">
        <h2 id="places-heading" className="text-2xl sm:text-[28px] font-bold text-[#172033]">
          {km ? 'ភាសាខ្មែរសម្រាប់កន្លែងដែលអ្នកទៅ' : "Khmer for the places you'll go"}
        </h2>
        <p className="mt-1 text-[15px] text-[#545B70] max-w-[60ch]">
          {km
            ? 'គ្រូរបស់អ្នកបង្រៀនពាក្យដែលអ្នកប្រើជារៀងរាល់ថ្ងៃ។'
            : 'Your tutor teaches the words you use every day, starting with these.'}
        </p>

        <div className="mt-6 -mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar">
          {places.map((p) => (
            <figure key={p.phrase} className="shrink-0 w-[78%] sm:w-auto snap-start">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-[14px] bg-[#EEF2F7]"
              />
              <figcaption className="mt-3">
                <span className="block text-sm text-[#545B70]">{p.place}</span>
                <span lang="km" className="block text-[22px] font-semibold text-[#172033] leading-snug mt-0.5">
                  {p.phrase}
                </span>
                <span className="block text-[15px] text-[#172033]">
                  {p.meaning} <span className="italic text-[#545B70]">({p.roman})</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Tutor } from '../data/tutorsData';
import { useLanguage } from '../context/LanguageContext';

interface FindTutorsHeroProps {
  onFindTutorClick: () => void;
  onBookTrialClick: () => void;
  /** Opens the "teach with us" page for Cambodian students. */
  onTeachClick?: () => void;
  featuredTutor?: Tutor;
  /** All listed tutors: the facts line is computed from these, never hardcoded. */
  tutors?: Tutor[];
  onOpenVideoModal?: (tutor: Tutor) => void;
}

/** "Royal University of Phnom Penh (RUPP)" -> "RUPP"; names without an acronym stay as written. */
function universityShortName(name: string): string {
  const m = name.match(/\(([^)]+)\)/);
  return m ? m[1] : name.replace(/ (Engineering School|Phnom Penh)$/, '');
}

/** Words a newcomer uses in their first week. Romanization is a guide; tutors teach the sounds. */
const FIRST_WEEK_PHRASES: { km: string; roman: string; en: string; kmGloss: string }[] = [
  { km: 'អរគុណ', roman: 'arkun', en: 'Thank you', kmGloss: 'អរគុណ' },
  { km: 'ថ្លៃប៉ុន្មាន?', roman: 'thlai ponmaan?', en: 'How much is it?', kmGloss: 'សួរតម្លៃ' },
  { km: 'ឈប់នៅទីនេះ', roman: 'chhup nov tii nih', en: 'Stop here, please', kmGloss: 'ប្រាប់អ្នកបើកឡានឲ្យឈប់' },
  { km: 'ខ្ញុំមិនយល់ទេ', roman: 'knhom min yul te', en: "I don't understand", kmGloss: 'ពេលស្តាប់មិនយល់' },
  { km: 'ឆ្ងាញ់ណាស់', roman: 'chhnganh nah', en: 'Delicious!', kmGloss: 'សរសើរម្ហូប' },
];

export const FindTutorsHero: React.FC<FindTutorsHeroProps> = ({
  onFindTutorClick,
  onTeachClick,
  tutors = [],
}) => {
  const { language } = useLanguage();
  const km = language === 'km';

  // Facts come from the listed tutors, so they are always true.
  const tutorCount = tutors.length;
  const universities = Array.from(new Set(tutors.map((tu) => universityShortName(tu.university))));
  const minTrial = tutors.length ? Math.min(...tutors.map((tu) => tu.trialPrice)) : 3;
  const namedUnis = universities.filter((u) => /^[A-Z]{2,5}$/.test(u)).slice(0, 2);

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: the word, the promise, the action */}
        <div className="lg:col-span-7">
          <p lang="km" className="font-moul text-[#172033] text-[72px] sm:text-[104px] leading-[1.45] -ml-1">
            សួស្តី
          </p>
          <p className="mt-1 text-[15px] text-[#545B70] max-w-[46ch]">
            {km ? (
              'ពាក្យដំបូងដែលគ្រូរបស់អ្នកនឹងបង្រៀន។'
            ) : (
              <>
                <em className="not-italic font-semibold text-[#172033]">Suosdei</em> means hello. It is the first
                thing your tutor will teach you.
              </>
            )}
          </p>

          <h1 className="mt-8 text-[34px] sm:text-[48px] leading-[1.1] font-bold text-[#172033] max-w-[17ch] text-balance">
            {km ? 'រៀនភាសាខ្មែរផ្ទាល់ខ្លួន ជាមួយនិស្សិតសាកលវិទ្យាល័យកម្ពុជា' : 'Learn Khmer one‑on‑one with Cambodian university students'}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#545B70] max-w-[52ch]">
            {km
              ? `ជ្រើសគ្រូ កក់មេរៀនសាកល្បង ៣០ នាទី ចាប់ពី $${minTrial} ហើយហាត់និយាយភាសាខ្មែរដែលអ្នកត្រូវការ។`
              : `Choose a tutor, book a 30-minute trial from $${minTrial}, and practise the Khmer you need at the market, at work or around the family table.`}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button
              onClick={onFindTutorClick}
              className="h-12 px-6 rounded-[10px] bg-[#2445C8] hover:bg-[#1C37A3] text-white text-base font-semibold transition-colors cursor-pointer"
            >
              {km ? 'ស្វែងរកគ្រូ' : 'Find a tutor'}
            </button>
            {onTeachClick && (
              <button
                onClick={onTeachClick}
                className="text-left text-[15px] font-medium text-[#172033] underline decoration-[#2445C8]/40 underline-offset-4 hover:decoration-[#2445C8] cursor-pointer"
              >
                {km ? 'ខ្ញុំជានិស្សិត ហើយចង់បង្រៀន' : "I'm a Cambodian student and want to teach"}
              </button>
            )}
          </div>

          {tutorCount > 0 && (
            <p className="mt-8 text-[15px] text-[#545B70]">
              {km
                ? `គ្រូ ${tutorCount} នាក់ មកពីសាកលវិទ្យាល័យ ${universities.length}។ គ្មានការជាវប្រចាំ បង់តាមមេរៀន។`
                : `${tutorCount} tutors from ${universities.length} universities${
                    namedUnis.length ? `, including ${namedUnis.join(' and ')}` : ''
                  }. No subscription: you pay per lesson.`}
            </p>
          )}
        </div>

        {/* Right: a page from a learner's notebook */}
        <aside className="lg:col-span-5 lg:mt-6" aria-labelledby="first-week-heading">
          <div className="rounded-[14px] bg-[#EEF2F7] px-6 sm:px-7 pt-6 pb-5">
            <h2 id="first-week-heading" className="text-lg font-semibold text-[#172033]">
              {km ? 'ពាក្យសម្រាប់សប្ដាហ៍ដំបូង' : 'Your first week in Khmer'}
            </h2>
            <ul className="ruled mt-3">
              {FIRST_WEEK_PHRASES.map((ph) => (
                <li key={ph.km} className="py-3.5 grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span lang="km" className="text-[22px] font-semibold text-[#172033] leading-snug">
                    {ph.km}
                  </span>
                  <span className="text-[15px] text-[#172033] text-right">{km ? ph.kmGloss : ph.en}</span>
                  <span className="text-sm italic text-[#545B70]">{ph.roman}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-[#545B70]">
              {km
                ? 'អក្សរឡាតាំងគ្រាន់តែជាជំនួយ។ គ្រូនឹងជួយអ្នកពីការបញ្ចេញសំឡេង។'
                : 'The spelling in Latin letters is only a guide. Your tutor will help you with the sounds.'}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

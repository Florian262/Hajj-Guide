export interface HajjStage {
  id: string;
  chapter: 1 | 2 | 3 | 4;
  stepNumber: number;
  title: string;
  location: string;
  description: string;
  image: string;
  coordinates: string; // "latitude,longitude"
  hajjTypeFilter?: ('tamattu' | 'qiran' | 'ifrad')[]; // if set, only show for these types
  details: {
    steps: string[];
    duas?: {
      arabic: string;
      translation: string;
      transliteration?: string;
    }[];
    checklists?: string[];
  };
  scholarlyGuide?: {
    spiritualEssence: string; // Markdown content
    fiqhRules: string;        // Markdown content
    survivalHacks: string;    // Markdown content
    interestingFact?: {
      title: string;
      fact: string;
    };
    // Transition fields (optional)
    overview?: string;
    preparations?: string[];
    prohibitions?: string[];
    warnings?: string[];
    ritualsDetailed?: {
      title: string;
      instructions: string[];
    }[];
    practicalHacks?: string[];
    mensesRules?: string;
  };
}

export interface HajjData {
  en: { stages: HajjStage[] };
  ar: { stages: HajjStage[] };
  tr: { stages: HajjStage[] };
  sq: { stages: HajjStage[] }; // Albanian
}

export const chapterLabels: Record<1 | 2 | 3 | 4, Record<string, string>> = {
  1: { en: 'Chapter I — Arrival & Umrah', ar: 'الفصل الأول — الوصول والعمرة', tr: 'Bölüm I — Varış & Umre', sq: 'Kapitulli I — Arritja & Umreja' },
  2: { en: 'Chapter II — Journey to Arafat', ar: 'الفصل الثاني — الرحلة إلى عرفات', tr: 'Bölüm II — Arafat Yolculuğu', sq: 'Kapitulli II — Rruga për Arafat' },
  3: { en: 'Chapter III — Day of Sacrifice', ar: 'الفصل الثالث — يوم النحر', tr: 'Bölüm III — Kurban Bayramı Günü', sq: 'Kapitulli III — Dita e Kurbanit' },
  4: { en: 'Chapter IV — Days of Tashreeq', ar: 'الفصل الرابع — أيام التشريق', tr: 'Bölüm IV — Teşrik Günleri', sq: 'Kapitulli IV — Ditët e Teshrikut' },
};

export const hajjData: HajjData = {
  en: {
    stages: [
  {
    "id": "step-01-preparation",
    "chapter": 1,
    "stepNumber": 1,
    "title": "Preparation & Intention",
    "location": "Before Departure — At Home",
    "description": "Hajj begins long before you board the plane. Renew your intentions, settle your affairs, and prepare your heart and bag for the journey of a lifetime.",
    "image": "/images/step_01_preparation.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Renew your intention sincerely — Hajj must be done purely for Allah.",
        "Meet family and friends to say farewell and ask for forgiveness.",
        "Pay off all outstanding debts before departing.",
        "Prepare a written Will as a precaution.",
        "Download helpful apps such as Myduaa for your Duas list.",
        "Pack your bags — travel light. Do not bring valuables."
      ],
      "checklists": [
        "Prescription medication: Amoxicillin or Zithromax (antibiotic)",
        "OTC: Tylenol, Pepto-Bismol, Sudafed, Chloraseptic spray, Vitamin C",
        "Vaseline (apply to inner thighs — very important against chafing)",
        "Light-material thobes and plastic slippers (can buy in Makkah)",
        "Ihram towels in carry-on (NOT checked luggage — it may get lost!)",
        "Extra Ihram towels, safety pins, and Ihram belt",
        "One credit card and ATM card for emergencies",
        "Unscented baby wipes and hand sanitizer",
        "Grocery bags, Ziploc bags, toilet paper",
        "Gatorade packets (avoid dehydration in the heat)",
        "Lightweight \"yoga mat\" for Muzdalifah sleeping",
        "Very thick socks for Tawaf outside Ihram",
        "Saudi SIM card (some groups provide them)",
        "Two copies of your passport — one at home, one with your group",
        "PATIENCE AND A POSITIVE ATTITUDE — things will not go 100% smooth no matter the package!"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Hajj is a journey of the heart before it is a journey of the body. Sheikh Omar Suleiman begins his guide with a critical reminder: most pilgrims focus entirely on logistics and forget to prepare their soul. This step covers what to do before you leave home — from renewing your sincerity ([niyyah|Niyyah]) to settling your worldly affairs so your mind is free to focus on Allah.",
      "fiqhRules": "• Renew your [niyyah|Niyyah] (intention): Hajj must be for Allah alone. The Prophet (ﷺ) warned extensively against performing acts of worship for social praise, reputation, or excessive photographic documentation.\n• Ask forgiveness: Seek forgiveness from everyone you may have wronged — family, friends, colleagues. The spiritual slate should be clean before the journey.\n• Settle all debts: Pay all outstanding debts. If you cannot pay them before leaving, make a firm, legal arrangement with the creditor.\n• Write a Will: This is Islamic [sunnah|Sunnah] for any person who has assets, and is especially recommended before embarking on a journey of this spiritual magnitude.",
      "survivalHacks": "• Carry-on Ihram: Keep your Ihram towels in your carry-on bag, not in checked luggage. Lost luggage at Jeddah airport is common, and arriving without your Ihram is a serious problem.\n• Anti-chafing preparation: Vaseline on the inner thighs is not optional — it is essential. You will walk many kilometres in the heat, and the chafing from Ihram cloth is severe.\n• Local slippers: Buy plastic slippers in Mecca/Madinah. Saudi-sold slippers are cheap, designed for the local terrain, and easy to replace if lost.\n• Travel light: Travel as light as possible. Every extra kilogram you carry becomes physical suffering during the 10km+ walking days."
    }
  },
  {
    "id": "step-02-ihram",
    "chapter": 1,
    "stepNumber": 2,
    "title": "Enter State of Ihram",
    "location": "[miqat|Meeqat] — Sacred Boundary",
    "description": "At the [miqat|Meeqat] — the sacred boundary point — you physically and spiritually enter the state of Ihram. This is the transition from ordinary life to the sacred.",
    "image": "/images/step_02_ihram.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Perform Ghusl (full bath) before entering Ihram.",
        "Trim moustache, armpit hair, pubic hair, and clip nails.",
        "Apply perfume to your body (not the Ihram cloth).",
        "Men: wear the two white unsewn Ihram sheets (Izar and Rida).",
        "At the [miqat|Meeqat], make the [niyyah|Niyyah] (intention) for Umrah: say \"Labbayk Allahumma Umratan.\"",
        "Begin reciting the [talbiyah|Talbiyah] loudly (men) or quietly (women).",
        "Pray 2 Rakats if not a prohibited prayer time ([sunnah|Sunnah])."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
          "translation": "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty, You have no partner.",
          "transliteration": "Labbayk Allahumma Labbayk, Labbayka la sharika laka Labbayk, Innal hamda wan-ni'mata laka wal mulk, la sharika lak."
        }
      ],
      "checklists": [
        "Perform Ghusl (full bath)",
        "Trim moustache, underarms, pubic hair, clip nails",
        "Apply perfume to body before wearing Ihram",
        "Put on Ihram sheets correctly (men)",
        "Recite [niyyah|Niyyah] at the [miqat|Meeqat]",
        "Begin [talbiyah|Talbiyah] continuously"
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Women on their menses do everything for Ihram—bathe, groom, wear modest clothes, and make the intention—but skip the 2 Rakats prayer.",
      "spiritualEssence": "The [miqat|Meeqat] is the spiritual boundary — the point of no return. Sheikh Omar Suleiman emphasizes that the preparation rituals at the [miqat|Meeqat] are [sunnah|Sunnahs] that significantly enhance the spiritual experience, stripping away worldly wealth, social status, and identity in favor of simple, identical white sheets — the [ihram|Ihram].",
      "fiqhRules": "• [miqat|Meeqat] Obligation: If you pass the [miqat|Meeqat] without entering [ihram|Ihram], a sacrifice (Fidya) is required. If on a plane, the pilot announces the [miqat|Meeqat] approximately 30 minutes before landing — be ready.\n• Ghusl & Grooming: Bathe (Ghusl) — this is [sunnah|Sunnah] for both men and women before entering [ihram|Ihram]. Trim your moustache, armpit hair, pubic hair, and cut nails before the [miqat|Meeqat]. This cannot be done after entering Ihram.\n• Body Perfume: Apply perfume to your body (NOT on the Ihram cloth itself). This is one of the last things you apply before the sacred state begins.\n• Sewn clothes prohibition: Men: Do NOT wear sewn clothes that fit limbs (shirts, trousers, underwear). Violation requires Fidya (expiation: animal sacrifice, 3 days fasting, or feeding 6 needy people).\n• Grooming prohibitions: Do NOT cut or pluck hair or clip nails. Broken nails by accident or hair shedding during sleep or combing are forgiven.\n• Veils & Head covers: Women: Do NOT wear a Niqab (face veil) affixed to the skin. A loose face covering that doesn't touch the skin is permitted. Men: Do NOT cover your head with a hat or cap (umbrellas, watches, rings, stitched belts, and sandals that don't cover the ankle are all permitted).\n• Perfume prohibition: Do NOT wear perfume or use perfumed soap after entering [ihram|Ihram]. Plain unscented showers are fine.\n• Spousal relations: Do NOT kiss or touch your spouse provocatively (major Istighfar required). Do NOT engage in sexual intercourse — this invalidates the entire Hajj.\n• Menses Rules: Women on their menses at the [miqat|Meeqat] do everything for [ihram|Ihram] — bathe, groom, wear Ihram, and make the [niyyah|Niyyah] — but do not pray the 2 Rakats or perform [tawaf|Tawaf] until they are pure. They are still fully in Ihram.",
      "survivalHacks": "• Fly-in Preparation: If passing through Madinah first: do all preparation rituals (bath, grooming, putting on Ihram) BEFORE leaving Madinah, but do NOT make the [niyyah|Niyyah] until you physically reach the [miqat|Meeqat].\n• [talbiyah|Talbiyah] continuity: Continue reciting the [talbiyah|Talbiyah] as much as possible during the journey from the [miqat|Meeqat] until you reach the Haram — individually, not in a group chant.\n• Blankets in Ihram: Blankets are permissible if you feel cold in Mina or Muzdalifah even while in Ihram."
    }
  },
  {
    "id": "step-03-tawaf",
    "chapter": 1,
    "stepNumber": 3,
    "title": "Tawaf × 7",
    "location": "Masjid al-Haram — The Kaaba",
    "description": "Your first sight of the Kaaba. You circle it seven times counter-clockwise, beginning and ending at the Black Stone, while in a continuous state of supplication.",
    "image": "/images/step_03_tawaf.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Ensure you are in a state of Wudu (ablution).",
        "Men: expose your right shoulder ([idtiba|Idtiba]) — only for this first Tawaf.",
        "Enter the Haram with your right foot and recite the entry supplication.",
        "Align with the Black Stone green light line. Make Takbeer and signal with your right hand.",
        "Circle the Kaaba 7 times counter-clockwise, keeping the Kaaba on your left.",
        "Touch the Yamani corner (before Black Stone) with your right hand if possible — no signalling or kissing.",
        "Between Yamani corner and Black Stone, recite: Rabbana atina fil dunya hasana...",
        "After 7 circuits, cover shoulder, go to [maqamIbrahim|Maqam Ibrahim] and pray 2 Rakats.",
        "Drink Zamzam water and rest before Sa'i."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Our Lord, give us good in this life, and good in the Hereafter, and protect us from the punishment of the Fire.",
          "transliteration": "Rabbana atina fid-dunya hasanaten wa fil-akhirati hasanatan wa qina 'adhab an-nar."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "A menstruating woman cannot perform Tawaf. If she is doing Tamattu' and her period does not end before Hajj starts, she simply converts her intention to Hajj al-Qiran (Hajj and Umrah combined) and proceeds to Mina without doing the initial Umrah Tawaf.",
      "spiritualEssence": "[tawaf|Tawaf] al-Qudoom (the Welcome Tawaf) is the first act you perform upon entering Makkah. It takes the place of the 2-Rakat prayer of greeting the [masjidAlHaram|Masjid al-Haram]. Sheikh Omar Suleiman emphasizes that circling the [kaaba|Kaaba] represents the universe revolving around a single divine focus, and that there are no prescribed supplications for each circuit — you make personal Dua in any language.",
      "fiqhRules": "• Ablution (Wudu): Ensure full Wudu before entering the [masjidAlHaram|Masjid al-Haram]. [tawaf|Tawaf] without Wudu is invalid according to the strongest opinion.\n• The Wudu Dilemma: If your Wudu breaks mid-[tawaf|Tawaf]: the Hanafi school says you can just go make Wudu and resume from the same lap you left. The Shafi'i school historically required restarting from lap one (though modern scholars offer leniency due to severe crowding).\n• [idtiba|Idtiba] & [raml|Raml]: Men: Arrange the [ihram|Ihram] sheet so the right shoulder is fully exposed ([idtiba|Idtiba]) only for this first [tawaf|Tawaf]. The first 3 circuits should be done at a brisker pace ([raml|Raml]). Cover the shoulder again as soon as the 7th circuit is finished.\n• Interruption rules: Do NOT interrupt the 7 circuits unless absolutely necessary. If prayer begins during [tawaf|Tawaf], join the prayer and continue from where you left off.\n• Dua rules: Touch the Yamani Corner (before Black Stone) if possible. Do NOT signal or kiss it. Between Yamani Corner and the Black Stone, recite: 'Rabbena atina...' For all other parts, make personal, individual Duas. Chanting in groups or following books of innovated Duas has no basis in the [sunnah|Sunnah].",
      "survivalHacks": "• Floor Selection: Going to the 2nd or 3rd floor of the Haram for Tawaf is permitted and is much less crowded. The distance is longer but the physical ease is worth it.\n• Greeting the Haram: Tawaf replaces the 2-Rakat greeting prayer of the mosque. If you enter the Haram at other times (without Tawaf), pray 2 normal Rakats."
    }
  },
  {
    "id": "step-04-safa-marwa",
    "chapter": 1,
    "stepNumber": 4,
    "title": "Safa and Marwa — Sa'i",
    "location": "Masjid al-Haram — Mas'a Walkway",
    "description": "Walking seven times between the hills of Safa and Marwa, commemorating Hajar's (RA) search for water for her son Isma'il (AS).",
    "image": "/images/step_04_safa_marwa.png",
    "coordinates": "21.3754,39.8227",
    "details": {
      "steps": [
        "Go to the second or third floor — it is much less crowded.",
        "Upon approaching Safa, recite: \"Innal Safaa wal Marwata min sha'airillah...\" (Quran 2:158).",
        "Say: \"Abda'u bima bada'a Allahu bihi\" (We start with what Allah started with).",
        "Climb Safa, face the Kaaba, raise hands in Dua, and recite the Prophet's Dua 3 times.",
        "Walk to Marwa — men run/speed-walk between the two green markers.",
        "At Marwa, face the Kaaba and repeat the same Dua 3 times.",
        "Complete exactly 7 one-way circuits, ending at Marwa."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ، أَنجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ",
          "translation": "There is no god but Allah alone, with no partner; His is the dominion, all praise is due to Him, He is able to do all things. There is no god but Allah alone; He fulfilled His promise, granted victory to His slave, and defeated the confederates alone.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa 'ala kulli shay'in qadir. La ilaha illallahu wahdah, anjaza wa'dah, wa nasara 'abdah, wa hazamaa al-ahzab wahdah."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Ritual purity is not a condition for Sa'i, but since Sa'i must legally follow Tawaf, you must postpone it until you have performed Tawaf. (If you converted to Qiran, you proceed straight to Mina).",
      "spiritualEssence": "[sai|Sa'i] is a [wajib|Wajib] (mandatory) act of both Umrah and Hajj. It commemorates Hajar's desperate search for water between Safa and Marwa for her infant son Isma'il, showing that we must make physical effort ([sai|Sa'i]) while relying entirely on Allah for the results. The [zamzam|Zamzam] water we drink today is a living miracle of that moment.",
      "fiqhRules": "• Ritual Purity: Wudu is recommended but not strictly required for Sa'i according to the majority of scholars. Adetli (menstruating) women can perform Sa'i normally.\n• Green Markers: Men should speed-walk/jog between the green neon markers; women walk normally.\n• Dua at Hills: Climb Safa/Marwa, face the Kaaba, raise hands, and recite the Prophet's Dua 3 times: 'La ilaha illallahu wahdahu la sharika lah...'. Make personal Dua in between.\n• Circuit count: Count Safa to Marwa as 1 circuit, and Marwa to Safa as 2. Do not do 14 one-way trips.",
      "survivalHacks": "• Upper Deck Sa'i: Use the air-conditioned upper floor Mas'a to save physical energy for the grueling Hajj days ahead.\n• Exit side: The 7th circuit ends at Marwa, where the exit doors are located.",
      "interestingFact": {
        "title": "The Green Lights & The Running Zone",
        "fact": "In the valley between Safa and Marwa, there is a section marked by bright green neon lights overhead. This is the exact spot where Hajar (as) ran through the valley to keep an eye on baby Ismail while searching for water. Men are required to transition from a walk into a brisk jog/run through this green-lit zone, while women maintain their normal walking pace."
      }
    }
  },
  {
    "id": "step-05-hair-clip",
    "chapter": 1,
    "stepNumber": 5,
    "title": "Clip / Shave Hair — Umrah Ends",
    "location": "Makkah — Your Hotel",
    "description": "By trimming or shaving your hair, you exit the state of Ihram and complete your Umrah. Everything that was prohibited in Ihram now becomes permitted again.",
    "image": "/images/step_05_hair_clip.png",
    "coordinates": "21.4225,39.8262",
    "hajjTypeFilter": [
      "tamattu"
    ],
    "details": {
      "steps": [
        "Men: trim your hair (do NOT fully shave — leave enough for the Hajj exit cut later).",
        "Women: cut approximately a finger's length (roughly ¼ to ½ inch) from the tip of the hair.",
        "Change out of your Ihram into regular clothes.",
        "Everything that was prohibited in Ihram is now halal again."
      ],
      "checklists": [
        "Trim hair (men: bring your own clippers — easiest in your hotel room)",
        "Women: cut a finger-length from hair tips",
        "Change into regular clothes",
        "Apply perfume (now permitted again)",
        "Rest and prepare for Hajj on the 8th of Dhul Hijjah"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "For Tamattu pilgrims, trimming or cutting the hair officially exits you from the first Ihram (Umrah Ihram) and completes your Umrah. You now live in Makkah in normal clothes until the 8th of Dhul Hijjah, expressing gratitude for completing the first phase of your journey.",
      "fiqhRules": "• Men's Trimming: Cut/trim hair evenly around the head. Do NOT shave completely, as you need enough hair to shave/trim again when exiting the Hajj Ihram on Eid Day.\n• Women's Trimming: Cut approximately a finger's length (about 1 inch) from the very tips of the hair.\n• Ihram release: Once trimmed, all Ihram prohibitions are completely lifted. Regular clothes, perfume, and marital relations are halal until the 8th.",
      "survivalHacks": "• Own Clippers: Bring personal hair clippers to trim your own hair in your hotel room. It is safer, cleaner, and avoids long lines at local Mecca barbers.\n• No Repeated Umrahs: Sheikh Omar Suleiman strongly advises against going to Taneem to do multiple repeated Umrahs during this rest period. It has no basis in the [sunnah|Sunnah] and will physically exhaust you before Hajj."
    }
  },
  {
    "id": "step-06-rest",
    "chapter": 1,
    "stepNumber": 6,
    "title": "Resting & Praying",
    "location": "Makkah — Masjid al-Haram",
    "description": "Between completing Umrah and the start of Hajj on the 8th of Dhul Hijjah, pilgrims rest, pray in the Haram, and prepare their hearts for the greatest days of Hajj.",
    "image": "/images/step_06_rest.png",
    "coordinates": "21.4225,39.8262",
    "hajjTypeFilter": [
      "tamattu"
    ],
    "details": {
      "steps": [
        "Rest and recover physical strength in your hotel.",
        "Pray all 5 daily prayers in congregation in Masjid al-Haram.",
        "Perform extra Nafl Tawafs around the Kaaba.",
        "Write your personal Dua list for the Day of Arafat — the most important prayer of your life.",
        "Study and memorize the key supplications for the coming Hajj days.",
        "On the morning of the 8th of Dhul Hijjah, prepare to enter Ihram again for Hajj."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "This rest phase is one of the greatest gifts of the Tamattu format. You are free from Ihram and can recharge physically and spiritually. Use this quiet interval to prepare your heart and intellect for the intense days ahead.",
      "fiqhRules": "• Haram Prayers: Make sure to pray all 5 daily prayers in Masjid al-Haram, where a single prayer yields 100,000 times the reward of prayers elsewhere.\n• Dua preparation: Write a detailed personal Dua list for Arafat. Settle your mind, make Nafl (voluntary) Tawafs, and memorize essential Hajj prayers.",
      "survivalHacks": "• Rest Priority: Avoid extensive shopping or physically draining tours. The upcoming walk from Muzdalifah to Mina on Eid morning alone can exceed 5km. Prioritize sleep and stamina.\n• Group Chanting Warning: Avoid joining collective group Dua chants in the Haram; individual, silent reflection is the [sunnah|Sunnah]."
    }
  },
  {
    "id": "step-07-ihram-hajj",
    "chapter": 2,
    "stepNumber": 7,
    "title": "Enter Ihram for Hajj",
    "location": "Makkah — 8th of Dhul Hijjah",
    "description": "On the morning of the 8th of Dhul Hijjah, pilgrims re-enter the sacred state of Ihram — this time specifically for Hajj. The great journey truly begins.",
    "image": "/images/step_07_ihram_hajj.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Repeat all the [sunnah|Sunnahs] of entering Ihram: bathe, groom, apply perfume to body.",
        "Men: wear the Ihram sheets again.",
        "Make the [niyyah|Niyyah] (intention) for Hajj: \"Labbayk Allahumma Hajjan.\"",
        "Begin reciting the [talbiyah|Talbiyah] continuously.",
        "Depart for Mina."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ حَجًّا",
          "translation": "Here I am O Allah, for Hajj.",
          "transliteration": "Labbayk Allahumma Hajjan."
        }
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "On the morning of the 8th of Dhul Hijjah, pilgrims re-enter the sacred state of Ihram—this time specifically for the Hajj. The main journey begins, re-establishing your pact of submission to Allah.",
      "fiqhRules": "• Ihram [sunnah|Sunnahs]: Repeat the [miqat|Meeqat] [sunnah|Sunnahs]: Ghusl, grooming, body perfume, and wearing the Ihram sheets.\n• Hajj [niyyah|Niyyah]: Declare your intention specifically for Hajj: 'Labbayk Allahumma Hajjan.'\n• [talbiyah|Talbiyah] resume: Begin continuously chanting the [talbiyah|Talbiyah] until stoning the Jamarat al-Aqaba on Eid Day.",
      "survivalHacks": "• Hotel Ihram: Put on your Hajj Ihram directly in your Mecca hotel room before boarding the buses or vehicles to Mina.\n• Check constraints: Prohibitions on sewn clothes, perfumes, and grooming are now back in full effect."
    }
  },
  {
    "id": "step-08-mina",
    "chapter": 2,
    "stepNumber": 8,
    "title": "Arrive at Mina",
    "location": "Mina Tent City — 8th Dhul Hijjah",
    "description": "The tent city of Mina becomes home for the night. Over 3 million pilgrims camp in rows of white tents stretching across the valley. The eve of the greatest day.",
    "image": "/images/step_08_mina.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Travel from Makkah to Mina after putting on Ihram.",
        "Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina — all shortened (2 Rakats) but NOT combined.",
        "Memorize your tent number. Write it down. Photograph the tent address sign.",
        "Get a good night's sleep. Tomorrow is the most important day of Hajj.",
        "Begin preparing your personal Dua list mentally and in writing."
      ],
      "checklists": [
        "Confirm transportation to Mina is arranged",
        "Memorize your tent number and camp camp letter",
        "Carry essential toiletries, prayer mat, and phone charger",
        "Ensure your Hajj identification card is with you",
        "Avoid foods that upset your stomach"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Mina is a massive, temporary city of white tents that serves as a station of contemplation and detachment. Spending the day and night in Mina on the 8th of Dhul Hijjah (Day of [tarwiyah|Tarwiyah]) prepares the soul before standing on the plains of Arafat.",
      "fiqhRules": "• Prayers in Mina: Shorten (Qasr) Dhuhr, Asr, and Isha prayers to 2 Rakats, but do NOT combine (Jam') them. Pray each prayer at its designated time.\n• [sunnah|Sunnah] Night: Staying overnight in Mina and praying the 5 prayers there is a highly recommended [sunnah|Sunnah] of the Prophet (ﷺ).",
      "survivalHacks": "• Stomach Precautions: The public bathrooms in Mina are highly crowded and sanitary conditions are low. Avoid foods that trigger stomach distress.\n• Drop WhatsApp Location Pin: Dropping a live WhatsApp location pin or writing down your Maktab (office) number is essential. With 100,000 identical tents, finding your camp without coordinates is nearly impossible.",
      "interestingFact": {
        "title": "The World's Largest Tent City",
        "fact": "Mina is a valley that is completely empty for 360 days a year. Then, overnight, it transforms into a bustling city hosting over 2 million people inside roughly 100,000 air-conditioned, Teflon-coated white tents. Warn users to log their specific camp/Maktab number the second they arrive, as cellular data can stall under heavy network loads."
      }
    }
  },
  {
    "id": "step-09-arafat",
    "chapter": 2,
    "stepNumber": 9,
    "title": "Day of Arafah",
    "location": "Plains of Arafat — 9th Dhul Hijjah",
    "description": "The spiritual heart of Hajj. Standing in the plains of Arafat from noon until sunset, making sincere and uninterrupted supplication to Allah. Missing this day means the Hajj is invalid.",
    "image": "/images/step_09_arafat.png",
    "coordinates": "21.3547,39.9839",
    "details": {
      "steps": [
        "Depart Mina for Arafat after sunrise — aim to arrive before Dhuhr.",
        "Listen to the Hajj Khutbah (sermon) broadcast in the tent.",
        "Pray Dhuhr and Asr combined and shortened (2 Rakats each) at Dhuhr time.",
        "Perform Wuquf (standing/sitting in deep supplication) from noon until sunset.",
        "Do NOT leave Arafat before sunset — Hajj would be incomplete.",
        "After sunset, immediately depart for Muzdalifah without praying Maghrib first."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "translation": "There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is able to do all things.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shay'in qadir."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Standing in Arafat (Wuquf) is fully valid while menstruating. You can stay in Arafat, make all Du'as, and read Quran. Ritual purity is not required for Arafat.",
      "spiritualEssence": "[wuquf|Wuquf] in Arafat is the pinnacle and spiritual heart of Hajj. The Prophet (ﷺ) said: 'Hajj is Arafah.' It is a day of absolute humility and direct connection to Allah, representing the gathering on the Day of Judgment. Every second from noon until sunset is a once-in-a-lifetime opportunity to plead for forgiveness and make personal supplications.",
      "fiqhRules": "• The Core Pillar ([rukn|Rukn]): Standing in Arafat for even a brief moment between Dhuhr (noon) and sunset on the 9th of Dhul Hijjah is a mandatory pillar ([rukn|Rukn]). If missed, the Hajj is completely invalid.\n• Departure Rule: You must remain in Arafat until the sun has fully set. Leaving before sunset requires a sacrifice (Fidya) to rectify, according to the majority of scholars.\n• Prayers: Pray Dhuhr and Asr combined and shortened (2 Rakats each) at the time of Dhuhr (Jam' Ta'qeed) with one Adhan and two Iqamahs.\n• Qiblah Orientation: Face the Qiblah (Makkah) when making Dua, not Mount Arafat (Jabal ar-Rahmah). Standing or climbing the mountain is NOT a [sunnah|Sunnah] or requirement.\n• Menses Rules: Menstruating women are fully permitted to stand in Arafat and make Duas, as ritual purity is not a condition for the validity of Wuquf.",
      "survivalHacks": "• Stay Near Your Camp: Do not try to walk to Masjid al-Namira or climb Jabal ar-Rahmah unless you are extremely close. The crowds are immense, the heat is intense (often exceeding 45°C), and getting lost can ruin your day. The Wuquf is valid anywhere in the Arafat plains.\n• Dua Lists: Write down a detailed list of Duas beforehand. Use these hours for sincere, personal, and silent pleading rather than socializing, eating, or sleeping.\n• No Maghrib in Arafat: Do NOT pray Maghrib in Arafat. It must be prayed only after reaching Muzdalifah, combined with Isha.",
      "interestingFact": {
        "title": "The Boundaries of Arafat",
        "fact": "Arafat is a defined sanctuary, and its boundaries are clearly demarcated by massive, high-contrast yellow billboards written in multiple languages. If you stand even a few meters outside these markers during the designated hours, your Wuquf is invalid and your Hajj is void. Always verify that your group's tent is physically within these legal borders."
      }
    }
  },
  {
    "id": "step-10-muzdalifah",
    "chapter": 2,
    "stepNumber": 10,
    "title": "Muzdalifah — Night Sky",
    "location": "Open Plains of Muzdalifah",
    "description": "After the emotional peak of Arafat, pilgrims travel to the open plains of Muzdalifah to spend the night under the stars, rest, and collect pebbles.",
    "image": "/images/step_10_muzdalifah.png",
    "coordinates": "21.3894,39.9392",
    "details": {
      "steps": [
        "Depart Arafat immediately after sunset.",
        "Upon arrival at Muzdalifah, pray Maghrib (3 Rakats) and Isha (2 Rakats) combined and shortened.",
        "Sleep on the ground under the open sky — rest is the priority.",
        "Collect 49 to 70 small pebbles (hummus-sized) for the Jamarat stoning.",
        "Pray Fajr at its earliest time before departing."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Staying overnight in Muzdalifah and collecting pebbles are fully valid during menses. Ritual purity is not required.",
      "spiritualEssence": "Sleeping on the bare ground under the stars in [muzdalifah|Muzdalifah], stripped of all earthly luxury or social distinctions, embodies the absolute equality of humanity and our complete dependence on the Almighty Creator.",
      "fiqhRules": "• Combining Prayers: Maghrib and Isha prayers must be performed combined and shortened upon arriving in Muzdalifah (Jam' Ta'kheer). Maghrib is prayed as 3 Rakats, and Isha is shortened to 2 Rakats.\n• Overnight Stay (Wuquf): Spending the night at Muzdalifah (at least until past midnight) is a [wajib|Wajib] (mandatory) act of Hajj.\n• Concession for the Weak: Women, the elderly, and the sick are permitted to leave Muzdalifah after midnight to avoid the dangerous morning crowds at the Jamarat.\n• Collecting Pebbles: Collect small pebbles here. You need 7 pebbles for the first day, and 21 for each of the subsequent [tashreeq|Tashreeq] days.",
      "survivalHacks": "• Lightweight Mat: A small, lightweight yoga mat or inflatable sleeping pad is extremely useful for sleeping on the gravelly ground of Muzdalifah.\n• Do Not Pray on the Way: Follow the [sunnah|Sunnah] by praying Maghrib and Isha only when you physically arrive at Muzdalifah, regardless of traffic delays.",
      "interestingFact": {
        "title": "Midnight Concession",
        "fact": "The Prophet (ﷺ) specifically granted permission to women, children, and the elderly to leave Muzdalifah after midnight, allowing them to stone the Jamarat early and avoid the massive crowds that gather after sunrise."
      }
    }
  },
  {
    "id": "step-11-rami-aqaba",
    "chapter": 3,
    "stepNumber": 11,
    "title": "Rami — Stoning of Jamarat al-Aqaba",
    "location": "Mina — Jamarat Bridge",
    "description": "The first rite of the Day of Eid: stoning the large pillar (Jamarat al-Aqaba) with 7 pebbles, commemorating Prophet Ibrahim's (as) rejection of the devil's temptations.",
    "image": "/images/step_11_rami_aqaba.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Travel from Muzdalifah to Mina after Fajr (or after midnight for the weak/elderly).",
        "Head to the Jamarat Bridge and stone the large pillar (Jamarat al-Aqaba) only.",
        "Throw 7 pebbles consecutively, reciting \"Allahu Akbar\" with each throw.",
        "Stop reciting the [talbiyah|Talbiyah] upon throwing the first pebble and begin the Eid Takbeerat.",
        "The stoning should take place after sunrise, preferably before noon."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Stoning the Jamarat al-Aqaba is fully valid. Women, the sick, and the elderly have a legal concession to leave Muzdalifah after midnight to stone early, or they can delegate a proxy to stone on their behalf if crowds are too dangerous.",
      "spiritualEssence": "Stoning Jamarat al-Aqaba on Eid Day — the first act of [rami|Rami] — commemorates the actions of Prophet Ibrahim (as) when the devil tried to tempt him to disobey Allah. It symbolizes the active rejection of base desires, satanic whispers, and evil inclinations.",
      "fiqhRules": "• Stoning on Eid Day: On the 10th of Dhul Hijjah, the pilgrim stones ONLY the large pillar (Jamarat al-Aqaba) with 7 consecutive pebbles. The small and medium pillars are not stoned on this day.\n• Method of Stoning: Raise the hand and say 'Allahu Akbar' with each throw. Each pebble must fall inside the circular basin surrounding the pillar.\n• Stopping the [talbiyah|Talbiyah]: The [talbiyah|Talbiyah] is discontinued immediately when throwing the first pebble, replaced by the Eid Takbeerat.\n• Time of Stoning: Stoning begins after sunrise on Eid Day and continues throughout the day and night until the Fajr of the next day.\n• First Release (Tahallul): Upon stoning the Jamarat and either shaving or cutting the hair, the first release from Ihram (Tahallul al-Awwal) is achieved, permitting all restrictions of Ihram except marital relations.",
      "survivalHacks": "• Angle of Approach: Approach the stoning basin from the sides or back, avoiding the center where crowds are most dense.\n• Avoid Peak Times: Avoid stoning immediately after sunrise, as crowd density is extremely high. Stoning after Dhuhr or in the evening is much safer and more comfortable for the elderly and women.",
      "interestingFact": {
        "title": "Evolution of the Jamarat Pillars",
        "fact": "Historically, the Jamarat were narrow stone pillars, which caused severe bottlenecks and tragic stampedes. The Saudi government rebuilt them into massive, multi-tiered elliptical walls, significantly increasing the stoning area and allowing the crowd to flow smoothly and safely."
      }
    }
  },
  {
    "id": "step-12-qurbani",
    "chapter": 3,
    "stepNumber": 12,
    "title": "Qurbani — Animal Sacrifice",
    "location": "Mina — Slaughterhouse",
    "description": "The sacrifice of Hady (Hajj sacrifice) on the Day of Eid. It is mandatory ([wajib|Wajib]) for Tamattu and Qiran pilgrims.",
    "image": "/images/step_12_qurbani.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "The sacrifice is performed by authorized authorities using your Hajj coupon.",
        "Verify that your coupon is correctly registered with the official channels.",
        "You are not required to be physically present during the sacrifice.",
        "Once the sacrifice is confirmed, you can proceed with shaving or cutting the hair."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Offering the sacrifice ([nahr|Hady]) on the Day of Eid commemorates the ultimate obedience of Prophet Ibrahim (as) when he was ready to sacrifice his son Ismail, and Allah's mercy in replacing him with a ram. It represents sacrificing our own desires and sharing our wealth with the poor.",
      "fiqhRules": "• Obligation ([wajib|Wajib]): Qurbani is mandatory for pilgrims performing Hajj Tamattu or Hajj Qiran. For those performing Hajj Ifrad, it is highly recommended (Mustahab).\n• Coupon System: In modern Hajj, slaughtering is not done individually. You purchase an official sacrifice coupon (such as the Adahi project), which authorizes a certified slaughterhouse to perform the slaughter on your behalf.\n• Time of Sacrifice: The slaughtering window extends from the completion of the Eid prayer until the sunset of the 13th of Dhul Hijjah (the last day of [tashreeq|Tashreeq]).",
      "survivalHacks": "• Trust the Official System: Do not visit the slaughterhouses in person. The digital coupon system is highly organized, hygienic, and approved by leading global scholars."
    }
  },
  {
    "id": "step-13-shave",
    "chapter": 3,
    "stepNumber": 13,
    "title": "Shaving or Cutting the Hair",
    "location": "Mina Tent City",
    "description": "For men, shaving the head completely or cutting the hair; for women, cutting the length of a fingertip from the ends. This act enables the first release from Ihram.",
    "image": "/images/step_13_shave.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Men: Shave the entire head (Halq — most recommended) or cut the hair evenly (Taqseer).",
        "Women: Cut approximately a fingertip's length (about 2 cm) from the ends of the hair.",
        "This act, combined with the stoning, enables the first release (Tahallul) from Ihram.",
        "After performing 2 of the 3 Eid acts, you can change into regular clothes and wear perfume."
      ],
      "checklists": [
        "Men: Find a licensed barber in Mina or use your own hair clipper",
        "Women: Cut a fingertip's length from the ends of your hair",
        "Change into normal civilian clothes",
        "Apply perfume (permitted after the first Tahallul)"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Shaving or cutting the hair ([halq|Halq / Taqsir]) represents spiritual rebirth, complete humility, and stripping away the ego. By offering a part of their body, the pilgrim shows total submission to Allah's command, emerging from Hajj as pure as a newborn child.",
      "fiqhRules": "• Men's Choice: Men can choose between shaving the entire head (Halq) or trimming it evenly (Taqseer). Shaving is far more rewarding; the Prophet (ﷺ) prayed for those who shave their heads three times, while praying for those who trim only once.\n• Women's Rule: Women do NOT shave their heads. They must only cut a fingertip's length (about 2.5 cm) from the ends of their gathered hair.\n• First Release (Tahallul al-Awwal): Once you have completed the stoning of Jamarat al-Aqaba AND shaved or trimmed your hair, you enter the first state of release. You can shower, wear regular clothes, and apply perfume. All Ihram prohibitions are lifted, except marital relations.",
      "survivalHacks": "• Personal Hair Clipper: Men should bring a personal battery-operated hair clipper to shave in their tents. This avoids the extremely long lines at Mina barbers and the risk of infection from shared razors."
    }
  },
  {
    "id": "step-14-tawaf-ifadah",
    "chapter": 3,
    "stepNumber": 14,
    "title": "Tawaf al-Ifadah",
    "location": "Masjid al-Haram — Makkah",
    "description": "The essential Tawaf of Hajj — a mandatory pillar ([rukn|Rukn]) for Hajj validity. It is performed in normal clothes after hair shaving or cutting.",
    "image": "/images/step_14_tawaf_ifadah.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Go from Mina to Masjid al-Haram.",
        "Perform Wudu (ablution).",
        "Circle the Kaaba 7 times counter-clockwise — no shoulder exposure ([idtiba|Idtiba]), no brisk walking ([raml|Raml]).",
        "Pray 2 Rakats at [maqamIbrahim|Maqam Ibrahim].",
        "Tamattu pilgrims: perform Sa'i of Hajj (7 circuits between Safa and Marwa).",
        "Drink Zamzam water and return to Mina."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          "transliteration": "Rabbana atina fid-dunya hasanaten..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "You must postpone Tawaf al-Ifadah (which is a core Pillar/Rukn of Hajj) until you become pure. You can still shave/trim your hair on Eid day to achieve partial release (Tahallul al-Awwal) and wear normal clothes, but you must delay the Tawaf. If your travel group is departing permanently and you cannot wait, consult scholars regarding modern medical solutions or emergency concessions.",
      "spiritualEssence": "[tawaf|Tawaf] al-Ifadah is the crowning glory of Hajj. Now dressed in your regular clothes, you return to the [kaaba|Kaaba] to perform the circumambulations of allegiance, completing the final pillar that fully releases you from all [ihram|Ihram] restrictions.",
      "fiqhRules": "• The Core Pillar ([rukn|Rukn]): Tawaf al-Ifadah is an indispensable pillar of Hajj. Without it, Hajj is invalid and it cannot be compensated by an animal sacrifice.\n• No [idtiba|Idtiba] or [raml|Raml]: Since you are no longer in Ihram (or have been partially released), you do not expose the right shoulder and do not run during the first three circuits.\n• Sa'i of Hajj: Tamattu pilgrims must perform the Hajj Sa'i after this Tawaf. Qiran and Ifrad pilgrims perform it only if they did not perform it during the Arrival Tawaf.\n• Menstruation Rule: Women on their period do not perform this Tawaf until they become pure. They must wait in Makkah or Mina and perform it once they have finished their cycle.\n• Full Release (Tahallul al-Akbar): Upon completing all three acts of Eid (Stoning + Haircut + Tawaf), you achieve full release, lifting all restrictions including marital relations.",
      "survivalHacks": "• Postpone the Tawaf: Performing the stoning, shaving, traveling to Makkah, and performing Tawaf all in a single day is extremely exhausting. It is highly recommended to perform it on the night of the 11th or 12th of Dhul Hijjah when it is cooler and less crowded."
    }
  },
  {
    "id": "step-15-rami-day1",
    "chapter": 4,
    "stepNumber": 15,
    "title": "Rami — First Day of [tashreeq|Tashreeq]",
    "location": "Mina — Jamarat Bridge — 11 Dhul Hijjah",
    "description": "The first day of [tashreeq|Tashreeq]. Stone all three pillars in sequence after Dhuhr; make Dua after the small and medium pillars.",
    "image": "/images/step_15_rami_day1.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Stay in Mina — spending at least half the night in Mina is mandatory.",
        "After Dhuhr: stone the small pillar with 7 pebbles.",
        "Face the Qiblah and make a long, personal Dua.",
        "Stone the medium pillar with 7 pebbles.",
        "Face the Qiblah and make a long, personal Dua.",
        "Stone the large pillar with 7 pebbles.",
        "Depart the area immediately without stopping for Dua."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Spending the days of [tashreeq|Tashreeq] in Mina and stoning all three pillars represents the continuous remembrance of Allah (Dhikr) and the absolute determination to fight evil in all its forms.",
      "fiqhRules": "• Order of the Pillars: Stoning must be performed strictly in order: Small Pillar (al-Sughra), Medium Pillar (al-Wusta), and then the Large Pillar (al-Aqaba).\n• Number of Pebbles: Throw 7 pebbles at each pillar, saying 'Allahu Akbar' with each throw.\n• Dua After Stoning: It is [sunnah|Sunnah] to face the Qiblah after stoning the small and medium pillars and make a long, personal supplication. No Dua is made after stoning the large pillar.\n• Time of Stoning: According to the majority of jurists, stoning on the days of [tashreeq|Tashreeq] begins only after the sun passes its meridian (Zawal) at Dhuhr time.",
      "survivalHacks": "• Avoid Dhuhr Time: The largest crowds gather immediately after Dhuhr. Wait until Asr or after Maghrib for a peaceful, cool, and completely safe stoning experience."
    }
  },
  {
    "id": "step-16-mina-night",
    "chapter": 4,
    "stepNumber": 16,
    "title": "Overnight Stay in Mina",
    "location": "Mina Tent City — 11-12 Dhul Hijjah",
    "description": "The nights of [tashreeq|Tashreeq] must be spent in Mina. Staying here is mandatory ([wajib|Wajib]) for pilgrims, following the practice of the Prophet ﷺ.",
    "image": "/images/step_16_mina_night.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Return to your tent after stoning.",
        "Spend at least half of the night physically inside the boundaries of Mina — [wajib|Wajib].",
        "Rest, read the Quran, and engage in Dhikr (remembrance of Allah).",
        "Pray all prayers shortened (Qasr) but NOT combined.",
        "Prepare your pebbles for the next day's stoning."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Mina represents total simplicity. Spending the nights in simple tents, side by side with millions of believers from all over the world, fosters humility, universal brotherhood, and deep Islamic unity.",
      "fiqhRules": "• Mandatory Overnight Stay ([wajib|Wajib]): Spending the nights of the 11th and 12th of Dhul Hijjah in Mina is [wajib|Wajib]. You must remain within the borders of Mina for more than half of the night.\n• Sacrifice for Absence: Leaving Mina overnight without a valid, strong excuse requires an animal sacrifice (Fidya) to rectify.",
      "survivalHacks": "• Do Not Return to Makkah: Many pilgrims head back to their hotels in Makkah during these nights. This is physically draining and risks breaking the mandatory stay in Mina. Dedicate yourself to worship and rest in your tent."
    }
  },
  {
    "id": "step-17-rami-day2",
    "chapter": 4,
    "stepNumber": 17,
    "title": "Rami — Second Day of [tashreeq|Tashreeq]",
    "location": "Mina — 12/13 Dhul Hijjah",
    "description": "The second day of [tashreeq|Tashreeq]. Those who wish to depart early may do so after stoning on the 12th, before sunset.",
    "image": "/images/step_17_rami_day2.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "After Dhuhr: stone all three pillars in sequence (7 pebbles each).",
        "Make Dua after the small and medium pillars.",
        "Early Departure (Nafar al-Awwal): depart from Mina before sunset on the 12th.",
        "Late Departure (Nafar al-Thani): stay for the 13th night, stone again, and then depart."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Whether you choose to depart early or stay until the final day, Hajj teaches us that Allah's religion is easy and filled with mercy. Staying until the 13th day is closer to the complete practice of the Prophet ﷺ.",
      "fiqhRules": "• Stoning: The three pillars are stoned after Dhuhr in the same sequence (Small → Medium → Large).\n• Early Departure Condition: If you depart on the 12th of Dhul Hijjah, you must physically cross the boundaries of Mina BEFORE sunset. If the sun sets while you are still inside Mina, you must stay for the 13th night and stone the pillars again the next day.\n• Complete Stay: Staying until the 13th of Dhul Hijjah is more virtuous and highly recommended.",
      "survivalHacks": "• Plan Your Exit: If departing on the 12th, pack your bags in the morning and head out immediately after stoning to avoid massive traffic gridlocks."
    }
  },
  {
    "id": "step-18-farewell",
    "chapter": 4,
    "stepNumber": 18,
    "title": "Tawaf al-Wida (Farewell Tawaf)",
    "location": "Masjid al-Haram — Final Rite",
    "description": "The final rite of Hajj. The Farewell Tawaf is your parting greeting to the Kaaba — the circumambulations of separation before leaving Makkah permanently.",
    "image": "/images/step_18_farewell.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "After leaving Mina, head directly to Masjid al-Haram.",
        "Perform the Farewell Tawaf (7 circuits around the Kaaba).",
        "There is NO Sa'i after this Tawaf.",
        "Offer your final, personal prayers of farewell.",
        "Depart from Makkah immediately after completion — no further stays allowed.",
        "May Allah accept your Hajj!"
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "A menstruating woman is completely exempt from the Farewell Tawaf (Tawaf al-Wida). You may leave Makkah with your travel group without any penalty, sacrifice, or compensation required.",
      "spiritualEssence": "The Farewell [tawaf|Tawaf] (Tawaf al-Wida) is your final parting with the House of Allah. Looking at the [kaaba|Kaaba] for the last time, you thank Allah for accepting you as His guest and pray that this is not your last visit to this sacred sanctuary.",
      "fiqhRules": "• Obligation ([wajib|Wajib]): The Farewell Tawaf is [wajib|Wajib] for all pilgrims before permanently leaving Makkah. Omitting it requires a sheep sacrifice.\n• Concession for Women: Women undergoing menstruation or postpartum bleeding are completely exempt from this Tawaf and may depart without any sacrifice.\n• Immediate Departure: This Tawaf must be the absolute final act in Makkah. It is not permissible to stay for shopping, dining, or sleeping afterward. Any long delay requires repeating the Tawaf.",
      "survivalHacks": "• Pre-departure Shopping: Complete all souvenir shopping and pack your luggage BEFORE performing the Farewell Tawaf, so you can head straight to your bus or car immediately after finishing."
    }
  }
]
  },
  ar: {
    stages: [
  {
    "id": "step-01-preparation",
    "chapter": 1,
    "stepNumber": 1,
    "title": "التحضير والنية",
    "location": "قبل المغادرة — في المنزل",
    "description": "يبدأ الحج قبل وقت طويل من صعودك إلى الطائرة. جدد نواياك، وسوّ شؤونك، وهيئ قلبك وحقيبتك لرحلة العمر.",
    "image": "/images/step_01_preparation.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "جدد نيتك الصادقة لله وحده.",
        "سدد جميع الديون العالقة واطلب السماح من الآخرين.",
        "اكتب وصيتك ([sunnah|سنة] مؤكدة قبل السفر).",
        "تأكد من حزم جميع الوثائق الهامة والأدوية الأساسية وملابس الإحرام.",
        "تعلم الأحكام الفقهية الأساسية وخطط لخطواتك قبل الرحلة."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "يبدأ الحج بالتوبة الصادقة وتصفية النفس. إن تجديد [niyyah|النية] هو الأساس الذي تبنى عليه كل مناسك الحج، وهو تذكير بأن الرحلة روحية في المقام الأول وليست مجرد سفر بدني.",
      "fiqhRules": "• [niyyah|النية] الصادقة: يجب أن يكون الحج خالصاً لوجه الله تعالى وحده، بعيداً عن الرياء أو السمعة.\n• الوصية والديون: يجب على الحاج كتابة وصيته وسداد ديونه أو توكيل من يقضيها عنه قبل سفره.\n• طلب السماح: من تمام شروط الحج التحلل من حقوق العباد وطلب العفو ممن أسأت إليهم.",
      "survivalHacks": "• حقيبة الظهر اليدوية: احتفظ بملابس الإحرام في حقيبتك التي تحملها معك في الطائرة (الكبينة) وليس في الأمتعة المشحونة، تحسباً لضياع الحقائب في المطار.\n• الأحذية المريحة: احزم حذاءً طبياً مريحاً للمشي الطويل، وتجنب استخدام الأحذية الجديدة في الحج لمنع حدوث التسلخات والجروح."
    }
  },
  {
    "id": "step-02-ihram",
    "chapter": 1,
    "stepNumber": 2,
    "title": "الدخول في الإحرام",
    "location": "[miqat|الميقات] — الحدود المقدسة",
    "description": "عند [miqat|الميقات] — النقطة الجغرافية المحددة للإحرام — تدخل جسدياً وروحياً في الحالة المقدسة، تاركاً وراءك زينة الدنيا مقبلاً على عبادة ربك.",
    "image": "/images/step_02_ihram.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "الاغتسال وقص الأظافر وتقليم الشارب ([sunnah|سنة] قبل الإحرام).",
        "للرجال: ارتداء ملابس الإحرام (الإزار والرداء الأبيضين).",
        "صلاة ركعتين ([sunnah|سنة] الإحرام، أو صلاة الفريضة إن كانت قائمة).",
        "تلفظ بالنية: \"لبيك اللهم عمرة\" (لقارن أو متمتع بالنية المقرونة).",
        "البدء بالتلبية بصوت مرتفع للرجال ومنخفض للنساء."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "تفعل المرأة الحائض كل شيء لطلب الإحرام — الاغتسال والتنظف ولبس ملابسها المعتادة والنية — لكنها تتجاوز صلاة ركعتي الإحرام.",
      "spiritualEssence": "[ihram|الإحرام] هو رمز المساواة والتجرد الكامل من مظاهر الدنيا. يرتدي الجميع رداءً أبيض بسيطاً، مما يذكرنا بيوم الحشر والوقوف بين يدي الله تعالى بلا ألقاب أو ثروات.",
      "fiqhRules": "• [niyyah|نية] الدخول: [ihram|الإحرام] هو [niyyah|نية] الدخول في النسك، ولا يكفي مجرد لبس الثياب بلا [niyyah|نية].\n• محظورات [ihram|الإحرام]: بمجرد عقد [niyyah|النية]، يحرم قص الشعر والأظافر، استخدام العطور، تغطية الرأس للرجال، ولبس المخيط للرجال، وعقد النكاح، والجماع ومقدماته.\n• المرأة الحائض: تحرم المرأة الحائض من [miqat|الميقات] وتفعل كل المناسك إلا [tawaf|الطواف] بالبيت حتى تطهر.",
      "survivalHacks": "• تجنب التسلخات: استخدم الفازلين أو كريمات الحماية على الفخذين لمنع التسلخات المؤلمة الناتجة عن المشي الطويل بملابس الإحرام.\n• الملابس الاحتياطية: احمل معك مجموعة إحرام إضافية في حقيبتك لاستبدالها في حال اتساخ الإحرام الأول."
    }
  },
  {
    "id": "step-03-tawaf",
    "chapter": 1,
    "stepNumber": 3,
    "title": "طواف القدوم (Tawaf × 7)",
    "location": "المسجد الحرام — الكعبة المشرفة",
    "description": "رؤيتك الأولى للكعبة المشرفة. تطوف حول البيت العتيق سبعة أشواط عكس عقارب الساعة، بدءاً من الحجر الأسود وانتهاءً به، في حالة مستمرة من الدعاء والتضرع.",
    "image": "/images/step_03_tawaf.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "التأكد من الطهارة التامة (الوضوء).",
        "للرجال: كشف الكتف الأيمن ([idtiba|الاضطباع]) — في هذا الطواف فقط.",
        "دخول الحرم بالقدم اليمنى مع دعاء دخول المسجد.",
        "محاذاة الحجر الأسود (الضوء الأخضر)، التكبير والإشارة باليد اليمنى.",
        "الطواف 7 أشواط جعل الكعبة عن يسارك.",
        "استلام [rukn|الركن] اليماني باليد إن أمكن بلا تقبيل أو إشارة.",
        "قول: \"ربنا آتنا في الدنيا حسنة...\" بين [rukn|الركن] اليماني والحجر الأسود.",
        "بعد الشوط السابع، تغطية الكتف، وصلاة ركعتين خلف [maqamIbrahim|مقام إبراهيم].",
        "الشرب من ماء زمزم والاستراحة قليلاً قبل السعي."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
          "transliteration": "Rabbana atina fid-dunya hasanaten wa fil-akhirati hasanatan wa qina 'adhab an-nar."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "لا يجوز للمرأة الحائض الطواف بالبيت. وإذا كانت متمتعة ولم تطهر قبل بدء أعمال الحج، فإنها تقلب نيتها إلى حج القران وتتوجه إلى منى مباشرة دون عمرة.",
      "spiritualEssence": "[tawaf|الطواف] حول [kaaba|الكعبة] يمثل حركة الكون بأسره حول مركز إلهي واحد. في [tawaf|الطواف]، يندمج الفرد مع ملايين المؤمنين في تسبيح واحد، متقربين إلى رب البيت بقلوب خاشعة ونفوس تائبة.",
      "fiqhRules": "• الوضوء شرط: الوضوء شرط لصحة [tawaf|الطواف] عند جمهور العلماء. إذا انتقض الوضوء أثناء [tawaf|الطواف]، يجب قطعه والوضوء ثم استئنافه.\n• [idtiba|الاضطباع] والرمل: [idtiba|الاضطباع] (كشف الكتف الأيمن للرجال) والرمل (الهرولة في الأشواط الثلاثة الأولى) سنتان في [tawaf|طواف] القدوم فقط.\n• صلاة الركعتين: صلاة ركعتي [tawaf|الطواف] خلف [maqamIbrahim|مقام إبراهيم] أو في أي مكان في [masjidAlHaram|الحرم] بعد الفراغ من الأشواط السبعة [sunnah|سنة] مؤكدة.",
      "survivalHacks": "• الطواف في الأدوار العليا: الطواف في الدور الثاني أو السطح أطول مسافة لكنه أقل زحاماً بكثير وأكثر راحة للضعفاء وكبار السن.\n• الحفاظ على الوضوء: تجنب شرب كميات هائلة من الماء قبل الطواف مباشرة لتفادي الحاجة للذهاب إلى دورات المياه المزدحمة وقطع الطواف."
    }
  },
  {
    "id": "step-04-safa-marwa",
    "chapter": 1,
    "stepNumber": 4,
    "title": "السعي بين الصفا والمروة",
    "location": "المسجد الحرام — المسعى",
    "description": "المشي سبعة أشواط بين جبلين الصفا والمروة، إحياءً لذكرى سعي السيدة هاجر (عليها السلام) بحثاً عن الماء لابنها إسماعيل (عليه السلام).",
    "image": "/images/step_04_safa_marwa.png",
    "coordinates": "21.3754,39.8227",
    "details": {
      "steps": [
        "التوجه إلى المسعى والبدء من الصفا.",
        "عند الاقتراب من الصفا، قراءة: \"إن الصفا والمروة من شعائر الله...\"",
        "الصعود على الصفا، استقبال الكعبة، رفع اليدين والدعاء المأثور 3 مرات.",
        "المشي نحو المروة، مع هرولة الرجال بين العلمين الأخضرين.",
        "عند المروة، استقبال الكعبة وتكرار نفس الدعاء والدعاء الشخصي.",
        "إتمام 7 أشواط (الذهاب شوط والعودة شوط) والانتهاء عند المروة."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ، أَنجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ",
          "translation": "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير. لا إله إلا الله وحده، أنجز وعده، ونصر عبده، وهزم الأحزاب وحده.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lah..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "الطهارة ليست شرطاً للسعي، ولكن بما أن السعي يجب أن يتبع الطواف، فيجب تأجيله حتى تطهر وتطوف أولاً. (إذا تحولت للقران، تذهب لمنى مباشرة).",
      "spiritualEssence": "يجسد [sai|السعي] أهمية بذل الجهد البشري والتوكل الكامل على الله. نسعى في حياتنا كما سعت هاجر، واثقين بأن الفرج ونبع [zamzam|زمزم] الإلهي سيأتي في الوقت الذي يحدده الله سبحانه.",
      "fiqhRules": "• الوضوء في السعي: الوضوء في السعي [sunnah|سنة] مستحبة وليس شرطاً؛ ولذا يصح سعي الحائض والنفساء والجنب.\n• الهرولة للرجال: الهرولة بين العلمين الأخضرين [sunnah|سنة] للرجال فقط، وتمشي النساء كعادتهن دون هرولة.\n• عدد الأشواط: الذهاب من الصفا إلى المروة يعتبر شوطاً، والعودة من المروة إلى الصفا شوطاً آخر.",
      "survivalHacks": "• المسعى المكيف: السعي في الأدوار العليا المكيفة يوفر طاقة بدنية هائلة ويحمي الحجاج من الإجهاد الحراري.\n• مخرج المروة: ينتهي الشوط السابع عند المروة، حيث توجد مخارج سهلة للوصول إلى الحلاقين وخارج المسجد الحرام.",
      "interestingFact": {
        "title": "الأعلام الخضراء ومنطقة الهرولة",
        "fact": "في المسافة الواقعة بين الصفا والمروة، توجد منطقة محددة بإضاءة خضراء ساطعة. هذه المنطقة تمثل بطن الوادي القديم الذي كانت تسرع فيه السيدة هاجر وتسرع فيه لكي لا تغيب عن عينيها صورة طفلها إسماعيل. يُسن للرجال فقط الهرولة والركض السريع في هذه المنطقة."
      }
    }
  },
  {
    "id": "step-05-hair-clip",
    "hajjTypeFilter": ["tamattu"],
    "chapter": 1,
    "stepNumber": 5,
    "title": "التحلل من العمرة — قص الشعر",
    "location": "مكة المكرمة — الحلاقين",
    "description": "بقص الشعر أو حلقه، تنهي مناسك العمرة بنجاح وتتحلل تحللاً كاملاً من محظورات الإحرام، وتنتظر بدء مناسك الحج في الثامن من ذي الحجة.",
    "image": "/images/step_05_hair_clip.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "للرجال: حلق كامل الرأس (أفضل) أو تقصيره بالتساوي.",
        "النساء: قص قدر أنملة (حوالي 2 سم) من أطراف جميع خصلات الشعر.",
        "بهذا العمل يتحلل المحرم تماماً من إحرام العمرة.",
        "اغتسل والبس ثيابك العادية وتطيب واستمتع بفترة الراحة."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "يمثل قص الشعر علامة التواضع وإزالة الكبر والتجدد الروحي. إنه تقديم جزء من زينة الجسد طاعةً وتقرباً لله عز وجل بعد تمام النسك.",
      "fiqhRules": "• الحلق والتقصير: للرجال الحلق بالكامل أفضل من التقصير، وللنساء التقصير فقط ولا يجوز لهن الحلق.\n• التحلل الكامل: بالتقصير أو الحلق يحل للمعتمر كل شيء حرم عليه بالإحرام بما في ذلك الطيب والمخيط.\n• القص بنفسك: يجوز للمحرم أن يقص شعر نفسه أو شعر غيره بعد تمام السعي للدخول في التحلل.",
      "survivalHacks": "• استخدام أدوات الحلاقة الشخصية: احرص على استخدام شفرات حلاقة جديدة ذات استخدام واحد لدى الحلاقين لتفادي انتقال الأمراض المعدية.\n• تجنب الحلاقين العشوائيين: توجه إلى صالونات الحلاقة المرخصة والمعتمدة حول الحرم لضمان النظافة والتعقيم."
    }
  },
  {
    "id": "step-06-rest",
    "hajjTypeFilter": ["tamattu"],
    "chapter": 1,
    "stepNumber": 6,
    "title": "الاستراحة والعبادة بمكة",
    "location": "مكة المكرمة — المسجد الحرام",
    "description": "الفترة الانتقالية بين العمرة وبدء مناسك الحج. يستغل الحجاج هذا الوقت للراحة البدنية والعبادة وتلاوة القرآن والإكثار من الصلوات في الحرم الشريف.",
    "image": "/images/step_06_rest.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "الاستراحة في الفندق لاستعادة القوة البدنية.",
        "الحرص على أداء الصلوات الخمس في جماعة بالمسجد الحرام.",
        "الإكثار من الطواف التطوعي حول الكعبة المشرفة.",
        "كتابة وتجهيز قائمة الأدعية الشخصية ليوم عرفة العظيم.",
        "حضور الدروس العلمية وحفظ الأدعية وتدبر معاني الحج.",
        "الاستعداد للإحرام مجدداً للحج في صباح اليوم الثامن من ذي الحجة."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "هذه الفترة هي فرصة ذهبية لشحن القلوب بالطاعة والذكر في أقدس بقاع الأرض. الصلاة في المسجد الحرام تعادل مئة ألف صلاة، وتمنح النفس طمأنينة وخشوعاً تمهيداً لأيام الحج العظام.",
      "fiqhRules": "• مضاعفة الأجر: الصلاة في الحرم تضاعف بمئة ألف صلاة، ويشمل هذا الأجر الفرض والنفل عند جمهور العلماء.\n• الأدعية المكتوبة: تجهيز وكتابة قائمة بالأدعية ليوم عرفة مستحب ونافع حتى لا ينسى الحاج أحداً من أحبابه وأهله في مواطن الإجابة.",
      "survivalHacks": "• إعطاء الأولوية للراحة البدنية: تجنب جولات التسوق الطويلة أو الإرهاق الجسدي قبل الحج. الأيام القادمة تتطلب جهداً عظيماً للمشي والوقوف والرمي.\n• مواقيت الازدحام: اختر أوقاتاً هادئة (مثل وقت الضحى أو منتصف الليل) للذهاب إلى الحرم لأداء طواف التطوع لتفادي التدافع الشديد."
    }
  },
  {
    "id": "step-07-ihram-hajj",
    "chapter": 2,
    "stepNumber": 7,
    "title": "الإحرام للحج",
    "location": "مكة المكرمة — [tarwiyah|يوم التروية]",
    "description": "في صباح اليوم الثامن من ذي الحجة ([tarwiyah|يوم التروية])، يدخل الحجاج مجدداً في حالة الإحرام المقدسة — هذه المرة خصيصاً للحج — لتبدأ رحلة الحج الكبرى رسمياً.",
    "image": "/images/step_07_ihram_hajj.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "الاغتسال والتنظف والتطيب بالبدن قبل الإحرام ([sunnah|سنة]).",
        "للرجال: لبس ثياب الإحرام البيضاء مجدداً.",
        "عقد [niyyah|نية] الحج وقول: \"لبيك اللهم حجاً\".",
        "الاستمرار في [talbiyah|التلبية] دون انقطاع.",
        "التوجه إلى مشعر منى بعد شروق شمس اليوم الثامن."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ حَجًّا",
          "translation": "لبيك اللهم حجاً.",
          "transliteration": "Labbayk Allahumma Hajjan."
        }
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "الإحرام للحج يجدد العهد مع الله ويعيد توجيه الوجهة والقلب نحو المشاعر المقدسة. يبدأ [talbiyah|التلبية] بقلب يملؤه الشوق والرجاء بالقبول والمغفرة.",
      "fiqhRules": "• [miqat|ميقات] الإحرام: يحرم الحاج للحج من مكان إقامته أو فندقه بمكة المكرمة، ولا يجب عليه الذهاب للميقات أو التنعيم.\n• [niyyah|النية] اللفظية: يقول الملبي: \"لبيك اللهم حجاً\" معلناً دخوله في النسك.\n• البدء بالتلبية: تستحب مواصلة [talbiyah|التلبية] ورفع الصوت بها في كل حال حتى رمي جمرة العقبة يوم العيد.",
      "survivalHacks": "• الاستعداد في الفندق: اغتسل والبس ملابس الإحرام بالكامل في فندقك بمكة قبل تحرك الحافلات لتجنب العجلة والارتباك.\n• شرب الماء والترطيب: احرص على شرب كميات كافية من السوائل والترطيب مع عودة شروط الإحرام ومحظوراته."
    }
  },
  {
    "id": "step-08-mina",
    "chapter": 2,
    "stepNumber": 8,
    "title": "الوصول إلى منى ([tarwiyah|يوم التروية])",
    "location": "مشعر منى — مدينة الخيام",
    "description": "يقضي الحجاج [tarwiyah|يوم التروية] ومبيت ليلة التاسع من ذي الحجة في مدينة الخيام البيضاء بمنى، مصلين الصلوات الخمس قصرًا بلا جمع، مهيئين أنفسهم ليوم عرفة العظيم.",
    "image": "/images/step_08_mina.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "الانتقال إلى منى صباح اليوم الثامن من ذي الحجة.",
        "أداء صلوات الظهر، العصر، المغرب، العشاء، وفجر اليوم التاسع في منى.",
        "أداء الصلوات الرباعية قصرًا (ركعتين) وفي أوقاتها المحددة دون جمع.",
        "حفظ وتسجيل رقم الخيمة وموقعها لتفادي الضياع.",
        "استglال الوقت في الاستغفار والذكر والدعاء الفردي."
      ],
      "checklists": [
        "تأكيد ترتيبات النقل إلى منى",
        "حفظ رقم الخيمة وموقع مكتب الخدمة",
        "حمل سجادة الصلاة والشاحن وأدوات العناية الشخصية",
        "التأكد من حمل بطاقة الهوية الذكية للحج",
        "تجنب الأطعمة الدسمة المزعجة للمعدة"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "تعد منى محطة للتجرد والتدبر والتفكر. البقاء في خيمة بسيطة مع ملايين الحجاج يعزز التواضع والتحرر من ماديات الحياة والاستعداد النفسي للمثول بين يدي الله في عرفات.",
      "fiqhRules": "• المبيت بمنى: المبيت بمنى ليلة التاسع من ذي الحجة وصلاة الصلوات الخمس فيها [sunnah|سنة] مؤكدة عند جمهور العلماء.\n• قصر بلا جمع: يُسن للحاج قصر الصلاة الرباعية (الظهر والعصر والعشاء إلى ركعتين) في منى، وتؤدى كل صلاة في وقتها دون جمع.",
      "survivalHacks": "• رقم الخيمة والماكتب: احفظ رقم مكتب الخدمة الميدانية (المكتب) ورقم خيمتك وموقعها الجغرافي على الهاتف؛ فمشعر منى ضخم جداً ومتطابق الخيام.\n• تخفيف الأمتعة: احمل معك فقط حقيبة ظهر صغيرة تحتوي على أساسيات يوم عرفة ومزدلفة ويوم العيد، واترك حقائبك الكبيرة في السكن بمكة.",
      "interestingFact": {
        "title": "أكبر مدينة خيام في العالم",
        "fact": "منى هي وادٍ يظل خالياً طوال العام، ولكنه يتحول فجأة في موسم الحج إلى أكبر مدينة خيام مؤقتة في العالم، حيث يضم أكثر من 100 ألف خيمة مكيفة ومقاومة للحريق والحرارة تستوعب ملايين الحجاج."
      }
    }
  },
  {
    "id": "step-09-arafat",
    "chapter": 2,
    "stepNumber": 9,
    "title": "يوم عرفة العظيم",
    "location": "صعيد عرفات الطاهر — 9 ذي الحجة",
    "description": "الوقوف بعرفة هو [rukn|الركن] الأعظم للحج الذي لا يصح الحج بدونه. يقف الحجاج متضرعين داعين مستغفرين من الزوال وحتى غروب الشمس، في أعظم يوم طلعت فيه الشمس.",
    "image": "/images/step_09_arafat.png",
    "coordinates": "21.3547,39.9839",
    "details": {
      "steps": [
        "الذهاب إلى عرفات بعد شروق شمس اليوم التاسع من ذي الحجة.",
        "صلاة الظهر والعصر جمع تقديم وقصراً في وقت الظهر بأذان وإقامتين.",
        "الوقوف بعرفة والدعاء والتضرع والذكر من الزوال حتى غروب الشمس.",
        "استقبال القبلة ورفع اليدين بحمد وخشوع تام.",
        "تجنب مغادرة حدود عرفات قبل غروب الشمس تماماً."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "translation": "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shay'in qadir."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "الوقوف بعرفة صحيح تماماً للحائض. تقف وتدعو وتذكر الله وتتضرع؛ فالطهارة ليست شرطاً للوقوف بعرفة.",
      "spiritualEssence": "[wuquf|الوقوف] في عرفة هو يوم الرحمة والرضوان والمغفرة والعتق من النيران. إنه الموقف الذي يباهي الله فيه ملائكته بعباده الخاشعين، وموقف يذكر بيوم الحشر والوقوف العظيم.",
      "fiqhRules": "• الوقوف [rukn|ركن] أعظم: الوقوف بعرفة [rukn|ركن] لا يصح الحج إلا به، لقول النبي ﷺ: \"الحج عرفة\".\n• وقت الوقوف: يمتد وقت الوقوف بعرفة من زوال شمس يوم التاسع وحتى طلوع فجر يوم النحر (العاشر من ذي الحجة).\n• الجمع والقصر: صلاة الظهر والعصر تؤديان جمعاً وقصراً (جمع تقديم) في وقت الظهر للتفرغ للدعاء.\n• النساء الحائضات: يصح وقوف الحائض بعرفة لأن الطهارة ليست شرطاً لصحة الوقوف بعرفة.",
      "survivalHacks": "• حدود عرفات الصفراء: انتبه جيداً للوحات الصفراء الكبيرة واللوحات الإرشادية التي توضح حدود مشعر عرفات؛ فالوقوف خارجها يبطل الحج تماماً.\n• الدعاء الفردي والخاص: استثمر هذه الساعات الثمينة في الدعاء الفردي والخاشع بطلب المغفرة وتحقيق الأمنيات وتجنب النقاشات والأحاديث الجانبية.",
      "interestingFact": {
        "title": "حدود عرفات واللوحات الإرشادية",
        "fact": "صعيد عرفات محدد بالكامل بلوحات إرشادية وتنبيهية ضخمة باللون الأصفر الفاقع توضح حدود المشعر بدقة، لضمان مكوث الحاج داخل النطاق الشرعي المعتمد للوقوف بالكامل وتفادي بطلان الحج."
      }
    }
  },
  {
    "id": "step-10-muzdalifah",
    "chapter": 2,
    "stepNumber": 10,
    "title": "مزدلفة — مبيت تحت النجوم",
    "location": "مشعر مزدلفة — 9 ذي الحجة ليلاً",
    "description": "بعد غروب شمس عرفة، ينفر الحجاج إلى مزدلفة حيث يبيتون ليلتهم تحت السماء المكشوفة، ويؤدون صلاتي المغرب والعشاء جمعاً وقصراً، ويجمعون الحصى لرمي الجمرات.",
    "image": "/images/step_10_muzdalifah.png",
    "coordinates": "21.3894,39.9392",
    "details": {
      "steps": [
        "النفرة من عرفات إلى مزدلفة فور غروب شمس يوم التاسع.",
        "صلاة المغرب (3 ركعات) والعشاء (ركعتين) جمع تأخير وقصراً فور الوصول.",
        "المبيت والنوم على الأرض تحت السماء المكشوفة حتى الفجر.",
        "جمع 49 إلى 70 حصاة صغيرة لرمي الجمار.",
        "أداء صلاة الفجر في أول وقتها قبل المغادرة."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "المبيت بمزدلفة وجمع الحصى صحيح تماماً للحائض؛ فالطهارة ليست شرطاً لأعمال مزدلفة.",
      "spiritualEssence": "يمثل المبيت في العراء في [muzdalifah|مزدلفة] قمة التواضع والتجرد والسكينة. ينام الملوك والفقراء متجاورين على تراب واحد في ضيافة الرحمن، مستشعرين عظمة الخالق وفقر المخلوق.",
      "fiqhRules": "• الجمع والتأخير: تؤخر صلاة المغرب والعشاء لتؤديا في مزدلفة جمع تأخير وقصراً، ولا تجوز صلاتهما في الطريق إلا لعذر شديد.\n• وجوب المبيت: المبيت بمزدلفة على الأقل حتى منتصف الليل [wajib|واجب] عند جمهور الفقهاء.\n• الرخصة للضعفاء: يُرخص للنساء والضعفاء وكبار السن والمرضى مغادرة مزدلفة بعد منتصف الليل لتجنب الزحام وتدافع الحشود صباح العيد.\n• جمع الحصى: اجمع الحصى الصغير هنا. تحتاج 7 حصيات لليوم الأول و21 حصاة لكل يوم من [tashreeq|أيام التشريق] التالية.",
      "survivalHacks": "• سجادة النوم الخفيفة: سجادة اليوجا خفيفة الوزن أو فراش نوم رقيق يوفر راحة كافية للنوم فوق أرض مزدلفة الحصوية.\n• تأخير الصلاة: اتبع [sunnah|السنة] ولا تصلي المغرب في طريق النفرة؛ انتظر حتى تصل إلى مزدلفة مهما كانت العوائق والحشود.",
      "interestingFact": {
        "title": "رخصة منتصف الليل للضعفاء",
        "fact": "رخص النبي ﷺ لأم سلمة وغيرها من النساء والضعفاء بالنفرة من مزدلفة بعد غياب القمر (منتصف الليل) لتسريع رمي جمرة العقبة قبل وصول عامة الحجاج مع زحام شروق الشمس."
      }
    }
  },
  {
    "id": "step-11-rami-aqaba",
    "chapter": 3,
    "stepNumber": 11,
    "title": "رمي جمرة العقبة الكبرى",
    "location": "منى — جسر الجمرات",
    "description": "أول أعمال يوم العيد: رمي الجمرة الكبرى بـ ٧ حصيات، اقتداءً بسيدنا إبراهيم عليه السلام في رفضه لوساوس الشيطان.",
    "image": "/images/step_11_rami_aqaba.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "التوجه من مزدلفة إلى منى بعد الفجر (أو بعد منتصف الليل للضعفاء).",
        "التوجه إلى جسر الجمرات ورمي الجمرة الكبرى (جمرة العقبة) فقط.",
        "رمي ٧ حصيات متعاقبات، مع التكبير \"الله أكبر\" مع كل حصاة.",
        "قطع [talbiyah|التلبية] مع رمي أول حصاة، والبدء بتكبيرات العيد.",
        "يكون الرمي بعد طلوع الشمس، ويفضل قبل الزوال."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "رمي جمرة العقبة الكبرى صحيح تماماً للحائض. وللنساء رخصة النفرة من مزدلفة بعد منتصف الليل للرمي مبكراً، أو توكيل من يرمي عنهن عند الزحام الشديد.",
      "spiritualEssence": "[rami|رمي] جمرة العقبة الكبرى في يوم العيد يجسد رمي إبراهيم عليه السلام للشيطان الذي حاول وسوسته لمنعه من طاعة الله. وهو يرمز إلى الرفض العملي لشهوات النفس ووساوس الشيطان.",
      "fiqhRules": "• رمي يوم العيد: يرمي الحاج جمرة العقبة الكبرى فقط بـ ٧ حصيات متعاقبات. ولا يرمي الصغرى أو الوسطى في هذا اليوم.\n• كيفية الرمي: يرفع يده ويكبر مع كل حصاة قائلاً \"الله أكبر\"، ويجب أن تسقط الحصاة في الحوض الدائري المحيط بالعمود.\n• قطع [talbiyah|التلبية]: يقطع الحاج [talbiyah|التلبية] مع أول حصاة يرميها ويبدأ بالتكبير المطلق.\n• وقت الرمي: يبدأ بعد طلوع شمس يوم العيد ويمتد طوال اليوم والليلة حتى فجر اليوم التالي.\n• التحلل الأول: بالرمي مع الحلق أو التقصير يتحقق التحلل الأول (التحلل الأصغر) ويباح كل محظورات الإحرام ما عدا الجماع.",
      "survivalHacks": "• زاوية الاقتراب: اقترب من حوض الجمرات من الجانبين أو الخلف وتجنب الوسط لتفادي الزحام الشديد.\n• تجنب وقت الذروة: تجنب الرمي فور طلوع الشمس لكثافة الحجاج الشديدة، والرمي بعد الظهر أو في المساء أكثر أمناً وراحةً للضعفاء والنساء.",
      "interestingFact": {
        "title": "تطوير الجمرات الهندسي",
        "fact": "تغير شكل الجمرات من أعمدة حجرية ضيقة سببت في الماضي تدافعاً خطيراً، إلى جدران بيضاوية ضخمة تمتد على عدة طوابق لتوفير أقصى مساحة ممكنة وتسهيل تدفق الحشود بسلاسة وأمان."
      }
    }
  },
  {
    "id": "step-12-qurbani",
    "chapter": 3,
    "stepNumber": 12,
    "title": "الهدي — ذبح الأضحية",
    "location": "منى — المجازر",
    "description": "ذبح الهدي في يوم العيد تعظيماً لشعائر الله واقتداءً بسيدنا إبراهيم عليه السلام. وهو [wajib|واجب] على حجاج التمتع والقران.",
    "image": "/images/step_12_qurbani.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "يتم الذبح من خلال السلطات المعتمدة باستخدام كوبونات الهدي.",
        "التأكد من شراء الكوبون من الجهات الرسمية المعتمدة.",
        "لا يشترط حضور الحاج عملية الذبح بنفسه.",
        "بعد التأكد من الذبح، يمكن للحاج الحلق أو التقصير والتحلل."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "شراء [nahr|الهدي] وذبحه يجسد معاني التضحية والبذل والتوكل، مستحضرين قصة الفداء العظيم لنبي الله إسماعيل عليه السلام، وإطعام الفقراء والمساكين شكراً لله على نعمة الحج.",
      "fiqhRules": "• الوجوب: الهدي [wajib|واجب] على المتمتع والقارن، وسنة مستحبة للمفرد.\n• النظام الموحد: يتم الذبح عبر الكوبونات الإلكترونية الرسمية (مثل مشروع أضاحي التابع للبنك الإسلامي للتنمية) كونه الخيار الأكثر تنظيماً ونظافةً وتوافقاً مع الفتاوى المعاصرة.\n• وقت الذبح: يمتد وقت ذبح الهدي من فراغ صلاة العيد إلى غروب شمس يوم الثالث عشر من ذي الحجة (آخر [tashreeq|أيام التشريق]).",
      "survivalHacks": "• الثقة بالسلطات: لا تذهب للمجازر بنفسك؛ فالنظام الرقمي دقيق وآمن ومعتمد فقهياً، مما يتيح لك التفرغ لباقي مناسك العيد الحيوية."
    }
  },
  {
    "id": "step-13-shave",
    "chapter": 3,
    "stepNumber": 13,
    "title": "الحلق أو التقصير",
    "location": "منى — مدينة الخيام",
    "description": "للرجال حلق الرأس بالكامل أو تقصيره، وللنساء قص قدر أنملة من أطراف الشعر. وبذلك يتحلل الحاج تحللاً أولاً.",
    "image": "/images/step_13_shave.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "للرجال: حلق الرأس كاملاً (وهو أفضل) أو تقصير الشعر بالتساوي.",
        "النساء: قص قدر أنملة (نحو ٢ سم) من أطراف جميع خصلات الشعر.",
        "بهذا العمل مع الرمي يتم التحلل الأول من الإحرام.",
        "بعد التحلل الأول، يلبس الحاج ثيابه المعتادة ويستعمل العطر."
      ],
      "checklists": [
        "للرجال: التوجه لأحد الحلاقين المعتمدين في منى أو استخدام ماكينة خاصة",
        "للنساء: قص قدر أنملة من أطراف الشعر",
        "خلع ملابس الإحرام ولبس الثياب العادية",
        "استخدام العطور والتطيب (مباح الآن)"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "[halq|الحلق أو التقصير] يرمز إلى الولادة الروحية الجديدة والتواضع التام والتخلص من الكبر والرياء. فكأن الحاج يقدم جزءاً من جسده طاعةً لله، ليخرج من حجه نقياً من الذنوب كيوم ولدته أمه.",
      "fiqhRules": "• أفضلية الحلق: الحلق الكامل للرجال أفضل من التقصير؛ فقد دعا النبي ﷺ بالمغفرة للمحلقين ثلاثاً وللمقصرين مرة واحدة.\n• حكم النساء: يحرم على النساء حلق الرأس بالكامل، بل يشرع لهن التقصير فقط بقدر أنملة الإصبع من أطراف جميع خصلات الشعر.\n• التحلل الأول: بفعل اثنين من ثلاثة (رمي جمرة العقبة، الحلق أو التقصير، طواف الإفاضة) يحصل التحلل الأول (الأصغر)، فيباح كل شيء للمحرم إلا النساء.",
      "survivalHacks": "• الماكينة الشخصية: يفضل للرجال إحضار ماكينة حلاقة كهربائية خاصة بالفندق أو الخيمة لتجنب طوابير الحلاقين الطويلة وتفادي مخاطر العدوى نتيجة استخدام أمواس الحلاقة المشتركة."
    }
  },
  {
    "id": "step-14-tawaf-ifadah",
    "chapter": 3,
    "stepNumber": 14,
    "title": "طواف الإفاضة",
    "location": "المسجد الحرام — مكة المكرمة",
    "description": "[rukn|ركن] الحج الأعظم وطوافه الأساسي. يؤدى سبعة أشواط حول الكعبة بعد التحلل الأول بالملابس العادية.",
    "image": "/images/step_14_tawaf_ifadah.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "الانتقال من منى إلى المسجد الحرام بمكة.",
        "التأكد من الوضوء والطهارة الكاملة.",
        "طواف الإفاضة ٧ أشواط حول الكعبة المشرفة عكس عقارب الساعة.",
        "لا [idtiba|اضطباع] في هذا الطواف (لا تكشف الكتف الأيمن).",
        "لا [raml|رمل] في هذا الطواف (لا تهرول في الأشواط الأولى).",
        "صلاة ركعتين خلف [maqamIbrahim|مقام إبراهيم] والشرب من ماء زمزم.",
        "لحجاج التمتع: أداء سعي الحج بين الصفا والمروة.",
        "العودة إلى منى للمبيت."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.",
          "transliteration": "Rabbana atina fid-dunya hasanatan..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "يجب تأجيل طواف الإفاضة (وهو ركن الحج) حتى تطهر. وتقص شعرها يوم العيد لتتحلل التحلل الأول وتلبس العادي، وتؤخر الطواف. وإذا كانت القافلة ستغادر ولا يمكنها الانتظار، تستشير العلماء في الحلول الطبية أو الرخص الاضطرارية.",
      "spiritualEssence": "[tawaf|طواف] الإفاضة هو تتويج لرحلة الحج الطويلة. يأتي فيه الحاج بملابسه العادية كضيف مكرم ليرتمي بين يدي ربه ويجدد عهد الإيمان والتوحيد طائفاً ب[kaaba|بيته العتيق]، ليعلن التحلل الأكبر والتام من [ihram|الإحرام].",
      "fiqhRules": "• [rukn|ركن] لا يجبر: طواف الإفاضة [rukn|ركن] من [rukn|أركان] الحج بالإجماع، لا يصح الحج بدونه ولا يجبر بدم.\n• لا [idtiba|اضطباع] ولا [raml|رمل]: لا يشرع [idtiba|الاضطباع] ولا [raml|الرمل] في طواف الإفاضة لأن المحرم يكون قد تحلل التحلل الأول ويلبس ثيابه العادية.\n• سعي الحج: يجب على المتمتع أداء سعي ثانٍ للحج بعد طواف الإفاضة. أما القارن والمفرد فلا سعي عليهما إن كانا قد سعيا مع طواف القدوم.\n• أحكام الحائض: لا يجوز للمرأة الحائض الطواف حتى تطهر. وتنتظر في مكة حتى تطهر لتطوف، وإذا كانت مرتبطة برحلة مغادرة حتمية ولا يمكنها التأخر فلها أحكام خاصة تراجع فيها أهل الفتوى.\n• التحلل الأكبر: بفراغ الحاج من طواف الإفاضة والسعي (إن كان عليه سعي) يكتمل التحلل الأكبر ويباح له كل شيء حتى النساء.",
      "survivalHacks": "• تأخير الطواف والسعي: يوم العيد يكون الحرم مزدحماً للغاية ومجهداً جداً. يفضل تأخير طواف الإفاضة وسعي الحج إلى [tashreeq|أيام التشريق] أو الليل حيث الأجواء الباردة والزحام الخفيف، وهو خيار مرخص وفيه تيسير كبير للحجاج الضعفاء."
    }
  },
  {
    "id": "step-15-rami-day1",
    "chapter": 4,
    "stepNumber": 15,
    "title": "رمي أول [tashreeq|أيام التشريق]",
    "location": "منى — جسر الجمرات — ١١ ذي الحجة",
    "description": "أول [tashreeq|أيام التشريق]. ترمى الجمرات الثلاث بالترتيب بعد الزوال (الظهر)، مع الدعاء الطويل بعد الصغرى والوسطى.",
    "image": "/images/step_15_rami_day1.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "البقاء في منى — المبيت [wajib|واجب] معظم الليل.",
        "التوجه إلى الجمرات بعد دخول وقت الظهر (الزوال).",
        "رمي الجمرة الصغرى بـ ٧ حصيات مع التكبير.",
        "الوقوف مستقبلاً القبلة والدعاء طويلاً بعد الصغرى.",
        "رمي الجمرة الوسطى بـ ٧ حصيات مع التكبير.",
        "الوقوف مستقبلاً القبلة والدعاء طويلاً بعد الوسطى.",
        "رمي الجمرة الكبرى (العقبة) بـ ٧ حصيات مع التكبير.",
        "المغادرة فوراً بعد الكبرى دون وقوف أو دعاء."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "قضاء [tashreeq|أيام التشريق] في منى ورمي الجمرات الثلاث يمثل الذكر المستمر والتحصين الدائم ضد الشيطان والشرور، وهي أيام أكل وشرب وذكر لله تعالى وتآخٍ بين المسلمين.",
      "fiqhRules": "• الترتيب [wajib|واجب]: يجب رمي الجمرات الثلاث بالترتيب الشرعي: الصغرى أولاً، ثم الوسطى، ثم الكبرى (العقبة).\n• عدد الحصى: يرمى كل حوض بـ ٧ حصيات متعاقبات مع التكبير مع كل حصاة.\n• [sunnah|سنة] الدعاء الطويل: يسن الوقوف مستقبلاً القبلة ورفع اليدين والدعاء طويلاً بعد الجمرة الصغرى والوسطى، بينما لا يقف الحاج بعد الجمرة الكبرى.\n• وقت الرمي: يبدأ الرمي بعد زوال الشمس (الظهر) عند جمهور الفقهاء.",
      "survivalHacks": "• تجنب وقت الزوال مباشرة: يشهد جسر الجمرات زحاماً شديداً وخطيراً فور الظهر مباشرة. يفضل تأخير الرمي إلى العصر أو بعد المغرب لتفادي ضربات الشمس والتمتع بتجربة مريحة وآمنة."
    }
  },
  {
    "id": "step-16-mina-night",
    "chapter": 4,
    "stepNumber": 16,
    "title": "المبيت في منى ليالي [tashreeq|التشريق]",
    "location": "منى — مدينة الخيام — ١١-١٢ ذي الحجة",
    "description": "المبيت في منى خلال ليالي [tashreeq|التشريق] [wajib|واجب] على الحجاج اقتداءً بالرسول ﷺ، وهو فرصة للتأمل والدعاء وقراءة القرآن.",
    "image": "/images/step_16_mina_night.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "العودة إلى خيمة منى بعد الرمي.",
        "قضاء معظم الليل داخل حدود منى ([wajib|واجب]).",
        "استغلال الوقت في الاستغفار والذكر وقراءة القرآن.",
        "أداء الصلوات مقصورة في وقتها دون جمع.",
        "تجهيز حصيات الرمي لليوم التالي."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "منى بمثابة تجريد حقيقي للمظاهر. النوم في الخيام البسيطة جنباً إلى جنب مع ملايين المؤمنين يعزز معاني الإخاء والمساواة والوحدة الإسلامية الشاملة.",
      "fiqhRules": "• وجوب المبيت: المبيت في منى ليلتي الحادي عشر والثاني عشر من ذي الحجة [wajib|واجب] عند جمهور العلماء. ويتحقق الوجوب ببقاء المحرم أكثر من نصف الليل في منى.\n• فدية عدم المبيت: ترك المبيت بغير عذر يوجب دماً (فدية) عند بعض الفقهاء، أو التصدق بمد من طعام عن كل ليلة.",
      "survivalHacks": "• تجنب النزول لمكة: يميل بعض الحجاج للذهاب لمكة للتسوق أو النوم في الفنادق. هذا يجهد الجسد ويخالف [wajib|واجب] المبيت، فاستغل هذه الليالي المباركة في خيمتك للعبادة والاستراحة."
    }
  },
  {
    "id": "step-17-rami-day2",
    "chapter": 4,
    "stepNumber": 17,
    "title": "رمي ثاني [tashreeq|أيام التشريق] والتعجل",
    "location": "منى — جسر الجمرات — ١٢-١٣ ذي الحجة",
    "description": "رمي الجمرات الثلاث بالترتيب بعد الظهر. ويمكن للمتعجل مغادرة منى قبل مغيب الشمس في يوم ١٢ ذي الحجة.",
    "image": "/images/step_17_rami_day2.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "الرمي بعد الظهر للجمرات الثلاث بالترتيب (الصغرى، الوسطى، الكبرى).",
        "الدعاء بعد الصغرى والوسطى.",
        "في حال التعجل (النفر الأول): مغادرة منى قبل غروب الشمس.",
        "في حال التأخر (النفر الثاني): المبيت ليلة ١٣ والرمي يوم ١٣ ثم المغادرة."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "سواء تعجلت أو تأخرت، فإن ديننا الحنيف مبني على التيسير والرحمة. والتأخر إلى اليوم الثالث عشر هو الأفضل والأقرب لسنة المصطفى ﷺ.",
      "fiqhRules": "• كيفية الرمي: ترمى الجمرات الثلاث بالترتيب بعد الزوال بـ ٧ حصيات لكل منها.\n• شرط التعجل: يجوز للحاج التعجل ومغادرة منى في يوم ١٢ ذي الحجة بشرط أن يحزم أمتعته ويخرج تماماً خارج حدود منى قبل غروب الشمس. فإن غربت عليه الشمس وهو بمنى لزمه المبيت ليلة ١٣ والرمي في اليوم التالي.\n• أفضلية التأخر: البقاء لليوم الثالث عشر (النفر الثاني) [sunnah|سنة] مؤكدة وفيها أجر عظيم وتجنب لزحام المتعجلين.",
      "survivalHacks": "• ترتيبات النفر: إذا أردت التعجل، رتب حقائبك وأمتعتك صباحاً واخرج فور انتهائك من الرمي لتجنب الوقوع في زحام مخارج منى قبل الغروب."
    }
  },
  {
    "id": "step-18-farewell",
    "chapter": 4,
    "stepNumber": 18,
    "title": "طواف الوداع",
    "location": "المسجد الحرام — مكة المكرمة",
    "description": "آخر أعمال الحج واللحظة الأكثر عاطفية. طواف الوداع ٧ أشواط حول الكعبة إيذاناً بالرحيل عن البلد الحرام.",
    "image": "/images/step_18_farewell.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "بعد مغادرة منى، التوجه مباشرة للمسجد الحرام بمكة.",
        "طواف الوداع ٧ أشواط حول الكعبة المشرفة.",
        "لا سعي بعد طواف الوداع.",
        "أداء الصلوات والدعاء بالقبول وتيسير السفر.",
        "مغادرة مكة المكرمة فوراً بعد الطواف دون إقامة أو تسوق.",
        "نسأل الله لكم حجاً مبروراً وسعياً مشكوراً وذنباً مغفوراً!"
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "الحائض معفاة تماماً من طواف الوداع. تغادر مكة مع رفقتها ولا فدية عليها ولا كفارة.",
      "spiritualEssence": "[tawaf|طواف] الوداع هو لحظة الفراق المؤثرة لبيت الله العتيق. يقف فيه الحاج طائفاً مستحضراً تغيره الروحي ونقاء قلبه، وداعياً الله ألا يكون هذا آخر عهده ب[kaaba|بيته الحرام].",
      "fiqhRules": "• وجوب طواف الوداع: طواف الوداع [wajib|واجب] على كل حاج خارج من مكة بغير عذر، وتركه يوجب فدية (دم).\n• إعفاء الحائض: تعفى المرأة الحائض والنفساء من طواف الوداع تماماً بمكرمة نبوية، وتغادر مكة دون فدية أو ذنب.\n• الخروج الفوري: يجب أن يكون طواف الوداع هو آخر العهد بمكة. فلا يجوز البقاء بعده للشراء أو السياحة أو النوم، ومن فعل ذلك لزمه إعادة الطواف.",
      "survivalHacks": "• شراء الهدايا مسبقاً: احرص على حزم أمتعتك وشراء كل الهدايا التذكارية مسبقاً قبل الذهاب لطواف الوداع، لتخرج من الحرم إلى سيارة السفر أو الحافلة مباشرة دون أي تأخير."
    }
  }
]
  },

  tr: {
    stages: [
  {
    "id": "step-01-preparation",
    "chapter": 1,
    "stepNumber": 1,
    "title": "Hazırlık ve [niyyah|Niyet]",
    "location": "Yola Çıkmadan Önce — Evde",
    "description": "Hac, uçağa binmeden çok önce başlar. Niyetinizi tazeleyin, kul haklarını ödeyin, kalbinizi ve bavulunuzu bu ömürlük yolculuğa hazırlayın.",
    "image": "/images/step_01_preparation.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Sadece Allah rızası için samimi bir [niyyah|niyet] yapın.",
        "Üzerinizdeki tüm borçları ödeyin ve helallik alın.",
        "Vasiyetinizi yazın (yola çıkmadan önce [sunnah|sünnettir]).",
        "Önemli belgelerinizi, ilaçlarınızı ve ihramınızı bavulunuza koyduğunuzdan emin olun.",
        "Temel hac fıkhını öğrenin ve yolculuk adımlarınızı planlayın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Hac, samimi bir tövbe ve arınmayla başlar. Niyetin tazelenmesi, tüm hac ibadetinin üzerine inşa edildiği temeldir ve bu yolculuğun her şeyden önce ruhani bir arınma olduğunu hatırlatır.",
      "fiqhRules": "• Halis [niyyah|Niyet]: Hac sadece Allah rızası için yapılmalı, gösteriş ve şöhret duygularından tamamen uzak durulmalıdır.\n• Vasiyet ve Borçlar: Yola çıkmadan önce borçların ödenmesi, ödenemiyorsa vekil tayin edilmesi ve vasiyetin yazılması müekked [sunnah|sünnettir].\n• Helalleşme: Haccın kabulünün önemli şartlarından biri de kul haklarından arınmak ve kırgın olunan kişilerle helalleşmektir.",
      "survivalHacks": "• El Bagajı: İhramınızı bavula vermek yerine yanınıza alacağınız el bagajına (kabin boy) koyun. Havalimanında bagaj kayıpları sıklıkla yaşanabilmektedir.\n• Ortopedik Ayakkabı: Yürüyüşler için rahat, ortopedik bir sandalet veya ayakkabı seçin. Hac sırasında ayakların yara olmaması için yeni ayakkabı giymekten kaçının."
    }
  },
  {
    "id": "step-02-ihram",
    "chapter": 1,
    "stepNumber": 2,
    "title": "İhrama Girme",
    "location": "[miqat|Mikat] — Kutsal Sınır",
    "description": "[miqat|Mikat] sınırında — hac ibadeti için belirlenen kutsal sınır noktasında — dünya süslerinden arınarak bedenen ve ruhen ihram haline girersiniz.",
    "image": "/images/step_02_ihram.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "İhrama girmeden önce boy abdesti alın, tırnakları kesin ve gerekli vücut temizliğini yapın ([sunnah|sünnet]).",
        "Erkekler için: İki parça beyaz ihram örtüsüne (izar ve rida) bürünün.",
        "İki rekat ihram namazı kılın (veya vaktin farz namazını kılın).",
        "Niyetinizi yapın: \"Lebbeyk Allahümme Umre\" (Temettü veya Kıran haccı niyetine göre).",
        "Erkekler yüksek sesle, kadınlar ise kısık sesle [talbiyah|Telbiye] getirmeye başlasın."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Özel günündeki kadınlar ihram için her şeyi yapar — boy abdesti alır, temizlenir, normal kıyafetlerini giyer ve niyet eder — ancak ihram namazını kılmazlar.",
      "spiritualEssence": "[ihram|İhram], mutlak eşitliğin ve dünya nimetlerinden sıyrılmanın sembolüdür. Herkesin aynı sade beyaz örtüye bürünmesi, makam ve servet farkı gözetmeksizin mahşer gününü ve Allah'ın huzurundaki dirilişi hatırlatır.",
      "fiqhRules": "• İhrama [niyyah|Niyet]: [ihram|İhram], sadece kıyafeti giymekten ibaret değildir; asıl olan ibadete başlama niyetidir.\n• [ihram|İhram] Yasakları: [niyyah|Niyet] edildikten sonra saç-sakal tıraşı olmak, tırnak kesmek, koku (parfüm, kokulu sabun) kullanmak, erkeklerin başını örtmesi ve dikişli elbise giymesi, cinsel yakınlık ve tartışmalar kesinlikle yasaktır.\n• Özel Durumdaki Kadınlar: Özel günlerinde olan kadınlar mikatta [ihram|ihrama] girerler ve [tawaf|tavaf] hariç diğer tüm hac ibadetlerini yerine getirebilirler.",
      "survivalHacks": "• Pişik Önleme: İhram kıyafetiyle yapılacak uzun yürüyüşlerde pişik oluşumunu engellemek için bacak aralarına vazelin veya pişik önleyici kremler sürün.\n• Yedek İhram: İhram örtünüzün kirlenmesi ihtimaline karşı yanınızda mutlaka yedek bir ihram seti bulundurun."
    }
  },
  {
    "id": "step-03-tawaf",
    "chapter": 1,
    "stepNumber": 3,
    "title": "Kudüm Tavafı (Tawaf × 7)",
    "location": "Mescid-i Haram — Kabe",
    "description": "Kabe-i Muazzama'yı ilk görüşünüz. Hacerü'l-Esved'den başlayıp yine orada biten, Kabe'nin etrafında saat yönünün tersine yedi kez dönerek dua ve yakarışlarla yapılan ibadet.",
    "image": "/images/step_03_tawaf.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Tavaf için abdestli olduğunuzdan emin olun.",
        "Erkekler: Sağ omzunuzu açıkta bırakın (Izdıba) — yalnızca bu ilk tavafa özeldir.",
        "Harem-i Şerif'e sağ ayağınızla ve giriş duasıyla girin.",
        "Hacerü'l-Esved hizasına (yeşil ışık çizgisine) gelin, tekbir getirin ve sağ elinizle istilam edin.",
        "Kabe solunuzda kalacak şekilde saat yönünün tersine 7 tur dönün.",
        "[rukn|Rükn]-i Yemani'ye ulaştığınızda elinizle selamlayın (öpmeyin veya işaretle selamlamayın).",
        "[rukn|Rükn]-i Yemani ile Hacerü'l-Esved arasında \"Rabbena atina...\" duasını okuyun.",
        "7 turun ardından sağ omzunuzu kapatın, [maqamIbrahim|Makam-ı İbrahim]'in arkasında iki rekat tavaf namazı kılın.",
        "Zemzem suyundan için ve Sa'y ibadetine geçmeden önce kısa bir süre dinlenin."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.",
          "transliteration": "Rabbana atina fid-dunya hasanaten wa fil-akhirati hasanatan wa qina 'adhab an-nar."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Özel günündeki kadın Kabe'yi tavaf edemez. Eğer Temettu haccı yapıyorsa ve hac günleri başlayana kadar temizlenmezse, niyetini Kıran haccına çevirir ve ilk Umre tavafını yapmadan doğrudan Mina'ya geçer.",
      "spiritualEssence": "[kaaba|Kabe] etrafında [tawaf|tavaf] etmek, tüm kainatın tek bir ilahi merkez etrafındaki dönüşünü ve teslimiyetini temsil eder. [tawaf|Tavafta] mümin, milyonlarca kardeşinin zikrine ortak olarak tevhid inancını yaşar.",
      "fiqhRules": "• Abdest Şartı: [tawaf|Tavafın] geçerli olması için abdestli olmak cumhur ulemaya göre şarttır. [tawaf|Tavaf] esnasında abdest bozulursa, tavaf kesilip abdest alınmalı ve kalındığı yerden devam edilmelidir.\n• Izdıba ve [raml|Remel]: Izdıba (erkeklerin sağ omzunu açması) ve [raml|Remel] (ilk 3 turda çalımlı ve hızlı yürümek) sadece arkasından sa'y yapılacak [tawaf|tavaflarda] [sunnah|sünnettir].\n• [tawaf|Tavaf] Namazı: [tawaf|Tavaftan] sonra [masjidAlHaram|Mescid-i Haram'da] [maqamIbrahim|Makam-ı İbrahim]'in arkasında kılınan iki rekat namaz [sunnah|sünnettir].",
      "survivalHacks": "• Üst Katlarda Tavaf: Tavafı üst katlarda veya çatıda yapmak mesafe olarak uzun olsa da çok daha sakin, serin ve yaşlılar/hastalar için güvenlidir.\n• Abdesti Korumak: Tavaf öncesinde aşırı miktarda su içmekten kaçının, böylece kalabalık tuvaletlere gitmek zorunda kalıp tavafınızı bölmezsiniz."
    }
  },
  {
    "id": "step-04-safa-marwa",
    "chapter": 1,
    "stepNumber": 4,
    "title": "Safa ve Merve Arasında Sa'y",
    "location": "Mescid-i Haram — Mes'a Alanı",
    "description": "Hz. Hacer validemizin oğlu Hz. İsmail için su arayışını temsil eden, Safa ile Merve tepeleri arasında yedi kez gidip gelerek yapılan ibadet.",
    "image": "/images/step_04_safa_marwa.png",
    "coordinates": "21.3754,39.8227",
    "details": {
      "steps": [
        "Safa tepesine yönelin ve ibadete buradan başlayın.",
        "Safa'ya yaklaşırken: \"İnnes-Safaa vel-Mervete min şeairillah...\" ayetini okuyun.",
        "Safa tepesine çıkın, Kabe'ye yönelin, ellerinizi açıp 3 kez [sunnah|sünnet] olan duaları yapın.",
        "Merve'ye doğru yürüyün. Erkekler iki yeşil ışık arasında hızlı/çalımlı adımlarla (Hervele) koşsun.",
        "Merve tepesinde Kabe'ye yönelin ve aynı duaları tekrarlayın.",
        "Safa'den Merve'ye 4 gidiş ve Merve'den Safa'ya 3 geliş olmak üzere toplam 7 şavtı tamamlayıp Merve'de bitirin."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ، أَنجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الأَحْزَابَ وَحْدَهُ",
          "translation": "Allah'tan başka ilah yoktur, O tektir, ortağı yoktur; mülk O'nundur, hamd O'na mahsustur, O her şeye kadirdir. Allah'tan başka ilah yoktur, O tektir; vaadini gerçekleştirdi, kuluna yardım etti ve müttefikleri tek başına bozguna uğrattı.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lah..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Sa'y için abdest şart değildir, ancak Sa'y tavaftan sonra yapılmak zorunda olduğu için temizlenip tavaf yapana kadar Sa'y ertelenmelidir. (Kıran'a çevirdiyse doğrudan Mina'ya gidilir).",
      "spiritualEssence": "[sai|Sa'y], insanoğlunun çabasını ve Allah'a olan tam tevekkülünü simgeler. Tıpkı Hacer validemiz gibi biz de hayat boyu çabalarız ([sai|sa'y ederiz]) ve biliriz ki ferahlık ve ilahi ikram ([zamzam|zemzem]) Allah'ın takdir ettiği vakitte gelecektir.",
      "fiqhRules": "• Sa'yda Abdest: Sa'y yaparken abdestli olmak [sunnah|sünnettir], şart değildir. Bu nedenle özel günündeki kadınlar da sa'y yapabilirler.\n• Hervele Yürüyüşü: Yeşil direkler arasında hızlı adımlarla koşmak (hervele) sadece erkekler için [sunnah|sünnettir], kadınlar normal adımlarla yürürler.\n• Şavt Sayısı: Safa ile Merve arasındaki her bir tek yönlü geçiş bir şavt sayılır. Git-gel iki şavttır, toplam 14 değil 7 şavt yapılmalıdır.",
      "survivalHacks": "• Klimalı Üst Katlar: Mes'a alanının klimalı üst katlarını tercih etmek fiziksel enerjinizi korumanıza yardımcı olur.\n• Merve Çıkışı: Yedinci şavt Merve'de biter. Burada çıkış kapıları ve berber dükkanları yakındır.",
      "interestingFact": {
        "title": "Yeşil Işıklar ve Hervele Alanı",
        "fact": "Safa ile Merve arasındaki vadide, yeşil ışıklarla aydınlatılmış bir alan bulunur. Burası, Hz. Hacer'in çocuğunu vadinin dibinde göremeyip telaşla koştuğu tarihi alandır. Erkek hacıların bu alandan geçerken hafif koşarak (hervele yaparak) geçmesi [sunnah|sünnettir]."
      }
    }
  },
  {
    "id": "step-05-hair-clip",
    "hajjTypeFilter": ["tamattu"],
    "chapter": 1,
    "stepNumber": 5,
    "title": "Tıraş Olma ve İhramdan Çıkış",
    "location": "Mekke — Berberler",
    "description": "Saçınızı tıraş ederek veya kısaltarak umre ibadetini tamamlar, ihram yasaklarından çıkar ve 8 Zilhicce'de başlayacak olan hac günlerini beklersiniz.",
    "image": "/images/step_05_hair_clip.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Erkekler: Saçlarını tamamen sıfıra vursun (en faziletlisidir) veya eşit şekilde kısaltsın.",
        "Kadınlar: Saçlarının uçlarından bir parmak boğumu kadar (yaklaşık 2 cm) kessin.",
        "Bu ibadetle birlikte umre ihramından tamamen çıkılmış olur.",
        "Boy abdesti alın, normal elbiselerinizi giyin, koku sürünün ve dinlenme döneminin tadını çıkarın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Saç kesimi, tevazuun, egodan sıyrılmanın ve ruhi yenilenmenin göstergesidir. Kul, ibadetini tamamladıktan sonra süsünün bir kısmını Allah rızası için feda ederek kulluğunu sunar.",
      "fiqhRules": "• Tıraş Seçeneği: Erkekler için saçın tamamen kazıtılması (Halk), kısaltılmasına (Takser) göre çok daha faziletlidir. Peygamberimiz (s.a.v.) saçını kazıtanlara üç kez, kısaltanlara ise bir kez dua etmiştir.\n• Kadınların Tıraşı: Kadınlar saçlarını kazıtmazlar, sadece saç uçlarından bir parmak boğumu kadar (yaklaşık 2-3 cm) kısaltmaları yeterlidir.\n• Tam Helallik: Saç tıraşı ile birlikte ihram yasakları tamamen kalkar. İhram örtüleri çıkarılır, dikişli elbiseler giyilir ve koku kullanılabilir.",
      "survivalHacks": "• Kişisel Hijyen: Bulaşıcı hastalık risklerini en aza indirmek için berberlerde mutlaka tek kullanımlık sıfır jilet kullanılmasını isteyin.\n• Ruhsatlı Berberler: Kabe çevresindeki resmi ve hijyenik berber salonlarını tercih edin."
    }
  },
  {
    "id": "step-06-rest",
    "hajjTypeFilter": ["tamattu"],
    "chapter": 1,
    "stepNumber": 6,
    "title": "Mekke'de İbadet ve Dinlenme",
    "location": "Mekke — Mescid-i Haram",
    "description": "Umre bitişi ile hac başlangıcı arasındaki dinlenme dönemi. Hacılar bu günlerde bedenlerini dinlendirir, Kabe'de namaz kılar ve ibadetle vakit geçirirler.",
    "image": "/images/step_06_rest.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Fiziksel gücünüzü geri kazanmak için otelde dinlenin.",
        "Beş vakit namazı cemaatle Mescid-i Haram'da kılmaya özen gösterin.",
        "Kabe etrafında bol bol nafile tavaf yapın.",
        "Haccın en önemli günü olan Arafat günü için dua listenizi hazırlayın.",
        "İlmi sohbetlere katılın, hac dualarını ezberleyin.",
        "8 Zilhicce sabahı hac için yeniden ihrama girmeye hazırlanın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Bu dönem, hac öncesinde ruhu ibadete ve zikre alıştırmak için harika bir fırsattır. Mescid-i Haram'da kılınan bir namaz, diğer mescitlerde kılınan yüz bin namaza bedeldir ve kalbe derin bir huzur verir.",
      "fiqhRules": "• Katmerli Sevap: Mescid-i Haram'da yapılan ibadetlerin sevabı yüz bin kat daha fazladır. Bu sevap hem farz hem nafile namazları kapsar.\n• Dua Hazırlığı: Arafat vakfesinde okunacak duaların önceden yazılması ve planlanması [sunnah|sünnettir], böylece o kıymetli anlarda hiçbir yakınınızı unutmazsınız.",
      "survivalHacks": "• Fiziksel Gücü Korumak: Alışveriş veya gereksiz gezilerle kendinizi yormayın. Önünüzdeki hac günlerinde kilometrelerce yürümek durumunda kalacaksınız. Enerjinizi koruyun.\n• Sakin Saatler: Nafile tavaflar için Harem'in sakin olduğu kuşluk veya gece yarısı gibi saatleri tercih edin."
    }
  },
  {
    "id": "step-07-ihram-hajj",
    "chapter": 2,
    "stepNumber": 7,
    "title": "Hac İçin İhrama Girme",
    "location": "Mekke — [tarwiyah|Terviye Günü]",
    "description": "8 Zilhicce ([tarwiyah|Terviye]) sabahı, hacılar kaldıkları otellerde hac niyetiyle yeniden ihrama girerler ve kutsal hac yolculuğu resmen başlar.",
    "image": "/images/step_07_ihram_hajj.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Boy abdesti alın, temizlenin ve ihrama girmeden önce bedene güzel kokular sürün ([sunnah|sünnet]).",
        "Erkekler: Beyaz ihram örtülerini yeniden giysin.",
        "Hac niyetini yapın: \"Lebbeyk Allahümme Haccen\".",
        "[talbiyah|Telbiye] getirmeye sürekli devam edin.",
        "[tarwiyah|Terviye günü] sabahı Mina'ya doğru yola çıkın."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ حَجًّا",
          "translation": "Lebbeyk Allahümme Haccen (Hac için buyur Allah'ım).",
          "transliteration": "Labbayk Allahumma Hajjan."
        }
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Hac ihramı, kulun Allah'a olan ahdini yenilemesi ve kutsal mekandaki nihai duruşa hazırlanmasıdır. Lebbeyk sadalarıyla kalpler teslimiyetle çarpar.",
      "fiqhRules": "• Hac Mikatı: Hacı adayları hac için Mekke'de kaldıkları otellerde ihrama girerler, Ten'im veya Hudeybiye'ye gitmelerine gerek yoktur.\n• [niyyah|Niyet] Sözü: Hacı adayı ihrama girerken \"Lebbeyk Allahümme Haccen\" der.\n• Telbiyeye Devam: Bayram sabahı Akabe Cemresi'ne ilk taşı atana kadar her fırsatta yüksek sesle [talbiyah|telbiye] getirilmesi [sunnah|sünnettir].",
      "survivalHacks": "• Otelde İhrama Giriş: Otobüslere binmeden önce otel odanızda rahat bir şekilde ihramınızı giyip hazırlanın.\n• İhram Yasakları Başlangıcı: Niyetle birlikte dikişli giyinme, koku ve tırnak kesme yasaklarının yeniden başladığını unutmayın."
    }
  },
  {
    "id": "step-08-mina",
    "chapter": 2,
    "stepNumber": 8,
    "title": "Mina'ya Ulaşım ([tarwiyah|Terviye Günü])",
    "location": "Mina — Çadır Kenti",
    "description": "Hacılar [tarwiyah|Terviye] gününü ve Arafat gecesini Mina'daki beyaz çadırlarda geçirirler. Beş vakit namazı birleştirmeden, kısaltarak kılarlar ve ruhen Arafat'a hazırlanırlar.",
    "image": "/images/step_08_mina.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "8 Zilhicce sabahı otobüslerle veya yürüyerek Mina'ya ulaşın.",
        "Öğle, İkindi, Akşam, Yatsı ve ertesi günün Sabah namazını Mina'da kılın.",
        "Dört rekatlı namazları birleştirmeden (cem etmeden), kendi vaktinde ikişer rekat olarak kılın.",
        "Grubunuzun yerini ve çadır numaranızı telefonunuza kaydedin.",
        "Vaktinizi istiğfar, zikir ve dualarla değerlendirin."
      ],
      "checklists": [
        "Mina'ya ulaşım planını onaylayın",
        "Çadır numaranızı ve kamp kodunuzu kaydedin",
        "Sırt çantanızda seccade, şarj aleti ve ilaçları bulundurun",
        "Akıllı Hac kimlik kartınızı yanınıza aldığınızdan emin olun",
        "Midenizi bozacak yağlı yiyeceklerden uzak durun"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Mina çadırları, sadelik ve tefekkür durağıdır. Dünyanın dört bir yanından gelen milyonlarca müminle aynı çadırlarda kalmak, tevazuu ve İslam kardeşliğini en derinden hissettirir.",
      "fiqhRules": "• Mina'da Geceleme: [tarwiyah|Terviye günü] Mina'da kalmak ve geceyi burada geçirip 5 vakit namazı kılmak [sunnah|sünnettir].\n• Cem Etmeden Kasr: Dört rekatlı namazlar Mina'da kısaltılarak (kasr) kılınır, ancak birleştirilmez (cem edilmez). Her namaz kendi vaktinde kılınır.",
      "survivalHacks": "• Konum Paylaşımı ve Çadır No: Mina çok büyük ve çadırlar birbirinin aynısıdır. Gelir gelmez çadırınızın numarasını yazın, fotoğrafını çekin ve haritadan konumunuzu kaydedin.\n• Hafif Sırt Çantası: Arafat ve Müzdelife için yanınıza sadece temel ihtiyaçlarınızı alacağınız küçük bir sırt çantası alın, büyük bavullarınızı Mekke'deki otelde bırakın.",
      "interestingFact": {
        "title": "Dünyanın En Büyük Çadır Kenti",
        "fact": "Mina, yılın 360 günü tamamen boş olan ancak hac günlerinde bir günde 2 milyondan fazla insanı ağırlayan dünyanın en büyük geçici çadır kentidir. Buradaki çadırlar klimalı, yanmaz teflon malzemeden üretilmiştir."
      }
    }
  },
  {
    "id": "step-09-arafat",
    "chapter": 2,
    "stepNumber": 9,
    "title": "Arafat Günü ve Vakfe",
    "location": "Arafat Ovaları — 9 Zilhicce",
    "description": "Haccın en büyük [rukn|rüknü]. Hacılar zeval vaktinden gün batımına kadar Arafat meydanında ayakta veya oturarak samimiyetle dua ve istiğfar ederler. Arafat'ta bulunmayanın haccı geçerli değildir.",
    "image": "/images/step_09_arafat.png",
    "coordinates": "21.3547,39.9839",
    "details": {
      "steps": [
        "9 Zilhicce sabahı güneş doğduktan sonra Arafat'a hareket edin.",
        "Öğle ve İkindi namazlarını öğle vaktinde birleştirerek ve kısaltarak (Cem-i Takdim) kılın.",
        "Öğle vaktinden akşam güneş batana kadar olan süreyi tamamen dua ve zikirle geçirin.",
        "Mümkün mertebe kıbleye yönelerek ellerinizi açıp samimiyetle yalvarın.",
        "Güneş tamamen batmadan Arafat sınırlarından çıkmayın."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "translation": "Allah'tan başka ilah yoktur, O tektir, ortağı yoktur; mülk O'nundur, hamd O'na mahsustur, O her şeye kadirdir.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, wa huwa 'ala kulli shay'in qadir."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Arafat vakfesi özel gününde olan kadınlar için tamamen geçerlidir. Dua edebilir, zikir yapabilir ve Kur'an okuyabilirler; vakfe için abdest şart değildir.",
      "spiritualEssence": "[wuquf|Vakfe], rahmet, mağfiret ve cehennemden kurtuluş günüdür. Allah'ın kullarıyla meleklerine iftihar ettiği, duaların geri çevrilmediği en kutsal andır. Mahşer provasıdır.",
      "fiqhRules": "• En Büyük [rukn|Rükn] (Vakfe): Arafat vakfesi haccın en önemli [rukn|rüknüdür]. Vakfeyi yapmayanın haccı batıldır. 'Hac Arafat'tır' (Hadis).\n• Vakfe Vakti: Zeval vaktinden bayram sabahı fecr-i sadığa kadar olan süredir.\n• Namazların Cem'i: Arafat'ta öğle ve ikindi namazları tek ezan ve iki ikametle öğle vaktinde cem edilerek kılınır.\n• Özel Durumdaki Kadınlar: Temizlik şartı aranmadığı için kadınlar özel günlerinde dahi Arafat vakfesini yapabilirler.",
      "survivalHacks": "• Sarı Sınır Levhaları: Arafat sınırlarını belirleyen büyük sarı tabelalara çok dikkat edin. Sınır dışında beklemek vakfeyi geçersiz kılar.\n• Kişisel Dualar: Toplu yüksek sesli dualar yerine içinizden gelen samimi ve gözyaşlarıyla dolu bireysel dualara odaklanın, zamanı sohbetle harcamayın.",
      "interestingFact": {
        "title": "Arafat Sınır Tabelaları",
        "fact": "Arafat bölgesi, sınırlarının net anlaşılması için çevresine yerleştirilmiş devasa sarı tabelalarla çevrilidir. Haccınızın geçerli olması için çadırınızın ve durduğunuz yerin bu tabelaların içinde kaldığından emin olmalısınız."
      }
    }
  },
  {
    "id": "step-10-muzdalifah",
    "chapter": 2,
    "stepNumber": 10,
    "title": "Müzdelife'de Geceleme",
    "location": "Müzdelife Ovaları — 9 Zilhicce Gecesi",
    "description": "Arafat'tan sonra hacılar akşam namazını kılmadan Müzdelife'ye hareket ederler. Geceyi gökyüzü altında geçirir, namazlarını kılar ve şeytan taşlama için taş toplarlar.",
    "image": "/images/step_10_muzdalifah.png",
    "coordinates": "21.3894,39.9392",
    "details": {
      "steps": [
        "Güneş battıktan sonra Arafat'tan Müzdelife'ye intikal edin.",
        "Müzdelife'ye ulaşır ulaşmaz Akşam (3 rekat) and Yatsı (2 rekat) namazlarını cem ederek (Cem-i Tehir) kılın.",
        "Geceyi açık havada yerde uyuyarak geçirin — dinlenmek bu gece [sunnah|sünnettir].",
        "Şeytan taşlama için nohut büyüklüğünde 49 ila 70 adet küçük taş toplayın.",
        "Sabah namazını ilk vaktinde kılıp vakfe duasını yaptıktan sonra Mina'ya hareket edin."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Müzdelife'de gecelemek ve şeytan taşlama için taş toplamak özel günündeki kadınlar için tamamen geçerlidir. Abdest şart değildir.",
      "spiritualEssence": "[muzdalifah|Müzdelife'de] açık havada, hiçbir lüks olmaksızın toprak üzerinde uyumak, mutlak eşitliği ve Allah'a olan muhtaçlığımızı simgeler. Zengin-fakir herkes yan yana uyur.",
      "fiqhRules": "• Cem-i Tehir: Akşam namazı Arafat'ta kılınmaz, yatsı ile birleştirilerek Müzdelife'de kılınır.\n• Müzdelife Vakfesi: Geceyi Müzdelife sınırlarında geçirmek [wajib|vaciptir].\n• Zayıflara Ruhsat: Kadınlar, yaşlılar ve hastalar izdihama kalmamak için gece yarısından sonra Müzdelife'den ayrılıp Mina'ya gidebilirler.\n• Taş Toplama: Taşları buradan veya Mina'dan toplayabilirsiniz. İlk gün için 7 taş, sonraki günler için ise 21'er taş toplamanız gerekir.",
      "survivalHacks": "• İnce Mat veya Yoga Matı: Taşlık zeminde rahat uyumak için yanınızda hafif bir yoga matı veya şişme minder bulundurun.\n• Yolda Namaz Kılmayın: Trafik ne kadar sıkışık olursa olsun sünnete uyun ve namazınızı yolda değil, mutlaka Müzdelife alanına ulaştığınızda kılın.",
      "interestingFact": {
        "title": "Zayıflar İçin Gece Yarısı İzni",
        "fact": "Peygamber Efendimiz (s.a.v.), eşi Ümmü Seleme ve diğer zayıf/yaşlı kimselere, bayram sabahı oluşacak büyük izdihamdan etkilenmemeleri için gece yarısından sonra Müzdelife'den ayrılma izni vermiştir."
      }
    }
  },
  {
    "id": "step-11-rami-aqaba",
    "chapter": 3,
    "stepNumber": 11,
    "title": "Rami — Büyük Şeytan Taşlama",
    "location": "Mina — Cemarat Köprüsü",
    "description": "Bayramın birinci günü yapılan ilk ibadet: Hz. İbrahim'in şeytanı taşlamasını canlandırarak en büyük sütuna (Cemre-i Akabe) 7 taş atmak.",
    "image": "/images/step_11_rami_aqaba.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Müzdelife'den bayram sabahı (veya gece yarısından sonra izinli gruplar için) Mina'ya geçin.",
        "Cemarat Köprüsü'ne gidin ve SADECE en büyük sütunu (Cemre-i Akabe) taşlayın.",
        "Her taş atışında \"Allahu Ekber\" diyerek sırayla 7 taş atın.",
        "İlk taşla birlikte [talbiyah|Telbiye] getirmeyi bırakın — artık tekbir getirme vaktidir.",
        "Taşlama bayram sabahı güneş doğduktan sonra yapılır, öğleden önce olması efdaldir."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Büyük Şeytan taşlama özel gününde tamamen geçerlidir. Kadınlar için gece yarısından sonra Müzdelife'den ayrılıp erkenden taşlama yapma ruhsatı vardır; aşırı kalabalıkta vekalet verebilirler.",
      "spiritualEssence": "Bayram günü Cemre-i Akabe'yi (Büyük Şeytan) taşlamak — [rami|Remi] — Hz. İbrahim'in (as) kurban emrini yerine getirmeye giderken kendisini vazgeçirmeye çalışan şeytanı taşlamasını canlandırır. Nefsin kötü arzularını, vesveseleri ve kötülükleri aktif olarak reddetmeyi simgeler.",
      "fiqhRules": "• Bayram Günü Taşlaması: Zilhicce'nin 10'unda (Bayramın 1. günü) SADECE büyük sütun taşlanır. Küçük ve orta sütunlar bu gün taşlanmaz.\n• Taşlama Şekli: Taşlar tek tek, el yukarı kaldırılarak ve \"Allahu Ekber\" denilerek atılır. Taşın sütunun etrafındaki havuzun içine düşmesi şarttır.\n• [talbiyah|Telbiye] Sonu: İlk taşı atarken [talbiyah|Telbiye] kesilir ve [tashreeq|teşrik] tekbirlerine başlanır.\n• Zamanı: Taşlama bayram günü güneş doğduktan sonra başlar. Ertesi günün fecr vaktine kadar geçerlidir.\n• İlk Tahallül: Akabe cemresini taşlamak ve saç tıraşı olmakla ihramdan ilk çıkış (tahallül-i evvel) gerçekleşir. Cinsel ilişki dışındaki tüm ihram yasakları kalkar.\n• Kadınların Durumu: Adetli kadınlar taşlamayı normal şekilde yaparlar. Ardından saçlarını kısaltarak ihramdan çıkarlar. Tavaf-ı İfade'yi ise temizlenene kadar ertelerler.",
      "survivalHacks": "• Yan Açıdan Yaklaşım: Havuzun tam ön tarafındaki yoğunluğa girmek yerine, yan veya arka taraflardan yaklaşarak taş atın. Bu, izdihamı önler ve güvenliğinizi sağlar.\n• Bayram Sabahı Yoğunluğu: Bayram namazından hemen sonra (sabah saatlerinde) Cemarat aşırı yoğundur. Taşlamayı ikindi veya akşam saatlerine ertelemek çok daha sakin ve güvenlidir.",
      "interestingFact": {
        "title": "Cemarat'ın Değişen Mimarisi",
        "fact": "Geçmişte Cemarat dar taş sütunlardan ibaretti ve milyonlarca insanın küçük bir hedefe odaklanması izdihamlara yol açıyordu. Suudi mühendisler sütunları çok katlı, geniş duvar yapılarına ve eliptik havuzlara dönüştürerek hedef alanını genişletti ve akışı kusursuz hale getirdi."
      }
    }
  },
  {
    "id": "step-12-qurbani",
    "chapter": 3,
    "stepNumber": 12,
    "title": "Kurban — Hayvan Kesimi",
    "location": "Mina — Mezbahalar",
    "description": "Bayram günü Allah'ın şiarını yüceltmek ve Hz. İbrahim'in teslimiyetini anmak için kurban (Hedy) kesmek. Kıran ve Temettu hacıları için [wajib|vaciptir].",
    "image": "/images/step_12_qurbani.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Kurban kesimi yetkili kurumlar tarafından kurban kuponunuz kullanılarak gerçekleştirilir.",
        "Kuponunuzun resmi kurumlardan alındığını teyit edin.",
        "Kurban kesiminde fiziksel olarak bulunmanız gerekmez.",
        "Kesim gerçekleştikten sonra tıraş olup ihramdan çıkabilirsiniz."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "[nahr|Kurban] ibadeti, Hz. İbrahim'in biricik oğlu İsmail'i Allah'ın emrine teslimiyetle kurban etmeye rıza göstermesini ve Allah'ın merhametiyle kurbanlık göndermesini simgeler. Dünyevi bağları feda etmeyi ve fakirleri sevindirmeyi öğretir.",
      "fiqhRules": "• [wajib|Vacip] Hükmü: Temettu ve Kıran haccı yapanlar için kurban kesmek [wajib|vaciptir]. İfrad haccı yapanlar için ise [sunnah|sünnettir].\n• Merkezi Sistem: Modern hacda kesimler akredite kuruluşlar (örneğin İslam Kalkınma Bankası'nın Adahi projesi) üzerinden kuponla yapılır. Bu, sağlık ve hijyen kurallarına en uygun yöntemdir.\n• Zamanı: Kurban, bayramın ilk üç gününde (Zilhicce 10, 11 ve 12) kesilebilir.",
      "survivalHacks": "• Kurumlara Güvenin: Mezbahalara bizzat gitmeyin. Dijital kupon sistemi son derece güvenlidir ve fıkhen onaylanmıştır. Kurbanınız kesildiğinde size SMS veya bildirim gelecektir."
    }
  },
  {
    "id": "step-13-shave",
    "chapter": 3,
    "stepNumber": 13,
    "title": "Tıraş Olma veya Saç Kısaltma",
    "location": "Mina Çadır Kenti",
    "description": "Erkeklerin saçlarını tamamen kazıtması veya kısaltması, kadınların ise saç uçlarından bir parmak boğumu kadar kesmesi. Bu ibadetle ihramdan çıkılır.",
    "image": "/images/step_13_shave.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Erkekler: Saçın tamamını kazıtın (Halk — efdal olan) veya eşit şekilde kısaltın (Taksir).",
        "Kadınlar: Saç uçlarından yaklaşık bir parmak boğumu kadar (2 cm) kesin.",
        "Taşlama ile birlikte bu ibadet ihramdan çıkışı sağlar.",
        "İhramdan çıktıktan sonra normal elbiselerinizi giyebilir ve koku sürünebilirsiniz."
      ],
      "checklists": [
        "Erkekler: Mina berberlerinden birini bulun veya kendi makinenizle tıraş olun",
        "Kadınlar: Saç uçlarını bir parmak kesin",
        "İhram örtülerini çıkarıp normal elbiselerinizi giyin",
        "Güzel kokular sürünün (artık serbest)"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "[halq|Saçların tıraş edilmesi veya kısaltılması], manevi bir dirilişi, nefsi sıfırlamayı ve kibri yok etmeyi simgeler. Kul, bedeninden bir parçayı Allah'a feda ederek haccından anasından doğduğu günkü gibi günahsız çıkmayı ümit eder.",
      "fiqhRules": "• Erkeklerin Tıraşı: Saçı tamamen kazıtmak (Halk) kısaltmaktan (Taksir) çok daha faziletlidir. Peygamberimiz ﷺ saçını kazıtanlara üç kez, kısaltanlara ise bir kez dua etmiştir.\n• Kadınların Tıraşı: Kadınların saçlarını kazıtması haramdır, sadece saç uçlarından bir parmak boğumu kadar keserler.\n• İlk Tahallül (İhramdan Çıkış): Bayramın üç ibadetinden (Taşlama, Kurban, Tıraş) ikisini yapan kişi ihramdan çıkar. Buna ilk tahallül denir. Eşiyle yakınlaşma dışındaki tüm yasaklar kalkar.",
      "survivalHacks": "• Kişisel Makine: Erkeklerin yanlarında pilli/şarjlı saç tıraş makinesi getirmesi ve çadırda arkadaşlarına tıraş olması berber sıralarından kurtarır ve hijyeniktir."
    }
  },
  {
    "id": "step-14-tawaf-ifadah",
    "chapter": 3,
    "stepNumber": 14,
    "title": "Tavaf-ı İfade (Ziyaret Tavafı)",
    "location": "Mescid-i Harâm — Kâbe",
    "description": "Haccın farz olan ana tavafı. Bu tavaf olmadan hac geçerli olmaz. Tıraş olup normal kıyafetlerle Harem'e gidilerek yapılır.",
    "image": "/images/step_14_tawaf_ifadah.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Mina'dan Mekke'deki Mescid-i Harâm'a geçin.",
        "Abdest tazeleyin.",
        "Kâbe etrafında saat yönünün tersine 7 şavt dönün.",
        "Bu tavafta omuzu açmak (ıztıba) yoktur.",
        "Bu tavafta ilk 3 şavtta hızlı yürümek ([raml|remel]) yoktur.",
        "Tavaftan sonra [maqamIbrahim|Makam-ı İbrahim] arkasında 2 rekat namaz kılın ve Zemzem için.",
        "Temettu hacıları: Hac sa'yini de yapın.",
        "Geceyi geçirmek için Mina'ya geri dönün."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْآ حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Rabbimiz, bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.",
          "transliteration": "Rabbena atina fid-dunya hasanaten..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Haccın en önemli rüknü olan Ziyaret Tavafı (Tavaf-ı İfade) temizlenene kadar ertelenmelidir. Bayram günü saçını keserek ilk tahallüle (ihramdan kısmen çıkış) ulaşır ve normal elbiselerini giyer, ancak tavafı erteler. Eğer tur grubu kesin olarak ayrılıyorsa ve bekleyemiyorsa, tıbbi çözümler veya acil durum ruhsatları için alimlere danışır.",
      "spiritualEssence": "[tawaf|Tavaf-ı] İfade, haccın en önemli zirvesidir. Artık normal kıyafetleriyle [kaaba|Allah'ın evine] dönen kul, Rabbi ile olan ahdini tazeler ve haccın son farzını yerine getirerek tam bir arınmışlık yaşar. Tüm [ihram|ihram] kısıtlamaları sona erer.",
      "fiqhRules": "• Haccın [rukn|Rüknüdür]: Ziyaret tavafı haccın [rukn|rüknüdür], yapılmadığı takdirde hac tamamlanmış olmaz ve kurban cezası ile telafi edilemez.\n• [idtiba|Iztıba] ve [raml|Remel] Yoktur: Normal kıyafetlerle yapıldığı için ıztıba ve [raml|remel] sünnetleri bu tavafta uygulanmaz.\n• Hac Sa'yi: Temettu haccı yapanların bu tavaftan sonra Hac sa'yini yapması farzdır. Kıran ve İfrad yapanlar ise kudüm tavafında sa'y yapmamışlarsa şimdi yaparlar.\n• Adetli Kadınların Hükmü: Kadınlar temizlenene kadar bu tavafı ertelerler. Mekke'den ayrılmadan önce temizlenip tavafı yapmaları gerekir.\n• Büyük Tahallül: Ziyaret tavafı ve sa'yin yapılmasıyla büyük tahallül gerçekleşir ve eşler arasındaki yakınlık yasağı da dahil tüm yasaklar kalkar.",
      "survivalHacks": "• Tavafı Ertelemek: Bayram günü Harem aşırı kalabalık ve sıcaktır. Tavafı bayramın 2. veya 3. günü gece saatlerine ertelemek çok daha serin ve rahat bir tavaf yapmanızı sağlar."
    }
  },
  {
    "id": "step-15-rami-day1",
    "chapter": 4,
    "stepNumber": 15,
    "title": "[tashreeq|Teşrik Günleri] — 1. Gün Taşlama",
    "location": "Mina — Cemarat Köprüsü — Zilhicce 11",
    "description": "[tashreeq|Teşrik] günlerinin birincisi. Öğleden (Zevalden) sonra sırasıyla üç sütun taşlanır, küçük ve orta sütunlardan sonra kıbleye dönüp uzun dua edilir.",
    "image": "/images/step_15_rami_day1.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Mina'da kalın — gecenin en az yarısını Mina'da geçirmek [wajib|vaciptir].",
        "Öğle ezanından (Zeval) sonra Cemarat Köprüsü'ne gidin.",
        "Küçük Şeytan'ı (Cemre-i Suğra) 7 taşla taşlayın.",
        "Küçük Şeytan'dan sonra kıbleye yönelerek ellerinizi kaldırıp uzun dua edin.",
        "Orta Şeytan'ı (Cemre-i Vusta) 7 taşla taşlayın.",
        "Orta Şeytan'dan sonra kıbleye yönelerek ellerinizi kaldırıp uzun dua edin.",
        "Büyük Şeytan'ı (Cemre-i Akabe) 7 taşla taşlayın.",
        "Büyük Şeytan'dan sonra durmayın, dua etmeden hemen ayrılın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "[tashreeq|Teşrik] günlerinde Mina'da kalıp üç şeytanı taşlamak, Allah'ı sürekli zikretmeyi ve şeytana karşı sürekli uyanık olmayı simgeler. Haccın bitiminde manevi bir coşku ve kardeşlik dönemidir.",
      "fiqhRules": "• Sırayla Taşlama Şarttır: Taşlama kesinlikle sırayla yapılmalıdır: Önce Küçük, sonra Orta ve en son Büyük şeytan taşlanır.\n• Taş Adedi: Her birine sırayla 7 taş atılır ve her atışta \"Allahu Ekber\" denir.\n• Uzun Dua [sunnah|Sünneti]: Küçük ve orta şeytandan sonra kenara çekilip kıbleye yönelerek uzun dua etmek [sunnah|sünnettir]. Büyük şeytandan sonra dua edilmez.\n• Zamanı: [tashreeq|Teşrik] günlerinde taşlama zamanı öğle vaktinin (Zeval) girmesiyle başlar.",
      "survivalHacks": "• Zeval Vaktinden Kaçının: Öğle ezanından hemen sonra köprüde aşırı yoğunluk oluşur. Taşlamayı ikindi veya akşam saatlerine erteleyerek serin ve güvenli bir şekilde yapabilirsiniz."
    }
  },
  {
    "id": "step-16-mina-night",
    "chapter": 4,
    "stepNumber": 16,
    "title": "Mina'da Geceleme",
    "location": "Mina Çadır Kenti — Zilhicce 11-12",
    "description": "[tashreeq|Teşrik] günlerinde geceleri Mina'da geçirmek [wajib|vaciptir]. Peygamberimiz ﷺ bu geceleri Mina'da geçirmiştir.",
    "image": "/images/step_16_mina_night.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Taşlama bittikten sonra Mina çadırınıza dönün.",
        "Gecenin çoğunu (en az yarısından fazlasını) fiziksel olarak Mina sınırlarında geçirin ([wajib|Vacip]).",
        "Geceyi dinlenme, Kuran okuma ve zikirle değerlendirin.",
        "Mina'da namazları cem etmeden, sadece kısaltarak kendi vakitlerinde kılın.",
        "Ertesi günkü taşlama için taşlarınızı hazırlayın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Mina çadırlarda sadeliği yaşatır. Dünyanın her yerinden gelen milyonlarca müminle yan yana kalmak, eşitliği, tevazuu ve ümmet bilincini pekiştirir.",
      "fiqhRules": "• Geceleme [wajib|Vaciptir]: [tashreeq|Teşrik] günlerinin (11 ve 12. geceler) gecelerini Mina'da geçirmek [wajib|vaciptir]. Gecenin yarısından fazlasını burada geçirmek gerekir.\n• Kurban Cezası: Geçerli bir mazeret olmaksızın geceyi Mina dışında geçirmek ceza gerektirir.",
      "survivalHacks": "• Otele Gitmeyin: Bazı hacılar dinlenmek için Mekke'deki otellerine giderler. Bu, [wajib|vacibi] kaçırma riskini taşır. Çadırlardaki ibadet atmosferini yaşayın ve zikirle meşgul olun."
    }
  },
  {
    "id": "step-17-rami-day2",
    "chapter": 4,
    "stepNumber": 17,
    "title": "[tashreeq|Teşrik Günleri] — 2. Gün Taşlama ve Aceleyle Ayrılış",
    "location": "Mina — Cemarat Köprüsü — Zilhicce 12-13",
    "description": "Üç şeytanı sırayla taşlama. Erken ayrılmak (Nafar-ı Evvel) isteyenler bayramın 3. günü taşlamadan sonra güneş batmadan Mina'dan ayrılmalıdır.",
    "image": "/images/step_17_rami_day2.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Öğleden sonra üç şeytanı sırayla taşlayın (Küçük, Orta, Büyük - 7'şer taş).",
        "Küçük ve orta sütunlardan sonra dua edin.",
        "Erken ayrılacaksanız (Aceleci grup): Güneş batmadan önce Mina sınırlarını terk edin.",
        "Geç ayrılacaksanız (Sünnete en uygun olan): Geceyi Mina'da geçirin, 13. gün taşlayıp ayrılın."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "İster erken ayrılın ister son güne kadar kalın, İslam kolaylık ve merhamet dinidir. Son güne kadar (13. gün) kalmak Peygamberimizin ﷺ sünnetine en uygun olanıdır.",
      "fiqhRules": "• Taşlama: Öğleden sonra sırayla üç şeytana 7'şer taş atılır.\n• Erken Ayrılış Şartı: Bayramın 3. günü (12 Zilhicce) taşlamadan sonra Mina'dan ayrılmak caizdir. Ancak güneş batmadan önce Mina sınırlarından çıkılması şarttır. Güneş batarsa 13. gün taşlama yükümlülüğü doğar.",
      "survivalHacks": "• Çıkış Planı: Erken ayrılacaksanız valizinizi önceden hazırlayın ve taşlamayı tamamlar tamamlamaz yola çıkın. Trafik aşırı yoğun olacağından yürümek en mantıklı seçenektir."
    }
  },
  {
    "id": "step-18-farewell",
    "chapter": 4,
    "stepNumber": 18,
    "title": "Veda Tavafı (Tavaf-ı Veda)",
    "location": "Mescid-i Harâm — Son Vazife",
    "description": "Haccın son ibadeti ve en duygusal anı. Kâbe'ye son veda — Mekke'den ayrılmadan önce Beytullah'ın etrafında yapılan veda şavtları.",
    "image": "/images/step_18_farewell.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Mina'dan ayrıldıktan sonra Mekke'deki Mescid-i Harâm'a gidin.",
        "Veda tavafı yapın — 7 şavt dönün.",
        "Tavaftan sonra sa'y yoktur.",
        "Kâbe'ye son kez bakarak kabul ve helallik duası edin.",
        "Tavaf bittikten sonra hiç beklemeksizin DERHAL Mekke'den ayrılın.",
        "Haccınız mebrur, ameliniz makbul olsun!"
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Özel günündeki kadınlar Veda Tavafından tamamen muaftır. Herhangi bir kurban, ceza veya kefaret ödemeden gruplarıyla birlikte Mekke'den ayrılabilirler.",
      "spiritualEssence": "[tawaf|Veda Tavafı], Allah'ın evine hüzünlü ve sevgi dolu bir vedadır. [kaaba|Kâbe'ye] son kez bakan hacı, içsel dönüşümünü tefekkür eder, kendisini kabul ettiği için Allah'a şükreder ve tekrar kavuşmayı niyaz eder.",
      "fiqhRules": "• [wajib|Vacip] Hükmü: Mekke dışından gelen hacıların veda tavafı yapması [wajib|vaciptir]. Terki kurban cezası gerektirir.\n• Adetli Kadınların Muafiyeti: Adetli veya nifaslı kadınlar veda tavafından tamamen muaftır. Herhangi bir ceza ödemeden Mekke'den ayrılabilirler.\n• Hemen Ayrılış Şartı: Tavaftan sonra alışveriş, otelde kalma gibi nedenlerle oyalanılmamalı, doğrudan yola çıkılmalıdır. Oyalanılırsa tavafın iadesi gerekir.",
      "survivalHacks": "• Hediyelikleri Önceden Alın: Tüm alışverişlerinizi ve valiz hazırlığınızı veda tavafından ÖNCE tamamlayın. Tavaftan çıktıktan sonra doğrudan havalimanı veya seyahat aracına geçin."
    }
  }
]
  },

  sq: {
    stages: [
  {
    "id": "step-01-preparation",
    "chapter": 1,
    "stepNumber": 1,
    "title": "Përgatitja & [niyyah|Nijeti]",
    "location": "Para Nisjes — Në Shtëpi",
    "description": "Haxhi fillon shumë para se të hipni në aeroplan. Përtërini [niyyah|nijetin] tuaj, rregulloni çështjet tuaja dhe përgatitni zemrën dhe bagazhin tuaj për udhëtimin e jetës.",
    "image": "/images/step_01_preparation.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Përtërini [niyyah|nijetin] sinqerisht — Haxhi duhet të bëhet vetëm për Allahun.",
        "Takoni familjen dhe miqtë për t'u përshëndetur dhe kërkuar falje.",
        "Paguani të gjitha borxhet e mbetura para se të niseni.",
        "Përgatitni një testament të shkruar si masë paraprake.",
        "Paketoni bagazhet — udhëtoni lehtë. Mos merrni gjëra me vlerë."
      ],
      "checklists": [
        "Medikamente me recetë: Amoksicilinë ose Azitromicinë",
        "Vaselinë (e domosdoshme kundër fërkimit të kofshëve)",
        "Çorape të trashë për Tavaf dhe pantofla plastike të lehta",
        "Peshqirët e Ihramit në çantën e dorës (jo në bagazh)",
        "Kartë krediti dhe para të gatshme për emergjenca",
        "Letra të lagura pa aromë dhe dezinfektues duarsh",
        "Durim dhe qëndrim pozitiv — gjërat mund të mos shkojnë 100% sipas planit!"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Haxhi është një udhëtim i zemrës para se të jetë i trupit. Sheikh Omar Suleiman kujton se shumë haxhinj fokusohen tek logjistika dhe harrojnë të përgatisin shpirtin. Ky hap mbulon përgatitjen e brendshme dhe zgjidhjen e çështjeve jetësore në mënyrë që mendja të jetë tërësisht e lirë për të adhuruar Allahun.",
      "fiqhRules": "• [niyyah|Nijeti] i sinqertë: Haxhi duhet të bëhet vetëm për hir të Allahut. Profeti (ﷺ) ka paralajmëruar kundër syfaqësisë apo kërkimit të famës.\n• Shlyerja e borxheve: Paguani çdo borxh ose bëni një marrëveshje të qartë ligjore para nisjes.\n• Kërkimi i faljes: Kërkoni falje nga familjarët dhe ata që mund t'i keni lënduar.\n• Shkrimi i testamentit: Është sunnet i rekomanduar të lihet një testament i shkruar para udhëtimit.",
      "survivalHacks": "• Ihrami në çantën e dorës: Mbani peshqirët e Ihramit me vete në çantën e dorës në aeroplan. Humbja e bagazheve në aeroport është e zakonshme.\n• Vazelina: Lyeni kofshët me vazelinë rregullisht për të shmangur plagët e dhimbshme nga fërkimi i pëlhurës së Ihramit gjatë ecjes."
    }
  },
  {
    "id": "step-02-ihram",
    "chapter": 1,
    "stepNumber": 2,
    "title": "Hyrja në Ihram",
    "location": "[miqat|Mikati] — Kufiri Sheriatik",
    "description": "Në [miqat|Mikat], hyni trupërisht dhe shpirtërisht në gjendjen e shenjtë të Ihramit — kalimi nga jeta e zakonshme në atë të adhurimit.",
    "image": "/images/step_02_ihram.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Bëni gusl (pastrim i plotë).",
        "Shkurtoni mustaqet, rruani sqetullat dhe pubisin, dhe pritni thonjtë.",
        "Parfumoni trupin (jo peshqirin e Ihramit).",
        "Për burrat: vishni dy peshqirët e bardhë të Ihramit.",
        "Në [miqat|Mikat]: bëni [niyyah|nijetin] për Umre: \"Lebbejk All-llahume Umreten\".",
        "Filloni të thoni [talbiyah|Telbijen] me zë të lartë (burrat) ose në heshtje (gratë).",
        "Falni dy rekate (nëse nuk është kohë e ndaluar)."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
          "translation": "Të përgjigjem Ty o Allah, të përgjigjem Ty! Ti nuk ke partner, të përgjigjem Ty! Vërtet falënderimi, mirësia dhe sundimi të takojnë Ty, Ti nuk ke partner.",
          "transliteration": "Labbayk Allahumma Labbayk..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Gratë me cikël menstrual bëjnë çdo gjë për Ihramin — lahen, pastrohen, veshin rrobat e tyre modeste dhe bëjnë nijetin — por nuk e falin namazin e Ihramit.",
      "spiritualEssence": "[ihram|Ihrami] është zhveshja nga të gjitha dallimet dhe shenjat e statusit shoqëror. Të gjithë haxhinjtë veshin të njëjtën rrobë të thjeshtë të bardhë, e cila të kujton Ditën e Kiametit dhe ringjalljen para Allahut.",
      "fiqhRules": "• Kufiri i Mikatit: Është e ndaluar kalimi i Mikatit pa Ihram. Shkelja e këtij kufiri kërkon therjen e një kurbani (dem) si ndëshkim.\n• Ndalimet për Burrat: Burrat nuk lejohen të veshin rroba të qepura (të prera sipas trupit), të mbajnë mbathje apo të mbulojnë kokën.\n• Ndalimet e Përgjithshme: Ndalohet prerja e flokëve ose thonjve, përdorimi i parfumit, gjuetia dhe marrëdhëniet bashkëshortore.\n• Rregullat për Gratë: Gratë veshin rrobat e tyre të zakonshme të thjeshta dhe nuk lejohet të mbajnë peçe (nikab) që prek fytyrën. Gratë me cikël hyjnë në Ihram dhe thonë [talbiyah|Telbijen], por nuk falen dhe nuk bëjnë Tavaf.",
      "survivalHacks": "• Përgatitja paraprake: Bëni gusl dhe shkurtoni flokët/thonjtë në hotel ose në aeroport para se të hipni në fluturimin për në Xhedah për të lehtësuar procesin.\n• [talbiyah|Telbija]: Përsëriteni [talbiyah|Telbijen] vazhdimisht individualisht dhe me zë të lartë (për burrat) pa pasur nevojë të thirret në grup."
    }
  },
  {
    "id": "step-03-tawaf",
    "chapter": 1,
    "stepNumber": 3,
    "title": "Tavafi × 7",
    "location": "Xhamia Haram — Qabja",
    "description": "Pamja e parë e Qabes. Rrotullohuni shtatë herë kundërorar rreth Qabes, duke filluar dhe mbaruar te Guri i Zi, në një gjendje të vazhdueshme lutjeje.",
    "image": "/images/step_03_tawaf.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Sigurohuni që keni abdes.",
        "Për burrat: zbuloni supin e djathtë ([idtiba|Idtiba]) — vetëm për këtë Tavaf të parë.",
        "Hyni me këmbën e djathtë dhe thoni duanë e hyrjes në xhami.",
        "Drejtohuni nga Guri i Zi, bëni tekbir dhe shenjë me dorën e djathtë.",
        "Bëni 7 rrotullime me Qaben në të majtën tuaj.",
        "Prekni Ruknin Jemani me dorën e djathtë nëse mundeni.",
        "Lexoni duanë \"Rabbena atina\" midis Ruknit Jemani dhe Gurit të Zi.",
        "Falni 2 rekate pas Makamit të Ibrahimit dhe pini ujë Zemzemi."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Zoti ynë, jepna të mira në këtë botë dhe të mira në botën tjetër, dhe na ruaj nga dënimi i zjarrit.",
          "transliteration": "Rabbana atina fid-dunya hasanatan..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Gruaja me cikël nuk mund ta bëjë Tavafin. Nëse kryen Tamattu dhe nuk pastrohet para fillimit të Haxhit, ajo e kthen nijetin në Haxh Kiran (bashkim i Haxhit me Umren) dhe shkon direkt në Minë pa bërë Tavafin e Umres.",
      "spiritualEssence": "[tawaf|Tavafi] rreth [kaaba|Qabes] simbolizon harmoninë e të gjithë krijimit që sillet rreth Krijuesit të vet. [kaaba|Qabja] është pika e takimit shpirtëror të të gjithë muslimanëve në botë.",
      "fiqhRules": "• Kushti i Abdesit: Abdesi është i domosdoshëm për vlefshmërinë e Tavafit sipas shumicës së dijetarëve. Nëse prishet abdesi, duhet të merret abdes sërish dhe të vazhdohet Tavafi.\n• [idtiba|Idtiba] dhe [raml|Raml]: Për burrat është sunnet të zbulojnë supin e djathtë ([idtiba|Idtiba]) dhe të ecin shpejt në tri rrotullimet e para ([raml|Raml]).\n• Namaz pas Tavafit: Pas përfundimit, falen 2 rekate pas Makamit të Ibrahimit ose në çdo vend tjetër brenda Haremmit.",
      "survivalHacks": "• Tavafi në katet e sipërme: Katet e sipërme kanë distancë më të gjatë por janë shumë më pak të ngarkuara dhe më të freskëta, ideale për familjet dhe të moshuarit.\n• Lutjet personale: Nuk ka lutje specifike për çdo rrotullim. Lutuni sinqerisht në gjuhën tuaj pa pasur nevojë të përsëritni pas dikujt tjetër."
    }
  },
  {
    "id": "step-04-safa-marwa",
    "chapter": 1,
    "stepNumber": 4,
    "title": "Sa'i midis Safas & Mervas",
    "location": "Xhamia Haram — Mes'a",
    "description": "Shatë kalime midis kodrave Safa dhe Merva, duke ecur në gjurmët e Haxheres (ra) në kërkimin e saj të dëshpëruar për ujë për foshnjën Ismail.",
    "image": "/images/step_04_safa_marwa.png",
    "coordinates": "21.3754,39.8227",
    "details": {
      "steps": [
        "Ngjituni në katin e dytë ose të tretë për të shmangur turmat.",
        "Lexoni ajetin 2:158 kur t'i afroheni Safas.",
        "Thoni: \"E filloj me atë që Allahu e filloi\".",
        "Ngjituni në Safa, drejtohuni nga Qabja, ngrini duart dhe lutuni 3 herë.",
        "Ecin drejt Mervas — burrat të vrapojnë lehtë midis dy shtyllave me drita të gjelbra.",
        "Përfundoni 7 kalime (nga Safa në Merva është 1 kalim) duke mbaruar në Merva."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُΩَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "translation": "S'ka të adhuruar tjetër me të drejtë përveç Allahut të Vetëm, pa partner. Atij i takon sundimi dhe lavdërimi dhe Ai është i fuqishëm për çdo gjë.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lahu..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Pastërtia rituale nuk është kusht për Sajin, por meqë Saji duhet të bëhet pas Tavafit, duhet ta shtyni atë derisa të pastroheni dhe të bëni Tavafin. (Nëse jeni kthyer në Kiran, vazhdoni direkt në Minë).",
      "spiritualEssence": "[sai|Sa'i] midis Safas dhe Mervas rikujton përpjekjen dhe besimin absolut të Haxheres (ra) te Allahu. Na mëson se duhet të bëjmë çdo përpjekje njerëzore dhe t'ia lëmë rezultatin Allahut. [zamzam|Zemzemi] është dëshmi e gjallë e kësaj mrekullie.",
      "fiqhRules": "• Rregulli i 7 kalimeve: Sa'i përbëhet nga 7 kalime. Shkuarja nga Safa në Merva është 1 kalim, kthimi nga Merva në Safa është kalimi i dytë.\n• Vrapimi i lehtë (Hervele): Është sunnet vetëm për burrat të vrapojnë lehtë midis dritave të gjelbra.\n• Abdesi jo i detyrueshëm: Abdesi nuk është kusht i domosdoshëm për Sa'i, prandaj gratë me cikël menstrual mund ta kryejnë atë pa problem.",
      "survivalHacks": "• Zgjidhni katet me kondicioner: Katet e sipërme janë të kondicionuara mirë dhe ju kursejnë energji për ditët e vështira të Haxhit.\n• Mbarimi në Merva: Kalimi i shtatë mbaron gjithmonë në Merva, ku ndodhen edhe daljet kryesore drejt rrugës dhe dyqaneve.",
      "interestingFact": {
        "title": "Dritat e Gjelbra & Zona e Vrapimit",
        "fact": "Zona e ndriçuar me neone të gjelbër në Mes'a përkon me pjesën më të ulët të luginës së vjetër ku Haxherja vraponte më shpejt për të mos humbur nga sytë foshnjën e saj Ismail, ndërsa në pjesët më të larta ecte normalisht."
      }
    }
  },
  {
    "id": "step-05-hair-clip",
    "chapter": 1,
    "stepNumber": 5,
    "hajjTypeFilter": [
      "tamattu"
    ],
    "title": "Shkurtimi i Flokëve — Fundi i Umres",
    "location": "Makkah — Hoteli",
    "description": "Duke shkurtuar ose rruar flokët, ju dilni nga gjendja e Ihramit të Umres. Gjithçka kthehet në normale deri në fillimin e Haxhit më 8 Dhul Hixhe.",
    "image": "/images/step_05_hair_clip.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Burrat: shkurtoni flokët në mënyrë të barabartë (mos i rruani plotësisht, ruajeni rrojën për në Haxh).",
        "Gratë: prisni sa një trashësi gishti nga majat e flokëve.",
        "Dilni nga Ihrami dhe vishni rrobat e zakonshme.",
        "Gjithçka kthehet në normale deri në ditën e 8-të të Dhul Hixhes."
      ],
      "checklists": [
        "Shkurtimi i flokëve (burrat: makinetë personale në hotel)",
        "Gratë: prisni majat e flokëve",
        "Vishni rroba civile",
        "Përdorni parfum (tani është i lejuar)",
        "Pushoni për fillimin e Haxhit"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Shkurtimi i flokëve shënon përfundimin e suksesshëm të Umres dhe lirimin e përkohshëm nga kufizimet e Ihramit me një shpirt të përtërirë dhe të pastër.",
      "fiqhRules": "• Shkurtimi i Burrave: Për Umre rekomandohet shkurtimi i barabartë i flokëve në mënyrë që të mbetet flok për t'u rruar plotësisht në fund të Haxhit.\n• Rregulli i Grave: Gratë presin vetëm sa një trashësi gishti (rreth 2 cm) nga fundi i flokëve të tyre të mbledhura.\n• Dalja e plotë: Pas shkurtimit, mund të vishni rroba normale, të përdorni parfum dhe të bëni çdo gjë që ishte e ndaluar gjatë Ihramit.",
      "survivalHacks": "• Të rruhesh në hotel: Përdorimi i një makinete personale në hotel është më i sigurt për higjienën dhe ju shmang radhët e gjata në berberët e Mekës."
    }
  },
  {
    "id": "step-06-rest",
    "chapter": 1,
    "stepNumber": 6,
    "hajjTypeFilter": [
      "tamattu"
    ],
    "title": "Pushimi dhe Namazi",
    "location": "Makkah — Xhamia Haram",
    "description": "Midis përfundimit të Umres dhe fillimit të Haxhit më 8 Dhul Hixhe, haxhinjtë pushojnë, falen në Haram dhe përgatisin zemrat për ditët e mëdha.",
    "image": "/images/step_06_rest.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Pushoni për të rifituar fuqitë fizike.",
        "Falni të pesë namazet me xhemat brenda Xhamisë Haram.",
        "Bëni tavafe vullnetare (nafile).",
        "Përgatitni listën e detajuar të duave për ditën e Arafatit.",
        "Mësoni përmendësh lutjet kryesore."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Namazi në Xhaminë Haram vlen sa 100,000 namaze në vendet e tjera. Kjo kohë pushimi është e artë për t'u fokusuar shpirtërisht dhe fizikisht para fillimit të ditëve intensive të Haxhit.",
      "fiqhRules": "• Namazet në Haram: Përpiquni të falni çdo namaz farz brenda Haremmit për të fituar shpërblimin e madh.\n• Tavafi vullnetar: Kryeni tavaf vullnetar kur të keni mundësi, pa pasur nevojë për Ihram apo Sa'i pas tij.",
      "survivalHacks": "• Ruani fuqitë: Mos u lodhni me blerje të tepërta apo ecje të panevojshme nën diell. Ditët e ecjes së Haxhit kërkojnë energji të plotë."
    }
  },
  {
    "id": "step-07-ihram-hajj",
    "chapter": 2,
    "stepNumber": 7,
    "title": "Ihrami për Haxh",
    "location": "Makkah — 8 Dhul Hixhe",
    "description": "Në mëngjesin e datës 8 Dhul Hixhe, haxhinjtë hyjnë sërish në Ihram — këtë herë specifikisht për Haxh. Udhëtimi i madh fillon tani.",
    "image": "/images/step_07_ihram_hajj.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Përsëritni sunnetet e hyrjes në Ihram: gusl, pastrim, parfumim i trupit.",
        "Burrat: Vishni sërish dy peshqirët e bardhë të Ihramit.",
        "Bëni [niyyah|nijetin] për Haxh: \"Lebbejk All-llahume Haxh-xhan\".",
        "Filloni [talbiyah|Telbijen] dhe vazhdojeni pa ndërprerje.",
        "Nisuni drejt Minës."
      ],
      "duas": [
        {
          "arabic": "لَبَّيْكَ اللَّهُمَّ حَجًّا",
          "translation": "Të përgjigjem Ty o Allah, për Haxh!",
          "transliteration": "Labbayk Allahumma Hajjan."
        }
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Hyrja në Ihram për Haxh në ditën e [tarwiyah|Tervijes] (8 Dhul Hixhe) shënon fillimin zyrtar të Haxhit dhe premtimin tuaj të ri ndaj Allahut për këtë adhurim madhështor.",
      "fiqhRules": "• [niyyah|Nijeti] i Haxhit: Pas veshjes së Ihramit në hotelin tuaj në Makkah, bëni [niyyah|nijetin] duke thënë 'Lebbejk All-llahume Haxh-xhan'.\n• Vazhdimi i Telbijes: [talbiyah|Telbija] vazhdohet pa ndërprerje deri sa të fillojë gjuajtja e parë e gurëve ditën e Bajramit.",
      "survivalHacks": "• Përgatitja e çantës: Paketoni vetëm gjërat më të domosdoshme për ditët e Minës, Arafatit dhe Müzdelifes në një çantë të vogël shpine."
    }
  },
  {
    "id": "step-08-mina",
    "chapter": 2,
    "stepNumber": 8,
    "title": "Arritja në Mina",
    "location": "Mina — Qyteti i Çadrave — 8 Dhul Hixhe",
    "description": "Qyteti i çadrave të bardha në Mina bëhet shtëpia juaj. Tri milionë besimtarë flenë në çadrat e ngritura në luginë. Nata para ditës së madhe.",
    "image": "/images/step_08_mina.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Udhëtoni nga Makkah për në Mina pasi të keni hyrë në Ihram.",
        "Falni namazet në Mina të shkurtuara (nga 2 rekate) por në kohët e veta (pa i bashkuar).",
        "Ruani dhe fotografoni numrin e çadrës suaj dhe kodin e zonës.",
        "Flini herët — nesër është dita më e rëndësishme e Haxhit.",
        "Rishikoni listën e duave për Arafat."
      ],
      "checklists": [
        "Konfirmoni transportin për në Mina",
        "Ruani numrin e çadrës dhe Maktabit (zyrës)",
        "Çantën e shpinës, tapetin e faljes dhe karikuesin portativ",
        "Kartën e Haxhit gjithmonë me vete",
        "Shmangni ushqimet e rënda që mund të prishin stomakun"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Qëndrimi në Mina në ditën e [tarwiyah|Tervijes] ju mëson thjeshtësinë dhe ju largon nga luksi. Është një stacion tefekkuri dhe përgatitjeje shpirtërore para qëndrimit në Arafat.",
      "fiqhRules": "• Namazet në Mina: Namazet katër-rekatëshe falen me nga 2 rekate (të shkurtuara) por pa u bashkuar, secili në kohën e vet.\n• Qëndrimi në Mina: Qëndrimi i kësaj nate në Mina është sunnet i fortë i Profetit (ﷺ).",
      "survivalHacks": "• Mos u humbni në çadra: Mina ka mbi 100,000 çadra të ngjashme. Shënoni koordinatat ose numrin e çadrës dhe shkrepni një foto të tabelave të zonës.\n• Ushqimi dhe tualetet: Radhët e tualeteve janë jashtëzakonisht të gjata. Hani lehtë dhe shmangni pijet e tepërta para kohëve të namazeve.",
      "interestingFact": {
        "title": "Qyteti më i Madh i Çadrave",
        "fact": "Mina përmban më shumë se 100,000 çadra të kondicionuara dhe rezistente ndaj zjarrit (të ndërtuara me Teflon), të cilat qëndrojnë të zbrazëta gjatë gjithë vitit dhe mbushen në pak orë gjatë ditëve të Haxhit."
      }
    }
  },
  {
    "id": "step-09-arafat",
    "chapter": 2,
    "stepNumber": 9,
    "title": "Dita e Arafatit",
    "location": "Fusha e Arafatit — 9 Dhul Hixhe",
    "description": "Zemra dhe esenca e Haxhit. Qëndrimi në Arafat nga dreka deri në perëndim të diellit në lutje dhe meditim. Kush e humb këtë ditë, ka humbur Haxhin.",
    "image": "/images/step_09_arafat.png",
    "coordinates": "21.3547,39.9839",
    "details": {
      "steps": [
        "Nisuni për në Arafat pas lindjes së diellit — arrini para kohës së drekës.",
        "Dëgjoni hutben e Arafatit.",
        "Falni namazin e drekës dhe të ikindisë të bashkuara dhe të shkurtuara në kohën e drekës.",
        "Qëndroni në lutje të vazhdueshme (Vukuf) nga dreka deri në perëndim të diellit.",
        "NUK lejohet të largoheni nga Arafati para perëndimit të plotë të diellit.",
        "Nisuni për në Muzdelife menjëherë pas perëndimit pa e falur akshamin."
      ],
      "duas": [
        {
          "arabic": "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          "translation": "S'ka të adhuruar tjetër me të drejtë përveç Allahut të Vetëm, pa partner. Atij i takon sundimi dhe lavdërimi dhe Ai është i fuqishëm për çdo gjë.",
          "transliteration": "La ilaha illallahu wahdahu la sharika lahu..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Qëndrimi në Arafat (Vakfa) është plotësisht i vlefshëm për gratë me cikël. Mund të qëndroni në Arafat, të bëni të gjitha lutjet dhe të bëni dhikr; pastërtia nuk kërkohet për Arafat.",
      "spiritualEssence": "[wuquf|Vukufi] në Arafat është dita e faljes së madhe dhe kulmi i Haxhit. Profeti (ﷺ) ka thënë: 'Haxhi është Arafat'. Është një ditë e përulësisë absolute ku lutjet tona pranohen drejtpërdrejt nga Allahu i Madhërishëm.",
      "fiqhRules": "• [rukn|Rukni] i Haxhit: Qëndrimi në Arafat qoftë edhe për pak çaste midis kohës së drekës dhe perëndimit të diellit është shtyllë ([rukn|Rukn]) pa të cilën Haxhi nuk është i vlefshëm.\n• Bashkimi i namazeve: Namazi i drekës dhe i ikindisë falen të bashkuara (Xhem al-Taqdim) dhe të shkurtuara me një ezan dhe dy ikamete.\n• Kufiri i kohës: Nuk lejohet largimi nga Arafati para perëndimit të plotë të diellit. Largimi i parakohshëm kërkon therje kurbani (fidje) për ndreqje.",
      "survivalHacks": "• Fokusohuni tek lutjet: Mos humbni kohë me gjumë, biseda apo foto selfi. Kjo është dita më e rëndësishme e jetës suaj shpirtërore.\n• Mos u ngjitni në kodër: Qëndrimi (Vukufi) është i vlefshëm në çdo pjesë të fushës së Arafatit. Ngjitja në Kodrën e Mëshirës (Jabal ar-Rahmah) nuk është kusht dhe mund t'ju lodhë jashtëzakonisht.",
      "interestingFact": {
        "title": "Tabelat e Verdha të Kufirit",
        "fact": "Kufijtë e Arafatit janë të shënuar me tabela të verdha gjigante në shumë gjuhë. Qëndrimi qoftë edhe një metër jashtë këtyre tabelave e bën Vukufin dhe Haxhin tuaj të pavlefshëm."
      }
    }
  },
  {
    "id": "step-10-muzdalifah",
    "chapter": 2,
    "stepNumber": 10,
    "title": "Muzdelife — Nën Qiellin e Hapur",
    "location": "Fusha e Muzdelifes",
    "description": "Pas kulmit shpirtëror të Arafatit, haxhinjtë udhëtojnë drejt Muzdelifes për të kaluar natën nën yje, për t'u çlodhur dhe për të mbledhur gurë.",
    "image": "/images/step_10_muzdalifah.png",
    "coordinates": "21.3894,39.9392",
    "details": {
      "steps": [
        "Nisuni nga Arafati menjëherë pas perëndimit të diellit.",
        "Kur të arrini në Muzdelife, falni namazin e akshamit (3 rekate) dhe të jacisë (2 rekate) të bashkuara.",
        "Flini në tokë nën qiellin e hapur — pushimi është prioritet.",
        "Mblidhni 49 deri në 70 gurë të vegjël (sa madhësia e një kokrre qiqre) për gjuajtjen e Jamaratit.",
        "Falni namazin e sabahut në kohën e tij të parë para se të niseni."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Kalimi i natës në Muzdelifë dhe mbledhja e gurëve janë plotësisht të vlefshme gjatë ciklit. Pastërtia rituale nuk është kusht për Muzdelifën.",
      "spiritualEssence": "Fjetja në tokë nën yje në [muzdalifah|Muzdelife], pa asnjë luks apo dallim shoqëror, tregon barazinë e plotë të njerëzve dhe varësinë e tyre absolute nga Allahu i Madhërishëm.",
      "fiqhRules": "• Bashkimi i namazeve: Namazi i akshamit dhe i jacisë falen të bashkuara pas mbërritjes në Muzdelife (Xhem al-Tahir). Akshami falet i plotë (3 rekate), ndërsa jacia shkurtohet në 2 rekate.\n• Qëndrimi (Vukufi): Qëndrimi në Muzdelife të paktën deri pas mesnatës është [wajib|Vaxhib] për haxhinjtë.\n• Lehtësimi për të dobëtit: Gratë, të moshuarit dhe të sëmurët lejohen të largohen nga Muzdelifeja pas mesnatës për të shmangur shtytjet e rrezikshme në mëngjes te Jamarati.\n• Mbledhja e gurëve: Mblidhni gurët e vegjël këtu. Ju duhen 7 gurë për ditën e parë dhe nga 21 gurë për ditët e tjera të Teshrikut.",
      "survivalHacks": "• Dyshek i lehtë: Një tapet i lehtë yoga ose dyshek i hollë me ajër ju ndihmon të flini më mirë mbi tokën me gurë të Muzdelifes.\n• Mos falni akshamin rrugës: Ndiqni sunnetin dhe faleni akshamin dhe jacinë vetëm kur të arrini fizikisht në Muzdelife, pavarësisht vonesave në komunikacion.",
      "interestingFact": {
        "title": "Leja e Mesnatës",
        "fact": "Profeti (ﷺ) u dha leje të posaçme grave dhe të moshuarve të largoheshin nga Muzdelifeja pas mesnatës për të kryer gjuajtjen e gurëve para se të fillonte dyndja e madhe e haxhinjve pas lindjes së diellit."
      }
    }
  },
  {
    "id": "step-11-rami-aqaba",
    "chapter": 3,
    "stepNumber": 11,
    "title": "Rami — Gjuajtja e Jamarat al-Aqaba",
    "location": "Mina — Ura e Jamaratit",
    "description": "Akti i parë në ditën e Bajramit: gjuajtja e shtyllës së madhe (Jamarat al-Aqaba) me 7 gurë, duke rijetuar refuzimin e tundimeve të shejtanit nga profeti Ibrahim (as).",
    "image": "/images/step_11_rami_aqaba.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Nisuni nga Muzdelifeja për në Mina pas sabahut (ose pas mesnatës për grupet me leje).",
        "Drejtohuni te Ura e Jamaratit — gjuani VETËM shtyllën e madhe (Jamarat al-Aqaba).",
        "Gjuani 7 gurë një nga një, duke thënë \"Allahu Akbar\" me çdo gjuajtje.",
        "Ndaloni leximin e Telbijes me hedhjen e gurit të parë — tani fillon tekbiri i Bajramit.",
        "Gjuajtja mund të bëhet në çdo kohë pas lindjes së diellit, preferohet para drekës."
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Gjuajtja e Jamarat al-Aqaba është plotësisht e vlefshme për gratë me cikël. Ato kanë lehtësim (rrethanë lehtësuese) të largohen nga Muzdelifa pas mesnate për të gjuajtur herët, ose mund të delegojnë dikë të gjuajë në emër të tyre nëse zhurma dhe rreziku në turma është i madh.",
      "spiritualEssence": "[rami|Gjuajtja e Jamarat al-Aqaba] (shtyllës së madhe) në ditën e Bajramit simbolizon refuzimin aktiv të dëshirave të epshit, pëshpëritjeve të djallit dhe prirjeve të këqija, duke ndjekur shembullin e profetit Ibrahim (as).",
      "fiqhRules": "• Gjuajtja e ditës së Bajramit: Më 10 Dhul Hixhe gjuhet VETËM [rukn|shtylla] e madhe (Jamarat al-Aqaba) me 7 gurë. [rukn|Shtylla] e vogël dhe e mesme nuk gjuhen në këtë ditë.\n• Mënyra e gjuajtjes: Çdo gur duhet të hidhet veçmas me dorë duke thënë 'Allahu Akbar'. Guri duhet të bjerë brenda rrethit të basenit të shtyllës.\n• Ndalimi i Telbijes: [talbiyah|Telbija] ndërpritet menjëherë me hedhjen e gurit të parë.\n• Tahalluli i parë: Pas gjuajtjes dhe prerjes/rrojës së flokëve, arrihet dalja e parë nga Ihrami (Tahallul al-Awwal) ku lejohen të gjitha gjërat përveç marrëdhënieve bashkëshortore.",
      "survivalHacks": "• Qëndroni në anë: Afrohuni te baseni i shtyllës nga anët ose nga pjesa e pasme për të shmangur turmën e dendur në qendër.\n• Shmangni mëngjesin e hershëm: Koha menjëherë pas lindjes së diellit është më e ngarkuara. Gjuajtja pas drekës ose në mbrëmje është shumë më e qetë dhe më e sigurt për të moshuarit.",
      "interestingFact": {
        "title": "Ndryshimi i Formës së Shtyllave",
        "fact": "Historikisht [rukn|shtyllat] ishin të holla, gjë që shkaktonte bllokime dhe stampedo tragjike. Suuditë i rindërtuan ato në formë muresh të gjera eliptike shumëkatëshe, duke rritur sipërfaqen dhe duke mundësuar qarkullim të lirë të turmës."
      }
    }
  },
  {
    "id": "step-12-qurbani",
    "chapter": 3,
    "stepNumber": 12,
    "title": "Kurbani — Flijimi i Kafshës",
    "location": "Mina — Thertorja",
    "description": "Flijimi i Hedyit (Kurbanit të Haxhit) në ditën e Bajramit. Është [wajib|Vaxhib] për haxhinjtë Tamattu dhe Kiran.",
    "image": "/images/step_12_qurbani.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Kurbani kryhet nga autoritetet e autorizuara duke përdorur kuponin tuaj të Haxhit.",
        "Verifikoni që kuponi juaj është regjistruar saktë pranë autoriteteve zyrtare.",
        "Nuk keni nevojë të jeni fizikisht të pranishëm gjatë therjes.",
        "Pasi të konfirmohet therja, mund të vazhdoni med rrojën ose shkurtimin e flokëve."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Therja e [nahr|Kurbanit] (Hedy) në ditën e Bajramit kujton gatishmërinë e plotë të profetit Ibrahim (as) për të flijuar djalin e tij Ismailin në bindje ndaj urdhrit të Allahut, si dhe mëshirën e Allahut në zëvendësimin e tij me një dash. Përfaqëson sakrifikimin e dëshirave tona dhe ndarjen e pasurisë me të varfrit.",
      "fiqhRules": "• Detyrimi ([wajib|Vaxhib]): Kurbani është i detyrueshëm për haxhinjtë që kryejnë Haxhin Tamattu ose Haxhin Kiran. Për ata që kryejnë Haxhin Ifrad, ai është i pëlqyeshëm (Mustahab).\n• Sistemi i Kuponëve: Në Haxhin modern, therjet nuk bëhen individualisht. Ju blini një kupon kurbani zyrtar (p.sh. përmes projektit Adahi), i cili autorizon një thertore të certifikuar ta kryejë therjen në emrin tuaj.\n• Koha e Therjes: Kurbani duhet të theret brenda ditëve të Bajramit (ditët 10, 11 ose 12 të Dhul Hixhes).",
      "survivalHacks": "• Besoni Sistemit Zyrtar: Mos shkoni personalisht në thertore. Sistemi dixhital i kuponëve është jashtëzakonisht i organizuar dhe i aprovuar nga dijetarët globalë."
    }
  },
  {
    "id": "step-13-shave",
    "chapter": 3,
    "stepNumber": 13,
    "title": "Rroja ose Prerja e Flokëve",
    "location": "Qyteti i Çadrave të Minës",
    "description": "Burrat rruajnë tërë kokën ose shkurtojnë flokët; gratë presin një gisht nga majat e tyre. Ky akt mundëson daljen e parë nga Ihrami.",
    "image": "/images/step_13_shave.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Burrat: Rruani tërë kokën (Halq — më i vlefshmi) ose shkurtoni flokët në mënyrë të barabartë (Taqseer).",
        "Gratë: Prisni afërsisht sa një trashësi gishti (rreth 2 cm) nga majat e flokëve.",
        "Ky akt, së bashku me gjuajtjen, mundëson tahallulin (daljen nga Ihrami).",
        "Pas kryerjes së 2 prej 3 veprimeve të Bajramit, mund të ndërroni rrobat dhe të parfumoseni."
      ],
      "checklists": [
        "Burrat: Gjeni një berber të licencuar në Mina ose përdorni makinetën tuaj",
        "Gratë: Prisni një gisht nga majat e flokëve",
        "Vishni rroba normale civile",
        "Përdorni parfum (i lejuar pas Tahallul të parë)"
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "[halq|Rroja ose prerja e flokëve] përfaqëson rilindjen shpirtërore, përulësinë dhe zhveshjen nga egoja. Duke flijuar një pjesë të trupit, haxhiu shfaq nënshtrim të plotë ndaj urdhrit të Allahut, duke dalë nga Haxhi i pastër si foshnja e sapolindur.",
      "fiqhRules": "• Zgjedhja e Burrave: Burrat mund të rruajnë tërë kokën (Halq) ose të shkurtojnë flokët (Taqseer). Rroja është shumë më e vlefshme; Profeti (ﷺ) u lut për ata që rruajnë kokën tri herë, ndërsa për ata që vetëm i shkurtojnë u lut vetëm një herë.\n• Rregulli për Gratë: Gratë NUK e rruajnë kokën. Ato duhet të presin vetëm sa një trashësi gishti (rreth 2.5 cm) nga majat e flokëve të tyre.\n• Tahallul al-Awwal (Dalja e Parë): Pasi të keni përfunduar gjuajtjen e Jamarat al-Aqaba DHE të keni rruar/shkurtuar flokët, ju hyni në gjendjen e parë të lirimit. Mund të bëni dush, të vishni rroba normale dhe të përdorni parfum. Të gjitha ndalimet hiqen, përveç marrëdhënieve bashkëshortore.",
      "survivalHacks": "• Makinetë Personale: Burrat duhet të sjellin një makinetë personale met bateri për t'u rruar në çadrën e tyre. Kjo shmang radhët e gjata të berberëve në Mina dhe rreziqet e infeksioneve nga përdorimi i brisqeve të përbashkët."
    }
  },
  {
    "id": "step-14-tawaf-ifadah",
    "chapter": 3,
    "stepNumber": 14,
    "title": "Tavafi i Ifadahut",
    "location": "Xhamia Haram — Qabja",
    "description": "Tavafi i vërtetë i Haxhit — [rukn|Rukn] ([rukn|Shtylla]) i detyrueshëm për vlefshmërinë e Haxhit. Bëhet pas rrojës në rroba normale.",
    "image": "/images/step_14_tawaf_ifadah.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Shkoni nga Mina te Xhamia Haram.",
        "Merrni abdes.",
        "7 rrotullime kundërorar — pa [idtiba|Idtiba], pa Remel.",
        "2 rekate te Makam Ibrahim.",
        "Haxhinjtë Tamattu: kryeni gjithashtu Sa'in (Safa-Merva 7 rrotullime).",
        "Pini ujë Zemzem dhe kthehuni në Mina."
      ],
      "duas": [
        {
          "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          "translation": "Zoti ynë, jepna të mira në dynja dhe të mira në ahiret, dhe na ruaj nga dënimi i zjarrit.",
          "transliteration": "Rabbena atina fid-dunya hasanaten..."
        }
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Duhet ta shtyni Tavafin e Ifadahut (i cili është shtyllë/Rukn e Haxhit) derisa të pastroheni. Ju mund të shkurtoni flokët tuaj në ditën e Bajramit për të arritur lirimin e parë nga Ihrami (Tahallul al-Awwal) dhe të veshni rrobat e zakonshme, por duhet ta shtyni Tavafin. Nëse grupi juaj i udhëtimit niset dhe nuk mund të prisni, konsultohuni me dijetarët për rregullat e emergjencës apo përdorimin e medikamenteve.",
      "spiritualEssence": "[tawaf|Tavafi i Ifadahut] është kurorëzimi i Haxhit. Tashmë të veshur me rrobat tuaja të zakonshme, ju ktheheni te [kaaba|Qabja] për të kryer rrotullimet e besës, duke kompletuar shtyllën finale që ju liron plotësisht nga të gjitha ndalimet e [ihram|Ihramit].",
      "fiqhRules": "• [rukn|Shtylla] e domosdoshme ([rukn|Rukn]): Tavafi i Ifadahut është shtyllë e domosdoshme e Haxhit. Pa të Haxhi nuk është i vlefshëm dhe nuk mund të zëvendësohet me kurban.\n• Pa [idtiba|Idtiba] dhe pa Remel: Meqenëse nuk jeni më në Ihram (ose jeni liruar nga kufizimet e tij), nuk zbuloni supin dhe nuk vraponi në tri rrotullimet e para.\n• Sa'i i Haxhit: Haxhinjtë Tamattu duhet të bëjnë edhe Sa'in e Haxhit pas këtij Tavafi. Haxhinjtë Kiran dhe Ifrad e bëjnë vetëm nëse nuk e kanë bërë gjatë Tavafit të arritjes.\n• Rregulli i Ciklit: Gratë me cikël menstrual nuk e bëjnë këtë Tavaf derisa të pastrohen. Ato qëndrojnë në Makkah ose Mina dhe presin pastrimin për ta kryer atë.\n• Tahalluli i Plotë (Tahallul al-Akbar): Pas përfundimit të të 3 veprimeve të Bajramit (Gjuajtja + Rroja + Tavafi), ju arritni tahallulin e plotë ku lejohen edhe marrëdhëniet bashkëshortore.",
      "survivalHacks": "• Shtyjeni Tavafin: Kryerja e gjuajtjes, rrojës, udhëtimit në Makkah dhe Tavafit brenda një dite është jashtëzakonisht e lodhshme. Rekomandohet të kryhet natën e 11-të ose 12-të të Dhul Hixhes kur është më freskët dhe më pak ngarkesë."
    }
  },
  {
    "id": "step-15-rami-day1",
    "chapter": 4,
    "stepNumber": 15,
    "title": "Rami — Dita e Parë e Teshrikut",
    "location": "Mina — Ura e Xhemrateve — 11 Dhul Hixhe",
    "description": "Dita e parë e Teshrikut. Gjuani të tre [rukn|shtyllat] në rend pas Drekës; bëni dua pas së vogëls dhe të mesmes.",
    "image": "/images/step_15_rami_day1.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Qëndroni në Mina — gjysma e natës duhet të jetë në Mina.",
        "Pas Drekës: gjuani shtyllën e vogël 7 gurë.",
        "Kthehuni nga Kibla dhe bëni dua.",
        "Gjuani shtyllën e mesme 7 gurë.",
        "Kthehuni nga Kibla dhe bëni dua.",
        "Gjuani shtyllën e madhe 7 gurë.",
        "Largohuni menjëherë pa u ndalur."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Kalimi i ditëve të Teshrikut në Mina dhe gjuajtja e të tri shtyllave përfaqëson përkujtimin e vazhdueshëm të Allahut (Dhikr) dhe vendosmërinë për të luftuar të keqen në të gjitha format e saj.",
      "fiqhRules": "• Renditja e shtyllave: Gjuajtja duhet të bëhet patjetër sipas renditjes: [rukn|Shtylla] e Vogël (al-Sughra), e Mesme (al-Wusta), dhe pastaj e Madhja (al-Aqaba).\n• Numri i gurëve: Gjuhet me nga 7 gurë për secilën shtyllë, duke thënë 'Allahu Akbar' me çdo hedhje.\n• Dua pas gjuajtjes: Pas shtyllës së vogël dhe të mesme është sunnet të qëndrohet nga ana e Kiblës dhe të bëhet dua e gjatë personale. Pas shtyllës së madhe nuk ndalohet për dua.\n• Koha e gjuajtjes: Sipas shumicës së shkollave juridike, gjuajtja në ditët e Teshrikut fillon vetëm pasi të hyjë koha e Drekës (Zevali).",
      "survivalHacks": "• Shmangni kohën e Drekës: Fluksi më i madh i turmës është menjëherë pas Drekës. Presni deri në ikindi ose pas akshamit për një gjuajtje të qetë, të freskët dhe plotësisht të sigurt."
    }
  },
  {
    "id": "step-16-mina-night",
    "chapter": 4,
    "stepNumber": 16,
    "title": "Kalimi i Natës në Mina",
    "location": "Qyteti i Çadrave të Minës — 11-12 Dhul Hixhe",
    "description": "Netët e Teshrikut duhet të kalohen në Mina. Qëndrimi këtu është [wajib|Vaxhib] për haxhinjtë si ndjekje e praktikës së Profetit ﷺ.",
    "image": "/images/step_16_mina_night.png",
    "coordinates": "21.4162,39.8916",
    "details": {
      "steps": [
        "Kthehuni në çadër pas gjuajtjes.",
        "Kaloni të paktën gjysmën e natës fizikisht në Mina — [wajib|Vaxhib].",
        "Pushoni, lexoni Kuran, bëni Dhikr.",
        "Namazet falen të shkurtuara por pa u bashkuar.",
        "Përgatitni gurët për gjuajtjen e nesërme."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Mina përfaqëson thjeshtësinë e plotë. Kalimi i netëve në çadra të thjeshta, krah për krah me miliona besimtarë nga mbarë bota, nxit përulësinë, vëllazërinë universale dhe unitetin e thellë islam.",
      "fiqhRules": "• Detyrimi i qëndrimit ([wajib|Vaxhib]): Kalimi i netëve të 11 dhe 12 të Dhul Hixhes në Mina është [wajib|vaxhib]. Duhet të qëndrohet më shumë se gjysma e natës brenda kufijve të Minës.\n• Fidja e mungesës: Largimi nga Mina pa arsye të fortë kërkon kurban (fidje) për ta plotësuar atë.",
      "survivalHacks": "• Mos shkoni në Makkah: Shumë haxhinj shkojnë në hotelet e tyre në Makkah gjatë këtyre netëve. Kjo ju lodh fizikisht dhe rrezikon thyerjen e vaxhibit të qëndrimit në Mina. Përkushtojuni adhurimit dhe pushimit në çadër."
    }
  },
  {
    "id": "step-17-rami-day2",
    "chapter": 4,
    "stepNumber": 17,
    "title": "Rami — Dita e Dytë e Teshrikut",
    "location": "Mina — 12/13 Dhul Hixhe",
    "description": "Dita e dytë e Teshrikut. Ata që duan të largohen herët mund ta bëjnë pas gjuajtjes së ditës 12 para perëndimit të diellit.",
    "image": "/images/step_17_rami_day2.png",
    "coordinates": "21.4213,39.8732",
    "details": {
      "steps": [
        "Pas Drekës: gjuani të tri [rukn|shtyllat] me radhë (nga 7 gurë secila).",
        "Bëni dua pas së vogëls dhe të mesmes.",
        "Largim i hershëm (Nefari Evvel): largohuni nga Mina para perëndimit të ditës 12.",
        "Largim i vonshëm (Nefari Sani): qëndroni edhe natën e 13-të, gjuani sërish dhe pastaj largohuni."
      ]
    },
    "scholarlyGuide": {
      "spiritualEssence": "Qoftë nëse zgjidhni të largoheni herët ose të qëndroni deri në ditën e fundit, Haxhi na mëson se feja e Allahut është e lehtë dhe e mbushur me mëshirë. Qëndrimi deri në ditën e 13-të është më afër praktikës së plotë të Profetit ﷺ.",
      "fiqhRules": "• Gjuajtja: Tri [rukn|shtyllat] gjuhen pas kohës së Drekës sipas të njëjtit rend (E vogël → E mesme → E madhe).\n• Kushti i largimit të hershëm: Nëse largoheni më 12 Dhul Hixhe, duhet të kaloni kufijtë e Minës PARA perëndimit të diellit. Nëse dielli perëndon ndërkohë që jeni ende brenda Minës, duhet të qëndroni edhe për natën e 13-të dhe të gjuani sërish të nesërmen.\n• Qëndrimi i plotë: Qëndrimi edhe më datë 13 është më i vlefshëm dhe i rekomanduar.",
      "survivalHacks": "• Planifikoni daljen: Nëse do të largoheni më datë 12, përgatitni çantat që në mëngjes dhe nisuni menjëherë pas gjuajtjes për të shmangur bllokimet e mëdha të trafikut."
    }
  },
  {
    "id": "step-18-farewell",
    "chapter": 4,
    "stepNumber": 18,
    "title": "Tavafi i Lamtumirës",
    "location": "Xhamia Haram — Akti Final",
    "description": "Akti i fundit i Haxhit. Tavafi i Lamtumirës është lamtumira e fundit me Qaben — rrotullimet e ndarjes para lënies së Mekës.",
    "image": "/images/step_18_farewell.png",
    "coordinates": "21.4225,39.8262",
    "details": {
      "steps": [
        "Pas largimit nga Mina, shkoni drejtpërdrejt në Xhaminë Haram.",
        "Tavafi i Lamtumirës — 7 rrotullime rreth Qabes.",
        "NUK ka Sa'i pas këtij Tavafi.",
        "Bëni lutjet e fundit personale të lamtumirës.",
        "Pas mbarimit, largohuni menjëherë nga Makkah — pa qëndrime të tjera.",
        "Allahu ua pranom Haxhin!"
      ]
    },
    "scholarlyGuide": {
      "mensesRules": "Gruaja me cikël menstrual është plotësisht e liruar nga Tavafi i Lamtumirës. Ju mund të largoheni nga Meka me grupin tuaj pa pasur nevojë për therjen e kurbanit apo ndonjë fidje tjetër.",
      "spiritualEssence": "Tavafi i Lamtumirës (Tawaf al-Wida) është lamtumira juaj e fundit me Shtëpinë e Allahut. Duke parë Qaben për herë të fundit, ju falënderoni Allahun që ju pranoi si mysafir të Tij dhe luteni që ky të mos jetë vizita juaj e fundit në këtë vend të shenjtë.",
      "fiqhRules": "• Detyrimi ([wajib|Vaxhib]): Tavafi i Lamtumirës është [wajib|vaxhib] për të gjithë haxhinjtë para se të largohen nga Makkah. Terki i tij kërkon therjen e një kurbani.\n• Lehtësimi për Gratë: Gratë me cikël menstrual ose lehonat janë të liruara plotësisht nga ky Tavaf dhe mund të largohen pa pasur nevojë për fidje.\n• Largimi i menjëhershëm: Ky Tavaf duhet të jetë akti juaj absolutisht i fundit në Makkah. Nuk lejohet qëndrimi për blerje, ushqim apo fjetje pas tij. Çdo qëndrim i gjatë kërkon përsëritjen e Tavafit.",
      "survivalHacks": "• Blerjet paraprake: Kryeni të gjitha blerjet e dhuratave dhe paketoni valixhet PARA se të kryeni Tavafin e Lamtumirës, në mënyrë që të niseni menjëherë drejt makinës apo autobusit tuaj pas përfundimit të tij."
    }
  }
]
  }
};

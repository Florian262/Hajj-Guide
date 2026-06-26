export interface CommonDua {
  id: string;
  arabic: string;
  transliteration: string;
  translations: {
    en: string;
    ar: string;
    tr: string;
    sq: string;
  };
  category: 'quran' | 'prophetic' | 'forgiveness' | 'hajj';
}

export const commonDuas: CommonDua[] = [
  {
    id: 'quran-1',
    category: 'quran',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translations: {
      en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
      ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ (سورة البقرة، ٢٠١)',
      tr: 'Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.',
      sq: 'Zoti ynë! Na jep të mira në këtë botë, na jep të mira edhe në botën tjetër dhe na mbro nga dënimi i zjarrit.'
    }
  },
  {
    id: 'quran-2',
    category: 'quran',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَرِ حْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    transliteration: 'Rabbana la tuzigh qulubana ba\'da idh hadaytana wa hab lana mil-ladunka rahmatan innaka antal-wahhab',
    translations: {
      en: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
      ar: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ (سورة آل عمران، ٨)',
      tr: 'Rabbimiz! Bizi hidayete erdirdikten sonra kalplerimizi eğriltme ve bize katından bir rahmet bağışla. Şüphesiz sen çok bağışlayansın.',
      sq: 'Zoti ynë! Mos lejo që zemrat tona të shmangen pasi na udhëzove, dhe na dhuro mëshirë nga ana Jote. Vërtet, Ti je Dhuruesi i madh.'
    }
  },
  {
    id: 'quran-3',
    category: 'quran',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    translations: {
      en: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
      ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا (سورة الفرقان، ٧٤)',
      tr: 'Rabbimiz! Bize gözümüzü aydınlatacak eşler ve zürriyetler bağışla ve bizi takva sahiplerine önder kıl.',
      sq: 'Zoti ynë! Na dhuro nga bashkëshortet tona dhe pasardhësit tanë gëzim për sytë tanë dhe na bëj shembull për të devotshmit.'
    }
  },
  {
    id: 'quran-4',
    category: 'quran',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    transliteration: "Rabbi-j'alni muqimas-salati wa min dhurriyyati Rabbana wa taqabbal du'a",
    translations: {
      en: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.',
      ar: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ (سورة إبراهيم، ٤٠)',
      tr: 'Rabbim! Beni ve neslimi namazı dosdoğru kılanlardan eyle. Rabbimiz! Duamı kabul buyur.',
      sq: 'Zoti im! Më bëj mua dhe një pjesë të pasardhësve të mi falës të namazit. O Zoti ynë! Pranoje lutjen time.'
    }
  },
  {
    id: 'quran-5',
    category: 'quran',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
    transliteration: 'Rabbana-ghfir lana wa li-ikhwaninal-ladhina sabaquna bil-imani wa la taj\'al fi qulubina ghillal-lilladhina amanu Rabbana innaka ra\'ufur-rahim',
    translations: {
      en: 'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.',
      ar: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ (سورة الحشر، ١٠)',
      tr: 'Rabbimiz! Bizi ve bizden önce iman etmiş olan kardeşlerimizi bağışla; kalplerimizde iman edenlere karşı hiçbir kin bırakma. Rabbimiz! Şüphesiz sen çok şefkatli, çok merhametlisin.',
      sq: 'Zoti ynë! Na fal ne dhe vëllezërit tanë që na paraprinë në besim, dhe mos lejo në zemrat tona urrejtje ndaj atyre që besuan. Zoti ynë! Vërtet, Ti je i Butë dhe Mëshirëplotë.'
    }
  },
  {
    id: 'quran-6',
    category: 'quran',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْهَهُوا قَوْلِي',
    transliteration: 'Rabbish-rah li sadri wa yassir li amri wah-lul \'uqdatam-mil-lisani yafqahu qawli',
    translations: {
      en: 'My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.',
      ar: 'رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي * يَفْهَهُوا قَوْلِي (سورة طه، ٢٥-٢٨)',
      tr: 'Rabbim! Göğsümü genişlet, işimi kolaylaştır, dilimdeki düğümü çöz ki sözümü anlasınlar.',
      sq: 'Zoti im! Më zgjero gjoksin tim, ma lehtëso punën time, dhe zgjidhe nyjen nga gjuha ime që ta kuptojnë fjalën time.'
    }
  },
  {
    id: 'quran-7',
    category: 'quran',
    arabic: 'رَبِّ إِنِّى لِمَا أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqir',
    translations: {
      en: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
      ar: 'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ (سورة القصص، ٢٤)',
      tr: 'Rabbim! Bana indireceğin her hayra muhtacım.',
      sq: 'Zoti im! Vërtet, unë jam në nevojë për çfarëdo të mire që më zbret Ti.'
    }
  },
  {
    id: 'quran-8',
    category: 'quran',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wan-surna 'alal-qawmil-kafirin",
    translations: {
      en: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
      ar: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَأَنْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ (سورة البقرة، ٢٥٠)',
      tr: 'Rabbimiz! Üzerimize sabır yağdır, ayaklarımızı sağlam bastır ve kafirler topluluğuna karşı bize yardım et.',
      sq: 'Zoti ynë! Na dhuro durim të madh, na i përforco këmbët tona dhe na ndihmo kundër popullit jobesimtar.'
    }
  },
  {
    id: 'quran-9',
    category: 'quran',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin',
    translations: {
      en: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
      ar: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ (سورة الأعراف، ٢٣)',
      tr: 'Rabbimiz! Biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize acımazsan, mutlaka ziyan edenlerden oluruz.',
      sq: 'Zoti ynë! Ne i kemi bërë padrejtësi vetes tonë, dhe nëse Ti nuk na fal e nuk na mëshiron, me siguri do të jemi nga të humburit.'
    }
  },
  {
    id: 'quran-10',
    category: 'quran',
    arabic: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ * وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
    transliteration: 'Rabbi a\'udhu bika min hamazatish-shayatin wa a\'udhu bika Rabbi ay-yahdurun',
    translations: {
      en: 'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me.',
      ar: 'رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ * وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ (سورة المؤمنون، ٩٧-٩٨)',
      tr: 'Rabbim! Şeytanların kışkırtmalarından sana sığınırım. Onların yanımda bulunmalarından da sana sığınırım Rabbim.',
      sq: 'Zoti im! Të mbështetem Ty nga ngacmimet e djajve, dhe të mbështetem Ty, o Zoti im, që ata mos të më afrohen.'
    }
  },
  {
    id: 'prophetic-1',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: "Allahumma inni as'aluka-l-huda wat-tuqa wal-'afafa wal-ghina",
    translations: {
      en: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى (رواه مسلم)',
      tr: 'Allah\'ım! Senden hidayet, takva, iffet ve gönül zenginliği isterim.',
      sq: 'O Allah! Unë kërkoj nga Ti udhëzim, devotshmëri, pastërti shpirtërore dhe pasuri shpirtërore (mjaftueshmëri).'
    }
  },
  {
    id: 'prophetic-2',
    category: 'prophetic',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik",
    translations: {
      en: 'O Controller of hearts, make my heart steadfast in Your religion.',
      ar: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ (رواه الترمذي)',
      tr: 'Ey kalpleri çekip çeviren Rabbim! Kalbimi dinin üzere sabit kıl.',
      sq: 'O Rrotullues i zemrave! Përforcoje zemrën time në fenë Tënde.'
    }
  },
  {
    id: 'prophetic-3',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْهَرَمِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ',
    transliteration: "Allahumma inni a'udhu bika minal-'ajzi wal-kasali wal-jubni wal-harami wal-bukhli, wa a'udhu bika min 'adhabil-qabri wa min fitnatil-mahya wal-mamat",
    translations: {
      en: 'O Allah, I seek refuge in You from incapacity, laziness, cowardice, senility, and miserliness, and I seek refuge in You from the punishment of the grave, and from the trials of life and death.',
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْهَرَمِ وَالْبُخْلِ... (رواه البخاري)',
      tr: 'Allah\'ım! Acizlikten, tembellikten, korkaklıktan, ihtiyarlıktan ve cimrilikten sana sığınırım. Kabir azabından, hayatın ve ölümün fitnesinden de sana sığınırım.',
      sq: 'O Allah! Kërkoj mbrojtje tek Ti nga pafuqia, dembelizmi, frika, pleqëria e rëndë dhe koprracia. Dhe kërkoj mbrojtje tek Ti nga dënimi i varrit dhe sprovat e jetës e të vdekjes.'
    }
  },
  {
    id: 'prophetic-4',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban wa 'amalan mutaqabbalan",
    translations: {
      en: 'O Allah, I ask You for beneficial knowledge, goodly provision, and acceptable deeds.',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا (رواه ابن ماجه)',
      tr: 'Allah\'ım! Senden faydalı bir ilim, temiz bir rızık ve kabul olunan bir amel dilerim.',
      sq: 'O Allah! Unë kërkoj nga Ti dituri të dobishme, furnizim të mirë dhe vepër të pranuar.'
    }
  },
  {
    id: 'prophetic-5',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    transliteration: "Allahumma inni as'aluka al-'afiyah fid-dunya wal-akhirah",
    translations: {
      en: 'O Allah, I ask You for well-being in this world and the Hereafter.',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ (رواه أبو داود)',
      tr: 'Allah\'ım! Senden dünya ve ahirette afiyet dilerim.',
      sq: 'O Allah! Unë të kërkoj Ty shëndet e mirëqenie (afijet) në këtë botë dhe në botën tjetër.'
    }
  },
  {
    id: 'prophetic-6',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي',
    transliteration: "Allahumma aslih li diniyalladhi huwa 'ismatu amri wa aslih li dunyayallati fiha ma'ashi wa aslih li akhiratiyallati fiha ma'adi",
    translations: {
      en: 'O Allah, set right my religion which is the safeguard of my affairs, and set right my worldly life in which is my livelihood, and set right my Hereafter which is my place of return.',
      ar: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ... (رواه مسلم)',
      tr: 'Allah\'ım! Dinimi düzelt ki o benim işlerimin güvencesidir. Dünyamı düzelt ki o benim geçim kaynağımdır. Ahiretimi düzelt ki o benim dönüş yerimdir.',
      sq: 'O Allah! Rregulloje fenë time e cila është mbrojtja e çështjeve të mia, rregulloje dynjanë time ku unë jetoj, dhe rregulloje ahiretin tim ku është kthimi im.'
    }
  },
  {
    id: 'prophetic-7',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translations: {
      en: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
      ar: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ (رواه أبو داود)',
      tr: 'Allah\'ım! Seni anmak, sana şükretmek ve sana güzelce kulluk etmek için bana yardım et.',
      sq: 'O Allah! Më ndihmo që të të kujtoj Ty, të të falënderoj Ty dhe të të adhuroj në mënyrën më të mirë.'
    }
  },
  {
    id: 'prophetic-8',
    category: 'prophetic',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: "Allahummak-fini bi-halalika 'an haramika wa aghnini bi-fadlika 'amman siwak",
    translations: {
      en: 'O Allah, suffice me with Your lawful self-sufficiency instead of Your unlawful, and make me rich by Your grace so that I may care for none but You.',
      ar: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ (رواه الترمذي)',
      tr: 'Allah\'ım! Helalinden bana yetecek kadar vererek beni haramından koru, lütfunla beni senden başkasına muhtaç etme.',
      sq: 'O Allah! Më mjafto mua me të lejuarën Tënde (hallallin) ndaj të ndaluarës Tënde (haramit), dhe më bëj të pavarur me mirësinë Tënde nga çdokush tjetër përveç Teje.'
    }
  },
  {
    id: 'forgiveness-1',
    category: 'forgiveness',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi-ni'matika 'alayya wa abu'u laka bi-dhambi faghfir li fa-innahu la yaghfirudh-dhunuba illa ant",
    translations: {
      en: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I remain faithful to my covenant and my promise to the best of my ability. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You. (Sayyidul Istighfar)',
      ar: 'سَيِّدُ الِاسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي... (رواه البخاري)',
      tr: 'Seyyidül İstiğfar (Tövbenin Efendisi): Allah\'ım, sen benim Rabbimsin, senden başka ilah yoktur. Beni sen yarattın, ben senin kulunum; gücüm yettiğince ahdim ve vaadim üzereyim. Yaptıklarımın şerrinden sana sığınırım...',
      sq: 'Zotëria i Istigfarit (Lutja më e lartë për falje): O Allah! Ti je Zoti im, nuk ka zot tjetër përveç Teje. Ti më krijove dhe unë jam robi Yt, dhe do t\'i përmbahem besëlidhjes dhe premtimit Tënd sa të mundem. Kërkoj mbrojtje tek Ti nga e keqja që kam bërë...'
    }
  },
  {
    id: 'forgiveness-2',
    category: 'forgiveness',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
    translations: {
      en: 'O Allah, indeed You are Pardoning, You love to pardon, so pardon me.',
      ar: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي (رواه الترمذي)',
      tr: 'Allah\'ım! Şüphesiz sen çok affedicisin, affetmeyi seversin, beni de affet.',
      sq: 'O Allah! Vërtet, Ti je Falës, e dëshiron faljen, prandaj më fal mua.'
    }
  },
  {
    id: 'forgiveness-3',
    category: 'forgiveness',
    arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ',
    transliteration: "Allahummagh-fir li dhambi kullahu diqqahu wa jillahu wa awwalahu wa akhirahu wa 'alaniyatahu wa sirrah",
    translations: {
      en: 'O Allah, forgive me all my sins, the small and the great, the first and the last, the open and the secret.',
      ar: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ... (رواه مسلم)',
      tr: 'Allah\'ım! Günahlarımın küçüğünü büyüğünü, öncesini sonrasını, açığını gizlisini, hepsini bağışla.',
      sq: 'O Allah! Më fal të gjitha mëkatet e mia, të voglat dhe të mëdhatë, të parat dhe të fundit, ato që bëhen hapur dhe ato që bëhen fshehur.'
    }
  },
  {
    id: 'forgiveness-4',
    category: 'forgiveness',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbigh-fir war-ham wa anta khayrur-rahimin',
    translations: {
      en: 'My Lord, forgive and have mercy, and You are the best of the merciful.',
      ar: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ (سورة المؤمنون، ١١٨)',
      tr: 'Rabbim! Bağışla ve merhamet et, sen merhamet edenlerin en hayırlısısın.',
      sq: 'Zoti im! Fal dhe mëshiro, sepse Ti je më i miri i mëshiruesve.'
    }
  },
  {
    id: 'forgiveness-5',
    category: 'forgiveness',
    arabic: 'اللَّهُمَّ إِنِّى ظَلَمْتُ نَفْسِى ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ فَاغْفِرْ لِى مَغْفِرَةً مِّنْ عِندِكَ وَارْحَمْنِى ۖ إِنَّكَ أَنتَ الْغَفُورُ الرَّحِيمُ',
    transliteration: "Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta, faghfir li maghfiratam-min 'indika war-hamni innaka antal-ghafurur-rahim",
    translations: {
      en: 'O Allah, I have wronged myself greatly, and none can forgive sins except You; so grant me forgiveness from You and have mercy on me. Indeed, You are the Forgiving, the Merciful.',
      ar: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ... (رواه البخاري)',
      tr: 'Allah\'ım! Ben kendime çok zulmettim, günahları ise ancak sen bağışlarsın. Katından bir mağfiretle beni bağışla ve bana merhamet et. Şüphesiz sen çok bağışlayansın, çok merhamet edensin.',
      sq: 'O Allah! Unë i kam bërë shumë padrejtësi vetes sime, ndërsa askush nuk i fal mëkatet përveç Teje. Prandaj më fal me një falje nga ana Jote dhe më mëshiro. Vërtet, Ti je Falësi, Mëshiruesi.'
    }
  },
  {
    id: 'forgiveness-6',
    category: 'forgiveness',
    arabic: 'اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي',
    transliteration: 'Allahummagh-fir li khati\'ati wa jahli wa israfi fi amri wa ma anta a\'lamu bihi minni',
    translations: {
      en: 'O Allah, forgive my mistakes, my ignorance, my excess in my affairs, and what You know best of me.',
      ar: 'اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي وَإِسْرَافِي فِي أَمْرِي... (رواه البخاري)',
      tr: 'Allah\'ım! Hatalarımı, bilgisizliğimi, işimdeki aşırılığımı ve benden daha iyi bildiğin günahlarımı bağışla.',
      sq: 'O Allah! Më fal gabimet e mia, injorancën time, teprimin në çështjet e mia dhe gjithçka që Ti e di më mirë se unë.'
    }
  },
  {
    id: 'forgiveness-7',
    category: 'forgiveness',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    transliteration: "Astaghfirullahal-'adhim al-ladhi la ilaha illa Huwal-Hayyul-Qayyum wa atubu ilayh",
    translations: {
      en: 'I seek the forgiveness of Allah the Almighty, whom there is no deity except Him, the Ever-Living, the Sustainer, and I repent to Him.',
      ar: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ (رواه أبو داود)',
      tr: 'Kendirinden başka hiçbir ilah olmayan, diri ve her şeyi ayakta tutan Yüce Allah\'tan bağışlanma diler ve tövbe ederim.',
      sq: 'Kërkoj falje tek Allahu i Madhërishëm, përveç të Cilit nuk ka zot tjetër, i Gjallë dhe i Vetëmjaftueshëm, dhe tek Ai pendohem.'
    }
  },
  {
    id: 'forgiveness-8',
    category: 'forgiveness',
    arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    transliteration: "Rabbigh-fir li wa tub 'alayya innaka antat-tawwabur-rahim",
    translations: {
      en: 'My Lord, forgive me and accept my repentance, indeed You are the Accepting of repentance, the Merciful.',
      ar: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ (رواه أبو داود)',
      tr: 'Rabbim, beni bağışla ve tövbemi kabul et; şüphesiz sen tövbeleri kabul edensin, merhametlisin.',
      sq: 'Zoti im, më fal dhe ma prano pendimin tim, vërtet Ti je Pendimpranuesi, Mëshiruesi.'
    }
  },
  {
    id: 'hajj-1',
    category: 'hajj',
    arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    transliteration: 'Labbayk Allahumma labbayk, labbayk la sharika laka labbayk, innal-hamda wan-ni\'mata laka wal-mulk, la sharika lak',
    translations: {
      en: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise and grace are Yours, and sovereignty. You have no partner. (The Talbiyah)',
      ar: 'التَّلْبِيَةُ: لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ...',
      tr: 'Lebbeyk Allahümme lebbeyk, lebbeyke lâ şerîke leke lebbeyk, innel-hamde ven-ni\'mete leke vel-mülk, lâ şerîke lek.',
      sq: 'Tebijeti: Të përgjigjem Ty o Allah, të përgjigjem Ty. Të përgjigjem Ty, Ti nuk ke ortak, të përgjigjem Ty. Vërtet, falënderimi, mirësia dhe sundimi të takojnë vetëm Ty, Ti nuk ke ortak.'
    }
  },
  {
    id: 'hajj-2',
    category: 'hajj',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
    translations: {
      en: 'There is no deity except Allah, alone, without partner. To Him belongs sovereignty, and to Him belongs all praise, and He is over all things competent. (Dua of Arafat)',
      ar: 'دُعَاءُ يَوْمِ عَرَفَةَ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ... (رواه الترمذي)',
      tr: 'Arafat Günü Duası: Allah\'tan başka ilah yoktur, O tektir, ortağı yoktur. Mülk O\'nundur, hamd O\'nadır ve O her şeye kadirdir.',
      sq: 'Lutja e Ditës së Arafatit: Nuk ka zot tjetër përveç Allahut, Një dhe i vetëm, pa ortak. Atij i takon sundimi dhe falënderimi, dhe Ai është i Fuqishëm mbi çdo gjë.'
    }
  },
  {
    id: 'hajj-3',
    category: 'hajj',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translations: {
      en: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire. (Recited between the Yemeni Corner and the Black Stone during Tawaf)',
      ar: 'بَيْنَ الرُّكْنِ الْيَمَانِي وَالْحَجَرِ الْأَسْوَدِ: رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً...',
      tr: 'Rükn-ü Yemânî ile Hacer-ül Esved arasında okunan dua: Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.',
      sq: 'Midis Këndit Jemenit dhe Gurit të Zi gjatë Tavafit: Zoti ynë! Na jep të mira në këtë botë, na jep të mira edhe në botën tjetër dhe na mbro nga dënimi i zjarrit.'
    }
  },
  {
    id: 'hajj-4',
    category: 'hajj',
    arabic: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَذَنْبًا مَغْفُورًا وَسَعْيًا مَشْكُورًا',
    transliteration: "Allahummaj-'alhu hajjan mabruran wa dhanban maghfuran wa sa'yan mashkuran",
    translations: {
      en: 'O Allah, make it an accepted Hajj, a forgiven sin, and an appreciated effort.',
      ar: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَذَنْبًا مَغْفُورًا وَسَعْيًا مَشْكُورًا (دعاء الحج والنسك)',
      tr: 'Allah\'ım, haccımızı mebrur, günahlarımızı mağfur, amelimizi makbul ve çabamızı meşkûr eyle.',
      sq: 'O Allah! Bëje këtë haxh të pranuar (mebrur), mëkat të falur dhe përpjekje të shpërblyer.'
    }
  },
  {
    id: 'hajj-5',
    category: 'hajj',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا دَائِمًا، وَأَسْأَلُكَ قَلْبًا خَاشِعًا، وَأَسْأَلُكَ عِلْمًا نَافِعًا، وَأَسْأَلُكَ يَقِينًا صَادِقًا',
    transliteration: "Allahumma inni as'aluka imanan da'iman, wa as'aluka qalban khashi'an, wa as'aluka 'ilman nafi'an, wa as'aluka yaqinan sadiqan",
    translations: {
      en: 'O Allah, I ask You for permanent faith, a humble heart, beneficial knowledge, and true certainty.',
      ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا دَائِمًا، وَأَسْأَلُكَ قَلْبًا خَاشِعًا، وَأَسْأَلُكَ عِلْمًا نَافِعًا...',
      tr: 'Allah\'ım! Senden daimi bir iman, huşu duyan bir kalp, faydalı bir ilim ve doğru bir yakîn dilerim.',
      sq: 'O Allah! Unë të kërkoj Ty besim të palëkundur, zemër të përulur, dituri të dobishme dhe bindje të vërtetë.'
    }
  },
  {
    id: 'hajj-6',
    category: 'hajj',
    arabic: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'A\'udhu billahil-\'adhim, wa bi-wajhihil-\'karim, wa sultanihil-qadim, minash-shaytanir-rajim',
    translations: {
      en: 'I seek refuge in Allah the Almighty, in His Noble Face, and in His Eternal Power, from Satan the outcast. (Dua upon entering Masjid al-Haram)',
      ar: 'دُعَاءُ دُخُولِ الْمَسْجِدِ الْحَرَامِ: أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ...',
      tr: 'Mescid-i Haram\'a girerken okunan dua: Kovulmuş şeytandan Yüce Allah\'a, O\'nun kerem sahibi yüzüne ve ezeli hükümranlığına sığınırım.',
      sq: 'Lutja e hyrjes në Mesxhid el-Haram: Kërkoj mbrojtje tek Allahu i Madhërishëm, me fytyrën e Tij të Ndershme dhe sundimin e Tij të Hershëm, nga shejtani i mallkuar.'
    }
  }
];

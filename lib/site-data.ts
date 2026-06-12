// Centralized brand and content data for Creavix
// Based on real content from www.creavixit.com + master rebuild spec

export type ServiceIcon =
  | 'Sparkles'
  | 'Megaphone'
  | 'Film'
  | 'Package'
  | 'Landmark'
  | 'Wand2';

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title_en: string;
  title_bn: string;
  desc_en: string;
  desc_bn: string;
  bullets_bn: string[];
}

export interface PricingPlan {
  name_en: string;
  name_bn: string;
  originalBDT: number;
  priceBDT: number;
  duration?: string;
  features_bn: string[];
  features_en: string[];
  highlight?: boolean;
}

export interface PricingCategory {
  slug: string;
  title_en: string;
  title_bn: string;
  blurb_bn: string;
  plans: PricingPlan[];
}

export interface Review {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rating: number;
  text_bn?: string;
  text_en?: string;
  lang: 'bn' | 'en';
  createdAt: string;
  verified: boolean;
}

export interface Showcase {
  title_en: string;
  title_bn: string;
  sub_en: string;
  ids: string[];
}

export interface ClientLogo {
  name: string;
  src: string;
}

export const SITE = {
  name: 'Creavix',
  brand: 'Creavix IT Solution',
  tagline_en: 'AI Video Marketing Agency',
  tagline_bn: 'এআই ভিডিও মার্কেটিং এজেন্সি',
  shortDesc:
    "Bangladesh's premier AI-powered video marketing studio. Cinematic ads for Meta, YouTube and TikTok, storytelling films and bilingual brand campaigns.",
  url: 'https://www.creavixit.com',
  hotline: '+880 9611-132835',
  whatsapp: '+8801890484355',
  whatsappRaw: '8801890484355',
  whatsappLink: 'https://wa.me/8801890484355',
  email1: 'info@creavixit.com',
  email2: 'creavixbd@gmail.com',
  address_en: 'Hemayetpur, Savar, Dhaka, 1340, Bangladesh',
  address_bn: 'হেমায়েতপুর, সাভার, ঢাকা, ১৩৪০',
  servingSince: 2014,
  founder: {
    name: 'Hannan Khan',
    role_en: 'Founder & CEO',
    role_bn: 'প্রতিষ্ঠাতা ও সিইও',
    fb_url: 'https://web.facebook.com/HannanKhanDesigner/',
    image: '/team/hannan-khan.jpg',
  },
  management: {
    name: 'Sabbir Khan',
    role_en: 'Management & Operations',
    role_bn: 'ম্যানেজমেন্ট ও পরিচালনা',
    fb_url: 'https://web.facebook.com/sabbirkhanmotivation',
    image: '/team/sabbir-khan.jpg',
  },
  // Approximate Hemayetpur, Savar coords (used for embedded Google Map)
  // Update precise studio coords here when finalized
  geo: { lat: 23.85, lng: 90.21 },
} as const;

export const NAV_LINKS: { label_en: string; label_bn: string; href: string }[] = [
  { label_en: 'Home', label_bn: 'হোম', href: '/' },
  { label_en: 'Services', label_bn: 'সার্ভিস', href: '/services' },
  { label_en: 'Portfolio', label_bn: 'পোর্টফোলিও', href: '/portfolio' },
  { label_en: 'About', label_bn: 'আমাদের সম্পর্কে', href: '/about' },
  { label_en: 'Pricing', label_bn: 'মূল্য', href: '/pricing' },
  { label_en: 'Reviews', label_bn: 'রিভিউ', href: '/reviews' },
  { label_en: 'Contact', label_bn: 'যোগাযোগ', href: '/contact' },
];

export const SOCIAL_LINKS = [
  { key: 'facebook', name: 'Facebook', handle: '@CreavixITSolution', url: 'https://www.facebook.com/CreavixITSolution' },
  { key: 'instagram', name: 'Instagram', handle: '@creavixitsolution', url: 'https://www.instagram.com/creavixitsolution' },
  { key: 'youtube', name: 'YouTube', handle: '@CreavixiTsolution', url: 'https://www.youtube.com/@CreavixiTsolution' },
  { key: 'tiktok', name: 'TikTok', handle: '@creavixitsolution', url: 'https://www.tiktok.com/@creavixitsolution' },
  { key: 'linkedin', name: 'LinkedIn', handle: 'creavix-it-solution', url: 'https://www.linkedin.com/in/creavix-it-solution' },
  { key: 'x', name: 'X / Twitter', handle: '@creavixit', url: 'https://x.com/creavixit' },
  { key: 'whatsapp', name: 'WhatsApp', handle: '+8801890484355', url: 'https://wa.me/8801890484355' },
] as const;

export const SERVICES: Service[] = [
  {
    slug: 'ai-video-ads',
    icon: 'Sparkles',
    title_en: 'AI Video Ads',
    title_bn: 'এআই ভিডিও অ্যাড',
    desc_en:
      'AI-assisted, realistic video ads engineered to convert viewers into customers across Meta, YouTube and TikTok.',
    desc_bn:
      'মেটা, ইউটিউব ও টিকটকের জন্য বাস্তবধর্মী, কনভার্সন-কেন্দ্রিক এআই ভিডিও অ্যাড তৈরি করি।',
    bullets_bn: [
      'হুক-ফার্স্ট স্ক্রিপ্ট ও স্টোরি ডিরেকশন',
      'একাধিক ভ্যারিয়েশন (৯:১৬, ১:১, ১৬:৯)',
      'প্ল্যাটফর্ম-রেডি এক্সপোর্ট',
      'বাংলা ও ইংরেজি সাবটাইটেল',
    ],
  },
  {
    slug: 'promotional-videos',
    icon: 'Megaphone',
    title_en: 'Promotional Videos',
    title_bn: 'প্রমোশনাল ভিডিও',
    desc_en:
      'High-impact promos for launches, offers and campaigns with crisp messaging and cinematic pacing.',
    desc_bn:
      'অফার, ক্যাম্পেইন ও লঞ্চের জন্য পরিষ্কার বার্তা ও সিনেম্যাটিক উপস্থাপনায় প্রমোশনাল ভিডিও।',
    bullets_bn: [
      'লঞ্চ, অফার ও ব্র্যান্ড ক্যাম্পেইন',
      'কাস্টম মিউজিক ও ভয়েসওভার',
      'মোশন গ্রাফিক্স ও কালার গ্রেডিং',
      'দ্রুত ডেলিভারি (২৪–৪৮ ঘণ্টা)',
    ],
  },
  {
    slug: 'cinematic-storytelling',
    icon: 'Film',
    title_en: 'Cinematic Storytelling',
    title_bn: 'সিনেম্যাটিক স্টোরিটেলিং',
    desc_en:
      'Story-driven films that build brand memory and emotional trust through premium visuals and pacing.',
    desc_bn: 'গল্পভিত্তিক ভিজ্যুয়াল দিয়ে ব্র্যান্ড মেমরি ও বিশ্বাস তৈরি করার ভিডিও।',
    bullets_bn: [
      '১ মিনিট সিনেম্যাটিক ফিল্ম',
      'প্রিমিয়াম স্ক্রিপ্ট ও ভিজ্যুয়াল',
      'কাস্টম সাউন্ড ডিজাইন',
      'মাল্টি-ফরম্যাট মাস্টার ফাইল',
    ],
  },
  {
    slug: 'product-brand-ads',
    icon: 'Package',
    title_en: 'Product & Brand Ads',
    title_bn: 'প্রোডাক্ট ও ব্র্যান্ড অ্যাড',
    desc_en:
      'Ad creatives focused on product benefits, hero visuals and conversion-first call-to-actions.',
    desc_bn: 'পণ্যের সুবিধা, ভিজ্যুয়াল ও কনভার্সন-ফোকাসড কল-টু-অ্যাকশনসহ ব্র্যান্ড অ্যাড।',
    bullets_bn: [
      'প্রোডাক্ট হিরো শট ও ৩৬০° ভিউ',
      'বেনিফিট-ড্রিভেন কপি',
      'A/B টেস্টিং রেডি ভ্যারিয়েশন',
      'ই-কমার্স প্ল্যাটফর্ম রেডি',
    ],
  },
  {
    slug: 'financial-video-ads',
    icon: 'Landmark',
    title_en: 'Financial Video Ads',
    title_bn: 'ফাইন্যান্সিয়াল ভিডিও অ্যাড',
    desc_en:
      'Trust-building campaigns for banks, insurance, MFS and fintech brands with compliant storytelling.',
    desc_bn: 'ব্যাংক, ইন্স্যুরেন্স, এমএফএস ও ফিনটেকের জন্য বিশ্বাসযোগ্য ভিডিও অ্যাড।',
    bullets_bn: [
      'ব্যাংক, MFS ও ফিনটেক স্পেশালিস্ট',
      'কমপ্লায়েন্স-চেকড স্ক্রিপ্ট',
      'ট্রাস্ট-বিল্ডিং ভিজ্যুয়াল',
      'বাংলা-ইংরেজি ডুয়াল ভার্সন',
    ],
  },
  {
    slug: 'custom-projects',
    icon: 'Wand2',
    title_en: 'Custom Projects',
    title_bn: 'কাস্টম প্রজেক্ট',
    desc_en:
      'Tailored video production for unique client needs from concept to final delivery and optimization.',
    desc_bn: 'কনসেপ্ট থেকে ফাইনাল ডেলিভারি পর্যন্ত কাস্টম ভিডিও প্রোডাকশন সাপোর্ট।',
    bullets_bn: [
      'ইন্ডাস্ট্রি-স্পেসিফিক কনসেপ্ট',
      'ফাউন্ডার-লেড ক্রিয়েটিভ ডিরেকশন',
      'ফুল-সাইকেল প্রোডাকশন',
      'প্রায়োরিটি সাপোর্ট',
    ],
  },
];

export const TRUST_PILLARS = [
  {
    icon: 'Cpu',
    title_en: 'AI-First Production',
    title_bn: 'এআই-ফার্স্ট প্রোডাকশন',
    desc_bn: 'আধুনিক AI টুল দিয়ে দ্রুত, স্মার্ট ও প্রিমিয়াম ভিডিও।',
  },
  {
    icon: 'Clapperboard',
    title_en: 'Cinematic Quality',
    title_bn: 'সিনেম্যাটিক কোয়ালিটি',
    desc_bn: 'কালার গ্রেডিং, সাউন্ড ডিজাইন ও পেসিং — গ্লোবাল স্ট্যান্ডার্ড।',
  },
  {
    icon: 'Zap',
    title_en: 'Fast Delivery',
    title_bn: 'দ্রুত ডেলিভারি',
    desc_bn: 'শর্ট ভিডিও ২৪ ঘণ্টায়, বড় প্রজেক্টও ৪৮ ঘণ্টায়।',
  },
  {
    icon: 'Workflow',
    title_en: 'Custom Workflow',
    title_bn: 'কাস্টম ওয়ার্কফ্লো',
    desc_bn: 'প্রতিটি ব্র্যান্ডের জন্য আলাদা ব্রিফ ও স্ক্রিপ্ট ফ্লো।',
  },
  {
    icon: 'Eye',
    title_en: 'Realistic Output',
    title_bn: 'রিয়েলিস্টিক আউটপুট',
    desc_bn: 'AI ভিডিও — কৃত্রিম নয়, বাস্তব মনে হবে।',
  },
  {
    icon: 'Award',
    title_en: 'Experience Since 2014',
    title_bn: '২০১৪ থেকে অভিজ্ঞতা',
    desc_bn: '১০+ বছরের ক্যাম্পেইন প্রোডাকশন অভিজ্ঞতা।',
  },
  {
    icon: 'MapPin',
    title_en: 'Real Studio in Savar',
    title_bn: 'বাস্তব স্টুডিও — সাভারে',
    desc_bn: 'হেমায়েতপুর, সাভারে আমাদের রিয়েল অফিস ও টিম।',
  },
  {
    icon: 'ShieldCheck',
    title_en: 'Money-Back Guarantee',
    title_bn: 'মানি-ব্যাক গ্যারান্টি',
    desc_bn: 'এগ্রিড স্কোপে ডেলিভারি না হলে স্পষ্ট প্রোটেকশন।',
  },
] as const;

export const PROCESS_STEPS = [
  { step: '01', title_en: 'Brief & Strategy', title_bn: 'ব্রিফ ও স্ট্র্যাটেজি', desc_bn: 'লক্ষ্য, অডিয়েন্স ও প্ল্যাটফর্মে অ্যালাইনমেন্ট।' },
  { step: '02', title_en: 'Script & Concept', title_bn: 'স্ক্রিপ্ট ও কনসেপ্ট', desc_bn: 'হুক-ফার্স্ট স্ক্রিপ্ট ও মুড বোর্ড।' },
  { step: '03', title_en: 'AI Video Production', title_bn: 'এআই ভিডিও প্রোডাকশন', desc_bn: 'সিনেম্যাটিক AI সিন, ভয়েসওভার, সাউন্ড ডিজাইন।' },
  { step: '04', title_en: 'Delivery & Optimization', title_bn: 'ডেলিভারি ও অপ্টিমাইজেশন', desc_bn: 'প্ল্যাটফর্ম-রেডি এক্সপোর্ট ও সাবটাইটেল।' },
] as const;

export const PRICING: PricingCategory[] = [
  {
    slug: 'storytelling',
    title_en: 'Story Telling Video',
    title_bn: 'স্টোরি টেলিং ভিডিও',
    blurb_bn: '১ মিনিট প্রিমিয়াম সিনেম্যাটিক ভিডিও — ৫০% ডিসকাউন্ট চলছে।',
    plans: [
      {
        name_en: 'Modern Quality',
        name_bn: 'মডার্ন কোয়ালিটি',
        originalBDT: 4000,
        priceBDT: 2000,
        duration: '১ মিনিট',
        features_bn: [
          'মডার্ন কোয়ালিটি ভিজ্যুয়াল',
          'হুক-ফার্স্ট স্ক্রিপ্ট',
          'বাংলা/ইংরেজি ভয়েসওভার',
          'সাবটাইটেল ও মিউজিক',
          '২ রিভিশন',
        ],
        features_en: [
          'Modern quality cinematic visuals',
          'Hook-first script',
          'BN/EN voiceover',
          'Subtitles + licensed music',
          '2 revision rounds',
        ],
      },
      {
        name_en: 'Premium Quality',
        name_bn: 'প্রিমিয়াম কোয়ালিটি',
        originalBDT: 5000,
        priceBDT: 2500,
        duration: '১ মিনিট',
        highlight: true,
        features_bn: [
          'প্রিমিয়াম সিনেম্যাটিক ভিজ্যুয়াল',
          'কাস্টম স্ক্রিপ্ট ও মুড বোর্ড',
          'প্রফেশনাল ভয়েসওভার',
          'মাল্টি-ফরম্যাট এক্সপোর্ট',
          '৩ রিভিশন',
          'প্রায়োরিটি ডেলিভারি',
        ],
        features_en: [
          'Premium cinematic visuals',
          'Custom script + mood board',
          'Pro voiceover artist',
          'Multi-format export',
          '3 revision rounds',
          'Priority delivery',
        ],
      },
      {
        name_en: 'Pro Level Quality',
        name_bn: 'প্রো লেভেল কোয়ালিটি',
        originalBDT: 6000,
        priceBDT: 3000,
        duration: '১ মিনিট',
        features_bn: [
          'প্রো-লেভেল সিনেম্যাটিক প্রোডাকশন',
          'মাস্টার ফাইল + এডিটেবল প্রজেক্ট',
          'একাধিক ভয়েস স্টাইল',
          'ফুল কাস্টম সাউন্ড ডিজাইন',
          '৪ রিভিশন',
          'ফাউন্ডার-লেড ডিরেকশন',
        ],
        features_en: [
          'Pro-level cinematic production',
          'Master file + editable project',
          'Multiple voice styles',
          'Full custom sound design',
          '4 revision rounds',
          'Founder-led direction',
        ],
      },
    ],
  },
  {
    slug: 'product',
    title_en: 'Product Video',
    title_bn: 'প্রোডাক্ট ভিডিও',
    blurb_bn: 'ই-কমার্স ও ব্র্যান্ড লঞ্চের জন্য কনভার্সন-ফোকাসড প্রোডাক্ট ভিডিও।',
    plans: [
      {
        name_en: 'Basic',
        name_bn: 'বেসিক',
        originalBDT: 2400,
        priceBDT: 1200,
        features_bn: [
          'বেসিক প্রোডাক্ট হিরো শট',
          'একটি ফরম্যাট (৯:১৬ বা ১৬:৯)',
          'লাইসেন্সড মিউজিক',
          '২ রিভিশন',
        ],
        features_en: [
          'Basic product hero shot',
          '1 aspect ratio (9:16 or 16:9)',
          'Licensed music',
          '2 revision rounds',
        ],
      },
      {
        name_en: 'Standard',
        name_bn: 'স্ট্যান্ডার্ড',
        originalBDT: 3000,
        priceBDT: 1500,
        highlight: true,
        features_bn: [
          'মাল্টি-অ্যাঙ্গেল প্রোডাক্ট শট',
          '২টি ফরম্যাট',
          'কাস্টম ভয়েসওভার',
          'A/B হুক ভ্যারিয়েশন',
          '৩ রিভিশন',
        ],
        features_en: [
          'Multi-angle product shots',
          '2 aspect ratios',
          'Custom voiceover',
          'A/B hook variations',
          '3 revision rounds',
        ],
      },
      {
        name_en: 'Pro',
        name_bn: 'প্রো',
        originalBDT: 3600,
        priceBDT: 1800,
        features_bn: [
          'প্রিমিয়াম প্রোডাক্ট সিনেম্যাটিক্স',
          '৩টি ফরম্যাট + master',
          'সাউন্ড ডিজাইন',
          'কম্প্লিট ক্যাম্পেইন রেডি',
          '৪ রিভিশন',
        ],
        features_en: [
          'Premium product cinematics',
          '3 aspect ratios + master',
          'Custom sound design',
          'Complete campaign-ready',
          '4 revision rounds',
        ],
      },
    ],
  },
];

export const FAQS = [
  {
    q_bn: 'ভিডিও ডেলিভারি কত দ্রুত?',
    q_en: 'How fast is delivery?',
    a_bn: 'শর্ট ভিডিও সাধারণত ২৪–৪৮ ঘণ্টায়, বড় প্রজেক্ট ব্রিফ ও রিভিশনের উপর নির্ভর করে।',
    a_en: 'Short ads usually 24–48 hours; longer projects depend on scope and revisions.',
  },
  {
    q_bn: 'বাংলা ও ইংরেজি ভার্সন একসাথে পাওয়া যাবে?',
    q_en: 'Do you support bilingual versions?',
    a_bn: 'হ্যাঁ, আমরা প্রায়শই দু-ভাষার স্ক্রিপ্ট, সাবটাইটেল ও ভয়েসওভার একসাথে দিই।',
    a_en: 'Yes — we regularly produce parallel BN/EN scripts, subtitles and voiceovers.',
  },
  {
    q_bn: 'রিভিশন কয়টা পাবো?',
    q_en: 'How many revisions are included?',
    a_bn: 'প্যাকেজ অনুযায়ী ২–৪টি রিভিশন বিনামূল্যে। অতিরিক্ত প্রয়োজন হলে ছোট ফি দিয়ে আরো করানো যায়।',
    a_en: 'Each package includes 2–4 free revisions; additional rounds available for a small fee.',
  },
  {
    q_bn: 'মানি-ব্যাক গ্যারান্টি কেমন?',
    q_en: 'What is the money-back guarantee?',
    a_bn: 'এগ্রিড স্কোপে ডেলিভারি না হলে স্পষ্ট প্রোটেকশন। স্কোপিং কলে detail বলা হবে।',
    a_en: 'If a committed scope is not delivered as agreed, a clear protection applies. Discussed during scoping.',
  },
  {
    q_bn: 'অর্ডার কীভাবে দিব?',
    q_en: 'How do I order?',
    a_bn: 'WhatsApp, ইমেইল বা Contact পেজের ফর্ম দিয়ে। সাধারণত কয়েক ঘণ্টায় উত্তর দিই।',
    a_en: 'Via WhatsApp, email, or the Contact form. We usually reply within a few hours.',
  },
] as const;

export const REVIEWS_SEED: Review[] = [
  {
    id: 'r1',
    name: 'Rahim K.',
    email: 'ra***@gmail.com',
    rating: 5,
    text_bn: 'AI ভিডিও অ্যাড দিয়ে আমাদের ROAS অনেক বেড়েছে। সিনেম্যাটিক ফিল ও স্পষ্ট স্টোরিটেলিং।',
    text_en: 'AI video ad boosted our ROAS significantly. Cinematic feel and clear storytelling.',
    lang: 'bn',
    createdAt: '2026-04-12',
    verified: true,
  },
  {
    id: 'r2',
    name: 'Sajjad H.',
    email: 'sa***@yahoo.com',
    rating: 5,
    text_bn: 'ডেলিভারি দ্রুত, রিভিশন রাউন্ড পরিষ্কার, ফাইনাল কোয়ালিটি প্রিমিয়াম।',
    text_en: 'Fast delivery, clear revision rounds, premium final quality.',
    lang: 'bn',
    createdAt: '2026-03-30',
    verified: true,
  },
  {
    id: 'r3',
    name: 'Maliha R.',
    email: 'ma***@outlook.com',
    rating: 5,
    text_bn: 'প্রোডাক্ট ভিজ্যুয়াল দারুণ — মাইনর রিভিশন দ্রুত হ্যান্ডল হয়েছে, ক্যাম্পেইন রেডি।',
    text_en: 'Great pacing and premium product visuals. Minor revisions handled quickly.',
    lang: 'en',
    createdAt: '2026-03-18',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Tanvir A.',
    email: 'ta***@bank.com.bd',
    rating: 5,
    text_bn: 'ফাইন্যান্সিয়াল ক্যাম্পেইনে আমাদের ব্র্যান্ড ইমেজ অনেক ট্রাস্টওয়ার্দি লাগছে।',
    text_en: 'Their financial ad work made our brand image more trustworthy.',
    lang: 'bn',
    createdAt: '2026-02-22',
    verified: true,
  },
  {
    id: 'r5',
    name: 'Nusrat J.',
    email: 'nu***@gmail.com',
    rating: 5,
    text_bn: 'শর্ট-ফর্ম কনসেপ্ট মোবাইল-ফার্স্ট, একদম পেইড সোশ্যালে রেডি।',
    text_en: 'Short-form concepts are mobile-first, ready to launch on paid social.',
    lang: 'en',
    createdAt: '2026-02-04',
    verified: true,
  },
  {
    id: 'r6',
    name: 'Farhana S.',
    email: 'fa***@brand.com',
    rating: 5,
    text_bn: 'বিলিঙ্গুয়াল অডিয়েন্স পারফেক্টলি বুঝেছে। প্রিমিয়াম প্রেজেন্টেশন।',
    text_en: 'Perfect understanding of bilingual audience. Premium presentation.',
    lang: 'en',
    createdAt: '2026-01-15',
    verified: true,
  },
];

export const SHOWCASES: Showcase[] = [
  {
    title_en: 'Cinematic Storytelling',
    title_bn: 'সিনেম্যাটিক স্টোরিটেলিং',
    sub_en: 'Story-driven brand films that move audiences and build emotional trust.',
    ids: ['Tu9qAT9c2Ek', 'rlY4Ih68DHM', 'FvWyFDNAAPY', '6RaKnCSXZhM', '4ryJaLx6o0k', 'UlNoCAs69vg'],
  },
  {
    title_en: 'Product AI Promotional Ads',
    title_bn: 'এআই প্রোডাক্ট প্রমোশনাল ভিডিও অ্যাড',
    sub_en: 'AI-powered product promos engineered for conversion across paid social.',
    ids: ['rQk_sPwkDwU', '3U3-3IgbPQc', 'zaFsO8fv2iA', 'KU7j0JhzJKI', 'tooCPxc0pnY', 'DO-SisqDTY4'],
  },
  {
    title_en: 'Financial Video Ads',
    title_bn: 'ফাইন্যান্সিয়াল ভিডিও অ্যাড',
    sub_en: 'Trust-first ads for banks, MFS, insurance and fintech brands.',
    ids: ['Q67-Nq-fPe0', '0baTxFVpSyo', '7knZkqenPII', 'dM6YLCGOOX4', '6n2y_nrRahM', 'QdPW3bDFc5I'],
  },
  {
    title_en: 'Product & Brand Ads',
    title_bn: 'প্রোডাক্ট ও ব্র্যান্ড অ্যাড',
    sub_en: 'High-impact creatives for product launches and brand campaigns.',
    ids: ['xwGjL_XnzDU', 'boFvTomIRrQ', 'xxXjRLIL7Xc', '6EKnfroWXQE', 'h0cnhVfsXhU', 'MtgdKWMRAPI'],
  },
  {
    title_en: 'Custom Projects',
    title_bn: 'কাস্টম ভিডিও প্রজেক্ট',
    sub_en: 'Tailored campaigns for unique client requests, formats and industries.',
    ids: ['HOnXRgkC-2Q', 'DjXhq-ScyE8', '7iJumW6HROQ', 'eEqeRIsI9oQ', 'KxFQv4M-bow', 'Szel9WlwaS8'],
  },
];

/**
 * Number of real client logo files in `public/clients/`.
 * Each logo is expected to be named `Logo (N).png` for N = 1..COUNT.
 * Change this number to expand or shrink the slider — the array
 * regenerates automatically from it.
 */
export const CLIENT_LOGO_COUNT = 36;

export const CLIENT_LOGOS: ClientLogo[] = Array.from(
  { length: CLIENT_LOGO_COUNT },
  (_, i) => ({
    name: `Client ${i + 1}`,
    src: `/clients/Logo (${i + 1}).png`,
  }),
);

export const STATS = [
  { value: '10+', label_bn: 'বছর ধরে', label_en: 'Years in business', sub_bn: '২০১৪ থেকে' },
  { value: '4,300+', label_bn: 'সম্পন্ন প্রজেক্ট', label_en: 'Projects', sub_bn: 'মাল্টি-ইন্ডাস্ট্রি' },
  { value: '4.8/5', label_bn: 'গড় রেটিং', label_en: 'Avg rating', sub_bn: 'ভেরিফাইড ক্লায়েন্ট' },
  { value: '24h', label_bn: 'ডেলিভারি টার্গেট', label_en: 'Delivery', sub_bn: 'শর্ট ভিডিও' },
];

export const ytThumb = (id: string, quality: 'maxresdefault' | 'hqdefault' = 'maxresdefault') =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

export const buildOrderWhatsAppLink = (
  category: string,
  plan: string,
  priceBDT: number,
): string => {
  const msg =
    `হ্যালো Creavix! 👋\n\n` +
    `আমি অর্ডার করতে চাই:\n` +
    `📦 ক্যাটাগরি: ${category}\n` +
    `✨ প্যাকেজ: ${plan}\n` +
    `💰 মূল্য: ৳${priceBDT.toLocaleString('en-BD')}\n\n` +
    `আরো বিস্তারিত জানতে চাই।`;
  return `${SITE.whatsappLink}?text=${encodeURIComponent(msg)}`;
};

export const SUGGESTED_QUESTIONS = [
  '📹 ভিডিও অ্যাড বানাতে কত খরচ হবে?',
  '⚡ কতদিনে ভিডিও ডেলিভারি পাবো?',
  '🎬 AI ভিডিও মার্কেটিং কী?',
  '💰 কোন প্যাকেজটা আমার জন্য ভালো?',
  '📱 Meta ও TikTok-এর জন্য কি আলাদা ভিডিও লাগবে?',
  '🌟 রিভিশন কয়টা পাবো?',
] as const;

// Bilingual offline knowledge base for the Creavix ChatBot.
// Used when ANTHROPIC_API_KEY is unset OR the API call fails.
// Each rule = list of keyword tests; first matching rule's reply wins.

import { SITE } from './site-data';

interface Rule {
  match: RegExp[];
  reply: string;
}

const RULES: Rule[] = [
  {
    match: [/দাম|খরচ|কত টাকা|price|cost|how much/i],
    reply:
      `💰 আমাদের প্যাকেজ:\n` +
      `• Story Telling Video: ২,০০০ – ৩,০০০ টাকা (১ মিনিট)\n` +
      `• Product Video: ১,২০০ – ১,৮০০ টাকা\n\n` +
      `সব প্যাকেজে এখন ৫০% ছাড় চলছে! বিস্তারিত: ${SITE.url}/pricing\n` +
      `অর্ডার করতে: ${SITE.whatsapp}`,
  },
  {
    match: [/ডেলিভারি|কতদিন|delivery|how long|turnaround/i],
    reply:
      `⚡ শর্ট ভিডিও ২৪ ঘণ্টায়, বড় প্রজেক্ট ২৪–৪৮ ঘণ্টায় ডেলিভারি দিই।\n\n` +
      `Custom প্রজেক্টের ক্ষেত্রে স্কোপ ও রিভিশন রাউন্ডের উপর সময় নির্ভর করে।`,
  },
  {
    match: [/AI ভিডিও|এআই|ai video|what is ai/i],
    reply:
      `🎬 AI ভিডিও মার্কেটিং মানে আধুনিক AI টুল দিয়ে সিনেম্যাটিক ভিডিও তৈরি — দ্রুত, প্রিমিয়াম ও বাস্তবধর্মী। ` +
      `Meta, YouTube ও TikTok-এর জন্য আমরা হুক-ফার্স্ট স্ক্রিপ্ট, কালার গ্রেড ও সাউন্ড ডিজাইন একসাথে দিই।`,
  },
  {
    match: [/প্যাকেজ|কোনটা ভালো|which package|best plan/i],
    reply:
      `🎯 যদি একটা সিনেম্যাটিক ব্র্যান্ড ভিডিও দরকার হয় → Story Telling Premium (২,৫০০ টাকা)।\n` +
      `🛍 যদি পণ্যের অ্যাড লাগে → Product Standard (১,৫০০ টাকা)।\n\n` +
      `আপনার লক্ষ্য বললে আরো নির্দিষ্ট সাজেশন দিতে পারি।`,
  },
  {
    match: [/Meta|মেটা|facebook|tiktok|টিকটক|আলাদা ভিডিও/i],
    reply:
      `📱 হ্যাঁ, প্ল্যাটফর্ম-অনুযায়ী আমরা আলাদা ফরম্যাট দিই:\n` +
      `• Meta: ৪:৫ বা ১:১ — ১৫–৬০ সেকেন্ড\n` +
      `• TikTok: ৯:১৬ — ৯–৩০ সেকেন্ড\n` +
      `• YouTube: ১৬:৯ feed + ৯:১৬ Shorts\n\n` +
      `সব প্যাকেজেই মাল্টি-ফরম্যাট এক্সপোর্ট রাখি।`,
  },
  {
    match: [/রিভিশন|revision|change/i],
    reply:
      `🌟 প্যাকেজ অনুযায়ী ২–৪টি রিভিশন বিনামূল্যে। অতিরিক্ত প্রয়োজন হলে ছোট ফিতে আরো করানো যায়।`,
  },
  {
    match: [/contact|যোগাযোগ|হোয়াটসঅ্যাপ|whatsapp|number|ইমেইল|email/i],
    reply:
      `📞 সবচেয়ে দ্রুত পথ:\n` +
      `• WhatsApp: ${SITE.whatsapp}\n` +
      `• Email: ${SITE.email1}\n` +
      `• Hotline: ${SITE.hotline}\n\n` +
      `Studio: ${SITE.address_en}`,
  },
  {
    match: [/hello|hi|hey|হাই|হ্যালো|আসসালাম/i],
    reply:
      `হ্যালো! 👋 আমি Creavix-এর AI সাপোর্ট। ভিডিও মার্কেটিং সংক্রান্ত যেকোনো প্রশ্ন করতে পারেন — দাম, প্যাকেজ, ডেলিভারি, রিভিশন, ইত্যাদি।`,
  },
];

const FALLBACK =
  `এই মুহূর্তে নির্দিষ্ট উত্তর পাচ্ছি না। সরাসরি WhatsApp করুন ${SITE.whatsapp} অথবা ` +
  `info@creavixit.com-এ ইমেইল করুন — কয়েক ঘণ্টায় উত্তর পাবেন।`;

export function offlineReply(message: string): string {
  for (const rule of RULES) {
    if (rule.match.some((re) => re.test(message))) return rule.reply;
  }
  return FALLBACK;
}

export const CHATBOT_SYSTEM_PROMPT =
  `তুমি Creavix-এর AI সাপোর্ট অ্যাসিস্ট্যান্ট। তুমি ভিডিও মার্কেটিং বিশেষজ্ঞ। ` +
  `বাংলা ও ইংরেজি দুইয়েই সাড়া দিতে পারো। সব উত্তর সংক্ষিপ্ত, পরিষ্কার, এবং প্রয়োজন অনুযায়ী ইমোজি সহ।\n\n` +
  `ব্যবসা: Creavix IT Solution\n` +
  `ওয়েবসাইট: ${SITE.url}\n` +
  `WhatsApp: ${SITE.whatsapp}\n` +
  `Email: ${SITE.email1}\n` +
  `Studio: ${SITE.address_en}\n` +
  `Founded: 2014 by ${SITE.founder.name}\n\n` +
  `Services: AI Video Ads, Promotional Videos, Cinematic Storytelling, Product & Brand Ads, Financial Video Ads, Custom Projects.\n\n` +
  `Pricing (50% off currently):\n` +
  `• Story Telling Video (1 min): ২,০০০ / ২,৫০০ / ৩,০০০ টাকা\n` +
  `• Product Video: ১,২০০ / ১,৫০০ / ১,৮০০ টাকা\n\n` +
  `Delivery: 24-48 hours. Bilingual support. 2-4 free revisions.\n\n` +
  `গুরুত্বপূর্ণ: ক্লায়েন্ট দাম জিজ্ঞেস করলে এই দামগুলোই বলবে। অর্ডার করতে চাইলে WhatsApp-এ পাঠাও।`;

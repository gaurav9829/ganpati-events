export const CONTACT = {
  whatsappNumber: "919351975852",
  whatsappBase: "https://wa.me/919351975852",
  tel: "tel:+919351975852",
  instagram: "https://www.instagram.com/expert_birthday_setup/",
  instagramHandle: "@expert_birthday_setup",
  address: "Magra Punjla, Jodhpur",
  phoneDisplay: "9351975852",
} as const;

export type PackageItem = {
  id: "essential" | "elegant" | "elite" | "luxury" | "signature";
  name: string;
  shortName: string;
  priceCard: string;
  pricePill: string;
  priceWhatsApp: string;
  tagline: string;
  bestFor: string;
  badges: string[];
  features: string[];
  images: { src: string; alt: string }[];
};

export const HERO = {
  h1: "Turning your imagination into a royal birthday celebration",
  subtext: "Choose your package, check your date & book directly on WhatsApp.",
  label: "Premium Birthday Decoration Packages in Jodhpur",
  priceRange: "₹14,000 – ₹25,000",
} as const;

export const ABOUT = {
  title: "About Ganpati Events",
  intro: "Jodhpur-based decoration, photography and sound for birthdays and celebrations.",
  items: [
    {
      title: "Creative themes",
      desc: "Theme-based décor designed around the occasion.",
    },
    {
      title: "Premium execution",
      desc: "Planned setup, styling and on-ground coordination.",
    },
    {
      title: "Personalised details",
      desc: "Name, number, photos and stage elements customised for the celebration.",
    },
    {
      title: "One event partner",
      desc: "Decoration, photography and sound can be arranged as separate services.",
    },
  ],
} as const;

export const PACKAGES: PackageItem[] = [
  {
    id: "essential",
    name: "Essential Collection",
    shortName: "Essential",
    priceCard: "Rs. 14,000",
    pricePill: "Rs.14,000",
    priceWhatsApp: "14,000",
    tagline: "A clean, festive setup for an intimate celebration.",
    bestFor: "Intimate birthday",
    badges: [],
    features: [
      "3 Backdrops – Butterfly / Prince / Jungle Theme",
      "1 Balloon Entrance Gate",
      "1 Welcome Board",
      "Baby Trolley – Optional",
      "6 Theme Cutout Balloon Stands",
      "8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1",
      "Birthday Light",
      "All-over Extra Decoration",
      "Normal Flower Decor",
      "4 Flash Lights on Decoration",
      "Matting",
      "In-light Butterfly / Wooden Butterfly / In-light Flower",
      "1 Number in Light",
      "Cake Cutting Drum",
    ],
    images: [
      { src: "/images/signature-1.jpeg", alt: "Essential Collection setup" },
      { src: "/images/elite-1.jpeg", alt: "Essential Collection setup" },
      { src: "/images/signature-2.jpeg", alt: "Essential Collection setup" },
      { src: "/images/elite-2.jpeg", alt: "Essential Collection setup" },
    ],
  },
  {
    id: "elegant",
    name: "Elegant Collection",
    shortName: "Elegant",
    priceCard: "Rs. 16,000",
    pricePill: "Rs.16,000",
    priceWhatsApp: "16,000",
    tagline: "More backdrop coverage, a dedicated table, brighter accents.",
    bestFor: "Medium-size celebration",
    badges: ["⭐ Most Booked"],
    features: [
      "4 Backdrops in Any Theme",
      "1 Balloon Entrance Gate",
      "1 Welcome Board – 2 × 3",
      "Baby Trolley – Optional",
      "6 Theme Cutout Balloon Stands",
      "6 Balloon Drop Entries",
      "Birthday Light",
      "All-over Entry Decoration",
      "Normal Flower Decor",
      "5 Flash Lights on Decoration",
      "Matting",
      "In-light Butterfly / Wooden Butterfly / In-light Flower",
      "1 Number in Light",
      "Cake Cutting Drum",
      "One Table",
    ],
    images: [
      { src: "/images/signature-3.jpeg", alt: "Elegant Collection setup" },
      { src: "/images/elite-3.jpeg", alt: "Elegant Collection setup" },
      { src: "/images/signature-4.jpeg", alt: "Elegant Collection setup" },
      { src: "/images/elite-4.jpeg", alt: "Elegant Collection setup" },
    ],
  },
  {
    id: "elite",
    name: "Elite Collection",
    shortName: "Elite",
    priceCard: "Rs. 20,000",
    pricePill: "Rs.20,000",
    priceWhatsApp: "20,000",
    tagline: "A full stage setup with personalised name and photo displays.",
    bestFor: "Bigger stage setup",
    badges: [],
    features: [
      "4–5 Backdrops in Any Theme, 20–25 Foot Stage",
      "1 Balloon Entrance Gate",
      "1 Welcome Board – 2 × 3",
      "Baby Trolley – Optional",
      "6 Theme Cutout Balloon Stands",
      "6 Balloon Drop Entries",
      "Birthday Light",
      "All-over Entry Decoration",
      "Normal Flower Decor",
      "6 Flash Lights on Decoration",
      "Matting",
      "In-light Butterfly / Wooden Butterfly",
      "1 Number in Light",
      "Cake Cutting Drum",
      "One Table",
      "In-light Flower",
      "Baby Name in Light",
      "6 Baby Photos",
    ],
    images: [
      { src: "/images/elite-1.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-2.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-3.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-4.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-5.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-6.jpeg", alt: "Elite Collection setup" },
      { src: "/images/elite-7.jpeg", alt: "Elite Collection setup" },
    ],
  },
  {
    id: "luxury",
    name: "Luxury Collection",
    shortName: "Luxury",
    priceCard: "Rs. 25,000",
    pricePill: "Rs.25,000",
    priceWhatsApp: "25,000",
    tagline: "The royal treatment — six backdrops, a 30-foot stage, a costumed character and a bubble entry.",
    bestFor: "Grand birthday",
    badges: ["GRAND CELEBRATION"],
    features: [
      "6 Backdrops in Any Theme, 30 Foot Stage",
      "1 Balloon Entrance Gate",
      "1 Welcome Board – 2 × 3",
      "Baby Trolley – Optional",
      "6–8 Theme Cutout Balloon Stands",
      "8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1",
      "Birthday Light",
      "All-over Entry Decoration",
      "Normal Flower Decor",
      "7 Flash Lights on Decoration",
      "Matting",
      "In-light Butterfly / Wooden Butterfly",
      "1 Number in Light",
      "Cake Cutting Drum",
      "One Table",
      "In-light Flower",
      "Baby Name in Light",
      "6 Baby Photos",
      "1 Teddy Man (Any Character)",
      "Bubble Entry with 8 Balloon Drop Entry",
    ],
    images: [
      { src: "/images/signature-5.jpeg", alt: "Luxury Collection setup" },
      { src: "/images/signature-6.jpeg", alt: "Luxury Collection setup" },
      { src: "/images/signature-7.jpeg", alt: "Luxury Collection setup" },
      { src: "/images/elite-5.jpeg", alt: "Luxury Collection setup" },
      { src: "/images/elite-6.jpeg", alt: "Luxury Collection setup" },
      { src: "/images/elite-7.jpeg", alt: "Luxury Collection setup" },
    ],
  },
  {
    id: "signature",
    name: "Signature Collection",
    shortName: "Signature",
    priceCard: "Rs. 25,000",
    pricePill: "Rs.25,000",
    priceWhatsApp: "25,000",
    tagline: "Our most-booked premium setup — a five-backdrop stage with a centrepiece frame.",
    bestFor: "Premium/custom look",
    badges: ["⭐ Most Booked", "PREMIUM CUSTOM EXPERIENCE"],
    features: [
      "5 Backdrops in Any Theme",
      "1 Centre 3D Wooden Backdrop",
      "20–25 Foot Stage (as per venue requirement)",
      "1 Wooden Entrance Gate",
      "1 Welcome Board – 2 × 3",
      "Baby Trolley – Optional",
      "6–8 Theme Cutout Balloon Stands",
      "6 Balloon Drop Entries",
      "Birthday Light",
      "Extra Decoration According to Theme",
      "Normal Flower Decor",
      "6 Flash Lights on Decoration",
      "On-stage Flex according to theme + Matting",
      "In-light Butterfly / Wooden Butterfly",
      "1 Number in Light",
      "Cake Cutting Drum",
      "One Table",
      "In-light Flower",
      "Baby Name in Light",
      "6 Baby Photos",
    ],
    images: [
      { src: "/images/signature-1.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-2.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-3.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-4.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-5.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-6.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-7.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-8.jpeg", alt: "Signature Collection setup" },
      { src: "/images/signature-9.jpeg", alt: "Signature Collection setup" },
    ],
  },
];

export const COMPARE = {
  title: "Compare at a glance",
  subtext: "Scroll sideways to see all five collections.",
  swipeHint: "👉 Swipe left/right → to compare packages",
  columns: ["Essential 14K", "Elegant 16K", "Elite 20K", "Luxury 25K", "Signature 25K"],
  rows: [
    { label: "Backdrops", values: ["3", "4", "4–5", "6", "5 + centre frame"] },
    { label: "Stage", values: ["—", "—", "20–25 ft", "30 ft", "20–25 ft"] },
    { label: "Entrance gate", values: ["Balloon", "Balloon", "Balloon", "Balloon", "Wooden"] },
    { label: "Centre backdrop", values: ["—", "—", "—", "—", "3D Wooden"] },
    { label: "Balloon stands", values: ["6", "6", "6", "6–8", "6–8"] },
    {
      label: "Balloon / cold-fire entry",
      values: [
        "6",
        "6",
        "6",
        "8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1",
        "6",
      ],
    },
    { label: "Flash lights", values: ["4", "5", "6", "7", "6"] },
    { label: "Table", values: ["—", "One", "One", "One", "One"] },
    { label: "Baby name & photos", values: ["—", "—", "Yes", "Yes", "Yes"] },
    { label: "Teddy man / bubble entry", values: ["—", "—", "—", "Yes", "—"] },
    {
      label: "Best For",
      values: [
        "Intimate birthday",
        "Medium-size celebration",
        "Bigger stage setup",
        "Grand birthday",
        "Premium/custom look",
      ],
    },
  ],
} as const;

export const STEPS = {
  title: "How Your Booking Works",
  subtext: "A simple process from choosing your package to celebration day.",
  items: [
    {
      num: "01",
      title: "Choose Your Package",
      desc: "Browse our packages and select your preferred setup.",
    },
    {
      num: "02",
      title: "Check Date Availability",
      desc: "Send us your event date & location on WhatsApp.",
    },
    {
      num: "03",
      title: "Finalise Theme & Details",
      desc: "Theme, colours, name, photos and custom requirements discuss karein.",
    },
    {
      num: "04",
      title: "Advance Payment",
      desc: "Complete the booking formalities shared by our team to confirm your date.",
    },
    {
      num: "05",
      title: "Celebration Day 🎉",
      desc: "Our team arrives before the event and completes the setup.",
    },
  ],
} as const;

export const ADDONS = {
  title: "Add-on services",
  subtext: "Booked separately, on top of any decoration package.",
  photographyTitle: "Photography & Cinematography — choose an option",
  options: [
    {
      name: "Option 1",
      price: "Rs. 12,000",
      desc: "1 candid photographer, 1 candid cinematographer, 1 photographer for reel shoot.",
      links: [
        { label: "Sample 1", href: "https://drive.google.com/drive/folders/1pB4ygSEsEckU1BscFKiovxlNcbpGzrw-" },
        { label: "Sample 2", href: "https://drive.google.com/drive/folders/1vXQ_NwBT6KdYWegw3h3cd7_DL3aZwWFO?usp=sharing" },
        { label: "Sample 3", href: "https://camtom.in?eventid=36ttj&event=1XjxJAjTMlMlR1_gVHocw_yWHhZ-pfVv506fpw" },
      ],
    },
    {
      name: "Option 2",
      price: "Rs. 10,000",
      desc: "1 candid photographer, 1 candid cinematographer.",
      links: [
        { label: "Sample 1", href: "https://drive.google.com/drive/folders/1pB4ygSEsEckU1BscFKiovxlNcbpGzrw-" },
        { label: "Sample 2", href: "https://drive.google.com/drive/folders/1vXQ_NwBT6KdYWegw3h3cd7_DL3aZwWFO?usp=sharing" },
        { label: "Sample 3", href: "https://camtom.in?eventid=36ttj&event=1XjxJAjTMlMlR1_gVHocw_yWHhZ-pfVv506fpw" },
      ],
    },
    {
      name: "Option 3",
      price: "Rs. 7,000",
      desc: "1 candid photographer, 1 candidate for 2 reel shoots by iPhone.",
      links: [
        { label: "View sample photos", href: "https://drive.google.com/drive/folders/1_9M5it97Y-gb5JRT5cPsuoqc5F05gzEB" },
      ],
    },
  ],
  sound: {
    title: "Sound",
    price: "Rs. 3,000",
    desc: "1 top jodi sound + mic with professional operator.",
  },
} as const;

export const HELP = {
  title: "Need Help Choosing a Package?",
  subtext: "Not sure which package is right for your celebration? Chat with our team and we'll help you choose.",
  buttonText: "💬 Chat With Us",
} as const;

export const FAQ = {
  title: "Good to know",
  subtext: "Quick answers before you message us.",
  items: [
    {
      q: "Areas we cover",
      a: "Jodhpur city, plus areas within 20 km of Jodhpur.",
    },
    {
      q: "Setup timing",
      a: "We arrive and set up 5 to 6 hours before your event starts, so everything is ready well in time.",
    },
    {
      q: "How to book",
      a: 'Tap "Book on WhatsApp", tell us your package and date, and we\'ll confirm availability and next steps.',
    },
    {
      q: "Getting a reply",
      a: "We're active on WhatsApp and reply to every enquiry — message us anytime.",
    },
    {
      q: "Do you customise themes?",
      a: "Yes, theme customisation and requirements are available. Share your theme, colours and requirements with us on WhatsApp.",
    },
    {
      q: "How much advance is required?",
      a: "Advance amount depends on the selected package and event requirements. Our team will confirm the booking amount while finalising your booking.",
    },
    {
      q: "How far do you travel from Jodhpur?",
      a: "We cover Jodhpur city and areas within 20 km of Jodhpur. For locations outside this area, please confirm availability with our team.",
    },
    {
      q: "Can I add photography?",
      a: "Photography and cinematography can be arranged as add-on services. Contact our team for availability and options.",
    },
    {
      q: "Can I customise the package?",
      a: "Yes, custom requirements are available. Share your theme, colours and requirements on WhatsApp.",
    },
    {
      q: "What happens if my date is not available?",
      a: "Our team will inform you if the requested date is unavailable, and you can discuss alternative dates or available options.",
    },
    {
      q: "How early should I book?",
      a: "Early booking is recommended, especially for weekends, peak dates and premium setups. Contact us as soon as your event date is confirmed.",
    },
  ],
} as const;

export const TESTIMONIALS = {
  title: "What our clients say",
  items: [
    {
      quote: "“Thank you so much guys, you all made my daughter’s day very special.”",
      author: "Ridhi Madhakar",
    },
    {
      quote: "“Loved the decoration! Best event management team for decorating moments. Thank you for making it special.”",
      author: "ca.nirma_",
    },
    {
      quote: "“Nice arrangements by Ganpati Events — on time and attention to details are their USP. Thanks!”",
      author: "bissameenu",
    },
  ],
} as const;

export const FINAL_CTA = {
  title: "Ready to Plan Your Birthday Celebration? 🎉",
  subtext: "Choose your package, share your date & location, and check availability with Ganpati Events.",
} as const;

export const FOOTER = {
  title: "Ready to plan the celebration?",
  addressPhone: "Magra Punjla, Jodhpur • 9351975852",
  signoff: "Your Imagination into reality",
} as const;

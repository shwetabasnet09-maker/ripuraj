// export const products = [
//   {
//     slug: "ripuraj-sonashakti-premium-jeera-parboiled-rice",
//     name: "Ripuraj Sonashakti Premium Jeera Parboiled Rice",
//     price: 1197,
//     weights: ["5KG", "10KG", "20KG"],
//     image: "/Mahashakti.jpg",
//     rating: 5,
//     description:
//       "Ripuraj Rice offers premium, handpicked grains that ensure exceptional taste and quality. Our commitment to sustainable farming and rigorous quality checks guarantees every bag of Ripuraj Rice is perfect for your meals.",
//   },
//   {
//     slug: "ripuraj-mahashakti-jeera-rice",
//     name: "Ripuraj Mahashakti Jeera Rice",
//     price: 1099,
//     weights: ["5KG", "10KG", "20KG"],
//     image: "/Mahashakti.jpg",
//     rating: 4,
//     description: "Redefining non-basmati rice with superior quality standards.",
//   },
// ];

export const products = [
  {
    slug: "ripuraj-sonashakti-premium-jeera-parboiled-rice",
    name: "Ripuraj Sonashakti Premium Jeera Parboiled Rice",
    price: 1197,
    weights: ["5KG", "10KG", "20KG"],
    image: "/Mahashakti.jpg",
    rating: 5,

    description:
      "Enjoy the unique aroma and rich flavor of Sonashakti Jeera Rice. Each grain is selected for its quality, making it ideal for flavorful meals.",

    features: [
      {
        title: "100% Guaranteed Organic Product",
        text: "Use of organic paddy."
      },
      {
        title: "Zero Hand Touch Production",
        text: "Fully automated hygienic processing."
      },
      {
        title: "Premium Grain Quality",
        text: "Carefully selected grains for best taste."
      }
    ]
  },

  {
    slug: "ripuraj-mahashakti-jeera-rice",
    name: "Ripuraj Mahashakti Jeera Rice",
    price: 1099,
    weights: ["5KG", "10KG", "20KG"],
    image: "/Mahashakti.jpg",
    rating: 4,

    description:
      "Mahashakti Jeera Rice delivers superior taste and consistency for everyday meals.",

    features: [
      {
        title: "High Quality Rice",
        text: "Selected grains from trusted farms."
      },
      {
        title: "Rich Aroma",
        text: "Enhances flavor of traditional dishes."
      }
    ]
  },

  {
    slug: "ripuraj-shaktijeera-premium-parboiled-rice",
    name: "Ripuraj Shaktijeera Premium Parboiled Rice",
    price: 1149,
    weights: ["5KG", "10KG", "20KG"],
    image: "/Shaktijeera.png",
    rating: 5,

    description:
      "Shaktijeera Premium Parboiled Rice is grown from the natural resources of the Gangetic basin, delivering a rich taste and firm texture in every grain.",

    features: [
      {
        title: "100% Guaranteed Organic Product",
        text: "Grown from natural Gangetic basin resources."
      },
      {
        title: "Zero Hand Touch Production",
        text: "Fully automated hygienic processing."
      },
      {
        title: "Premium Grain Quality",
        text: "Firm texture, ideal for daily meals."
      }
    ]
  },

  {
    slug: "ripuraj-zayka-long-grain-basmati-rice",
    name: "Ripuraj Zayka Long Grain Basmati Rice",
    price: 1299,
    weights: ["5KG", "10KG", "20KG"],
    image: "/Zayeka1.png",
    rating: 5,

    description:
      "Ripuraj Zayka is a long grain Basmati rice known for its distinct aroma, extra length, and fluffy texture after cooking — perfect for biryani and pulao.",

    features: [
      {
        title: "Extra Long Grain",
        text: "Grains elongate further on cooking."
      },
      {
        title: "Naturally Aromatic",
        text: "Signature Basmati fragrance in every bite."
      },
      {
        title: "Aged for Perfection",
        text: "Aged to enhance texture and aroma."
      }
    ]
  }
];

export const newsData = [
  {
    id: 1,
    slug: "ripuraj-launches-premium-jeera-rice",
    title: "Ripuraj Launches Premium Jeera Rice",
    date: "July 12, 2025",
    image: "/achievements1.png",
    description:
      "Ripuraj introduces its latest premium jeera rice with enhanced aroma and quality.",
    content:
      "Ripuraj has officially launched its new premium jeera rice range. The product focuses on superior grain length, aroma, and taste to meet customer expectations.",
  },
  {
    id: 2,
    slug: "ripuraj-expands-distribution-network",
    title: "Ripuraj Expands Distribution Network",
    date: "June 25, 2025",
    image: "/achievements1.png",
    description:
      "Ripuraj strengthens its supply chain across major regions.",
    content:
      "To meet growing demand, Ripuraj has expanded its distribution network ensuring faster and wider availability of its products.",
  },
];

export const orders = [
  {
    id: "ORD-001",
    date: "12 Jan 2026",
    status: "Delivered",
    total: "₹1,250",
    items: 2,
    payment: "Paid",
    delivery: "Standard Shipping",
  },
  {
    id: "ORD-002",
    date: "20 Jan 2026",
    status: "Shipped",
    total: "₹2,100",
    items: 1,
    payment: "Paid",
    delivery: "Express Shipping",
  },
  {
    id: "ORD-003",
    date: "01 Feb 2026",
    status: "Processing",
    total: "₹899",
    items: 3,
    payment: "Pending",
    delivery: "Standard Shipping",
  },
];

export const events = [
  {
    slug: "dubai-event",
    title: "Dubai Event",
    coverImage: "/events/dubai-event.jpg",
    description:
      "Ripuraj Agro's team came together in Dubai to celebrate our growth and connect with valued partners, marking another milestone in our journey toward global reach.",
    gallery: [
      "/events/dubai-event.jpg",
      "/events/dubai-event-2.jpg",
      "/events/dubai-event-3.jpg",
    ],
  },
  {
    slug: "raxaul-event",
    title: "Raxaul Event",
    coverImage: "/events/raxaul-event.jpg",
    description:
      "A special ceremony at our Raxaul facility, honouring the roots of Ripuraj Agro and the community that has supported our journey since the beginning.",
    gallery: [
      "/events/raxaul-event.jpg",
      "/events/raxaul-event-2.jpg",
      "/events/raxaul-event-3.jpg",
    ],
  },
  {
    slug: "guwahati-event",
    title: "Guwahati Event",
    coverImage: "/events/guwahati-event.jpg",
    description:
      "Ripuraj Agro welcomed partners and distributors to our Guwahati event, strengthening relationships across the North East region.",
    gallery: [
      "/events/guwahati-event.jpg",
      "/events/guwahati-event-2.jpg",
      "/events/guwahati-event-3.jpg",
    ],
  },
  {
    slug: "visakhapatnam-event",
    title: "Visakhapatnam Event",
    coverImage: "/events/visakhapatnam-event.jpg",
    description:
      "A vibrant showcase of Ripuraj's premium rice range in Visakhapatnam, bringing our products closer to new markets along the eastern coast.",
    gallery: [
      "/events/visakhapatnam-event.jpg",
      "/events/visakhapatnam-event-2.jpg",
      "/events/visakhapatnam-event-3.jpg",
    ],
  },
  {
    slug: "sonashakti-rockstar-silchar",
    title: "Sonashakti Rockstar Event (Silchar)",
    coverImage: "/events/rockstar-silchar.jpg",
    description:
      "Celebrating our top-performing distributors and retail partners in Silchar as part of the Sonashakti Rockstar recognition series.",
    gallery: [
      "/events/rockstar-silchar.jpg",
      "/events/rockstar-silchar-2.jpg",
      "/events/rockstar-silchar-3.jpg",
    ],
  },
  {
    slug: "sonashakti-rockstar-purnia",
    title: "Sonashakti Rockstar Event (Purnia)",
    coverImage: "/events/rockstar-purnia.jpg",
    description:
      "Recognising outstanding contributions from our Purnia partners, honoured on stage as Sonashakti Rockstars for their dedication and results.",
    gallery: [
      "/events/rockstar-purnia.jpg",
      "/events/rockstar-purnia-2.jpg",
      "/events/rockstar-purnia-3.jpg",
    ],
  },
  {
    slug: "ripuraj-synergy-summit-singapore-2025",
    title: "Ripuraj Synergy Summit Singapore (2025)",
    coverImage: "/events/synergy-summit-singapore.jpg",
    description:
      "Global leaders and partners gathered in Singapore for the Ripuraj Synergy Summit 2025, a landmark event celebrating international collaboration and shared vision.",
    gallery: [
      "/events/synergy-summit-singapore.jpg",
      "/events/synergy-summit-singapore-2.jpg",
      "/events/synergy-summit-singapore-3.jpg",
    ],
  },
];

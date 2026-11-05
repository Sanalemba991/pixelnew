export interface PromoCard {
  id: string;
  tag: string;
  titleLine1: string;
  titleLine2: string;
  descLine1: string;
  descLine2: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
}

export const promoCardsData: PromoCard[] = [
  {
    id: "iphone-promo",
    tag: "IPHONE 18 PRO",
    titleLine1: "A New Era",
    titleLine2: "of Possibilities",
    descLine1: "Pro performance.",
    descLine2: "Stunning design.",
    buttonText: "Shop iPhone",
    buttonHref: "/iphone",
    imageSrc:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=900&auto=format&fit=crop",
    imageAlt: "iPhone 18 Pro close-up camera and titanium frame",
  },
  {
    id: "sony-promo",
    tag: "SONY α SERIES",
    titleLine1: "Built for",
    titleLine2: "Creators",
    descLine1: "Professional tools",
    descLine2: "for bigger stories.",
    buttonText: "Explore Sony",
    buttonHref: "/cameras/sony",
    imageSrc:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Sony Alpha series camera with cinematic lens",
  },
];


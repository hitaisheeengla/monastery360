import rumtekImg from '@/assets/rumtek-monastery.jpg';
import pemayangtseImg from '@/assets/pemayangtse-monastery.jpg';
import tashidingImg from '@/assets/tashiding-monastery.jpg';
import encheyImg from '@/assets/enchey-monastery.jpg';

export interface Monastery {
  id: string;
  name: string;
  location: string;
  era: string;
  description: string;
  image: string;
  panoramaUrl: string;
  audioGuideUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  gallery: string[];
  historicalInfo: {
    founded: string;
    significance: string;
    architecture: string;
  };
  qrCode: string;
}

export const monasteries: Monastery[] = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "Gangtok, East Sikkim",
    era: "16th Century",
    description: "The largest monastery in Sikkim, also known as the Dharma Chakra Centre. It's the seat of the Karmapa Lama.",
    image: rumtekImg,
    panoramaUrl: "https://pannellum.org/images/alma.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.2984, lng: 88.5658 },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400", 
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    historicalInfo: {
      founded: "Originally built in 1740, reconstructed in 1960s",
      significance: "Seat of the 16th Karmapa and center of Kagyu Buddhism",
      architecture: "Traditional Tibetan architecture with golden roof"
    },
    qrCode: "/api/placeholder/200/200"
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "Pelling, West Sikkim", 
    era: "17th Century",
    description: "One of the oldest and premier monasteries of Sikkim, belonging to the Nyingma order of Tibetan Buddhism.",
    image: pemayangtseImg,
    panoramaUrl: "https://pannellum.org/images/bma-1.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.2892, lng: 88.2394 },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    historicalInfo: {
      founded: "Founded in 1705 by Lama Lhatsun Chempo",
      significance: "Premier monastery of the Nyingma order in Sikkim",
      architecture: "Three-storied structure with intricate woodwork"
    },
    qrCode: "/api/placeholder/200/200"
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "Tashiding, West Sikkim",
    era: "17th Century", 
    description: "Sacred monastery located on a hilltop, famous for its holy stupa and annual Bumchu festival.",
    image: tashidingImg,
    panoramaUrl: "https://pannellum.org/images/cerro-toco-0.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.3497, lng: 88.2675 },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    historicalInfo: {
      founded: "Founded in 1641 by Ngadak Sempa Chempo",
      significance: "Houses the sacred Bumchu (holy water) vase",
      architecture: "Perched on a hilltop with panoramic valley views"
    },
    qrCode: "/api/placeholder/200/200"
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok, East Sikkim",
    era: "19th Century",
    description: "Beautiful monastery with stunning views of Kanchenjunga, famous for its annual Cham dance.",
    image: encheyImg, 
    panoramaUrl: "https://pannellum.org/images/bma-2.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.3389, lng: 88.6065 },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    historicalInfo: {
      founded: "Founded in 1909 by Lama Druptob Karpo",
      significance: "Known for its annual Cham dance festival",
      architecture: "Traditional Sikkimese architecture with mountain backdrop"
    },
    qrCode: "/api/placeholder/200/200"
  }
];
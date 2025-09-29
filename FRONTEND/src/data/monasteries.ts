import rumtekImg from '@/assets/rumtek-monastery.jpg';
import pemayangtseImg from '@/assets/pemayangtse-monastery.jpg';
import tashidingImg from '@/assets/tashiding-monastery.jpg';
import encheyImg from '@/assets/enchey-monastery.jpg';
import monasteryImg from '@/assets/monastery3.jpg';

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
    description: "The largest monastery in Sikkim, also known as the Dharma Chakra Centre. It's the seat of the Karmapa Lama. The monastery is renowned for its stunning architecture, vibrant festivals, and rich collection of Buddhist art and scriptures. Rumtek Monastery, also known as the Dharma Chakra Centre, is the largest and one of the most significant monasteries in Sikkim. It serves as the seat of the Karmapa Lama, the head of the Karma Kagyu lineage of Tibetan Buddhism. The monastery was originally built in the 16th century but was reconstructed in the 1960s by the 16th Karmapa after he fled Tibet following the Chinese invasion. Rumtek is renowned for its stunning traditional Tibetan architecture, vibrant annual festivals such as the Chaam dance, and its rich collection of Buddhist art, scriptures, and relics. The monastery complex includes several temples, stupas, and living quarters for monks, making it a vital center for religious study and practice in the region.",
    image: rumtekImg,
    panoramaUrl: monasteryImg,
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.2984, lng: 88.5658 },
    gallery: [
      "https://c8.alamy.com/comp/2C7WWWK/a-tourist-photographer-takings-photographs-of-arts-on-walls-of-rumtek-monastery-in-sikkim-india-2C7WWWK.jpg",
      "https://thumbs.dreamstime.com/z/samdruptse-monastery-ravangla-sikkim-india-october-interior-view-buddhist-picture-taken-permission-religious-274042840.jpg", 
      "https://th.bing.com/th/id/R.5f7508d9a4d946e28d4c31fc04b6c256?rik=24vziGQycODuYA&riu=http%3a%2f%2fnepaltrekking.net%2fpokhara%2fbuddhist-monastery%2fpictures%2fPA203010.jpg&ehk=THngFti%2fcs4m%2fkl0MZ3K1eHL1nvcS0igWxTyPB2JxXI%3d&risl=&pid=ImgRaw&r=0",
      "https://i.pinimg.com/originals/f1/f8/0d/f1f80da858a7d17aa85b0e9d77f8e9f7.jpg"
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
    description: "One of the oldest and most premier monasteries of Sikkim, belonging to the revered Nyingma order of Tibetan Buddhism. The Pemayangtse Monastery is a Buddhist monastery in Pemayangtse, near Gyalshing city in Gyalshing district in the northeastern Indian state of Sikkim, located 6 km from Gyalshing city, the district headquarters, 110 km west of Gangtok.Planned, designed and founded by Lama Lhatsun Chempo in 1647, it is one of the oldest and premier monasteries of Sikkim, also the most famous in Sikkim.",
    image: pemayangtseImg,
    panoramaUrl: "https://pannellum.org/images/bma-1.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.2892, lng: 88.2394 },
    gallery: [
      "https://c8.alamy.com/comp/2C7WWWK/a-tourist-photographer-takings-photographs-of-arts-on-walls-of-rumtek-monastery-in-sikkim-india-2C7WWWK.jpg",
      "https://thumbs.dreamstime.com/z/samdruptse-monastery-ravangla-sikkim-india-october-interior-view-buddhist-picture-taken-permission-religious-274042840.jpg", 
      "https://th.bing.com/th/id/R.5f7508d9a4d946e28d4c31fc04b6c256?rik=24vziGQycODuYA&riu=http%3a%2f%2fnepaltrekking.net%2fpokhara%2fbuddhist-monastery%2fpictures%2fPA203010.jpg&ehk=THngFti%2fcs4m%2fkl0MZ3K1eHL1nvcS0igWxTyPB2JxXI%3d&risl=&pid=ImgRaw&r=0"
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
    description: "A sacred monastery located on a serene hilltop, renowned for its revered holy stupa and the vibrant annual Bumchu festival. Tashiding Monastery is one of the holiest monasteries in Sikkim, perched on a hilltop overlooking the picturesque landscape of West Sikkim. Founded in the 17th century by Ngadak Sempa Chempo, it is renowned for its sacred Bumchu (holy water) vase, which is believed to bring prosperity and good fortune. The monastery is a significant pilgrimage site, especially during the annual Bumchu festival, when devotees from across the region gather to partake in rituals and celebrations. The serene ambiance, coupled with panoramic views of the surrounding valleys and mountains, makes Tashiding Monastery a spiritual haven and a must-visit destination for those seeking tranquility and insight into Sikkim's rich Buddhist heritage.",
    image: tashidingImg,
    panoramaUrl: "https://pannellum.org/images/cerro-toco-0.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.3497, lng: 88.2675 },
    gallery: [
      "https://c8.alamy.com/comp/2C7WWWK/a-tourist-photographer-takings-photographs-of-arts-on-walls-of-rumtek-monastery-in-sikkim-india-2C7WWWK.jpg",
      "https://thumbs.dreamstime.com/z/samdruptse-monastery-ravangla-sikkim-india-october-interior-view-buddhist-picture-taken-permission-religious-274042840.jpg", 
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
    description: "Beautiful monastery with stunning views of Kanchenjunga, famous for its annual Cham dance. Enchey Monastery, located in Gangtok, East Sikkim, is a beautiful and serene Buddhist monastery that offers stunning views of the majestic Kanchenjunga mountain range. Founded in the early 19th century by Lama Druptob Karpo, the monastery is affiliated with the Nyingma order of Tibetan Buddhism. It is renowned for its vibrant annual Cham dance festival, where monks don elaborate costumes and masks to perform sacred dances that depict various Buddhist deities and stories. The monastery's tranquil ambiance, intricate murals, and traditional architecture make it a significant spiritual center and a must-visit destination for those exploring Sikkim's rich cultural and religious heritage.",
    image: encheyImg, 
    panoramaUrl: "https://pannellum.org/images/bma-2.jpg",
    audioGuideUrl: "/api/placeholder/audio",
    coordinates: { lat: 27.3389, lng: 88.6065 },
    gallery: [
      "https://c8.alamy.com/comp/2C7WWWK/a-tourist-photographer-takings-photographs-of-arts-on-walls-of-rumtek-monastery-in-sikkim-india-2C7WWWK.jpg",
      "https://thumbs.dreamstime.com/z/samdruptse-monastery-ravangla-sikkim-india-october-interior-view-buddhist-picture-taken-permission-religious-274042840.jpg", 
      "https://th.bing.com/th/id/R.5f7508d9a4d946e28d4c31fc04b6c256?rik=24vziGQycODuYA&riu=http%3a%2f%2fnepaltrekking.net%2fpokhara%2fbuddhist-monastery%2fpictures%2fPA203010.jpg&ehk=THngFti%2fcs4m%2fkl0MZ3K1eHL1nvcS0igWxTyPB2JxXI%3d&risl=&pid=ImgRaw&r=0"
    ],
    historicalInfo: {
      founded: "Founded in 1909 by Lama Druptob Karpo",
      significance: "Known for its annual Cham dance festival",
      architecture: "Traditional Sikkimese architecture with mountain backdrop"
    },
    qrCode: "/api/placeholder/200/200"
  }
];
export interface CulturalEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  monastery: string;
  description: string;
  timings: string;
  category: 'festival' | 'ceremony' | 'teaching' | 'cultural';
  image: string;
}

export const culturalEvents: CulturalEvent[] = [
  {
    id: 'bumchu-festival',
    title: 'Bumchu Festival',
    date: new Date(2025, 1, 14), // February 14, 2025
    location: 'Tashiding Monastery',
    monastery: 'tashiding',
    description: 'Sacred festival where the holy water vase (Bumchu) is opened to predict the year ahead.',
    timings: '6:00 AM - 6:00 PM',
    category: 'festival',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'cham-dance',
    title: 'Cham Dance Festival',
    date: new Date(2025, 2, 18), // March 18, 2025
    location: 'Enchey Monastery',
    monastery: 'enchey',
    description: 'Traditional masked dance performed by monks representing the victory of good over evil.',
    timings: '10:00 AM - 4:00 PM',
    category: 'festival',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'butter-lamp-ceremony',
    title: 'Butter Lamp Ceremony',
    date: new Date(2025, 3, 7), // April 7, 2025
    location: 'Rumtek Monastery',
    monastery: 'rumtek',
    description: 'Evening ceremony of lighting thousands of butter lamps for spiritual merit.',
    timings: '6:30 PM - 8:30 PM',
    category: 'ceremony',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'dharma-teaching',
    title: 'Dharma Teaching Session',
    date: new Date(2025, 3, 21), // April 21, 2025
    location: 'Pemayangtse Monastery',
    monastery: 'pemayangtse',
    description: 'Weekly dharma teaching by senior monks on Buddhist philosophy and meditation.',
    timings: '2:00 PM - 4:00 PM',
    category: 'teaching',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'prayer-flag-ceremony',
    title: 'Prayer Flag Hoisting',
    date: new Date(2025, 4, 15), // May 15, 2025
    location: 'Tashiding Monastery',
    monastery: 'tashiding',
    description: 'Community ceremony for hoisting colorful prayer flags carrying mantras and prayers.',
    timings: '7:00 AM - 11:00 AM',
    category: 'ceremony',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'losar-celebration',
    title: 'Tibetan New Year (Losar)',
    date: new Date(2025, 1, 29), // February 29, 2025
    location: 'All Monasteries',
    monastery: 'all',
    description: 'Traditional Tibetan New Year celebration with special prayers, dances, and festivities.',
    timings: 'All Day',
    category: 'festival',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'meditation-retreat',
    title: 'Silent Meditation Retreat',
    date: new Date(2025, 4, 3), // May 3, 2025
    location: 'Rumtek Monastery',
    monastery: 'rumtek',
    description: 'Three-day silent meditation retreat for inner peace and spiritual growth.',
    timings: '5:00 AM - 8:00 PM',
    category: 'teaching',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'full-moon-ceremony',
    title: 'Full Moon Puja',
    date: new Date(2025, 5, 12), // June 12, 2025
    location: 'Enchey Monastery',
    monastery: 'enchey',
    description: 'Monthly full moon ceremony with chanting and prayers for world peace.',
    timings: '7:00 PM - 9:00 PM',
    category: 'ceremony',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'heritage-festival',
    title: 'Monastery Heritage Festival',
    date: new Date(2025, 6, 20), // July 20, 2025
    location: 'Pemayangtse Monastery',
    monastery: 'pemayangtse',
    description: 'Cultural festival showcasing traditional arts, crafts, and monastery heritage.',
    timings: '9:00 AM - 6:00 PM',
    category: 'cultural',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'thangka-painting',
    title: 'Thangka Painting Workshop',
    date: new Date(2025, 7, 8), // August 8, 2025
    location: 'Tashiding Monastery',
    monastery: 'tashiding',
    description: 'Learn traditional Thangka painting techniques from master artists.',
    timings: '10:00 AM - 5:00 PM',
    category: 'cultural',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'summer-dharma',
    title: 'Summer Dharma Series',
    date: new Date(2025, 8, 15), // September 15, 2025
    location: 'Rumtek Monastery',
    monastery: 'rumtek',
    description: 'Weekly dharma talks throughout summer on compassion and mindfulness.',
    timings: '4:00 PM - 6:00 PM',
    category: 'teaching',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'harvest-blessing',
    title: 'Harvest Blessing Ceremony',
    date: new Date(2025, 9, 25), // October 25, 2025
    location: 'All Monasteries',
    monastery: 'all',
    description: 'Traditional ceremony to bless the harvest and express gratitude to nature.',
    timings: '8:00 AM - 12:00 PM',
    category: 'ceremony',
    image: '/api/placeholder/400/250'
  },
  {
    id: 'winter-solstice',
    title: 'Winter Solstice Meditation',
    date: new Date(2025, 11, 21), // December 21, 2025
    location: 'Enchey Monastery',
    monastery: 'enchey',
    description: 'Special meditation session to welcome the winter solstice and inner reflection.',
    timings: '5:30 AM - 7:00 AM',
    category: 'ceremony',
    image: '/api/placeholder/400/250'
  }
];
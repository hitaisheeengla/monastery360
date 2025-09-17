export interface ArchiveItem {
  id: string;
  title: string;
  type: 'manuscript' | 'mural' | 'document';
  monastery: string;
  year: string;
  century: string;
  description: string;
  thumbnail: string;
  highResImage: string;
  tags: string[];
  relatedMonasteries: string[];
  downloadable: boolean;
}

export const archiveItems: ArchiveItem[] = [
  {
    id: '1',
    title: 'Lotus Sutra Manuscript',
    type: 'manuscript',
    monastery: 'Rumtek Monastery',
    year: '1750',
    century: '18th century',
    description: 'An ancient manuscript of the Lotus Sutra written in traditional Tibetan script. This sacred text contains the teachings of Buddha on compassion and wisdom. The manuscript is written on handmade paper with natural ink and features intricate illuminated letters.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-e513176f20a5?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1544716278-e513176f20a5?w=1200&h=800&fit=crop',
    tags: ['buddhist text', 'tibetan script', 'religious'],
    relatedMonasteries: ['Rumtek Monastery', 'Enchey Monastery'],
    downloadable: true
  },
  {
    id: '2',
    title: 'Thangka of Avalokiteshvara',
    type: 'mural',
    monastery: 'Pemayangtse Monastery',
    year: '1705',
    century: '18th century',
    description: 'A magnificent thangka painting depicting Avalokiteshvara, the bodhisattva of compassion. This masterpiece showcases traditional Tibetan painting techniques with gold leaf details and natural mineral pigments.',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    tags: ['thangka', 'avalokiteshvara', 'compassion', 'painting'],
    relatedMonasteries: ['Pemayangtse Monastery'],
    downloadable: true
  },
  {
    id: '3',
    title: 'Monastery Foundation Charter',
    type: 'document',
    monastery: 'Tashiding Monastery',
    year: '1641',
    century: '17th century',
    description: 'The original foundation charter of Tashiding Monastery, documenting its establishment and the land grants received. This historical document provides insight into the monastery\'s origins and its significance in Sikkim\'s religious history.',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop',
    tags: ['historical document', 'foundation', 'charter'],
    relatedMonasteries: ['Tashiding Monastery'],
    downloadable: false
  },
  {
    id: '4',
    title: 'Wheel of Dharma Mural',
    type: 'mural',
    monastery: 'Enchey Monastery',
    year: '1840',
    century: '19th century',
    description: 'A vibrant wall mural depicting the Wheel of Dharma surrounded by the Eight Auspicious Symbols. The artwork demonstrates the evolution of artistic styles in 19th-century Sikkimese monasteries.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    tags: ['wheel of dharma', 'symbols', 'mural painting'],
    relatedMonasteries: ['Enchey Monastery'],
    downloadable: true
  },
  {
    id: '5',
    title: 'Prajnaparamita Sutra',
    type: 'manuscript',
    monastery: 'Rumtek Monastery',
    year: '1680',
    century: '17th century',
    description: 'A complete manuscript of the Prajnaparamita Sutra, also known as the Perfection of Wisdom text. Written in elegant Tibetan calligraphy with decorative margins and chapter headings in gold.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    tags: ['wisdom text', 'calligraphy', 'gold lettering'],
    relatedMonasteries: ['Rumtek Monastery'],
    downloadable: true
  },
  {
    id: '6',
    title: 'Mandala of Medicine Buddha',
    type: 'mural',
    monastery: 'Pemayangtse Monastery',
    year: '1720',
    century: '18th century',
    description: 'An intricate mandala painting featuring the Medicine Buddha at the center, surrounded by healing deities and sacred geometry. This artwork was created for meditation and healing practices.',
    thumbnail: 'https://images.unsplash.com/photo-1582739911429-1c5a5aa2e7e7?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1582739911429-1c5a5aa2e7e7?w=1200&h=800&fit=crop',
    tags: ['mandala', 'medicine buddha', 'healing', 'sacred geometry'],
    relatedMonasteries: ['Pemayangtse Monastery', 'Enchey Monastery'],
    downloadable: true
  },
  {
    id: '7',
    title: 'Royal Land Grant Decree',
    type: 'document',
    monastery: 'Tashiding Monastery',
    year: '1670',
    century: '17th century',
    description: 'A royal decree granting land and privileges to Tashiding Monastery, signed by the Chogyal of Sikkim. This document reveals the close relationship between the monarchy and Buddhist institutions.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop',
    tags: ['royal decree', 'land grant', 'chogyal'],
    relatedMonasteries: ['Tashiding Monastery'],
    downloadable: false
  },
  {
    id: '8',
    title: 'Green Tara Illumination',
    type: 'manuscript',
    monastery: 'Enchey Monastery',
    year: '1790',
    century: '18th century',
    description: 'A beautifully illuminated page featuring Green Tara, the female Buddha of compassionate action. The illumination includes intricate floral patterns and symbolic elements rendered in natural pigments.',
    thumbnail: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=400&h=300&fit=crop',
    highResImage: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=1200&h=800&fit=crop',
    tags: ['green tara', 'illumination', 'female buddha'],
    relatedMonasteries: ['Enchey Monastery'],
    downloadable: true
  }
];

export const archiveCategories = [
  { id: 'all', label: 'All Archives', icon: '📚' },
  { id: 'manuscript', label: 'Manuscripts', icon: '📜' },
  { id: 'mural', label: 'Murals', icon: '🎨' },
  { id: 'document', label: 'Historical Documents', icon: '📖' }
];

export const monasteryFilters = [
  { id: 'all', label: 'All Monasteries' },
  { id: 'Rumtek Monastery', label: 'Rumtek Monastery' },
  { id: 'Pemayangtse Monastery', label: 'Pemayangtse Monastery' },
  { id: 'Tashiding Monastery', label: 'Tashiding Monastery' },
  { id: 'Enchey Monastery', label: 'Enchey Monastery' }
];

export const centuryFilters = [
  { id: 'all', label: 'All Periods' },
  { id: '17th century', label: '17th Century' },
  { id: '18th century', label: '18th Century' },
  { id: '19th century', label: '19th Century' }
];
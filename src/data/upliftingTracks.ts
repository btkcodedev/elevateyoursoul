import { Track } from '../types/music';

export const UPLIFTING_TRACKS: Track[] = [
  {
    id: '1',
    name: 'Peaceful Meditation',
    artist_name: 'Free Music Archive',
    image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3',
    duration: 149,
    mood: ['peaceful', 'uplifting']
  },
  {
    id: '2',
    name: 'Mindful Journey',
    artist_name: 'Chad Crouch',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3',
    duration: 180,
    mood: ['energetic', 'inspiring']
  },
  {
    id: '3',
    name: 'Gentle Flow',
    artist_name: 'Kevin MacLeod',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Healing.mp3',
    duration: 179,
    mood: ['peaceful', 'meditative']
  },
  {
    id: '4',
    name: 'Moonrise',
    artist_name: 'Chad Crouch',
    image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Moonrise.mp3',
    duration: 161,
    mood: ['uplifting', 'peaceful']
  }
];

export const shuffleTracks = (tracks: Track[]): Track[] => {
  const shuffled = [...tracks];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
import { Track } from '../types/music';

export const UPLIFTING_TRACKS: Track[] = [
  {
    id: '1',
    name: 'Rise Up',
    artist_name: 'Inspiring Vibes',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://storage.googleapis.com/mindfulpath-audio/rise-up.mp3',
    duration: 232,
    mood: ['uplifting', 'happy', 'energetic']
  },
  {
    id: '2',
    name: 'Positive Energy',
    artist_name: 'Mindful Beats',
    image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://storage.googleapis.com/mindfulpath-audio/positive-energy.mp3',
    duration: 159,
    mood: ['uplifting', 'empowering', 'confident']
  },
  {
    id: '3',
    name: 'Morning Light',
    artist_name: 'Peaceful Tunes',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://storage.googleapis.com/mindfulpath-audio/morning-light.mp3',
    duration: 238,
    mood: ['uplifting', 'happy', 'classic']
  },
  {
    id: '4',
    name: 'Soaring High',
    artist_name: 'Spirit Lifters',
    image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://storage.googleapis.com/mindfulpath-audio/soaring-high.mp3',
    duration: 183,
    mood: ['uplifting', 'relaxing', 'positive']
  },
  {
    id: '5',
    name: 'Inner Peace',
    artist_name: 'Zen Masters',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=300&q=80',
    audio_url: 'https://storage.googleapis.com/mindfulpath-audio/inner-peace.mp3',
    duration: 185,
    mood: ['uplifting', 'peaceful', 'classic']
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
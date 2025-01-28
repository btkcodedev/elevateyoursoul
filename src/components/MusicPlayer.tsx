import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  useToast,
  Flex,
  Collapse,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Volume1,
  VolumeX,
  Music,
  Shuffle,
  ListMusic,
} from 'lucide-react';
import { UPLIFTING_TRACKS, shuffleTracks } from '../data/upliftingTracks';
import type { Track } from '../types/music';

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>(UPLIFTING_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!currentTrack && tracks.length > 0) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track change
  useEffect(() => {
    const loadTrack = async () => {
      if (currentTrack && audioRef.current) {
        setIsLoading(true);
        try {
          audioRef.current.src = currentTrack.audio_url;
          await audioRef.current.load();
          if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch(error => {
                console.error('Error playing audio:', error);
                setIsPlaying(false);
                toast({
                  title: "Playback Error",
                  description: "There was an error playing the track. Please try again.",
                  status: "error",
                  duration: 3000,
                });
              });
            }
          }
        } catch (error) {
          console.error('Error loading audio:', error);
          toast({
            title: "Loading Error",
            description: "Failed to load the audio track. Please try another track.",
            status: "error",
            duration: 3000,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTrack();
  }, [currentTrack]);

const handlePlay = async () => {
  if (audioRef.current) {
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Playback error:', error);
      toast({
        title: "Playback Error",
        description: "There was an error playing the track. Please try again.",
        status: "error",
        duration: 3000,
      });
    }
  }
};

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTrackEnd = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    handleTrackChange(tracks[nextIndex]);
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    toast({
      title: "Now Playing",
      description: `${track.name} by ${track.artist_name}`,
      status: "info",
      duration: 2000,
    });
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    handleTrackChange(tracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    handleTrackChange(tracks[prevIndex]);
  };

  const handleShuffle = () => {
    const shuffled = shuffleTracks(UPLIFTING_TRACKS);
    setTracks(shuffled);
    setIsShuffled(true);
    toast({
      title: "Playlist Shuffled",
      status: "success",
      duration: 2000,
    });
  };

  const handleUnshuffle = () => {
    setTracks(UPLIFTING_TRACKS);
    setIsShuffled(false);
    toast({
      title: "Playlist Order Restored",
      status: "info",
      duration: 2000,
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box bg="teal.50" p={6} rounded="xl" borderWidth="1px" borderColor="teal.100">
      <VStack spacing={6}>
        {/* Header */}
        <HStack width="full" justify="space-between">
          <HStack>
            <Music color="#2C7A7B" />
            <Heading size="md" color="teal.700">Uplifting Music</Heading>
          </HStack>
          <ButtonGroup size="sm" isAttached variant="outline" colorScheme="teal">
            <Button
              leftIcon={<Shuffle size={14} />}
              onClick={isShuffled ? handleUnshuffle : handleShuffle}
              variant={isShuffled ? "solid" : "outline"}
            >
              Shuffle
            </Button>
            <Button
              leftIcon={<ListMusic size={14} />}
              onClick={() => setShowPlaylist(!showPlaylist)}
              variant={showPlaylist ? "solid" : "outline"}
            >
              Playlist
            </Button>
          </ButtonGroup>
        </HStack>

        {/* Current Track Info */}
        {currentTrack && (
          <Box width="full">
            <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
              <Image
                src={currentTrack.image}
                alt={currentTrack.name}
                boxSize="150px"
                objectFit="cover"
                rounded="lg"
                shadow="md"
              />
              <VStack align="start" flex="1">
                <Heading size="md" color="teal.800">{currentTrack.name}</Heading>
                <Text color="teal.600">{currentTrack.artist_name}</Text>
                <HStack>
                  {currentTrack.mood.map((mood) => (
                    <Badge key={mood} colorScheme="teal">{mood}</Badge>
                  ))}
                </HStack>
              </VStack>
            </Flex>

            {/* Audio Controls */}
            <VStack spacing={4} mt={6}>
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleTrackEnd}
                onLoadedData={() => setIsLoading(false)}
              />

              {/* Progress Bar */}
              <HStack width="full" spacing={4}>
                <Text fontSize="sm" color="teal.600">{formatTime(currentTime)}</Text>
                <Slider
                  value={currentTime}
                  min={0}
                  max={duration || 100}
                  onChange={(v) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = v;
                      setCurrentTime(v);
                    }
                  }}
                  colorScheme="teal"
                  isDisabled={isLoading}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text fontSize="sm" color="teal.600">{formatTime(duration)}</Text>
              </HStack>

              {/* Playback Controls */}
              <HStack spacing={4}>
                <IconButton
                  aria-label="Previous track"
                  icon={<SkipBack size={20} />}
                  onClick={handlePrevTrack}
                  colorScheme="teal"
                  variant="ghost"
                  isDisabled={isLoading}
                />
                <IconButton
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  icon={isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  onClick={handlePlay}
                  colorScheme="teal"
                  size="lg"
                  isRound
                  isLoading={isLoading}
                />
                <IconButton
                  aria-label="Next track"
                  icon={<SkipForward size={20} />}
                  onClick={handleNextTrack}
                  colorScheme="teal"
                  variant="ghost"
                  isDisabled={isLoading}
                />
              </HStack>

              {/* Volume Control */}
              <HStack width="full" maxW="200px" spacing={2}>
                <IconButton
                  aria-label="Volume"
                  icon={
                    volume === 0 ? <VolumeX size={16} /> :
                    volume < 0.5 ? <Volume1 size={16} /> :
                    <Volume2 size={16} />
                  }
                  size="sm"
                  colorScheme="teal"
                  variant="ghost"
                  onClick={() => setVolume(volume === 0 ? 0.2 : 0)}
                />
                <Slider
                  value={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={setVolume}
                  colorScheme="teal"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Playlist */}
        <Collapse in={showPlaylist} style={{ width: '100%' }}>
          <VStack spacing={2} align="stretch" mt={4}>
            {tracks.map((track) => (
              <HStack
                key={track.id}
                p={3}
                bg={currentTrack?.id === track.id ? 'teal.100' : 'white'}
                rounded="md"
                cursor="pointer"
                onClick={() => handleTrackChange(track)}
                _hover={{ bg: 'teal.50' }}
                transition="all 0.2s"
              >
                <Image
                  src={track.image}
                  alt={track.name}
                  boxSize="40px"
                  objectFit="cover"
                  rounded="md"
                />
                <VStack align="start" spacing={0} flex="1">
                  <Text fontWeight="medium">{track.name}</Text>
                  <Text fontSize="sm" color="gray.600">{track.artist_name}</Text>
                </VStack>
                <Text fontSize="sm" color="gray.500">
                  {formatTime(track.duration)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Collapse>
      </VStack>
    </Box>
  );
}
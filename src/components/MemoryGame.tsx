import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { Brain, Trophy, RotateCcw, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const emojis = ['🌟', '🎨', '🌈', '🎭', '🎪', '🎯', '🎲', '🎮'];
const cardPairs = [...emojis, ...emojis];

export default function MemoryGame() {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }>>();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: number;
    if (gameStarted && matches < 8) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matches]);

  const initializeGame = () => {
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setTimer(0);
    setGameStarted(false);
  };

  const handleCardClick = (id: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      cards![id].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    setCards(
      cards!.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      if (cards![firstId].emoji === cards![secondId].emoji) {
        setMatches((prev) => prev + 1);
        setCards(
          cards!.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);

        if (matches === 7) {
          const score = calculateScore();
          if (!bestScore || score > bestScore) {
            setBestScore(score);
            toast({
              title: "New High Score! 🎉",
              description: `You've set a new record with ${score} points!`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        }
      } else {
        setTimeout(() => {
          setCards(
            cards!.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const calculateScore = () => {
    const timeBonus = Math.max(0, 300 - timer);
    const moveBonus = Math.max(0, 100 - moves * 5);
    return timeBonus + moveBonus;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Brain color="#2b6cb0" />
        <Heading size="lg">Memory Match</Heading>
      </HStack>

      <VStack spacing={6}>
        {/* Game Stats */}
        <HStack spacing={6} width="full" justify="center">
          <Box bg="purple.50" p={3} rounded="lg">
            <HStack spacing={2}>
              <Trophy size={16} color="#805AD5" />
              <Text color="purple.700" fontWeight="medium">
                Matches: {matches}/8
              </Text>
            </HStack>
          </Box>

          <Box bg="green.50" p={3} rounded="lg">
            <HStack spacing={2}>
              <Timer size={16} color="#38A169" />
              <Text color="green.700" fontWeight="medium">
                Time: {formatTime(timer)}
              </Text>
            </HStack>
          </Box>

          {bestScore && (
            <Badge colorScheme="blue" p={2} rounded="md">
              Best Score: {bestScore}
            </Badge>
          )}
        </HStack>

        {/* Game Grid */}
        <SimpleGrid columns={4} spacing={4}>
          <AnimatePresence>
            {cards?.map((card) => (
              <MotionBox
                key={card.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleCardClick(card.id)}
                cursor={card.isMatched ? "default" : "pointer"}
              >
                <Box
                  h="80px"
                  w="80px"
                  bg={card.isMatched ? "green.100" : "white"}
                  border="2px solid"
                  borderColor={card.isMatched ? "green.200" : "gray.200"}
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  transform={`rotateY(${card.isFlipped ? '180deg' : '0deg'})`}
                  transition="transform 0.6s"
                  position="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  _hover={{
                    borderColor: card.isMatched ? "green.300" : "blue.300",
                    transform: card.isMatched ? "none" : "translateY(-2px)",
                  }}
                >
                  <Box
                    position="absolute"
                    width="full"
                    height="full"
                    style={{ backfaceVisibility: 'hidden' }}
                    bg="blue.50"
                    rounded="lg"
                    border="2px solid"
                    borderColor="blue.200"
                  />
                  <Box
                    position="absolute"
                    width="full"
                    height="full"
                    style={{ backfaceVisibility: 'hidden' }}
                    transform="rotateY(180deg)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {card.emoji}
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </AnimatePresence>
        </SimpleGrid>

        {/* Reset Button */}
        <Button
          leftIcon={<RotateCcw size={16} />}
          onClick={initializeGame}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Reset Game
        </Button>
      </VStack>
    </Box>
  );
}
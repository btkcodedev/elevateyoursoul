import React, { useState, useRef, TouchEvent } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  IconButton,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ColorSplash } from './ColorSplash';
import { welcomeCards } from '../data/welcomeCards';

const MotionBox = motion(Box);

export default function Welcome() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = welcomeCards.length;
  const touchStartX = useRef(0);

  // Responsive values
  const containerPadding = useBreakpointValue({ base: 4, md: 6 });
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const cardHeight = useBreakpointValue({ base: "250px", md: "300px" });
  const cardMaxWidth = useBreakpointValue({ base: "100%", md: "2xl" });
  const showArrows = useBreakpointValue({ base: false, md: true });

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % totalCards);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
  };

  return (
    <Box 
      minH="100vh"
      maxH="100vh"
      position="relative" 
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ColorSplash />
      
      <Container 
        maxW="container.lg" 
        h="100vh"
        py={containerPadding} 
        px={4} 
        position="relative" 
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack 
          spacing={{ base: 6, md: 8 }} 
          align="center" 
          justify="center"
          w="full"
          maxW={{ base: "100%", md: "2xl" }}
          mx="auto"
        >
          {/* Header Section */}
          <VStack spacing={3} textAlign="center" mb={{ base: 2, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading
                as="h1"
                size={headingSize}
                bgGradient="linear(to-r, blue.400, purple.400, pink.400)"
                bgClip="text"
                letterSpacing="tight"
              >
                Elevate Your Soul
              </Heading>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="gray.600"
                maxW="md"
                px={2}
              >
                Begin your transformative journey to inner peace and mindful living
              </Text>
            </motion.div>
          </VStack>

          {/* Card Carousel Section */}
          <Box 
            position="relative" 
            width="100%" 
            maxW={cardMaxWidth} 
            height={cardHeight} 
            mx="auto"
            mb={{ base: 12, md: 16 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            cursor={{ base: "grab", md: "default" }}
            _active={{ cursor: "grabbing" }}
          >
            <AnimatePresence mode="wait">
              {welcomeCards.map((item, index) => (
                <BentoCard
                  key={item.title}
                  item={item}
                  index={index}
                  isActive={index === currentIndex}
                  total={totalCards}
                />
              ))}
            </AnimatePresence>

            {/* Navigation Controls - Only shown on desktop */}
            {showArrows && (
              <HStack 
                position="absolute" 
                width="full" 
                justify="space-between" 
                top="50%" 
                transform="translateY(-50%)"
                px={{ base: 2, md: 4 }}
                zIndex={1000}
              >
                <IconButton
                  aria-label="Previous card"
                  icon={<ChevronLeft size={24} color="#3182CE" />}
                  onClick={prevCard}
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                  isRound
                  bg="white"
                  _hover={{ bg: 'blue.50' }}
                  boxShadow="lg"
                />
                <IconButton
                  aria-label="Next card"
                  icon={<ChevronRight size={24} color="#3182CE" />}
                  onClick={nextCard}
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                  isRound
                  bg="white"
                  _hover={{ bg: 'blue.50' }}
                  boxShadow="lg"
                />
              </HStack>
            )}

            {/* Pagination Dots */}
            <HStack 
              spacing={2} 
              justify="center" 
              position="absolute" 
              bottom="-24px"
              width="full"
              zIndex={1000}
            >
              {welcomeCards.map((_, index) => (
                <Box
                  key={index}
                  w={2}
                  h={2}
                  rounded="full"
                  bg={index === currentIndex ? 'blue.500' : 'gray.300'}
                  transition="all 0.2s"
                  cursor="pointer"
                  onClick={() => setCurrentIndex(index)}
                  _hover={{ transform: 'scale(1.2)' }}
                />
              ))}
            </HStack>
          </Box>

          {/* CTA Button */}
          <Button
            colorScheme="blue"
            size={{ base: "md", md: "lg" }}
            rightIcon={<ArrowRight size={18} />}
            onClick={() => navigate('/dashboard')}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
            px={6}
            mt={{ base: 8, md: 10 }}
            width={{ base: "full", md: "auto" }}
            bottom={"50px"}
          >
            Begin Your Journey
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

const BentoCard = ({ item, index, isActive, total }) => {
  const zIndex = total - index;
  const iconSize = useBreakpointValue({ base: 20, md: 24 });

  return (
    <MotionBox
      position="absolute"
      width="100%"
      initial={false}
      animate={{
        scale: isActive ? 1 : 0.9 - (index * 0.05),
        y: isActive ? 0 : 30 + (index * 10),
        opacity: isActive ? 1 : 0.7 - (index * 0.1),
        zIndex: isActive ? zIndex : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.9)"
        p={{ base: 4, md: 6 }}
        rounded="xl"
        shadow="lg"
        className="glass-morphism"
        transform={`perspective(1000px) rotateX(${isActive ? '0deg' : '5deg'})`}
        transition="transform 0.3s ease"
      >
        <VStack spacing={{ base: 3, md: 4 }} align="center">
          <Box
            p={3}
            bg={item.color}
            rounded="lg"
            color="white"
            transform={`translateZ(${isActive ? '20px' : '0px'})`}
            transition="transform 0.3s ease"
          >
            <item.icon size={iconSize} />
          </Box>
          <Heading 
            size={{ base: "md", md: "lg" }}
            color="gray.800"
            textAlign="center"
          >
            {item.title}
          </Heading>
          <Text 
            color="gray.600"
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            maxW="sm"
          >
            {item.description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};
import React from 'react';
import { HStack, IconButton, Box } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onDotClick,
}) => {
  return (
    <>
      <HStack 
        position="absolute" 
        width="full" 
        justify="space-between" 
        top="50%" 
        transform="translateY(-50%)"
        px={4}
        zIndex={1000}
      >
        <IconButton
          aria-label="Previous card"
          icon={<ChevronLeft size={24} color="#2B6CB0" />}
          onClick={onPrevious}
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
          icon={<ChevronRight size={24} color="#2B6CB0" />}
          onClick={onNext}
          colorScheme="blue"
          variant="solid"
          size="lg"
          isRound
          bg="white"
          _hover={{ bg: 'blue.50' }}
          boxShadow="lg"
        />
      </HStack>

      <Box position="absolute" bottom="-60px" left="0" right="0" zIndex={1000}>
        <HStack spacing={2} justify="center">
          {Array.from({ length: totalItems }).map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              rounded="full"
              bg={index === currentIndex ? 'blue.500' : 'gray.300'}
              transition="all 0.2s"
              cursor="pointer"
              onClick={() => onDotClick(index)}
              _hover={{
                transform: 'scale(1.2)',
                bg: index === currentIndex ? 'blue.600' : 'gray.400',
              }}
            />
          ))}
        </HStack>
      </Box>
    </>
  );
};
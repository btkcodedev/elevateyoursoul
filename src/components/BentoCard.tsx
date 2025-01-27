import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface BentoCardProps {
  item: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  isActive: boolean;
  total: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({ item, index, isActive, total }) => {
  const zIndex = total - index;

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
        p={8}
        rounded="2xl"
        shadow="lg"
        className="glass-morphism"
        transform={`perspective(1000px) rotateX(${isActive ? '0deg' : '5deg'})`}
        transition="transform 0.3s ease"
      >
        <VStack spacing={6} align="center">
          <Box
            p={4}
            bg={item.color}
            rounded="xl"
            color="white"
            transform={`translateZ(${isActive ? '20px' : '0px'})`}
            transition="transform 0.3s ease"
          >
            <item.icon size={32} />
          </Box>
          <Heading 
            size="lg" 
            color="gray.800"
            textAlign="center"
          >
            {item.title}
          </Heading>
          <Text 
            color="gray.600"
            fontSize="lg"
            textAlign="center"
            maxW="md"
          >
            {item.description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};
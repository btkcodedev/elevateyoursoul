import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionText = motion(Text);

const motivationalWords = [
  'excellent',
  'awesome',
  'superb',
  'amazing',
  'incredible',
  'wonderful',
  'fantastic',
  'brilliant'
];

export default function MotivationalText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      fontSize="sm"
      fontWeight="medium"
      display="flex"
      alignItems="center"
      color="gray.600"
    >
      You are{' '}
      <AnimatePresence mode="wait">
        <MotionText
          key={currentIndex}
          as="span"
          ml={1}
          bgGradient="linear(to-r, blue.400, purple.400)"
          bgClip="text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          {motivationalWords[currentIndex]}
        </MotionText>
      </AnimatePresence>
    </Text>
  );
}
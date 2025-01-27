import React, { useState } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, HStack } from '@chakra-ui/react';
import { LineChart, Smile, Meh, Frown } from 'lucide-react';

const moods = [
  { value: 1, icon: Frown, label: 'Very Low', color: 'red.500', bgColor: 'red.50' },
  { value: 2, icon: Frown, label: 'Low', color: 'orange.500', bgColor: 'orange.50' },
  { value: 3, icon: Meh, label: 'Okay', color: 'yellow.500', bgColor: 'yellow.50' },
  { value: 4, icon: Smile, label: 'Good', color: 'green.500', bgColor: 'green.50' },
  { value: 5, icon: Smile, label: 'Great', color: 'teal.500', bgColor: 'teal.50' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <Box bg="blue.50" p={6} rounded="xl">
      <HStack spacing={2} mb={4}>
        <LineChart color="#2b6cb0" />
        <Heading size="lg">Daily Mood Check-in</Heading>
      </HStack>
      
      <VStack spacing={6} align="stretch">
        <Text color="gray.600">How are you feeling today?</Text>
        
        <SimpleGrid columns={5} spacing={4}>
          {moods.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              variant="ghost"
              height="auto"
              p={4}
              display="flex"
              flexDir="column"
              alignItems="center"
              bg={selectedMood === mood.value ? mood.bgColor : 'white'}
              transform={selectedMood === mood.value ? 'scale(1.1)' : undefined}
              _hover={{ bg: mood.bgColor }}
              transition="all 0.2s"
            >
              <mood.icon color={selectedMood === mood.value ? mood.color : '#718096'} size={32} />
              <Text mt={2} fontSize="sm" color={selectedMood === mood.value ? mood.color : 'gray.600'}>
                {mood.label}
              </Text>
            </Button>
          ))}
        </SimpleGrid>

        {selectedMood && (
          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            mt={6}
          >
            Save Today's Mood
          </Button>
        )}
      </VStack>
    </Box>
  );
}
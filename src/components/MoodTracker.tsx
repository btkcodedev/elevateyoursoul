import React from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, HStack, Tooltip } from '@chakra-ui/react';
import { LineChart, Smile, Meh, Frown } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

const moods = [
  { value: 1, icon: Frown, label: 'Very Low', color: 'red.500', bgColor: 'red.50' },
  { value: 2, icon: Frown, label: 'Low', color: 'orange.500', bgColor: 'orange.50' },
  { value: 3, icon: Meh, label: 'Okay', color: 'yellow.500', bgColor: 'yellow.50' },
  { value: 4, icon: Smile, label: 'Good', color: 'green.500', bgColor: 'green.50' },
  { value: 5, icon: Smile, label: 'Great', color: 'teal.500', bgColor: 'teal.50' },
];

export default function MoodTracker() {
  const addMoodEntry = useSessionStore(state => state.addMoodEntry);
  const moodEntries = useSessionStore(state => state.moodEntries);
  
  // Get today's mood if exists
  const today = new Date().toISOString().split('T')[0];
  const todayMood = moodEntries.find(entry => 
    entry.timestamp.startsWith(today)
  )?.mood || null;

  const handleSaveMood = (mood: number) => {
    const moodData = moods.find(m => m.value === mood);
    if (moodData) {
      addMoodEntry(mood, moodData.label);
    }
  };

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
            <Tooltip 
              key={mood.value}
              label={mood.label}
              placement="top"
              hasArrow
            >
              <Button
                onClick={() => handleSaveMood(mood.value)}
                variant="ghost"
                height="auto"
                p={4}
                display="flex"
                flexDir="column"
                alignItems="center"
                bg={todayMood === mood.value ? mood.bgColor : 'white'}
                transform={todayMood === mood.value ? 'scale(1.1)' : undefined}
                _hover={{ bg: mood.bgColor }}
                transition="all 0.2s"
                aria-label={`Select mood: ${mood.label}`}
              >
                <mood.icon 
                  color={todayMood === mood.value ? mood.color : '#718096'} 
                  size={32} 
                />
                <Text 
                  mt={2} 
                  fontSize="sm" 
                  color={todayMood === mood.value ? mood.color : 'gray.600'}
                >
                  {mood.label}
                </Text>
              </Button>
            </Tooltip>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
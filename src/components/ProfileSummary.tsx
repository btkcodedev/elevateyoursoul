import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Progress,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { Activity, Brain, Heart, Sun, Battery, Pen } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export default function ProfileSummary() {
  const summary = useSessionStore(state => state.getDailySummary());

  return (
    <Box bg="white" p={6} rounded="xl" shadow="md">
      <VStack spacing={6} align="stretch">
        <HStack>
          <Activity size={24} color="#3182CE" />
          <Text fontSize="xl" fontWeight="bold">Today's Progress</Text>
        </HStack>

        <StatGroup>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="full">
            {/* Mood Stats */}
            <Stat bg="blue.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Brain} color="blue.500" />
                <StatLabel>Average Mood</StatLabel>
              </HStack>
              <StatNumber>{summary.averageMood.toFixed(1)}/5</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                {summary.totalMoodEntries} entries today
              </Text>
              <Progress
                value={summary.averageMood * 20}
                colorScheme="blue"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>

            {/* Breathing Stats */}
            <Stat bg="purple.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Sun} color="purple.500" />
                <StatLabel>Breathing Practice</StatLabel>
              </HStack>
              <StatNumber>{summary.breathingMinutes.toFixed(1)} mins</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                {summary.totalBreathingCycles} cycles completed
              </Text>
              <Progress
                value={Math.min(summary.breathingMinutes / 15 * 100, 100)}
                colorScheme="purple"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>

            {/* Gratitude Stats */}
            <Stat bg="pink.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Heart} color="pink.500" />
                <StatLabel>Gratitude Notes</StatLabel>
              </HStack>
              <StatNumber>{summary.gratitudeCount}</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Things you're grateful for
              </Text>
              <Progress
                value={Math.min(summary.gratitudeCount / 5 * 100, 100)}
                colorScheme="pink"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>

            {/* Writing Stats */}
            <Stat bg="green.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Pen} color="green.500" />
                <StatLabel>Mindful Writing</StatLabel>
              </HStack>
              <StatNumber>{summary.writingCount}</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Reflections written
              </Text>
              <Progress
                value={Math.min(summary.writingCount / 3 * 100, 100)}
                colorScheme="green"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>

            {/* Habits Stats */}
            <Stat bg="orange.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Activity} color="orange.500" />
                <StatLabel>Habits Completed</StatLabel>
              </HStack>
              <StatNumber>{summary.completedHabits}</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Daily habits tracked
              </Text>
              <Progress
                value={Math.min(summary.completedHabits / 5 * 100, 100)}
                colorScheme="orange"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>

            {/* Energy Stats */}
            <Stat bg="cyan.50" p={4} rounded="lg">
              <HStack spacing={3} mb={2}>
                <Icon as={Battery} color="cyan.500" />
                <StatLabel>Average Energy</StatLabel>
              </HStack>
              <StatNumber>{summary.averageEnergy.toFixed(1)}%</StatNumber>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Daily energy level
              </Text>
              <Progress
                value={summary.averageEnergy}
                colorScheme="cyan"
                size="sm"
                mt={2}
                rounded="full"
              />
            </Stat>
          </SimpleGrid>
        </StatGroup>
      </VStack>
    </Box>
  );
}
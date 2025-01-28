import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  HStack,
  Icon,
  SimpleGrid,
  Box,
  Progress,
  Select,
} from '@chakra-ui/react';
import { Brain, Heart, Wind, PenTool, ListChecks, Battery } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionSummaryModal({ isOpen, onClose }: SessionSummaryModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const summary = useSessionStore(state => state.getDailySummary(selectedDate));
  const availableDates = useSessionStore(state => state.getAvailableDates());

  const stats = [
    {
      icon: Brain,
      label: 'Average Mood',
      value: `${summary.averageMood.toFixed(1)}/5`,
      progress: (summary.averageMood / 5) * 100,
      color: 'blue'
    },
    {
      icon: Wind,
      label: 'Breathing Practice',
      value: `${summary.breathingMinutes.toFixed(1)} mins`,
      progress: Math.min(summary.breathingMinutes / 15 * 100, 100),
      color: 'purple'
    },
    {
      icon: Heart,
      label: 'Gratitude Notes',
      value: summary.gratitudeCount.toString(),
      progress: Math.min(summary.gratitudeCount / 5 * 100, 100),
      color: 'pink'
    },
    {
      icon: PenTool,
      label: 'Mindful Writings',
      value: summary.writingCount.toString(),
      progress: Math.min(summary.writingCount / 3 * 100, 100),
      color: 'green'
    },
    {
      icon: ListChecks,
      label: 'Completed Habits',
      value: summary.completedHabits.toString(),
      progress: Math.min(summary.completedHabits / 5 * 100, 100),
      color: 'orange'
    },
    {
      icon: Battery,
      label: 'Average Energy',
      value: `${summary.averageEnergy.toFixed(1)}%`,
      progress: summary.averageEnergy,
      color: 'cyan'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack align="stretch" spacing={4}>
            <Text>Your Progress</Text>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="sm"
            >
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </option>
              ))}
            </Select>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {stats.map((stat) => (
              <Box
                key={stat.label}
                bg={`${stat.color}.50`}
                p={4}
                rounded="lg"
                borderWidth="1px"
                borderColor={`${stat.color}.100`}
              >
                <VStack align="stretch" spacing={2}>
                  <HStack>
                    <Icon as={stat.icon} color={`${stat.color}.500`} />
                    <Text color={`${stat.color}.700`} fontSize="sm" fontWeight="medium">
                      {stat.label}
                    </Text>
                  </HStack>
                  <Text fontSize="xl" fontWeight="bold" color={`${stat.color}.700`}>
                    {stat.value}
                  </Text>
                  <Progress
                    value={stat.progress}
                    size="sm"
                    colorScheme={stat.color}
                    rounded="full"
                  />
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
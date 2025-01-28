import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  Badge,
} from '@chakra-ui/react';
import { Brain, BookOpen, PenTool, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const activities = [
  {
    icon: Brain,
    title: 'CBT Exercise',
    description: 'Challenge negative thoughts using Cognitive Behavioral Therapy techniques',
    duration: '10 mins',
    content: {
      title: 'Cognitive Behavioral Therapy Exercise',
      description: 'CBT is one of the most evidence-based approaches for managing thoughts and emotions.',
      steps: [
        'Identify a troubling situation or condition in your life',
        'Become aware of your thoughts about it',
        'Identify negative patterns in your thinking',
        'Challenge your negative thoughts',
        'Replace them with realistic ones'
      ],
      benefits: [
        'Reduces symptoms of anxiety and depression',
        'Improves emotional regulation',
        'Develops better coping strategies',
        'Enhances problem-solving abilities'
      ],
      research: 'Multiple meta-analyses have shown CBT to be effective for various mental health conditions (Butler et al., 2006)'
    }
  },
  {
    icon: BookOpen,
    title: 'Gratitude Journal',
    description: 'Practice gratitude through structured journaling',
    duration: '5 mins',
    content: {
      title: 'Evidence-Based Gratitude Practice',
      description: 'Regular gratitude practice has been shown to increase well-being and life satisfaction.',
      steps: [
        'Find a quiet moment in your day',
        'Write down three specific things you\'re grateful for',
        'Include why these things matter to you',
        'Reflect on how they impact your life',
        'Notice how this practice affects your mood'
      ],
      benefits: [
        'Increases positive emotions',
        'Improves sleep quality',
        'Reduces stress levels',
        'Enhances relationships'
      ],
      research: 'Research by Emmons & McCullough (2003) showed significant well-being improvements from daily gratitude journaling'
    }
  },
  {
    icon: PenTool,
    title: 'Mindful Writing',
    description: 'Express your feelings through structured writing exercises',
    duration: '15 mins',
    content: {
      title: 'Therapeutic Writing Exercise',
      description: 'Expressive writing has been shown to have both psychological and physical health benefits.',
      steps: [
        'Choose a quiet, comfortable space',
        'Write continuously for 15 minutes',
        'Focus on your deepest thoughts and feelings',
        'Don\'t worry about grammar or spelling',
        'Reflect on what you\'ve written'
      ],
      benefits: [
        'Reduces stress and anxiety',
        'Improves emotional processing',
        'Enhances self-awareness',
        'Helps organize thoughts'
      ],
      research: 'Pennebaker\'s research (1997) demonstrated significant health improvements from expressive writing'
    }
  }
];

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Brain color="#2b6cb0" />
        <Heading size="lg">Evidence-Based Activities</Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {activities.map((activity) => (
          <Box
            key={activity.title}
            bg="white"
            p={4}
            rounded="lg"
            shadow="md"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            <VStack align="start" spacing={3}>
              <activity.icon color="#2b6cb0" />
              <Heading size="sm">{activity.title}</Heading>
              <Text fontSize="sm" color="gray.600">
                {activity.description}
              </Text>
              <HStack>
                <Clock size={14} />
                <Text fontSize="xs" color="blue.600">
                  {activity.duration}
                </Text>
              </HStack>
              <Button
                rightIcon={<ArrowRight size={16} />}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedActivity(activity)}
                colorScheme="blue"
              >
                Learn More
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedActivity(null)}
          size="xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack spacing={2}>
                <selectedActivity.icon color="#2b6cb0" />
                <Text>{selectedActivity.content.title}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Text color="gray.700">{selectedActivity.content.description}</Text>
                </Box>

                <Box>
                  <Heading size="sm" mb={3}>Steps to Follow</Heading>
                  <List spacing={3}>
                    {selectedActivity.content.steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListIcon as={CheckCircle2} color="green.500" />
                        {step}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Heading size="sm" mb={3}>Benefits</Heading>
                  <List spacing={3}>
                    {selectedActivity.content.benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListIcon as={CheckCircle2} color="blue.500" />
                        {benefit}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Badge colorScheme="purple" mb={2}>Research Evidence</Badge>
                  <Text fontSize="sm" color="gray.600">
                    {selectedActivity.content.research}
                  </Text>
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
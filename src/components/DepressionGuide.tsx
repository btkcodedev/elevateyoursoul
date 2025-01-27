import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Brain, CheckCircle2, Info, ArrowRight } from 'lucide-react';

const techniques = [
  {
    title: "5-4-3-2-1 Grounding",
    description: "Focus on your senses to stay present",
    steps: [
      "Name 5 things you can see",
      "Touch 4 things around you",
      "Notice 3 sounds you hear",
      "Identify 2 things you can smell",
      "Acknowledge 1 thing you can taste"
    ],
    evidence: "Grounding techniques help reduce anxiety and depression symptoms by redirecting attention to the present moment."
  },
  {
    title: "Behavioral Activation",
    description: "Small actions to break depression cycles",
    steps: [
      "Start with a 5-minute activity",
      "Gradually increase duration",
      "Celebrate small wins",
      "Build consistent routines",
      "Track your progress"
    ],
    evidence: "Research shows behavioral activation is as effective as cognitive therapy for depression (Dimidjian et al., 2006)."
  },
  {
    title: "Thought Recording",
    description: "Challenge negative thought patterns",
    steps: [
      "Write down troubling thoughts",
      "Identify thinking patterns",
      "Find evidence for and against",
      "Create balanced thoughts",
      "Practice self-compassion"
    ],
    evidence: "Cognitive restructuring is a core evidence-based strategy for managing depression (Beck, 2020)."
  }
];

export default function DepressionGuide() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTechnique, setSelectedTechnique] = React.useState(null);

  const handleTechniqueClick = (technique) => {
    setSelectedTechnique(technique);
    onOpen();
  };

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Brain color="#2b6cb0" />
        <Heading size="lg">Depression Management</Heading>
      </HStack>

      <VStack spacing={4} align="stretch">
        {techniques.map((technique, index) => (
          <Box
            key={index}
            bg="blue.50"
            p={4}
            rounded="lg"
            borderWidth="1px"
            borderColor="blue.100"
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md',
            }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => handleTechniqueClick(technique)}
          >
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1}>
                <Heading size="sm" color="blue.700">
                  {technique.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {technique.description}
                </Text>
              </VStack>
              <ArrowRight size={20} color="#2B6CB0" />
            </HStack>
          </Box>
        ))}

        <Button
          leftIcon={<Info size={16} />}
          colorScheme="blue"
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedTechnique({
              title: "Important Note",
              description: "These techniques are supplementary tools and not replacements for professional help.",
              steps: [
                "Consult mental health professionals",
                "Follow prescribed treatments",
                "Use these techniques alongside treatment",
                "Reach out to support networks",
                "Monitor your progress"
              ],
              evidence: "Combined treatment approaches (therapy, medication, and self-help strategies) often yield the best outcomes."
            });
            onOpen();
          }}
        >
          Important Information
        </Button>
      </VStack>

      {/* Technique Detail Modal */}
      {selectedTechnique && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent rounded="xl">
            <ModalHeader>
              <HStack spacing={2}>
                <Brain color="#2B6CB0" />
                <Text>{selectedTechnique.title}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="stretch" spacing={6}>
                <Text color="gray.700">{selectedTechnique.description}</Text>

                <Box>
                  <Heading size="sm" mb={3}>Practice Steps</Heading>
                  <List spacing={3}>
                    {selectedTechnique.steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListIcon as={CheckCircle2} color="green.500" />
                        {step}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Badge colorScheme="purple" mb={2}>Research Evidence</Badge>
                  <Text fontSize="sm" color="gray.600">
                    {selectedTechnique.evidence}
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
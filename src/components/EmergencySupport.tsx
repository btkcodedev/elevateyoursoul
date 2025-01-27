import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Phone, MessageSquare } from 'lucide-react';

interface EmergencySupportProps {
  onClose: () => void;
}

export default function EmergencySupport({ onClose }: EmergencySupportProps) {
  return (
    <Modal isOpen={true} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent rounded="xl" p={2}>
        <ModalHeader>
          <Heading size="lg" color="red.600">Emergency Support</Heading>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} pb={6}>
            <Box bg="red.50" p={4} rounded="lg" width="full">
              <HStack spacing={3} mb={2}>
                <Phone color="#E53E3E" />
                <Heading size="sm">Crisis Hotline</Heading>
              </HStack>
              <Text fontSize="xl" fontWeight="bold">988</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                24/7 Suicide & Crisis Lifeline
              </Text>
            </Box>

            <Box bg="blue.50" p={4} rounded="lg" width="full">
              <HStack spacing={3} mb={2}>
                <MessageSquare color="#3182CE" />
                <Heading size="sm">Crisis Text Line</Heading>
              </HStack>
              <Text fontSize="xl" fontWeight="bold">Text HOME to 741741</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                24/7 Crisis Counseling
              </Text>
            </Box>

            <Text fontSize="sm" color="gray.600">
              If you're experiencing a medical emergency, please call 911 or go to
              your nearest emergency room.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
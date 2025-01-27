import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Link,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CircleDot, Heart } from 'lucide-react';

interface CopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CopyrightModal({ isOpen, onClose }: CopyrightModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>License & Revenue Sharing</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Text>
              © {new Date().getFullYear()} ElevateYourSoul
            </Text>
            
            <Text fontWeight="medium">Revenue Distribution:</Text>
            <List spacing={2}>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={CircleDot} color="blue.500" />
                <Text>70% Original Creator</Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={CircleDot} color="blue.500" />
                <Text>30% Contributing Partners</Text>
              </ListItem>
            </List>

            <Divider />

            <Text fontSize="sm" color="gray.600">
              Licensed under MIT License with Commons Clause
            </Text>

            <Text fontSize="sm" color="gray.600">
              Commercial use requires explicit permission and agreement to revenue sharing terms.
            </Text>

            <VStack spacing={1} align="start">
              <Text fontSize="xs" color="gray.500">
                Made with <Heart size={12} style={{ display: 'inline' }} /> by ElevateYourSoul
              </Text>
              <Link
                href="mailto:legal@elevateyoursoul.com"
                fontSize="xs"
                color="blue.500"
              >
                Contact for licensing
              </Link>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
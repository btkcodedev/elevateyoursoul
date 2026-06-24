import React from 'react';
import { Box, Text, Button, useDisclosure, HStack, Badge, Link as ChakraLink } from '@chakra-ui/react';
import { Info } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import CopyrightModal from './CopyrightModal';
import { version } from '../../package.json';

export default function CopyrightStatement() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTopWidth="1px"
      borderColor="gray.200"
      py={2}
      px={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      zIndex={100}
    >
      <HStack spacing={4}>
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} ElevateYourSoul
        </Text>
        <Button
          size="xs"
          variant="ghost"
          colorScheme="blue"
          leftIcon={<Info size={14} />}
          onClick={onOpen}
        >
          License Info
        </Button>
        <ChakraLink as={RouterLink} to="/privacy-policy" fontSize="sm" color="blue.500">
          Privacy Policy
        </ChakraLink>
        <Badge
          colorScheme="gray"
          variant="subtle"
          px={2}
          py={1}
          borderRadius="sm"
          fontSize="xs"
        >
          v{version}
        </Badge>
      </HStack>
      
      <CopyrightModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
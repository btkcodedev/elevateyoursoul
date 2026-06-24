import React from 'react';
import {
  Box,
  Container,
  Heading,
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 16 }} px={4}>
      <Container maxW="4xl" bg="white" borderRadius="2xl" boxShadow="md" p={{ base: 6, md: 10 }}>
        <VStack align="start" spacing={6}>
          <Heading as="h1" size="xl">
            Privacy Policy
          </Heading>
          <Text color="gray.600">Effective Date: June 24, 2026</Text>

          <Text>
            Your privacy is important to us. This Privacy Policy explains how Elevate Your Soul
            collects, uses, and protects your information when you visit our website.
          </Text>

          <Heading as="h2" size="md">
            1. Information We Collect
          </Heading>
          <Text>
            We collect information that helps us improve your experience, including account details,
            usage patterns, preferences, and wellness activity data you choose to share.
          </Text>

          <Heading as="h2" size="md">
            2. How We Use Your Information
          </Heading>
          <UnorderedList spacing={2} pl={4}>
            <ListItem>To provide and improve our services.</ListItem>
            <ListItem>To personalize your experience and support your wellness journey.</ListItem>
            <ListItem>To maintain security and prevent misuse of the platform.</ListItem>
            <ListItem>To analyze trends and improve the quality of our content.</ListItem>
          </UnorderedList>

          <Heading as="h2" size="md">
            3. Analytics and Cookies
          </Heading>
          <Text>
            We may use analytics tools and cookies to understand how visitors interact with the site.
            These tools help us measure performance and improve functionality.
          </Text>

          <Heading as="h2" size="md">
            4. Your Choices
          </Heading>
          <Text>
            You can manage your browser settings to control cookies and related tracking preferences.
            If you choose not to share certain information, some features may be limited.
          </Text>

          <Heading as="h2" size="md">
            5. Data Security
          </Heading>
          <Text>
            We take reasonable steps to protect your information. However, no digital platform can
            guarantee complete security.
          </Text>

          <Heading as="h2" size="md">
            6. Contact Us
          </Heading>
          <Text>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <ChakraLink href="mailto:legal@elevateyoursoul.com" color="blue.500">
              legal@elevateyoursoul.com
            </ChakraLink>
            .
          </Text>

          <ChakraLink as={RouterLink} to="/" color="blue.500">
            Return to home
          </ChakraLink>
        </VStack>
      </Container>
    </Box>
  );
}

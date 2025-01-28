import React from 'react';
import { VStack, Text, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

export const PrivacyPolicy = () => (
  <VStack align="start" spacing={4}>
    <Heading size="md">Privacy Policy</Heading>
    <Text>Last updated: January 2024</Text>
    
    <Text>
      At ElevateYourSoul, we take your privacy seriously. This Privacy Policy explains how we collect,
      use, and protect your personal information.
    </Text>

    <Heading size="sm">Information We Collect</Heading>
    <UnorderedList spacing={2}>
      <ListItem>Account information (email, name)</ListItem>
      <ListItem>Usage data and preferences</ListItem>
      <ListItem>Mental wellness tracking data</ListItem>
      <ListItem>Session information</ListItem>
    </UnorderedList>

    <Heading size="sm">How We Use Your Information</Heading>
    <UnorderedList spacing={2}>
      <ListItem>To provide and improve our services</ListItem>
      <ListItem>To personalize your experience</ListItem>
      <ListItem>To track your progress and generate insights</ListItem>
      <ListItem>To maintain the security of our platform</ListItem>
    </UnorderedList>

    <Heading size="sm">Data Security</Heading>
    <Text>
      We implement industry-standard security measures to protect your personal information.
      All data is encrypted in transit and at rest.
    </Text>

    <Heading size="sm">Data Retention</Heading>
    <Text>
      We retain your data for as long as your account is active or as needed to provide services.
      You can request data deletion at any time.
    </Text>

    <Heading size="sm">Your Rights</Heading>
    <UnorderedList spacing={2}>
      <ListItem>Access your personal data</ListItem>
      <ListItem>Correct inaccurate data</ListItem>
      <ListItem>Request data deletion</ListItem>
      <ListItem>Export your data</ListItem>
    </UnorderedList>
  </VStack>
);

export const TermsAndConditions = () => (
  <VStack align="start" spacing={4}>
    <Heading size="md">Terms and Conditions</Heading>
    <Text>Last updated: January 2024</Text>

    <Heading size="sm">1. Acceptance of Terms</Heading>
    <Text>
      By accessing or using ElevateYourSoul, you agree to be bound by these Terms and Conditions
      and our Privacy Policy.
    </Text>

    <Heading size="sm">2. Service Description</Heading>
    <Text>
      ElevateYourSoul provides mental wellness tools and resources. We do not provide medical advice
      or professional therapy services.
    </Text>

    <Heading size="sm">3. User Responsibilities</Heading>
    <UnorderedList spacing={2}>
      <ListItem>Maintain accurate account information</ListItem>
      <ListItem>Keep login credentials secure</ListItem>
      <ListItem>Use the service responsibly</ListItem>
      <ListItem>Respect other users' privacy</ListItem>
    </UnorderedList>

    <Heading size="sm">4. Medical Disclaimer</Heading>
    <Text>
      Our service is not a substitute for professional medical advice, diagnosis, or treatment.
      Always seek professional help for medical emergencies.
    </Text>

    <Heading size="sm">5. Intellectual Property</Heading>
    <Text>
      All content and materials available on ElevateYourSoul are protected by intellectual
      property rights and belong to ElevateYourSoul or its licensors.
    </Text>

    <Heading size="sm">6. Limitation of Liability</Heading>
    <Text>
      ElevateYourSoul is not liable for any indirect, incidental, special, or consequential
      damages arising from your use of the service.
    </Text>

    <Heading size="sm">7. Changes to Terms</Heading>
    <Text>
      We reserve the right to modify these terms at any time. Continued use of the service
      constitutes acceptance of modified terms.
    </Text>
  </VStack>
);
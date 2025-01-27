import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  IconButton,
  useDisclosure,
  Flex,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AlertTriangle, LogOut, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Activities from '../components/Activities';
import BreathingGuide from '../components/BreathingGuide';
import MoodTracker from '../components/MoodTracker';
import SelfCare from '../components/SelfCare';
import SupportSection from '../components/SupportSection';
import EmergencySupport from '../components/EmergencySupport';
import AdBento from '../components/AdBento';
import MotivationalText from '../components/MotivationalText';
import MemoryGame from '../components/MemoryGame';
import MindfulWriting from '../components/MindfulWriting';
import GratitudeJournal from '../components/GratitudeJournal';
import DepressionGuide from '../components/DepressionGuide';
import AmazonBooksBento from '../components/AmazonBooksBento';
import MusicPlayer from '../components/MusicPlayer';

const MotionHeading = motion(Heading);

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showMenuIcon = useBreakpointValue({ base: true, md: false });


  return (
    <Box minH="100vh" bg="gray.50">
      <Box py={4}>
        <Container maxW="5xl">
          <Box
            mx="auto"
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(12px)"
            borderWidth="1px"
            borderColor="gray.100"
            rounded="2xl"
            boxShadow="lg"
            px={6}
            py={3}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '1rem',
              padding: '2px',
              background: 'linear-gradient(45deg, rgba(66, 153, 225, 0.2), rgba(159, 122, 234, 0.2))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none'
            }}
          >
            <Flex justify="space-between" align="center">
              <VStack spacing={0} align="start">
                <MotionHeading
                  size="md"
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  bgClip="text"
                  animate={{
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  Elevate Your Soul
                </MotionHeading>
                <MotivationalText />
              </VStack>

              <HStack spacing={4}>
                <IconButton
                  aria-label="Emergency Support"
                  icon={<AlertTriangle size={18} />}
                  onClick={onOpen}
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  _hover={{
                    bg: 'red.50'
                  }}
                />
                
                {/* <Menu>
                  <MenuButton>
                    <Avatar 
                      size="sm" 
                      bg="blue.500"
                      icon={<User size={18} color="white" />}
                      _hover={{
                        transform: 'scale(1.05)',
                        boxShadow: 'sm'
                      }}
                      transition="all 0.2s"
                    />
                  </MenuButton>
                  <MenuList
                    shadow="lg"
                    border="none"
                    bg="white"
                    backdropFilter="blur(12px)"
                    rounded="xl"
                  >
                    <MenuItem icon={<User size={14} />}>Profile</MenuItem>
                    <MenuItem icon={<Settings size={14} />}>Settings</MenuItem>
                    <MenuItem icon={<LogOut size={14} />}>Sign Out</MenuItem>
                  </MenuList>
                </Menu> */}
              </HStack>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <VStack spacing={8} align="stretch">
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <MoodTracker />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <BreathingGuide />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <GratitudeJournal />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <MindfulWriting />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <SupportSection />
            </Box>
            <AdBento slot="dashboard-left" format="vertical" />
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <DepressionGuide />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <AmazonBooksBento />
            </Box>
          </VStack>

          {/* Right Column */}
          <VStack spacing={8} align="stretch">
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <Activities />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <SelfCare />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <MusicPlayer />
            </Box>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <MemoryGame />
            </Box>
            <AdBento slot="dashboard-right" format="vertical" />
          </VStack>
        </SimpleGrid>

       {isOpen && <EmergencySupport onClose={onClose} />}
      </Container>
    </Box>
  );
}
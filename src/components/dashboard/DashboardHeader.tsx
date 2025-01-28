import React, { memo } from 'react';
import {
  Box,
  VStack,
  IconButton,
  Flex,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Skeleton,
  Tooltip,
  Portal,
} from '@chakra-ui/react';
import { AlertTriangle, LogOut, Settings, User, BarChart2, Trash2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import MotivationalText from '../MotivationalText';

const MotionHeading = motion(Heading);

interface DashboardHeaderProps {
  user: any;
  onSignOut: () => void;
  onClearSession: () => void;
  onEmergencyOpen: () => void;
  onSummaryOpen: () => void;
}

const DashboardHeader = memo(({
  user,
  onSignOut,
  onClearSession,
  onEmergencyOpen,
  onSummaryOpen,
}: DashboardHeaderProps) => {
  return (
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
          <HStack spacing={2}>
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
            <Tooltip
              label={
                <VStack spacing={2} p={2}>
                  <Text fontWeight="medium">About ElevateYourSoul</Text>
                  <Text>
                    A comprehensive mental wellness platform offering meditation, 
                    mood tracking, and mindfulness exercises. Our evidence-based 
                    approach helps you maintain mental well-being and emotional balance.
                  </Text>
                </VStack>
              }
              closeDelay={0}
              openDelay={0}
            >
              <Box as="span" cursor="help">
                <Info size={16} color="#4A5568" />
              </Box>
            </Tooltip>
          </HStack>
          <Suspense fallback={<Skeleton height="20px" width="200px" />}>
            <MotivationalText />
          </Suspense>
        </VStack>

        <HStack spacing={4}>
          <Tooltip label="Clear session data" closeDelay={0} openDelay={0}>
            <IconButton
              aria-label="Clear session"
              icon={<Trash2 size={18} />}
              onClick={onClearSession}
              colorScheme="red"
              variant="ghost"
              size="sm"
              _hover={{
                bg: 'red.50'
              }}
            />
          </Tooltip>
          
          <Tooltip label="Emergency support" closeDelay={0} openDelay={0}>
            <IconButton
              aria-label="Emergency Support"
              icon={<AlertTriangle size={18} />}
              onClick={onEmergencyOpen}
              colorScheme="red"
              variant="ghost"
              size="sm"
              _hover={{
                bg: 'red.50'
              }}
            />
          </Tooltip>
          
          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<User size={18} />}
                variant="ghost"
                colorScheme="blue"
                size="sm"
                _hover={{
                  bg: 'blue.50'
                }}
              />
              <MenuList
                shadow="lg"
                border="none"
                bg="white"
                backdropFilter="blur(12px)"
                rounded="xl"
              >
                <MenuItem icon={<User size={14} />}>Profile</MenuItem>
                <MenuItem icon={<Settings size={14} />}>Settings</MenuItem>
                <MenuItem icon={<BarChart2 size={14} />} onClick={onSummaryOpen}>
                  View Summary
                </MenuItem>
                <MenuItem icon={<Trash2 size={14} />} onClick={onClearSession} color="red.500">
                  Clear Session
                </MenuItem>
                <MenuItem icon={<LogOut size={14} />} onClick={onSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Tooltip label="View summary" closeDelay={0} openDelay={0}>
              <IconButton
                aria-label="View Summary"
                icon={<User size={18} />}
                onClick={onSummaryOpen}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                _hover={{
                  bg: 'blue.50'
                }}
              />
            </Tooltip>
          )}
        </HStack>
      </Flex>
    </Box>
  );
});

DashboardHeader.displayName = 'DashboardHeader';
export default DashboardHeader;
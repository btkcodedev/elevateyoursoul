import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Button,
  Text,
  Divider,
  useDisclosure,
  Box,
  Link,
  Collapse,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
} from '@chakra-ui/react';
import { LogIn, User, AlertTriangle, ChevronDown, ChevronUp, FileText, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PrivacyPolicy, TermsAndConditions } from '../legal/LegalContent';

export default function WelcomeModal() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [showLegal, setShowLegal] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, purple.900)'
  );

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGuestAccess = () => {
    onClose();
  };

  // Legal Modals
  const {
    isOpen: isPrivacyOpen,
    onOpen: onPrivacyOpen,
    onClose: onPrivacyClose
  } = useDisclosure();

  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose
  } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        size="lg"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent
          mx={4}
          overflow="hidden"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
        >
          <Box
            position="absolute"
            inset={0}
            bgGradient={bgGradient}
            opacity={0.9}
            zIndex={-1}
          />
          
          <ModalHeader 
            textAlign="center" 
            fontSize="2xl"
            pt={8}
            pb={4}
            px={8}
          >
            Welcome to ElevateYourSoul
          </ModalHeader>

          <ModalBody pb={8} px={8}>
            <VStack spacing={8}>
              <Text 
                textAlign="center" 
                color={useColorModeValue('gray.600', 'gray.300')}
                fontSize="lg"
              >
                Begin your journey to mental wellness and mindful living
              </Text>

              <Alert 
                status="warning" 
                variant="left-accent" 
                borderRadius="md"
                fontSize="sm"
              >
                <AlertIcon as={AlertTriangle} />
                <AlertDescription>
                  This app is not a substitute for professional medical advice or treatment. 
                  If you're experiencing a crisis, please seek immediate professional help.
                </AlertDescription>
              </Alert>

              <Button
                leftIcon={<LogIn size={18} />}
                colorScheme="blue"
                size="lg"
                width="full"
                onClick={handleGoogleSignIn}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                Continue with Google
              </Button>

              <Divider />

              <Button
                leftIcon={<User size={18} />}
                variant="outline"
                size="lg"
                width="full"
                onClick={handleGuestAccess}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "sm",
                }}
              >
                Continue as Guest
              </Button>

              <Box width="full">
                <Button
                  variant="ghost"
                  size="sm"
                  width="full"
                  rightIcon={showLegal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  onClick={() => setShowLegal(!showLegal)}
                  mb={2}
                >
                  Legal Information
                </Button>
                
                <Collapse in={showLegal}>
                  <VStack
                    spacing={4}
                    p={4}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded="md"
                    fontSize="sm"
                    align="stretch"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onPrivacyOpen}
                      leftIcon={<Shield size={16} />}
                      justifyContent="start"
                    >
                      Privacy Policy
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onTermsOpen}
                      leftIcon={<FileText size={16} />}
                      justifyContent="start"
                    >
                      Terms and Conditions
                    </Button>

                    <Text fontSize="xs" color="gray.500">
                      By continuing, you acknowledge that you have read and agree to our Privacy Policy
                      and Terms of Conditions.
                    </Text>
                  </VStack>
                </Collapse>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal isOpen={isPrivacyOpen} onClose={onPrivacyClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalBody pb={6}>
            <PrivacyPolicy />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal isOpen={isTermsOpen} onClose={onTermsClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody pb={6}>
            <TermsAndConditions />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
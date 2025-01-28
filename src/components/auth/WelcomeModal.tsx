import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Button,
  Text,
  useDisclosure,
  Box,
  Collapse,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  User,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  Flower2,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PrivacyPolicy, TermsAndConditions } from "../legal/LegalContent";

export default function WelcomeModal() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [showLegal, setShowLegal] = React.useState(false);
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, gray.900, purple.900)"
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGuestAccess = () => {
    onClose();
  };

  // Legal Modals
  const {
    isOpen: isPrivacyOpen,
    onOpen: onPrivacyOpen,
    onClose: onPrivacyClose,
  } = useDisclosure();

  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
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
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <Box
            position="absolute"
            inset={0}
            bgGradient={bgGradient}
            opacity={0.9}
            zIndex={-1}
          />

          <ModalHeader textAlign="center" fontSize="2xl" pt={8} pb={4} px={8}>
            Welcome to ElevateYourSoul
          </ModalHeader>

          <ModalBody pb={4} px={8}>
            <VStack spacing={8}>
              <Text
                textAlign="center"
                color={useColorModeValue("gray.600", "gray.300")}
                fontSize="lg"
              >
                Begin your journey to mental wellness and mindful living
              </Text>
              <Box
                position="relative"
                width="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={4}
              >
                <Box
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: "1px",
                    bg: "gray.200",
                    zIndex: 0,
                  }}
                >
                  <Box
                    position="relative"
                    bg={useColorModeValue("white", "gray.800")}
                    px={2}
                    zIndex={1}
                    rounded="full"
                    shadow="sm"
                  >
                    <Icon
                      as={Flower2}
                      color="pink.400"
                      boxSize={8}
                      transform="rotate(0deg)"
                      animation="spin 20s linear infinite"
                    />
                  </Box>
                </Box>
              </Box>
              {/* For future release */}
              {/* <Button
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
              </Button> */}

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
                  rightIcon={
                    showLegal ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  }
                  onClick={() => setShowLegal(!showLegal)}
                  mb={2}
                >
                  Legal Information
                </Button>

                <Collapse in={showLegal}>
                  <VStack
                    spacing={4}
                    p={4}
                    bg={useColorModeValue("white", "gray.800")}
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
                      By continuing, you acknowledge that you have read and
                      agree to our Privacy Policy and Terms of Conditions.
                    </Text>
                  </VStack>
                </Collapse>
              </Box>

              {/* Decorative Flower */}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyOpen}
        onClose={onPrivacyClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalBody pb={6}>
            <PrivacyPolicy />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={isTermsOpen}
        onClose={onTermsClose}
        size="xl"
        scrollBehavior="inside"
      >
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

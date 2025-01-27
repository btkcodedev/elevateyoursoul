import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Text,
  Circle,
  HStack,
} from "@chakra-ui/react";
import { Wind } from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function BreathingGuide() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [timer, setTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const intervals = {
    inhale: 6000,
    hold: 7000,
    exhale: 8000,
  };

  useEffect(() => {
    if (!isBreathing) {
      setTimer(0);
      setCycleCount(0);
      return;
    }

    const phaseInterval = intervals[phase];
    const startTime = Date.now();

    const timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, phaseInterval - elapsed);
      setTimer(Math.floor(remaining / 1000));

      if (elapsed >= phaseInterval) {
        setPhase((current) => {
          if (current === "exhale") {
            setCycleCount((prev) => prev + 1);
            return "inhale";
          }
          if (current === "inhale") return "hold";
          return "exhale";
        });
      }
    }, 100);

    return () => clearInterval(timerInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreathing, phase]);

  useEffect(() => {
    if (cycleCount === 1) {
      setIsBreathing(false);
    }
  }, [cycleCount]);

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return {
          bg: "teal.50",
          border: "teal.400",
          text: "teal.700",
          progress: "teal",
        };
      case "hold":
        return {
          bg: "purple.50",
          border: "purple.400",
          text: "purple.700",
          progress: "purple",
        };
      case "exhale":
        return {
          bg: "blue.50",
          border: "blue.400",
          text: "blue.700",
          progress: "blue",
        };
      default:
        return {
          bg: "gray.50",
          border: "gray.400",
          text: "gray.700",
          progress: "gray",
        };
    }
  };

  const getPhaseInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in slowly through your nose";
      case "hold":
        return "Hold your breath gently";
      case "exhale":
        return "Exhale slowly through your mouth";
      default:
        return "Press start to begin";
    }
  };

  const progress = isBreathing
    ? ((intervals[phase] - timer * 1000) / intervals[phase]) * 100
    : 0;
  const colors = getPhaseColor();

  return (
    <Box bg="cyan.50" p={8} rounded="xl">
      <HStack spacing={2} mb={6} justify="center">
        <Wind size={18} color="#2b6cb0" />
        <Heading size="md" color="gray.700" fontWeight="medium">
          Breathing Exercise
        </Heading>
      </HStack>

      <VStack spacing={8} align="center">
        {/* Timer Circle */}
        <Box position="relative" width="240px" height="240px">
          {/* Inner Circle with Timer */}
          <Circle
            size="200px"
            position="absolute"
            top="20px"
            left="20px"
            bg={isBreathing ? colors.bg : "white"}
            boxShadow="lg"
            transform={
              isBreathing
                ? phase === "inhale"
                  ? "scale(1.1)"
                  : phase === "exhale"
                  ? "scale(0.9)"
                  : "scale(1)"
                : "scale(1)"
            }
            transition="all 2s ease-in-out"
            zIndex={1}
          >
            <VStack spacing={2}>
              <Text
                fontSize="5xl"
                fontWeight="bold"
                color={colors.text}
                fontFamily="mono"
              >
                {timer}
              </Text>
              <Text
                fontSize="xl"
                color={colors.text}
                fontWeight="medium"
                textTransform="capitalize"
              >
                {!isBreathing ? "Ready" : phase}
              </Text>
            </VStack>
          </Circle>

          {/* Animated Progress Bar */}
          {isBreathing && (
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              width="80px"
              transform="translate(-50%, -50%)"
              zIndex={0}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box bg="white" p="2px" rounded="full" boxShadow="sm">
                <Box
                  h="2px"
                  bg={colors.border}
                  rounded="full"
                  width={`${progress}%`}
                  transition="width 0.1s linear"
                />
              </Box>
            </MotionBox>
          )}

          {/* Outer Ring */}
          <Circle
            size="240px"
            position="absolute"
            top="0"
            left="0"
            bg="white"
            borderWidth="8px"
            borderColor={isBreathing ? colors.border : "blue.200"}
            opacity={0.3}
            zIndex={2}
          />
        </Box>

        {/* Instructions */}
        <Text
          color={colors.text}
          fontSize="lg"
          textAlign="center"
          fontWeight="medium"
          maxW="sm"
          bg={colors.bg}
          p={4}
          rounded="xl"
        >
          {getPhaseInstructions()}
        </Text>

        {/* Control Button */}
        <Button
          onClick={() => setIsBreathing(!isBreathing)}
          colorScheme={isBreathing ? "red" : "blue"}
          size="lg"
          width="200px"
          height="56px"
          fontSize="lg"
          boxShadow="lg"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          transition="all 0.2s"
        >
          {isBreathing ? "Stop" : "Begin Breathing"}
        </Button>
      </VStack>
    </Box>
  );
}

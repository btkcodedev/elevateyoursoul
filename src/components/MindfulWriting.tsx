import React, { useState } from 'react';
import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { PenTool, Save, Trash2 } from 'lucide-react';

export default function MindfulWriting() {
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSave = () => {
    if (content.trim()) {
      // Save logic would go here
      toast({
        title: "Entry saved",
        description: "Your mindful writing has been saved successfully.",
        status: "success",
        duration: 3000,
      });
    }
  };

  const handleClear = () => {
    setContent('');
  };

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <PenTool color="#2b6cb0" />
        <Heading size="lg">Mindful Writing</Heading>
      </HStack>

      <VStack spacing={4} align="stretch">
        <Box
          position="relative"
          bg="yellow.50"
          p={6}
          rounded="lg"
          boxShadow="sm"
          _before={{
            content: '""',
            position: "absolute",
            top: "0",
            left: "50px",
            right: "50px",
            height: "30px",
            background: "repeating-linear-gradient(#F6E05E, #F6E05E 2px, transparent 2px, transparent 5px)",
            transform: "rotate(-2deg)",
            opacity: 0.5,
          }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            minH="200px"
            bg="transparent"
            border="none"
            _focus={{
              border: "none",
              boxShadow: "none",
            }}
            sx={{
              '&::placeholder': {
                color: 'gray.500',
              },
              fontFamily: 'cursive',
              fontSize: 'lg',
              lineHeight: '1.8',
              resize: 'none',
            }}
          />
        </Box>

        <HStack spacing={4} justify="flex-end">
          <Button
            leftIcon={<Trash2 size={16} />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            leftIcon={<Save size={16} />}
            colorScheme="blue"
            size="sm"
            onClick={handleSave}
            isDisabled={!content.trim()}
          >
            Save Entry
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
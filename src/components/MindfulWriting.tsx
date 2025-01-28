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
  List,
  ListItem,
  IconButton,
} from '@chakra-ui/react';
import { PenTool, Save, Trash2, X } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export default function MindfulWriting() {
  const [content, setContent] = useState('');
  const { addMindfulWriting, mindfulWritings, removeMindfulWriting } = useSessionStore();
  const toast = useToast();

  const handleSave = () => {
    if (content.trim()) {
      addMindfulWriting(content.trim());
      setContent('');
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

  const handleDelete = (id: string) => {
    removeMindfulWriting(id);
    toast({
      title: "Entry removed",
      status: "info",
      duration: 2000,
    });
  };

  // Get today's entries
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = mindfulWritings.filter(entry => 
    entry.timestamp.startsWith(today)
  );

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

        {todayEntries.length > 0 && (
          <List spacing={3} mt={4}>
            {todayEntries.map((entry) => (
              <ListItem
                key={entry.id}
                p={3}
                bg="blue.50"
                rounded="md"
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Text flex="1" whiteSpace="pre-wrap">{entry.content}</Text>
                <IconButton
                  icon={<X size={14} />}
                  aria-label="Remove entry"
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(entry.id)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Box>
  );
}
import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Input,
  HStack,
  List,
  ListItem,
  ListIcon,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Heart, Plus, X } from 'lucide-react';

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const toast = useToast();

  const handleAddEntry = () => {
    if (newEntry.trim() && entries.length < 5) {
      setEntries([...entries, newEntry.trim()]);
      setNewEntry('');
      toast({
        title: "Gratitude noted",
        description: "Your gratitude entry has been added.",
        status: "success",
        duration: 2000,
      });
    }
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Heart color="#2b6cb0" />
        <Heading size="lg">Daily Gratitude</Heading>
      </HStack>

      <VStack spacing={6} align="stretch">
        <Box>
          <Text mb={2} color="gray.600">
            What are you grateful for today?
          </Text>
          <HStack>
            <Input
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="I'm grateful for..."
              maxLength={100}
              bg="white"
            />
            <Button
              leftIcon={<Plus size={16} />}
              colorScheme="blue"
              onClick={handleAddEntry}
              isDisabled={!newEntry.trim() || entries.length >= 5}
            >
              Add
            </Button>
          </HStack>
        </Box>

        <List spacing={3}>
          {entries.map((entry, index) => (
            <ListItem
              key={index}
              p={3}
              bg="blue.50"
              rounded="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack>
                <ListIcon as={Heart} color="pink.500" />
                <Text>{entry}</Text>
              </HStack>
              <IconButton
                icon={<X size={14} />}
                aria-label="Remove entry"
                variant="ghost"
                colorScheme="red"
                size="sm"
                onClick={() => handleRemoveEntry(index)}
              />
            </ListItem>
          ))}
        </List>

        {entries.length === 0 && (
          <Text color="gray.500" textAlign="center" fontSize="sm">
            Add up to 5 things you're grateful for today
          </Text>
        )}
      </VStack>
    </Box>
  );
}
import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Checkbox,
  VStack,
  Progress,
  HStack,
  Badge,
  Button,
  Input,
  IconButton,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from '@chakra-ui/react';
import { ListChecks, Target, Battery, Plus, X, Save } from 'lucide-react';

interface Habit {
  id: string;
  label: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
}

interface EnergyLevel {
  time: string;
  level: number;
  lastUpdated: string;
}

export default function SelfCare() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', label: 'Morning Meditation', completed: false },
    { id: '2', label: 'Healthy Breakfast', completed: true },
    { id: '3', label: 'Physical Activity', completed: false },
    { id: '4', label: 'Mindful Break', completed: false },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Practice mindfulness', progress: 60 },
    { id: '2', title: 'Daily walks', progress: 40 },
  ]);

  const [energyLevels, setEnergyLevels] = useState<EnergyLevel[]>([
    { time: 'Morning', level: 80, lastUpdated: new Date().toISOString() },
    { time: 'Afternoon', level: 60, lastUpdated: new Date().toISOString() },
    { time: 'Evening', level: 40, lastUpdated: new Date().toISOString() },
  ]);

  const [newHabit, setNewHabit] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [showHabitInput, setShowHabitInput] = useState(false);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const toast = useToast();

  const handleHabitToggle = (id: string) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
    
    toast({
      title: "Habit updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now().toString(),
        label: newHabit.trim(),
        completed: false,
      }]);
      setNewHabit('');
      setShowHabitInput(false);
      
      toast({
        title: "New habit added",
        status: "success",
        duration: 2000,
      });
    }
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, {
        id: Date.now().toString(),
        title: newGoal.trim(),
        progress: 0,
      }]);
      setNewGoal('');
      setShowGoalInput(false);
      
      toast({
        title: "New goal added",
        status: "success",
        duration: 2000,
      });
    }
  };

  const updateGoalProgress = (id: string, newProgress: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress: newProgress } : goal
    ));
  };

  const updateEnergyLevel = (time: string, newLevel: number) => {
    setEnergyLevels(levels => levels.map(level =>
      level.time === time ? {
        ...level,
        level: newLevel,
        lastUpdated: new Date().toISOString(),
      } : level
    ));
    
    toast({
      title: `${time} energy level updated`,
      status: "info",
      duration: 2000,
    });
  };

  const removeHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    toast({
      title: "Habit removed",
      status: "info",
      duration: 2000,
    });
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal removed",
      status: "info",
      duration: 2000,
    });
  };

  const getEnergyColor = (level: number) => {
    if (level >= 80) return 'green';
    if (level >= 60) return 'blue';
    if (level >= 40) return 'yellow';
    if (level >= 20) return 'orange';
    return 'red';
  };

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <ListChecks color="#2b6cb0" />
        <Heading size="lg">Self-Care Dashboard</Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {/* Daily Habits */}
        <Box bg="green.50" p={4} rounded="lg" borderWidth="1px" borderColor="green.100">
          <HStack spacing={2} mb={4} justify="space-between">
            <HStack>
              <ListChecks size={18} color="#38A169" />
              <Heading size="md" color="green.700">Daily Habits</Heading>
            </HStack>
            <IconButton
              aria-label="Add habit"
              icon={<Plus size={16} />}
              size="sm"
              colorScheme="green"
              variant="ghost"
              onClick={() => setShowHabitInput(true)}
            />
          </HStack>
          
          <VStack align="stretch" spacing={3}>
            {showHabitInput && (
              <HStack>
                <Input
                  placeholder="New habit..."
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                  bg="white"
                />
                <IconButton
                  aria-label="Save habit"
                  icon={<Save size={16} />}
                  onClick={addHabit}
                  colorScheme="green"
                  size="sm"
                />
                <IconButton
                  aria-label="Cancel"
                  icon={<X size={16} />}
                  onClick={() => setShowHabitInput(false)}
                  variant="ghost"
                  size="sm"
                />
              </HStack>
            )}
            
            {habits.map((habit) => (
              <HStack key={habit.id} justify="space-between">
                <Checkbox
                  isChecked={habit.completed}
                  onChange={() => handleHabitToggle(habit.id)}
                  colorScheme="green"
                >
                  <Text color="gray.700">{habit.label}</Text>
                </Checkbox>
                <IconButton
                  aria-label="Remove habit"
                  icon={<X size={14} />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => removeHabit(habit.id)}
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Goals */}
        <Box bg="blue.50" p={4} rounded="lg" borderWidth="1px" borderColor="blue.100">
          <HStack spacing={2} mb={4} justify="space-between">
            <HStack>
              <Target size={18} color="#3182CE" />
              <Heading size="md" color="blue.700">Weekly Goals</Heading>
            </HStack>
            <IconButton
              aria-label="Add goal"
              icon={<Plus size={16} />}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              onClick={() => setShowGoalInput(true)}
            />
          </HStack>
          
          <VStack spacing={4}>
            {showGoalInput && (
              <HStack>
                <Input
                  placeholder="New goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  bg="white"
                />
                <IconButton
                  aria-label="Save goal"
                  icon={<Save size={16} />}
                  onClick={addGoal}
                  colorScheme="blue"
                  size="sm"
                />
                <IconButton
                  aria-label="Cancel"
                  icon={<X size={16} />}
                  onClick={() => setShowGoalInput(false)}
                  variant="ghost"
                  size="sm"
                />
              </HStack>
            )}
            
            {goals.map((goal) => (
              <Box key={goal.id} bg="white" p={3} rounded="md" width="full">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">{goal.title}</Text>
                  <IconButton
                    aria-label="Remove goal"
                    icon={<X size={14} />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => removeGoal(goal.id)}
                  />
                </HStack>
                <Slider
                  value={goal.progress}
                  onChange={(v) => updateGoalProgress(goal.id, v)}
                  min={0}
                  max={100}
                  step={5}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg="blue.500"
                    color="white"
                    placement="top"
                    label={`${goal.progress}%`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Energy Levels */}
        <Box bg="purple.50" p={4} rounded="lg" borderWidth="1px" borderColor="purple.100">
          <HStack spacing={2} mb={4}>
            <Battery size={18} color="#805AD5" />
            <Heading size="md" color="purple.700">Energy Tracker</Heading>
          </HStack>
          
          <VStack spacing={4}>
            {energyLevels.map(({ time, level, lastUpdated }) => (
              <Box key={time} width="full" bg="white" p={3} rounded="md">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">{time}</Text>
                  <Badge colorScheme={getEnergyColor(level)}>{level}%</Badge>
                </HStack>
                <Slider
                  value={level}
                  onChange={(v) => updateEnergyLevel(time, v)}
                  min={0}
                  max={100}
                  step={5}
                  colorScheme={getEnergyColor(level)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <Tooltip
                    hasArrow
                    bg={`${getEnergyColor(level)}.500`}
                    color="white"
                    placement="top"
                    label={`${level}%`}
                  >
                    <SliderThumb />
                  </Tooltip>
                </Slider>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
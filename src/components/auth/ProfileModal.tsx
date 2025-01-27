import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Select,
  useToast,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { supabase } from '../../lib/supabase';
import { languages } from '../../i18n/config';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      toast({
        title: 'Error fetching profile',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          preferences: profile.preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <HStack spacing={4} width="full">
              <Avatar
                size="xl"
                name={profile.full_name}
                src={profile.avatar_url}
              />
              <Button size="sm" colorScheme="blue" variant="outline">
                Change Avatar
              </Button>
            </HStack>

            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder="Enter your full name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={profile.email} isReadOnly />
            </FormControl>

            <FormControl>
              <FormLabel>Language</FormLabel>
              <Select
                value={profile.preferences?.language || 'en'}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    language: e.target.value
                  }
                })}
              >
                {Object.entries(languages).map(([code, { nativeName }]) => (
                  <option key={code} value={code}>
                    {nativeName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Theme</FormLabel>
              <Select
                value={profile.preferences?.theme || 'light'}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    theme: e.target.value
                  }
                })}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">
                Enable Notifications
              </FormLabel>
              <Switch
                isChecked={profile.preferences?.notifications}
                onChange={(e) => setProfile({
                  ...profile,
                  preferences: {
                    ...profile.preferences,
                    notifications: e.target.checked
                  }
                })}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              width="full"
              onClick={handleUpdate}
              isLoading={loading}
            >
              Save Changes
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Globe } from 'lucide-react';
import { languages } from '../i18n/config';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        size="sm"
        rightIcon={<Globe size={16} />}
      >
        <Text>{languages[i18n.language]?.nativeName || 'Language'}</Text>
      </MenuButton>
      <MenuList>
        {Object.entries(languages).map(([code, { nativeName }]) => (
          <MenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            bg={i18n.language === code ? 'blue.50' : undefined}
          >
            <HStack spacing={2}>
              <Text>{nativeName}</Text>
              <Text fontSize="sm" color="gray.500">
                ({code})
              </Text>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
import React, { useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBentoProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  testMode?: boolean;
}

export default function AdBento({ slot, format = 'auto', className = '', testMode = false }: AdBentoProps) {
  useEffect(() => {
    try {
      // Initialize AdSense if not already initialized
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT || 'ca-pub-xxxxxxxxxxxxxxxx'}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        window.adsbygoogle = window.adsbygoogle || [];
      }

      // Push the ad
      window.adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [slot]);

  if (testMode || import.meta.env.VITE_GOOGLE_ADSENSE_TEST_MODE === 'true') {
    return (
      <Box
        className={`ad-container ${className}`}
        bg="gray.50"
        p={4}
        rounded="xl"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
        position="relative"
        overflow="hidden"
        minH="250px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          borderColor: 'gray.300',
        }}
        transition="all 0.2s"
      >
        <VStack spacing={2}>
          <Text color="gray.500" fontSize="sm">Advertisement Placeholder</Text>
          <Text color="gray.400" fontSize="xs">Slot: {slot}</Text>
          <Text color="gray.400" fontSize="xs">Format: {format}</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      className={`ad-container ${className}`}
      bg="white"
      p={4}
      rounded="xl"
      shadow="sm"
      border="1px"
      borderColor="gray.100"
      position="relative"
      overflow="hidden"
      minH="250px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{
        borderColor: 'gray.200',
      }}
      transition="all 0.2s"
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  );
}
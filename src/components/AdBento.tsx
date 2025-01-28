import React, { useEffect, memo } from 'react';
import { Box, Text, VStack, Tooltip, HStack } from '@chakra-ui/react';
import { Info } from 'lucide-react';

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

const AdBento = memo(({ slot, format = 'auto', className = '', testMode = false }: AdBentoProps) => {
  useEffect(() => {
    try {
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        window.adsbygoogle = window.adsbygoogle || [];
      }

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
        p={6}
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
        <VStack spacing={3}>
          <HStack spacing={2}>
            <Text color="gray.600" fontSize="md">Advertisement Space</Text>
            <Tooltip
              label="Connect Google AdSense to display real advertisements here"
              placement="top"
              hasArrow
            >
              <Box as="span" cursor="help">
                <Info size={16} color="#718096" />
              </Box>
            </Tooltip>
          </HStack>
          <Text color="gray.500" fontSize="sm">Format: {format}</Text>
          <Text color="gray.500" fontSize="sm">Slot ID: {slot}</Text>
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
});

AdBento.displayName = 'AdBento';
export default AdBento;
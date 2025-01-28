import React, { memo } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

export const LoadingFallback = memo(() => (
  <Box p={4}>
    <Skeleton height="200px" rounded="xl" />
  </Box>
));

LoadingFallback.displayName = 'LoadingFallback';
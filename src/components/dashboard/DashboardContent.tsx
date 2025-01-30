import React, { Suspense, memo } from 'react';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import { LoadingFallback } from './LoadingFallback';

// Lazy load components
const Activities = React.lazy(() => import('../Activities'));
const BreathingGuide = React.lazy(() => import('../BreathingGuide'));
const MoodTracker = React.lazy(() => import('../MoodTracker'));
const SelfCare = React.lazy(() => import('../SelfCare'));
const SupportSection = React.lazy(() => import('../SupportSection'));
const AdBento = React.lazy(() => import('../AdBento'));
const MemoryGame = React.lazy(() => import('../MemoryGame'));
const MindfulWriting = React.lazy(() => import('../MindfulWriting'));
const GratitudeJournal = React.lazy(() => import('../GratitudeJournal'));
const DepressionGuide = React.lazy(() => import('../DepressionGuide'));
const AmazonBooksBento = React.lazy(() => import('../AmazonBooksBento'));
const MusicPlayer = React.lazy(() => import('../MusicPlayer'));

const DashboardContent = memo(() => {
  const WrappedComponent = ({ children }: { children: React.ReactNode }) => (
    <Box bg="white" p={6} rounded="xl" shadow="md">
      {children}
    </Box>
  );

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
      {/* Left Column */}
      <VStack spacing={8} align="stretch">
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <MoodTracker />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <DepressionGuide />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <BreathingGuide />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <GratitudeJournal />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <MindfulWriting />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <SupportSection />
          </WrappedComponent>
        </Suspense>
        {/* <Suspense fallback={<LoadingFallback />}>
          <AdBento slot="dashboard-left" format="vertical" />
        </Suspense> */}
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <AmazonBooksBento />
          </WrappedComponent>
        </Suspense>
      </VStack>

      {/* Right Column */}
      <VStack spacing={8} align="stretch">
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <Activities />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <SelfCare />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <MusicPlayer />
          </WrappedComponent>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WrappedComponent>
            <MemoryGame />
          </WrappedComponent>
        </Suspense>
        {/* <Suspense fallback={<LoadingFallback />}>
          <AdBento slot="dashboard-right" format="vertical" />
        </Suspense> */}
      </VStack>
    </SimpleGrid>
  );
});

DashboardContent.displayName = 'DashboardContent';
export default DashboardContent;
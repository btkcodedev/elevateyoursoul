import React, { useEffect, useState, useCallback, memo, Suspense } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSessionStore } from '../store/sessionStore';
import { useDisclosure, useToast } from '@chakra-ui/react';

// Lazy load components
const DashboardHeader = React.lazy(() => import('../components/dashboard/DashboardHeader'));
const DashboardContent = React.lazy(() => import('../components/dashboard/DashboardContent'));
const EmergencySupport = React.lazy(() => import('../components/EmergencySupport'));
const WelcomeModal = React.lazy(() => import('../components/auth/WelcomeModal'));
const SessionSummaryModal = React.lazy(() => import('../components/SessionSummaryModal'));

const Dashboard = () => {
  const { 
    isOpen: isEmergencyOpen, 
    onOpen: onEmergencyOpen, 
    onClose: onEmergencyClose 
  } = useDisclosure();
  const { 
    isOpen: isWelcomeOpen, 
    onOpen: onWelcomeOpen, 
    onClose: onWelcomeClose 
  } = useDisclosure();
  const { 
    isOpen: isSummaryOpen, 
    onOpen: onSummaryOpen, 
    onClose: onSummaryClose 
  } = useDisclosure();
  
  const navigate = useNavigate();
  const toast = useToast();
  const { user, signOut } = useAuthStore();
  const summary = useSessionStore(state => state.getDailySummary());
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (!initialCheckDone) {
      const hasSessionData = summary.totalMoodEntries > 0 || 
                           summary.breathingMinutes > 0 || 
                           summary.gratitudeCount > 0 || 
                           summary.writingCount > 0;

      if (!hasSessionData && !user) {
        onWelcomeOpen();
      }
      setInitialCheckDone(true);
    }
  }, [initialCheckDone, summary, onWelcomeOpen, user]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  const handleClearSession = useCallback(() => {
    sessionStorage.clear();
    window.location.reload();
    
    toast({
      title: "Session cleared",
      description: "All session data has been cleared",
      status: "success",
      duration: 3000,
    });
  }, [toast]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Box py={4}>
        <Container maxW="5xl">
          <Suspense fallback={null}>
            <DashboardHeader
              user={user}
              onSignOut={handleSignOut}
              onClearSession={handleClearSession}
              onEmergencyOpen={onEmergencyOpen}
              onSummaryOpen={onSummaryOpen}
            />
          </Suspense>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        <Suspense fallback={null}>
          <DashboardContent />
        </Suspense>

        {/* Modals */}
        <Suspense fallback={null}>
          {isEmergencyOpen && <EmergencySupport onClose={onEmergencyClose} />}
          {!user && isWelcomeOpen && <WelcomeModal onClose={onWelcomeClose} />}
          <SessionSummaryModal isOpen={isSummaryOpen} onClose={onSummaryClose} />
        </Suspense>
      </Container>
    </Box>
  );
};

export default memo(Dashboard);
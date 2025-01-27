import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Button,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Badge,
  Spinner,
  useToast,
  Link,
  Select,
} from '@chakra-ui/react';
import {
  Users,
  Search,
  MapPin,
  Phone,
  Globe,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HeartPulse,
} from 'lucide-react';
import opencage from 'opencage-api-client';
import { Organization, Location } from '../types/support';
import { getAllOrganizations, getOrganizationsByCountry } from '../data/supportOrganizations';

export default function SupportSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAllOrgs, setShowAllOrgs] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const toast = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const result = await opencage.geocode({
              q: `${latitude},${longitude}`,
              key: import.meta.env.VITE_OPENCAGE_API_KEY || 'YOUR_OPENCAGE_API_KEY'
            });

            if (result.results.length > 0) {
              const { city, country, formatted } = result.results[0].components;
              setLocation({ city, country, formatted });
              // Set organizations based on user's country
              if (country) {
                setSelectedCountry(country.toLowerCase());
                setOrganizations(getOrganizationsByCountry(country));
              }
            }
          } catch (error) {
            console.error('Error getting location:', error);
            setOrganizations(getAllOrganizations());
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setOrganizations(getAllOrganizations());
        }
      );
    } else {
      setOrganizations(getAllOrganizations());
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a location",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await opencage.geocode({
        q: searchQuery,
        key: import.meta.env.VITE_OPENCAGE_API_KEY || 'YOUR_OPENCAGE_API_KEY'
      });

      if (result.results.length > 0) {
        const { city, country, formatted } = result.results[0].components;
        setLocation({ city, country, formatted });
        if (country) {
          setSelectedCountry(country.toLowerCase());
          setOrganizations(getOrganizationsByCountry(country));
        }
      } else {
        toast({
          title: "Location not found",
          status: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Error searching location",
        description: "Please try again",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    if (country === 'all') {
      setOrganizations(getAllOrganizations());
    } else {
      setOrganizations(getOrganizationsByCountry(country));
    }
  };

  const displayedOrgs = showAllOrgs ? organizations : organizations.slice(0, 3);

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Users color="#2b6cb0" />
        <Heading size="lg">Support Network</Heading>
      </HStack>

      <VStack spacing={6} align="stretch">
        {/* Location Search */}
        <Box>
          <InputGroup>
            <InputLeftElement>
              <Search size={18} color="#718096" />
            </InputLeftElement>
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </InputGroup>
        </Box>

        {/* Country Filter */}
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          bg="white"
        >
          <option value="all">All Countries</option>
          <option value="india">India</option>
          <option value="global">Global Organizations</option>
          <option value="uk">United Kingdom</option>
          <option value="usa">United States</option>
        </Select>

        {/* Current Location */}
        {location && (
          <Box bg="blue.50" p={4} rounded="lg">
            <HStack spacing={2} mb={2}>
              <MapPin size={16} color="#2B6CB0" />
              <Text fontWeight="medium" color="blue.700">
                {location.formatted}
              </Text>
            </HStack>
          </Box>
        )}

        {/* Organizations List */}
        <List spacing={4}>
          {displayedOrgs.map((org, index) => (
            <ListItem
              key={index}
              bg="white"
              p={4}
              rounded="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'md',
              }}
              transition="all 0.2s"
            >
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Heading size="sm">{org.name}</Heading>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">{org.type}</Badge>
                    {org.location && (
                      <Badge colorScheme="green">{org.location}</Badge>
                    )}
                  </HStack>
                </HStack>
                
                <Text color="gray.600" fontSize="sm">
                  {org.description}
                </Text>

                <VStack align="start" spacing={2}>
                  {org.contact.phone && (
                    <HStack>
                      <Phone size={14} color="#718096" />
                      <Link href={`tel:${org.contact.phone}`} color="blue.500">
                        {org.contact.phone}
                      </Link>
                    </HStack>
                  )}
                  
                  {org.contact.helpline && (
                    <HStack>
                      <HeartPulse size={14} color="#718096" />
                      <Link href={`tel:${org.contact.helpline}`} color="red.500">
                        Helpline: {org.contact.helpline}
                      </Link>
                    </HStack>
                  )}
                  
                  {org.contact.email && (
                    <HStack>
                      <Mail size={14} color="#718096" />
                      <Link href={`mailto:${org.contact.email}`} color="blue.500">
                        {org.contact.email}
                      </Link>
                    </HStack>
                  )}
                  
                  <HStack>
                    <Globe size={14} color="#718096" />
                    <Link
                      href={org.website}
                      color="blue.500"
                      isExternal
                      display="flex"
                      alignItems="center"
                    >
                      Visit Website
                      <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </ListItem>
          ))}
        </List>

        {/* Show More/Less Button */}
        {organizations.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            rightIcon={showAllOrgs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            onClick={() => setShowAllOrgs(!showAllOrgs)}
            color="blue.500"
          >
            {showAllOrgs ? 'Show Less' : `Show More Organizations (${organizations.length - 3} more)`}
          </Button>
        )}

        {/* Loading State */}
        {loading && (
          <Box textAlign="center" py={4}>
            <Spinner color="blue.500" />
          </Box>
        )}
      </VStack>
    </Box>
  );
}
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Badge,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Book, Headphones, Star, ExternalLink } from "lucide-react";
import { useAmazonBooks } from "../store/amazonBooks";

export default function AmazonBooksBento() {
  const { books, loading, fetchBooks } = useAmazonBooks();
  const toast = useToast();

  useEffect(() => {
    fetchBooks().catch(() => {
      toast({
        title: "Error",
        description: "Failed to load book recommendations",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [fetchBooks, toast]);

  const renderBookCard = (book: {
    id: Key | null | undefined;
    imageUrl: string | undefined;
    title:
      | string
      | number
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<unknown>>
      | Iterable<ReactNode>
      | null
      | undefined;
    format: string;
    author:
      | string
      | number
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<unknown>>
      | Iterable<ReactNode>
      | ReactPortal
      | Iterable<ReactNode>
      | null
      | undefined;
    rating:
      | string
      | number
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<unknown>>
      | Iterable<ReactNode>
      | null
      | undefined;
    price:
      | string
      | number
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<unknown>>
      | Iterable<ReactNode>
      | ReactPortal
      | Iterable<ReactNode>
      | null
      | undefined;
    url: string | undefined;
  }) => (
    <Box
      key={book.id}
      bg="white"
      p={4}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.100"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
      transition="all 0.2s"
    >
      <VStack spacing={3} align="start">
        <Image
          src={book.imageUrl}
          alt={typeof book.title === "string" ? book.title : undefined}
          height="200px"
          width="100%"
          objectFit="cover"
          rounded="md"
          fallback={<Skeleton height="200px" width="100%" />}
        />
        <Badge colorScheme={book.format === "audiobook" ? "purple" : "blue"}>
          <HStack spacing={1}>
            {book.format === "audiobook" ? (
              <Headphones size={12} />
            ) : (
              <Book size={12} />
            )}
            <Text>{book.format === "audiobook" ? "Audiobook" : "Book"}</Text>
          </HStack>
        </Badge>
        <Heading size="sm" noOfLines={2}>
          {book.title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          by {book.author}
        </Text>
        <HStack spacing={1}>
          {Array.from({
            length: Math.floor(
              typeof book.rating === "number" ? book.rating : 0
            ),
          }).map((_, i) => (
            <Star key={i} size={14} fill="#F6E05E" color="#F6E05E" />
          ))}
          <Text fontSize="sm" color="gray.600" ml={1}>
            {book.rating}
          </Text>
        </HStack>
        <Text fontWeight="bold" color="blue.600">
          {book.price}
        </Text>
        <Button
          as="a"
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<ExternalLink size={16} />}
          colorScheme="blue"
          size="sm"
          width="full"
        >
          View on Amazon
        </Button>
      </VStack>
    </Box>
  );

  return (
    <Box>
      <HStack spacing={2} mb={6}>
        <Book color="#2b6cb0" />
        <Heading size="lg">Recommended Reading</Heading>
      </HStack>

      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList mb={4}>
          <Tab>
            <HStack spacing={2}>
              <Book size={16} />
              <Text>Books</Text>
            </HStack>
          </Tab>
          <Tab>
            <HStack spacing={2}>
              <Headphones size={16} />
              <Text>Audiobooks</Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} p={4}>
                      <VStack spacing={4}>
                        <Skeleton height="200px" width="100%" />
                        <Skeleton height="20px" width="80%" />
                        <Skeleton height="20px" width="60%" />
                      </VStack>
                    </Box>
                  ))
                : books
                    .filter((book) => book.format === "book")
                    .map(renderBookCard)}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Box key={i} p={4}>
                      <VStack spacing={4}>
                        <Skeleton height="200px" width="100%" />
                        <Skeleton height="20px" width="80%" />
                        <Skeleton height="20px" width="60%" />
                      </VStack>
                    </Box>
                  ))
                : books
                    .filter((book) => book.format === "audiobook")
                    .map(renderBookCard)}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

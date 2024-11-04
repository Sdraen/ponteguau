import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import Calendar from './components/Calendar.jsx';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={4}>
        <Container maxW="container.xl">
          <Calendar />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
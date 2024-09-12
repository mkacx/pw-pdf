import { stopServer } from './server';

async function globalTeardown() {
  // Zamknij serwer po zakończeniu testów
  stopServer();
}

export default globalTeardown;
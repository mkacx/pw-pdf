import path from 'path';
import { startServer } from './server';
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Ustaw absolutną ścieżkę do katalogu z plikiem PDF
  const documentPath = path.resolve('/Users/kacx/Documents');
  
  // Uruchom serwer HTTP
  startServer(documentPath);
}

export default globalSetup;
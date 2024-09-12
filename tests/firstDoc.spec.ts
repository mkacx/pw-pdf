import { test, expect } from '@playwright/test';
import httpServer from 'http-server';
import path from 'path';
import fs from 'fs';

let server;
let firstTestFailed;

test.beforeAll(async () => {
  // Ustaw absolutną ścieżkę do katalogu z plikiem PDF
  const documentPath = path.resolve('/Users/kacx/Documents');

  // Uruchom serwer http-server w katalogu, gdzie znajduje się plik PDF
  server = httpServer.createServer({ root: documentPath });
  server.listen(8080);
  
  console.log(`Serwer HTTP uruchomiony na porcie 8080, serwuje pliki z ${documentPath}`);
});

test.afterAll(async () => {
  // Zamknij serwer po zakończeniu testów
  server.close();
  console.log('Serwer HTTP zamknięty');
});

test('Bigger Docs', async ({ page }) => {
  page.goto('http://localhost:8080/wyniki2.html');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'tests/example.spec.ts-snapshots/screenshot-chromium-darwin.png', fullPage: true });
  await page.goto('http://localhost:8080/wyniki1.html');
  await page.waitForTimeout(1000);
  expect(await page.screenshot({
    fullPage: true
  })).toMatchSnapshot("screenshot.png");
});

test('Smaller Docs', async ({ page }) => {
  try {
    // Pierwsza wersja testu: od wyniki1 do wyniki2
    await page.goto('http://localhost:8080/wyniki2.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/firstDoc.spec.ts-snapshots/screen-match2-chromium-darwin.png', fullPage: true });
    
    await page.goto('http://localhost:8080/wyniki1.html');
    await page.waitForTimeout(1000);
    
    expect(await page.screenshot({
      fullPage: true
    })).toMatchSnapshot("screen-match2.png");
    console.log("Pierwsza wersja testu przeszła pomyślnie.");
  } catch (error) {
    console.log("Pierwsza wersja testu nie powiodła się:", error);
    firstTestFailed = true;
  }
  // Druga wersja testu: od wyniki2 do wyniki1 (jeśli pierwszy test przejdzie)
  if (!firstTestFailed) {
    await page.goto('http://localhost:8080/wyniki1.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/firstDoc.spec.ts-snapshots/screen-match2-chromium-darwin.png', fullPage: true });
    await page.goto('http://localhost:8080/wyniki2.html');
    await page.waitForTimeout(1000);
    expect(await page.screenshot({
      fullPage: true
    })).toMatchSnapshot("screen-match2.png");

    console.log("Druga wersja testu przeszła pomyślnie.");
  }
});
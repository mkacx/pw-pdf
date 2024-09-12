import httpServer from 'http-server';

let server: any = null;
export const port : number = 3000;

export function startServer(documentPath: string) {
  server = httpServer.createServer({ root: documentPath });
  server.listen(port, () => {
    console.log(`Serwer HTTP uruchomiony na porcie ${port}, serwuje pliki z ${documentPath}`);
  });
  return server;
}

export function stopServer() {
  if (server) {
    server.close(() => {
      console.log('Serwer HTTP zamknięty');
    });
  }
}
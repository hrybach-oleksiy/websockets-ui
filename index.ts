import { httpServer } from './src/http_server/index';
import { server as wsServer } from './src/ws_server/index';
import dotenv from 'dotenv';

dotenv.config();

const HTTP_PORT = 8181;
const WS_PORT = process.env.WS_PORT || 3000;

console.log(`Static http server started on ${HTTP_PORT} port!`);
console.log(`WebSocket server started on ${WS_PORT} port!`);
httpServer.listen(HTTP_PORT);
wsServer.listen(WS_PORT);

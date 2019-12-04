const WebSocket = require('ws');

const PORT = 8787;

module.exports = async () =>
    new Promise(resolve => {
        global.wss = new WebSocket.Server({ port: PORT });

        wss.on('connection', ws => {
            ws.on('message', message => {
                console.log(`Received message => ${message}`);
            });
            ws.send('{}');
        });

        wss.on('listening', resolve);
    });

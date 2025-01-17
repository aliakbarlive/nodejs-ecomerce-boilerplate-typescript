
import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import gach from 'gach'
import app from './app'
import { config } from './config'
import { logger } from './utils'

const { NODE_ENV, SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env

// create an HTTP server
const createHttpServer = () => http.createServer(app);

// create an HTTPS server
const createHttpsServer = () => {
    const { keyPath, crtPath } = config.ssl;
    const fullKeyPath = path.join(__dirname, keyPath);
    const fullCrtPath = path.join(__dirname, crtPath);

    // Check for SSL certificate existence
    if (!fs.existsSync(fullKeyPath) || !fs.existsSync(fullCrtPath)) {
        logger.error('No SSL Certificate found to run HTTPS Server!!');
        process.exit(1);
    }
    const key = fs.readFileSync(fullKeyPath, 'utf8');
    const cert = fs.readFileSync(fullCrtPath, 'utf8');
    return https.createServer({ key, cert }, app);
};

// -----start server ------
const startServer = (server: http.Server | https.Server) => {
    server.listen(SERVER_PORT, () => {
        const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
        logger.info(`Server is now running on ${gach(url).color('lightBlue').bold().text} in ${NODE_ENV} mode`);
    });
};

const initServer = () => {
    try {
        const server = SERVER_PROTOCOL === 'http' ? createHttpServer() : createHttpsServer();
        //  dbConnect()
        startServer(server);
    } catch (error) {
        throw Error(`>>>>> Server Connection Error: ${error}`)
    }
};

initServer()
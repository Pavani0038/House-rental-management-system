import express, { Application } from 'express';
import cors from 'cors';
import { config, validateEnvironment } from './config/environment';
import { testConnection, initializeDatabase } from './config/database';
import routes from './routes';
import { ErrorMiddleware } from './middleware/error.middleware';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.validateConfig();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private validateConfig(): void {
    validateEnvironment();
  }

  private initializeMiddlewares(): void {
    // CORS
    this.app.use(cors({
      origin: config.cors.allowedOrigins,
      credentials: true
    }));

    // Body parsers
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging in development
    if (config.nodeEnv === 'development') {
      this.app.use((req, _res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
      });
    }
  }

  private initializeRoutes(): void {
    this.app.use('/api', routes);
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorMiddleware.notFound);
    this.app.use(ErrorMiddleware.handleError);
  }

  public async start(): Promise<void> {
    try {
      // Test database connection
      await testConnection();
      
      // Initialize database tables
      await initializeDatabase();

      // Start server
      this.app.listen(config.port, () => {
        console.log('========================================');
        console.log(`🚀 Server running on port ${config.port}`);
        console.log(`📝 Environment: ${config.nodeEnv}`);
        console.log(`🌐 API URL: http://localhost:${config.port}/api`);
        console.log('========================================');
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Start server
const server = new Server();
server.start();

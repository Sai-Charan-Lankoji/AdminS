const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}


try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";


// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS =  "http://localhost:8004,http://localhost:8003"|| process.env.STORE_CORS ;   

const VENDOR_CORS = "http://localhost:8009" || process.env.VENDOR_CORS; 
const UPLOADS_CORS = "http://localhost:8003" || process.env.STORE_CORS;


// process.env.STORE_CORS ||

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://default:tqfuhs07uyxe@ep-muddy-dew-a1j7hwiv.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"


  const POSTGRES_SCHEMA = process.env.POSTGRES_SCHEMA
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];


const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: STORE_CORS, 
  vendor_cors: VENDOR_CORS, 
  uploads_cors: UPLOADS_CORS,  // CORS to avoid issues when consuming Medusa from a client
  schema : POSTGRES_SCHEMA,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
  database_extra: {
    entityPrefix: "", // any prefix you might be using
    migrations: ["dist/migrations/*.js"],
    entities: ["dist/models/*.js"],
  } 
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};


import express from 'express';
import cors from 'cors';
import { initDatabase } from '../src/server/database.js';
import { apiRouter } from '../src/server/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbInitialized = false;
function ensureDatabaseInitialized() {
  if (!dbInitialized) {
    initDatabase();
    dbInitialized = true;
  }
}

app.use((_req, _res, next) => {
  try {
    ensureDatabaseInitialized();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;

// =============== Importing Dependencies ====================
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import databaseConnectionHandler from './config/database';
import path from 'path';

// ======================= Importing Routes  ==================
import StudentRoutes from './api/routes/student';
import FacultyRoutes from './api/routes/faculty';
import AdminRoutes from './api/routes/admin';

const app: Application = express();

// ======================= Connecting to the Database ==================
databaseConnectionHandler();

//=======================  Handling Cross Origin Resource Sharing =======================
app.use(cors());

// ======================= Declare BodyParser Alternative Middleware=======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================  Handling Requests =======================
app.use('/students', StudentRoutes);
app.use('/faculty', FacultyRoutes);
app.use('/admin', AdminRoutes);

// ======================= Serve Static assets in production =======================
app.use(express.static('../frontend/build/'));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(5000, (err) => {
  if (!err) {
    console.log(`▀▄▀▄▀▄ ωєℓ¢σмє тσ ρяσтяαѕуѕ ▄▀▄▀▄`);
    console.log(` Backend is Listening on: [${5000}]`);
  }
});

// ===================== Exporting app =====================
export default app;

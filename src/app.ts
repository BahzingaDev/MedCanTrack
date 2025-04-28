import express from 'express';
import { json } from 'body-parser';
import { setStrainRoutes } from './routes/strains';
import { setHealthConditionRoutes } from './routes/health-conditions';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

setStrainRoutes(app);
setHealthConditionRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
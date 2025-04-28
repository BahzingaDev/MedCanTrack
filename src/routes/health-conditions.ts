import { Router } from 'express';
import { ConditionController } from '../controllers/conditionController';

const router = Router();
const conditionController = new ConditionController();

export function setHealthConditionRoutes(app: Router) {
    app.use('/api/health-conditions', router);

    router.get('/', conditionController.getAllConditions.bind(conditionController));
    router.get('/:condition', conditionController.getStrainsForCondition.bind(conditionController));
}
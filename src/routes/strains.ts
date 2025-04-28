import { Router } from 'express';
import StrainController from '../controllers/strainController';

const router = Router();
const strainController = new StrainController();

export function setStrainRoutes(app) {
    app.use('/api/strains', router);

    router.get('/', strainController.getAllStrains.bind(strainController));
    router.get('/:id', strainController.getStrainById.bind(strainController));
    router.post('/', strainController.addStrain.bind(strainController));
    router.put('/:id', strainController.updateStrain.bind(strainController));
    router.delete('/:id', strainController.deleteStrain.bind(strainController));
    router.get('/:id/recommendations', strainController.getRecommendations.bind(strainController));
}
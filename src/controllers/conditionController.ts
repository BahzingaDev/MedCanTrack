import { Request, Response } from 'express';
import { RecommendationEngine } from '../services/recommendation-engine';

export class ConditionController {
    private recommendationEngine: RecommendationEngine;

    constructor() {
        const strains: string[] = []; // Replace with actual strains data or fetch it dynamically
        this.recommendationEngine = new RecommendationEngine(strains);
    }

    public getAllConditions(req: Request, res: Response): void {
        // Implement logic to fetch all conditions
        res.json({ message: 'List of all health conditions' });
    }

    public async getStrainsForCondition(req: Request, res: Response): Promise<void> {
        const condition = req.params.condition;

        try {
            const strains = await this.recommendationEngine.getStrainsForCondition(condition);
            res.status(200).json(strains);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching strains for condition', error });
        }
    }

    public async getDosingRecommendations(req: Request, res: Response): Promise<void> {
        const strainName = req.params.strainName;

        try {
            const dosingInfo = await this.recommendationEngine.getDosingRecommendations(strainName);
            res.status(200).json(dosingInfo);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching dosing recommendations', error });
        }
    }

    public async getStrainMixingGuides(req: Request, res: Response): Promise<void> {
        const strains = req.body.strains;

        try {
            const mixingGuides = await this.recommendationEngine.getStrainMixingGuides(strains);
            res.status(200).json(mixingGuides);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching strain mixing guides', error });
        }
    }
}
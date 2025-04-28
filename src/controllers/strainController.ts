import { Request, Response } from 'express';
import { DataProcessor } from '../services/data-processor';
import { RecommendationEngine } from '../services/recommendation-engine';
import { Strain } from '../models/strain';

export class StrainController {
    private dataProcessor: DataProcessor;
    private recommendationEngine: RecommendationEngine;

    constructor() {
        this.dataProcessor = new DataProcessor([]); // Pass an empty array or appropriate strain data
        this.recommendationEngine = new RecommendationEngine([]); // Pass an empty array or appropriate strain data
    }

    public async getStrainData(req: Request, res: Response): Promise<void> {
        try {
            const strainName = req.params.name;
            const rawStrainData = await this.dataProcessor.getStrainData(strainName);
            const strainData: Strain | null = rawStrainData
                ? {
                    ...rawStrainData,
                    cannabinoidProfile: rawStrainData.cannabinoids || [],
                    terpeneProfile: rawStrainData.terpenes || []
                }
                : null;
            if (strainData) {
                res.status(200).json(strainData);
            } else {
                res.status(404).json({ message: 'Strain not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching strain data', error });
        }
    }

    public async getRecommendations(req: Request, res: Response): Promise<void> {
        try {
            const { condition } = req.body;
            const recommendations = await this.recommendationEngine.getRecommendations(condition);
            res.status(200).json(recommendations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching recommendations', error });
        }
    }
}
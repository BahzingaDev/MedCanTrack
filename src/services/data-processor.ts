export class DataProcessor {
    private strains: any[];

    constructor(strains: any[]) {
        this.strains = strains;
    }

    public collateData() {
        return this.strains.map(strain => {
            return {
                name: strain.name,
                cannabinoids: this.extractCannabinoids(strain),
                terpenes: this.extractTerpenes(strain),
                commonResponses: strain.commonResponses
            };
        });
    }

    private extractCannabinoids(strain: any) {
        return strain.cannabinoids.map((cannabinoid: any) => ({
            name: cannabinoid.name,
            concentration: cannabinoid.concentration
        }));
    }

    private extractTerpenes(strain: any) {
        return strain.terpenes.map((terpene: any) => ({
            name: terpene.name,
            concentration: terpene.concentration
        }));
    }

    public prepareForAnalysis(collatedData: any[]) {
        // Additional processing can be done here if needed
        return collatedData;
    }

    public async getStrainData(name: string): Promise<{ name: string; cannabinoids: any[]; terpenes: any[]; commonResponses: any } | null> {
        const strain = this.strains.find(strain => strain.name === name);
        return strain || null;
    }

}
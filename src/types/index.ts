export interface Cannabinoid {
    name: string;
    concentration: number; // in percentage
}

export interface Terpene {
    name: string;
    concentration: number; // in percentage
}

export interface Strain {
    name: string;
    cannabinoidProfile: Cannabinoid[];
    terpeneProfile: Terpene[];
    commonResponses: string[];
    suitableFor: string[]; // health conditions
}
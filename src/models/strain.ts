import { Cannabinoid } from "./cannabinoid";
import { Terpene } from "./terpene";

export class Strain {
    name: string;
    cannabinoidProfile: Cannabinoid[];
    terpeneProfile: Terpene[];
    commonResponses: string[];

    constructor(name: string, cannabinoidProfile: Cannabinoid[], terpeneProfile: Terpene[], commonResponses: string[]) {
        this.name = name;
        this.cannabinoidProfile = cannabinoidProfile;
        this.terpeneProfile = terpeneProfile;
        this.commonResponses = commonResponses;
    }
}
import { ISubCategory } from "./IAllPapers";

export interface ILandingPageLayoutProps {
    allCategories: {
      computerScience: {
        artificialIntelligence: ISubCategory | null;
        computationAndLanguage: ISubCategory | null;
        computationalComplexity: ISubCategory | null;
        computationalEngineering: ISubCategory | null;
      };
      physics: {
        generalRelativityAndQuantumCosmology: ISubCategory | null;
        highEnergyPhysicsExperiment: ISubCategory | null;
        highEnergyPhysicsLattice: ISubCategory | null;
        highEnergyPhysicsPhenomenology: ISubCategory | null;
      };
      mathematics: {
        algebraicGeometry: ISubCategory | null;
        algebraicTopology: ISubCategory | null;
        analysisOfPDEs: ISubCategory | null;
        categoryTheory: ISubCategory | null;
      };
      quantitativeBiology: {
        biomolecules: ISubCategory | null;
        cellBehavior: ISubCategory | null;
        genomics: ISubCategory | null;
        molecularNetworks: ISubCategory | null;
      };
      quantitativeFinance: {
        computationalFinance: ISubCategory | null;
        economics: ISubCategory | null;
        generalFinance: ISubCategory | null;
        mathematicalFinance: ISubCategory | null;
      };
      statistics: {
        applications: ISubCategory | null;
        computation: ISubCategory | null;
        machineLearning: ISubCategory | null;
        methodology: ISubCategory | null;
      };
      electricalEngineeringAndSystemsScience: {
        audioAndSpeechProcessing: ISubCategory | null;
        imageAndVideoProcessing: ISubCategory | null;
        signalProcessing: ISubCategory | null;
        systemsAndControl: ISubCategory | null;
      };
      economics: {
        econometrics: ISubCategory | null;
        generalEconomics: ISubCategory | null;
        theoreticalEconomics: ISubCategory | null;
      };
    };
  }
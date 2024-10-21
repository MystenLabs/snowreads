import Footer from "../Footer";
import LandingPage from "../../pages/LandingPage";
import { useEffect, useState } from "react";
import { ISubCategory } from "../../interfaces/IAllPapers";
import { Spinner } from "../../components/common/Spinner";

const LandingPageLayout: React.FC = () => {
  const [allPapersData, setAllPapersData] = useState<any>(null);
  const [allCollectionsData, setAllCollectionsData] = useState<any>(null);
  const [papersSize, setPapersSize] = useState<number>(0);
  const [artificialIntelligence, setArtificialIntelligence] =
    useState<ISubCategory | null>(null); // 1st subcategory of the Computer Science category
  const [computationAndLanguage, setComputationAndLanguage] =
    useState<ISubCategory | null>(null); // 2nd
  const [computationalComplexity, setComputationalComplexity] =
    useState<ISubCategory | null>(null); // 3rd
  const [robotics, setRobotics] = useState<ISubCategory | null>(null); // 4th
  const [computerScienceCount, setComputerScienceCount] = useState<number>(0);

  const [
    generalRelativityAndQuantumCosmology,
    setGeneralRelativityAndQuantumCosmology,
  ] = useState<ISubCategory | null>(null); // 1st subcategory of the Physics category
  const [highEnergyPhysicsExperiment, setHighEnergyPhysicsExperiment] =
    useState<ISubCategory | null>(null); // 2nd
  const [highEnergyPhysicsLattice, setHighEnergyPhysicsLattice] =
    useState<ISubCategory | null>(null); // 3rd
  const [highEnergyPhysicsPhenomenology, setHighEnergyPhysicsPhenomenology] =
    useState<ISubCategory | null>(null); // 4th
  const [physicsCount, setPhysicsCount] = useState<number>(0);

  const [algebraicGeometry, setAlgebraicGeometry] =
    useState<ISubCategory | null>(null); // 1st subcategory of the Mathematics category
  const [algebraicTopology, setAlgebraicTopology] =
    useState<ISubCategory | null>(null); // 2nd
  const [analysisOfPDEs, setAnalysisOfPDEs] = useState<ISubCategory | null>(
    null
  ); // 3rd
  const [categoryTheory, setCategoryTheory] = useState<ISubCategory | null>(
    null
  ); // 4th
  const [mathematicsCount, setMathematicsCount] = useState<number>(0);

  const [biomolecules, setBiomolecules] = useState<ISubCategory | null>(null); // 1st subcategory of the Quantitative Biology category
  const [cellBehavior, setCellBehavior] = useState<ISubCategory | null>(null); // 2nd
  const [genomics, setGenomics] = useState<ISubCategory | null>(null); // 3rd
  const [molecularNetworks, setMolecularNetworks] =
    useState<ISubCategory | null>(null); // 4th
  const [quantitativeBiologyCount, setQuantitativeBiologyCount] =
    useState<number>(0);

  const [computationalFinance, setComputationalFinance] =
    useState<ISubCategory | null>(null); // 1st subcategory of the Quantitative Finance category
  const [portfolioManagement, setPortfolioManagement] =
    useState<ISubCategory | null>(null); // 2nd
  const [generalFinance, setGeneralFinance] = useState<ISubCategory | null>(
    null
  ); // 3rd
  const [mathematicalFinance, setMathematicalFinance] =
    useState<ISubCategory | null>(null); // 4th
  const [quantitativeFinanceCount, setQuantitativeFinanceCount] =
    useState<number>(0);

  const [applications, setApplications] = useState<ISubCategory | null>(null); // 1st subcategory of the Statistics category
  const [computation, setComputation] = useState<ISubCategory | null>(null); // 2nd
  const [machineLearning, setMachineLearning] = useState<ISubCategory | null>(
    null
  ); // 3rd
  const [methodology, setMethodology] = useState<ISubCategory | null>(null); // 4th
  const [statisticsCount, setStatisticsCount] = useState<number>(0);

  const [audioAndSpeechProcessing, setAudioAndSpeechProcessing] =
    useState<ISubCategory | null>(null); // 1st subcategory of the Electrical Engineering and Systems Science category
  const [imageAndVideoProcessing, setImageAndVideoProcessing] =
    useState<ISubCategory | null>(null); // 2nd
  const [signalProcessing, setSignalProcessing] = useState<ISubCategory | null>(
    null
  ); // 3rd
  const [systemsAndControl, setSystemsAndControl] =
    useState<ISubCategory | null>(null); // 4th
  const [
    electricalEngineeringAndSystemsScienceCount,
    setElectricalEngineeringAndSystemsScienceCount,
  ] = useState<number>(0);

  const [econometrics, setEconometrics] = useState<ISubCategory | null>(null); // 1st subcategory of the Economics category
  const [generalEconomics, setGeneralEconomics] = useState<ISubCategory | null>(
    null
  ); // 2nd
  const [theoreticalEconomics, setTheoreticalEconomics] =
    useState<ISubCategory | null>(null); // 3rd
  const [economicsCount, setEconomicsCount] = useState<number>(0);

  useEffect(() => {
    // Fetch the JSON resource for collections
    fetch("/collections.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setAllCollectionsData(data);
      })
      .catch((error) => {
        console.error("Error fetching collections data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the JSON resource
    fetch("/papers.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setAllPapersData(data);
        setPapersSize(data.size);
        // Computer Science category
        setArtificialIntelligence(
          data["Computer Science"]["Artificial Intelligence"]
        );
        setComputationAndLanguage(
          data["Computer Science"]["Computation and Language"]
        );
        setComputationalComplexity(
          data["Computer Science"]["Computational Complexity"]
        );
        setRobotics(data["Computer Science"]["Robotics"]);
        setComputerScienceCount(data["Computer Science"].count);
        //Physics category
        setGeneralRelativityAndQuantumCosmology(
          data["Physics"]["General Relativity and Quantum Cosmology"]
        );
        setHighEnergyPhysicsExperiment(
          data["Physics"]["High Energy Physics - Experiment"]
        );
        setHighEnergyPhysicsLattice(
          data["Physics"]["High Energy Physics - Lattice"]
        );
        setHighEnergyPhysicsPhenomenology(
          data["Physics"]["High Energy Physics - Phenomenology"]
        );
        setPhysicsCount(data["Physics"].count);
        //Mathematics category
        setAlgebraicGeometry(data["Mathematics"]["Algebraic Geometry"]);
        setAlgebraicTopology(data["Mathematics"]["Algebraic Topology"]);
        setAnalysisOfPDEs(data["Mathematics"]["Analysis of PDEs"]);
        setCategoryTheory(data["Mathematics"]["Category Theory"]);
        setMathematicsCount(data["Mathematics"].count);
        //Quantitive biology category
        setBiomolecules(data["Quantitative Biology"]["Biomolecules"]);
        setCellBehavior(data["Quantitative Biology"]["Cell Behavior"]);
        setGenomics(data["Quantitative Biology"]["Genomics"]);
        setMolecularNetworks(
          data["Quantitative Biology"]["Molecular Networks"]
        );
        setQuantitativeBiologyCount(data["Quantitative Biology"].count);
        //Quantitive finance
        setComputationalFinance(
          data["Quantitative Finance"]["Computational Finance"]
        );
        setPortfolioManagement(
          data["Quantitative Finance"]["Portfolio Management"]
        );
        setGeneralFinance(data["Quantitative Finance"]["General Finance"]);
        setMathematicalFinance(
          data["Quantitative Finance"]["Mathematical Finance"]
        );
        setQuantitativeFinanceCount(data["Quantitative Finance"].count);
        //Statistics
        setApplications(data["Statistics"]["Applications"]);
        setComputation(data["Statistics"]["Computation"]);
        setMachineLearning(data["Statistics"]["Machine Learning"]);
        setMethodology(data["Statistics"]["Methodology"]);
        setStatisticsCount(data["Statistics"].count);
        //Electrical Engineering and Systems Science
        setAudioAndSpeechProcessing(
          data["Electrical Engineering and Systems Science"][
            "Audio and Speech Processing"
          ]
        );
        setImageAndVideoProcessing(
          data["Electrical Engineering and Systems Science"][
            "Image and Video Processing"
          ]
        );
        setSignalProcessing(
          data["Electrical Engineering and Systems Science"][
            "Signal Processing"
          ]
        );
        setSystemsAndControl(
          data["Electrical Engineering and Systems Science"][
            "Systems and Control"
          ]
        );
        setElectricalEngineeringAndSystemsScienceCount(
          data["Electrical Engineering and Systems Science"].count
        );
        //Economics
        setEconometrics(data["Economics"]["Econometrics"]);
        setGeneralEconomics(data["Economics"]["General Economics"]);
        setTheoreticalEconomics(data["Economics"]["Theoretical Economics"]);
        setEconomicsCount(data["Economics"].count);
      })
      .catch((error) => {
        console.log(error);
        //setError(error);
      });
  }, []);

  const documentsCount = {
    "Computer Science": { count: computerScienceCount },
    Physics: { count: physicsCount },
    Mathematics: { count: mathematicsCount },
    "Quantitative Biology": { count: quantitativeBiologyCount },
    "Quantitative Finance": { count: quantitativeFinanceCount },
    Statistics: { count: statisticsCount },
    "Electrical Engineering and Systems Science": {
      count: electricalEngineeringAndSystemsScienceCount,
    },
    Economics: { count: economicsCount },
  };

  const allCategories = {
    computerScience: {
      artificialIntelligence,
      computationAndLanguage,
      computationalComplexity,
      robotics,
    },
    physics: {
      generalRelativityAndQuantumCosmology,
      highEnergyPhysicsExperiment,
      highEnergyPhysicsLattice,
      highEnergyPhysicsPhenomenology,
    },
    mathematics: {
      algebraicGeometry,
      algebraicTopology,
      analysisOfPDEs,
      categoryTheory,
    },
    quantitativeBiology: {
      biomolecules,
      cellBehavior,
      genomics,
      molecularNetworks,
    },
    quantitativeFinance: {
      computationalFinance,
      portfolioManagement,
      generalFinance,
      mathematicalFinance,
    },
    statistics: {
      applications,
      computation,
      machineLearning,
      methodology,
    },
    electricalEngineeringAndSystemsScience: {
      audioAndSpeechProcessing,
      imageAndVideoProcessing,
      signalProcessing,
      systemsAndControl,
    },
    economics: {
      econometrics,
      generalEconomics,
      theoreticalEconomics,
    },
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
      { (allCollectionsData && allPapersData) ? (
        <LandingPage
          allCategories={allCategories}
          documentsCount={documentsCount}
          papersSize={papersSize}
          allPapersData={allPapersData}
          allCollectionsData={allCollectionsData}
        /> )
        : (<Spinner/>)
      }
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;

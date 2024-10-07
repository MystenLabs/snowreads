import PaperLayout from './layout/paperLayout/PaperLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Custom404 from './pages/Custom404';
import LandingPageLayout from './layout/landingLayout/LandingPageLayout';
import CategoryListLayout from './layout/categoryListLayout/CategoryListLayout';
import { useEffect, useState } from 'react';
import { ISubCategory } from './interfaces/IAllPapers';


function App() {
  const [artificialIntelligence, setArtificialIntelligence] = useState<ISubCategory | null>(null);  // 1st subcategory of the Computer Science category
  const [computationAndLanguage, setComputationAndLanguage] = useState<ISubCategory | null>(null);  // 2nd 
  const [computationalComplexity, setComputationalComplexity] = useState<ISubCategory | null>(null);  // 3rd 
  const [computationalEngineering, setComputationalEngineering] = useState<ISubCategory | null>(null);  // 4th 

  const [generalRelativityAndQuantumCosmology, setGeneralRelativityAndQuantumCosmology] = useState<ISubCategory | null>(null);  // 1st subcategory of the Physics category
  const [highEnergyPhysicsExperiment, setHighEnergyPhysicsExperiment] = useState<ISubCategory | null>(null);  // 2nd 
  const [highEnergyPhysicsLattice, setHighEnergyPhysicsLattice] = useState<ISubCategory | null>(null);  // 3rd 
  const [highEnergyPhysicsPhenomenology, setHighEnergyPhysicsPhenomenology] = useState<ISubCategory | null>(null);  // 4th 

  const [algebraicGeometry, setAlgebraicGeometry] = useState<ISubCategory | null>(null);  // 1st subcategory of the Mathematics category
  const [algebraicTopology, setAlgebraicTopology] = useState<ISubCategory | null>(null);  // 2nd 
  const [analysisOfPDEs, setAnalysisOfPDEs] = useState<ISubCategory | null>(null);  // 3rd 
  const [categoryTheory, setCategoryTheory] = useState<ISubCategory | null>(null);  // 4th 

  const [biomolecules, setBiomolecules] = useState<ISubCategory | null>(null);  // 1st subcategory of the Quantitative Biology category
  const [cellBehavior, setCellBehavior] = useState<ISubCategory | null>(null);  // 2nd 
  const [genomics, setGenomics] = useState<ISubCategory | null>(null);  // 3rd 
  const [molecularNetworks, setMolecularNetworks] = useState<ISubCategory | null>(null);  // 4th 

  const [computationalFinance, setComputationalFinance] = useState<ISubCategory | null>(null);  // 1st subcategory of the Quantitative Finance category
  const [economics, setEconomics] = useState<ISubCategory | null>(null);  // 2nd 
  const [generalFinance, setGeneralFinance] = useState<ISubCategory | null>(null);  // 3rd 
  const [mathematicalFinance, setMathematicalFinance] = useState<ISubCategory | null>(null);  // 4th 

  const [applications, setApplications] = useState<ISubCategory | null>(null);  // 1st subcategory of the Statistics category
  const [computation, setComputation] = useState<ISubCategory | null>(null);  // 2nd 
  const [machineLearning, setMachineLearning] = useState<ISubCategory | null>(null);  // 3rd 
  const [methodology, setMethodology] = useState<ISubCategory | null>(null);  // 4th 

  const [audioAndSpeechProcessing, setAudioAndSpeechProcessing] = useState<ISubCategory | null>(null);  // 1st subcategory of the Electrical Engineering and Systems Science category
  const [imageAndVideoProcessing, setImageAndVideoProcessing] = useState<ISubCategory | null>(null);  // 2nd 
  const [signalProcessing, setSignalProcessing] = useState<ISubCategory | null>(null);  // 3rd 
  const [systemsAndControl, setSystemsAndControl] = useState<ISubCategory | null>(null);  // 4th 

  const [econometrics, setEconometrics] = useState<ISubCategory | null>(null);  // 1st subcategory of the Economics category
  const [generalEconomics, setGeneralEconomics] = useState<ISubCategory | null>(null);  // 2nd
  const [theoreticalEconomics, setTheoreticalEconomics] = useState<ISubCategory | null>(null);  //

  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState<null | string>(null);  // Error state

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
        console.log(data);
        // Computer Science category
        setArtificialIntelligence(data['Computing Research Repository']['Artificial Intelligence']);
        setComputationAndLanguage(data['Computing Research Repository']['Computation and Language']);
        setComputationalComplexity(data['Computing Research Repository']['Computational Complexity']);
        setComputationalEngineering(data['Computing Research Repository']['Computational Engineering, Finance, and Science']);
        //Physics category 
        setGeneralRelativityAndQuantumCosmology(data['Physics']['General Relativity and Quantum Cosmology']);
        setHighEnergyPhysicsExperiment(data['Physics']['High Energy Physics - Experiment']);
        setHighEnergyPhysicsLattice(data['Physics']['High Energy Physics - Lattice']);
        setHighEnergyPhysicsPhenomenology(data['Physics']['High Energy Physics - Phenomenology']);
        //Mathematics category 
        setAlgebraicGeometry(data['Mathematics']['Algebraic Geometry']);
        setAlgebraicTopology(data['Mathematics']['Algebraic Topology']);
        setAnalysisOfPDEs(data['Mathematics']['Analysis of PDEs']);
        setCategoryTheory(data['Mathematics']['Category Theory']);
        //Quantitive biology category 
        setBiomolecules(data['Quantitative Biology']['Biomolecules']);
        setCellBehavior(data['Quantitative Biology']['Cell Behavior']);
        setGenomics(data['Quantitative Biology']['Genomics']);
        setMolecularNetworks(data['Quantitative Biology']['Molecular Networks']);
        //Quantitive finance
        setComputationalFinance(data['Quantitative Finance']['Computational Finance']);
        setEconomics(data['Quantitative Finance']['Economics']);
        setGeneralFinance(data['Quantitative Finance']['General Finance']);
        setMathematicalFinance(data['Quantitative Finance']['Mathematical Finance']);
        //Statistics
        setApplications(data['Statistics']['Applications']);
        setComputation(data['Statistics']['Computation']);
        setMachineLearning(data['Statistics']['Machine Learning']);
        setMethodology(data['Statistics']['Methodology']);
        //Electrical Engineering and Systems Science
        setAudioAndSpeechProcessing(data['Electrical Engineering and Systems Science']['Audio and Speech Processing']);
        setImageAndVideoProcessing(data['Electrical Engineering and Systems Science']['Image and Video Processing']);
        setSignalProcessing(data['Electrical Engineering and Systems Science']['Signal Processing']);
        setSystemsAndControl(data['Electrical Engineering and Systems Science']['Systems and Control']);
        //Economics
        setEconometrics(data['Economics']['Econometrics']);
        setGeneralEconomics(data['Economics']['General Economics']);
        setTheoreticalEconomics(data['Economics']['Theoretical Economics']);


        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });

  }, []);

  const allCategoriesSelectedData = {
    computerScience: {
      artificialIntelligence,
      computationAndLanguage,
      computationalComplexity,
      computationalEngineering,
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
      economics,
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
    }
  };


  return (
    <div className='bg-primary '>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPageLayout allCategories = {allCategoriesSelectedData}/>} />
            <Route path="/abs/:doi" element={<PaperLayout />} />
            <Route path="/category/:title" element={<CategoryListLayout />} />
            <Route path="/collection/:title" element={<CategoryListLayout collections={true}/>} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;

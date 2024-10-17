use serde::{Deserialize, Serialize};

#[allow(non_camel_case_types)]
#[derive(Debug, Copy, Clone, Deserialize, Serialize)]
pub enum Category {
    #[serde(
        alias = "astro-ph.GA",
        rename(
            deserialize = "astro-ph.ga",
            serialize = "Astrophysics--Astrophysics of Galaxies"
        )
    )]
    Astrophysics__AstrophysicsOfGalaxies,
    #[serde(
        alias = "astro-ph.CO",
        rename(
            deserialize = "astro-ph.co",
            serialize = "Astrophysics--Cosmology and Nongalactic Astrophysics"
        )
    )]
    Astrophysics__CosmologyAndNongalacticAstrophysics,
    #[serde(
        alias = "astro-ph.EP",
        rename(
            deserialize = "astro-ph.ep",
            serialize = "Astrophysics--Earth and Planetary Astrophysics"
        )
    )]
    Astrophysics__EarthAndPlanetaryAstrophysics,
    #[serde(
        alias = "astro-ph.HE",
        rename(
            deserialize = "astro-ph.he",
            serialize = "Astrophysics--High Energy Astrophysical Phenomena"
        )
    )]
    Astrophysics__HighEnergyAstrophysicalPhenomena,
    #[serde(
        alias = "astro-ph.IM",
        rename(
            deserialize = "astro-ph.im",
            serialize = "Astrophysics--Instrumentation and Methods for Astrophysics"
        )
    )]
    Astrophysics__InstrumentationAndMethodsForAstrophysics,
    #[serde(
        alias = "astro-ph.SR",
        rename(
            deserialize = "astro-ph.sr",
            serialize = "Astrophysics--Solar and Stellar Astrophysics"
        )
    )]
    Astrophysics__SolarAndStellarAstrophysics,
    #[serde(
        alias = "cond-mat.DIS-NN",
        rename(
            deserialize = "cond-mat.dis-nn",
            serialize = "Condensed Matter--Disordered Systems and Neural Networks"
        )
    )]
    CondensedMatter__DisorderedSystemsAndNeuralNetworks,
    #[serde(
        alias = "cond-mat.MTRL-SCI",
        rename(
            deserialize = "cond-mat.mtrl-sci",
            serialize = "Condensed Matter--Materials Science"
        )
    )]
    CondensedMatter__MaterialsScience,
    #[serde(
        alias = "cond-mat.MES-HALL",
        rename(
            deserialize = "cond-mat.mes-hall",
            serialize = "Condensed Matter--Mesoscale and Nanoscale Physics"
        )
    )]
    CondensedMatter__MesoscaleAndNanoscalePhysics,
    #[serde(
        alias = "cond-mat.OTHER",
        rename(
            deserialize = "cond-mat.other",
            serialize = "Condensed Matter--Other Condensed Matter"
        )
    )]
    CondensedMatter__OtherCondensedMatter,
    #[serde(
        alias = "cond-mat.QUANT-GAS",
        rename(
            deserialize = "cond-mat.quant-gas",
            serialize = "Condensed Matter--Quantum Gases"
        )
    )]
    CondensedMatter__QuantumGases,
    #[serde(
        alias = "cond-mat.SOFT",
        rename(
            deserialize = "cond-mat.soft",
            serialize = "Condensed Matter--Soft Condensed Matter"
        )
    )]
    CondensedMatter__SoftCondensedMatter,
    #[serde(
        alias = "cond-mat.STAT-MECH",
        rename(
            deserialize = "cond-mat.stat-mech",
            serialize = "Condensed Matter--Statistical Mechanics"
        )
    )]
    CondensedMatter__StatisticalMechanics,
    #[serde(
        alias = "cond-mat.STR-EL",
        rename(
            deserialize = "cond-mat.str-el",
            serialize = "Condensed Matter--Strongly Correlated Electrons"
        )
    )]
    CondensedMatter__StronglyCorrelatedElectrons,
    #[serde(
        alias = "cond-mat.SUPR-CON",
        rename(
            deserialize = "cond-mat.supr-con",
            serialize = "Condensed Matter--Superconductivity"
        )
    )]
    CondensedMatter__Superconductivity,
    #[serde(rename(
        deserialize = "gr-qc",
        serialize = "Physics--General Relativity and Quantum Cosmology"
    ))]
    Physics__GeneralRelativityAndQuantumCosmology,
    #[serde(rename(
        deserialize = "hep-ex",
        serialize = "Physics--High Energy Physics - Experiment"
    ))]
    Physics__HighEnergyPhysics_Experiment,
    #[serde(rename(
        deserialize = "hep-lat",
        serialize = "Physics--High Energy Physics - Lattice"
    ))]
    Physics__HighEnergyPhysics_Lattice,
    #[serde(rename(
        deserialize = "hep-ph",
        serialize = "Physics--High Energy Physics - Phenomenology"
    ))]
    Physics__HighEnergyPhysics_Phenomenology,
    #[serde(rename(
        deserialize = "hep-th",
        serialize = "Physics--High Energy Physics - Theory"
    ))]
    Physics__HighEnergyPhysics_Theory,
    #[serde(rename(deserialize = "math-ph", serialize = "Physics--Mathematical Physics"))]
    Physics__MathematicalPhysics,
    #[serde(
        alias = "nlin.AO",
        rename(
            deserialize = "nlin.ao",
            serialize = "Nonlinear Sciences--Adaptation and Self-Organizing Systems"
        )
    )]
    NonlinearSciences__AdaptationAndSelf_OrganizingSystems,
    #[serde(
        alias = "nlin.CG",
        rename(
            deserialize = "nlin.cg",
            serialize = "Nonlinear Sciences--Cellular Automata and Lattice Gases"
        )
    )]
    NonlinearSciences__CellularAutomataAndLatticeGases,
    #[serde(
        alias = "nlin.CD",
        rename(
            deserialize = "nlin.cd",
            serialize = "Nonlinear Sciences--Chaotic Dynamics"
        )
    )]
    NonlinearSciences__ChaoticDynamics,
    #[serde(
        alias = "nlin.SI",
        rename(
            deserialize = "nlin.si",
            serialize = "Nonlinear Sciences--Exactly Solvable and Integrable Systems"
        )
    )]
    NonlinearSciences__ExactlySolvableAndIntegrableSystems,
    #[serde(
        alias = "nlin.PS",
        rename(
            deserialize = "nlin.ps",
            serialize = "Nonlinear Sciences--Pattern Formation and Solitons"
        )
    )]
    NonlinearSciences__PatternFormationAndSolitons,
    #[serde(
        alias = "nucl-EX",
        rename(deserialize = "nucl-ex", serialize = "Physics--Nuclear Experiment")
    )]
    Physics__NuclearExperiment,
    #[serde(
        alias = "nucl-TH",
        rename(deserialize = "nucl-th", serialize = "Physics--Nuclear Theory")
    )]
    Physics__NuclearTheory,
    #[serde(
        alias = "physics.ACC-PH",
        rename(
            deserialize = "physics.acc-ph",
            serialize = "Physics--Accelerator Physics"
        )
    )]
    Physics__AcceleratorPhysics,
    #[serde(
        alias = "physics.APP-PH",
        rename(deserialize = "physics.app-ph", serialize = "Physics--Applied Physics")
    )]
    Physics__AppliedPhysics,
    #[serde(
        alias = "physics.AO-PH",
        rename(
            deserialize = "physics.ao-ph",
            serialize = "Physics--Atmospheric and Oceanic Physics"
        )
    )]
    Physics__AtmosphericAndOceanicPhysics,
    #[serde(
        alias = "physics.ATM-CLUS",
        rename(
            deserialize = "physics.atm-clus",
            serialize = "Physics--Atomic and Molecular Clusters"
        )
    )]
    Physics__AtomicAndMolecularClusters,
    #[serde(
        alias = "physics.ATOM-PH",
        rename(deserialize = "physics.atom-ph", serialize = "Physics--Atomic Physics")
    )]
    Physics__AtomicPhysics,
    #[serde(
        alias = "physics.BIO-PH",
        rename(
            deserialize = "physics.bio-ph",
            serialize = "Physics--Biological Physics"
        )
    )]
    Physics__BiologicalPhysics,
    #[serde(
        alias = "physics.CHEM-PH",
        rename(
            deserialize = "physics.chem-ph",
            serialize = "Physics--Chemical Physics"
        )
    )]
    Physics__ChemicalPhysics,
    #[serde(
        alias = "physics.CLASS-PH",
        rename(
            deserialize = "physics.class-ph",
            serialize = "Physics--Classical Physics"
        )
    )]
    Physics__ClassicalPhysics,
    #[serde(
        alias = "physics.COMP-PH",
        rename(
            deserialize = "physics.comp-ph",
            serialize = "Physics--Computational Physics"
        )
    )]
    Physics__ComputationalPhysics,
    #[serde(
        alias = "physics.DATA-AN",
        rename(
            deserialize = "physics.data-an",
            serialize = "Physics--Data Analysis, Statistics and Probability"
        )
    )]
    Physics__DataAnalysisStatisticsAndProbability,
    #[serde(
        alias = "physics.FLU-DYN",
        rename(deserialize = "physics.flu-dyn", serialize = "Physics--Fluid Dynamics")
    )]
    Physics__FluidDynamics,
    #[serde(
        alias = "physics.GEN-PH",
        rename(deserialize = "physics.gen-ph", serialize = "Physics--General Physics")
    )]
    Physics__GeneralPhysics,
    #[serde(
        alias = "physics.GEO-PH",
        rename(deserialize = "physics.geo-ph", serialize = "Physics--Geophysics")
    )]
    Physics__Geophysics,
    #[serde(
        alias = "physics.HIST-PH",
        rename(
            deserialize = "physics.hist-ph",
            serialize = "Physics--History and Philosophy of Physics"
        )
    )]
    Physics__HistoryAndPhilosophyOfPhysics,
    #[serde(
        alias = "physics.INS-DET",
        rename(
            deserialize = "physics.ins-det",
            serialize = "Physics--Instrumentation and Detectors"
        )
    )]
    Physics__InstrumentationAndDetectors,
    #[serde(
        alias = "physics.MED-PH",
        rename(deserialize = "physics.med-ph", serialize = "Physics--Medical Physics")
    )]
    Physics__MedicalPhysics,
    #[serde(
        alias = "physics.OPTICS",
        rename(deserialize = "physics.optics", serialize = "Physics--Optics")
    )]
    Physics__Optics,
    #[serde(
        alias = "physics.SOC-PH",
        rename(
            deserialize = "physics.soc-ph",
            serialize = "Physics--Physics and Society"
        )
    )]
    Physics__PhysicsAndSociety,
    #[serde(
        alias = "physics.ED-PH",
        rename(
            deserialize = "physics.ed-ph",
            serialize = "Physics--Physics Education"
        )
    )]
    Physics__PhysicsEducation,
    #[serde(
        alias = "physics.PLASM-PH",
        rename(
            deserialize = "physics.plasm-ph",
            serialize = "Physics--Plasma Physics"
        )
    )]
    Physics__PlasmaPhysics,
    #[serde(
        alias = "physics.POP-PH",
        rename(deserialize = "physics.pop-ph", serialize = "Physics--Popular Physics")
    )]
    Physics__PopularPhysics,
    #[serde(
        alias = "physics.SPACE-PH",
        rename(deserialize = "physics.space-ph", serialize = "Physics--Space Physics")
    )]
    Physics__SpacePhysics,
    #[serde(
        alias = "quant-PH",
        rename(deserialize = "quant-ph", serialize = "Physics--Quantum Physics")
    )]
    Physics__QuantumPhysics,
    #[serde(
        alias = "math.AG",
        rename(deserialize = "math.ag", serialize = "Mathematics--Algebraic Geometry")
    )]
    Mathematics__AlgebraicGeometry,
    #[serde(
        alias = "math.AT",
        rename(deserialize = "math.at", serialize = "Mathematics--Algebraic Topology")
    )]
    Mathematics__AlgebraicTopology,
    #[serde(
        alias = "math.AP",
        rename(deserialize = "math.ap", serialize = "Mathematics--Analysis of PDEs")
    )]
    Mathematics__AnalysisOfPDEs,
    #[serde(
        alias = "math.CT",
        rename(deserialize = "math.ct", serialize = "Mathematics--Category Theory")
    )]
    Mathematics__CategoryTheory,
    #[serde(
        alias = "math.CA",
        rename(
            deserialize = "math.ca",
            serialize = "Mathematics--Classical Analysis and ODEs"
        )
    )]
    Mathematics__ClassicalAnalysisAndODEs,
    #[serde(
        alias = "math.CO",
        rename(deserialize = "math.co", serialize = "Mathematics--Combinatorics")
    )]
    Mathematics__Combinatorics,
    #[serde(
        alias = "math.AC",
        rename(
            deserialize = "math.ac",
            serialize = "Mathematics--Commutative Algebra"
        )
    )]
    Mathematics__CommutativeAlgebra,
    #[serde(
        alias = "math.CV",
        rename(deserialize = "math.cv", serialize = "Mathematics--Complex Variables")
    )]
    Mathematics__ComplexVariables,
    #[serde(
        alias = "math.DG",
        rename(
            deserialize = "math.dg",
            serialize = "Mathematics--Differential Geometry"
        )
    )]
    Mathematics__DifferentialGeometry,
    #[serde(
        alias = "math.DS",
        rename(deserialize = "math.ds", serialize = "Mathematics--Dynamical Systems")
    )]
    Mathematics__DynamicalSystems,
    #[serde(
        alias = "math.FA",
        rename(
            deserialize = "math.fa",
            serialize = "Mathematics--Functional Analysis"
        )
    )]
    Mathematics__FunctionalAnalysis,
    #[serde(
        alias = "math.GM",
        rename(
            deserialize = "math.gm",
            serialize = "Mathematics--General Mathematics"
        )
    )]
    Mathematics__GeneralMathematics,
    #[serde(
        alias = "math.GN",
        rename(deserialize = "math.gn", serialize = "Mathematics--General Topology")
    )]
    Mathematics__GeneralTopology,
    #[serde(
        alias = "math.GT",
        rename(deserialize = "math.gt", serialize = "Mathematics--Geometric Topology")
    )]
    Mathematics__GeometricTopology,
    #[serde(
        alias = "math.GR",
        rename(deserialize = "math.gr", serialize = "Mathematics--Group Theory")
    )]
    Mathematics__GroupTheory,
    #[serde(
        alias = "math.HO",
        rename(
            deserialize = "math.ho",
            serialize = "Mathematics--History and Overview"
        )
    )]
    Mathematics__HistoryAndOverview,
    #[serde(
        alias = "math.IT",
        rename(deserialize = "math.it", serialize = "Mathematics--Information Theory")
    )]
    Mathematics__InformationTheory,
    #[serde(
        alias = "math.KT",
        rename(
            deserialize = "math.kt",
            serialize = "Mathematics--K-Theory and Homology"
        )
    )]
    Mathematics__K_TheoryAndHomology,
    #[serde(
        alias = "math.LO",
        rename(deserialize = "math.lo", serialize = "Mathematics--Logic")
    )]
    Mathematics__Logic,
    #[serde(
        alias = "math.MP",
        rename(
            deserialize = "math.mp",
            serialize = "Mathematics--Mathematical Physics"
        )
    )]
    Mathematics__MathematicalPhysics,
    #[serde(
        alias = "math.MG",
        rename(deserialize = "math.mg", serialize = "Mathematics--Metric Geometry")
    )]
    Mathematics__MetricGeometry,
    #[serde(
        alias = "math.NT",
        rename(deserialize = "math.nt", serialize = "Mathematics--Number Theory")
    )]
    Mathematics__NumberTheory,
    #[serde(
        alias = "math.NA",
        rename(deserialize = "math.na", serialize = "Mathematics--Numerical Analysis")
    )]
    Mathematics__NumericalAnalysis,
    #[serde(
        alias = "math.OA",
        rename(deserialize = "math.oa", serialize = "Mathematics--Operator Algebras")
    )]
    Mathematics__OperatorAlgebras,
    #[serde(
        alias = "math.OC",
        rename(
            deserialize = "math.oc",
            serialize = "Mathematics--Optimization and Control"
        )
    )]
    Mathematics__OptimizationAndControl,
    #[serde(
        alias = "math.PR",
        rename(deserialize = "math.pr", serialize = "Mathematics--Probability")
    )]
    Mathematics__Probability,
    #[serde(
        alias = "math.QA",
        rename(deserialize = "math.qa", serialize = "Mathematics--Quantum Algebra")
    )]
    Mathematics__QuantumAlgebra,
    #[serde(
        alias = "math.RT",
        rename(
            deserialize = "math.rt",
            serialize = "Mathematics--Representation Theory"
        )
    )]
    Mathematics__RepresentationTheory,
    #[serde(
        alias = "math.RA",
        rename(deserialize = "math.ra", serialize = "Mathematics--Rings and Algebras")
    )]
    Mathematics__RingsAndAlgebras,
    #[serde(
        alias = "math.SP",
        rename(deserialize = "math.sp", serialize = "Mathematics--Spectral Theory")
    )]
    Mathematics__SpectralTheory,
    #[serde(
        alias = "math.ST",
        rename(deserialize = "math.st", serialize = "Mathematics--Statistics Theory")
    )]
    Mathematics__StatisticsTheory,
    #[serde(
        alias = "math.SG",
        rename(
            deserialize = "math.sg",
            serialize = "Mathematics--Symplectic Geometry"
        )
    )]
    Mathematics__SymplecticGeometry,
    #[serde(
        alias = "cs.AI",
        rename(
            deserialize = "cs.ai",
            serialize = "Computing Research Repository--Artificial Intelligence"
        )
    )]
    ComputingResearchRepository__ArtificialIntelligence,
    #[serde(
        alias = "cs.CL",
        rename(
            deserialize = "cs.cl",
            serialize = "Computing Research Repository--Computation and Language"
        )
    )]
    ComputingResearchRepository__ComputationAndLanguage,
    #[serde(
        alias = "cs.CC",
        rename(
            deserialize = "cs.cc",
            serialize = "Computing Research Repository--Computational Complexity"
        )
    )]
    ComputingResearchRepository__ComputationalComplexity,
    #[serde(
        alias = "cs.CE",
        rename(
            deserialize = "cs.ce",
            serialize = "Computing Research Repository -- Computational Engineering, Finance, and Science"
        )
    )]
    ComputingResearchRepository__ComputationalEngineeringFinanceAndScience,
    #[serde(
        alias = "cs.CG",
        rename(
            deserialize = "cs.cg",
            serialize = "Computing Research Repository--Computational Geometry"
        )
    )]
    ComputingResearchRepository__ComputationalGeometry,
    #[serde(
        alias = "cs.GT",
        rename(
            deserialize = "cs.gt",
            serialize = "Computing Research Repository--Computer Science and Game Theory"
        )
    )]
    ComputingResearchRepository__ComputerScienceAndGameTheory,
    #[serde(
        alias = "cs.CV",
        rename(
            deserialize = "cs.cv",
            serialize = "Computing Research Repository--Computer Vision and Pattern Recognition"
        )
    )]
    ComputingResearchRepository__ComputerVisionAndPatternRecognition,
    #[serde(
        alias = "cs.CY",
        rename(
            deserialize = "cs.cy",
            serialize = "Computing Research Repository--Computers and Society"
        )
    )]
    ComputingResearchRepository__ComputersAndSociety,
    #[serde(
        alias = "cs.CR",
        rename(
            deserialize = "cs.cr",
            serialize = "Computing Research Repository--Cryptography and Security"
        )
    )]
    ComputingResearchRepository__CryptographyAndSecurity,
    #[serde(
        alias = "cs.DS",
        rename(
            deserialize = "cs.ds",
            serialize = "Computing Research Repository--Data Structures and Algorithms"
        )
    )]
    ComputingResearchRepository__DataStructuresAndAlgorithms,
    #[serde(
        alias = "cs.DB",
        rename(
            deserialize = "cs.db",
            serialize = "Computing Research Repository--Databases"
        )
    )]
    ComputingResearchRepository__Databases,
    #[serde(
        alias = "cs.DL",
        rename(
            deserialize = "cs.dl",
            serialize = "Computing Research Repository--Digital Libraries"
        )
    )]
    ComputingResearchRepository__DigitalLibraries,
    #[serde(
        alias = "cs.DM",
        rename(
            deserialize = "cs.dm",
            serialize = "Computing Research Repository--Discrete Mathematics"
        )
    )]
    ComputingResearchRepository__DiscreteMathematics,
    #[serde(
        alias = "cs.DC",
        rename(
            deserialize = "cs.dc",
            serialize = "Computing Research Repository--Distributed, Parallel, and Cluster Computing"
        )
    )]
    ComputingResearchRepository__DistributedParallelAndClusterComputing,
    #[serde(
        alias = "cs.ET",
        rename(
            deserialize = "cs.et",
            serialize = "Computing Research Repository--Emerging Technologies"
        )
    )]
    ComputingResearchRepository__EmergingTechnologies,
    #[serde(
        alias = "cs.FL",
        rename(
            deserialize = "cs.fl",
            serialize = "Computing Research Repository--Formal Languages and Automata Theory"
        )
    )]
    ComputingResearchRepository__FormalLanguagesAndAutomataTheory,
    #[serde(
        alias = "cs.GL",
        rename(
            deserialize = "cs.gl",
            serialize = "Computing Research Repository--General Literature"
        )
    )]
    ComputingResearchRepository__GeneralLiterature,
    #[serde(
        alias = "cs.GR",
        rename(
            deserialize = "cs.gr",
            serialize = "Computing Research Repository--Graphics"
        )
    )]
    ComputingResearchRepository__Graphics,
    #[serde(
        alias = "cs.AR",
        rename(
            deserialize = "cs.ar",
            serialize = "Computing Research Repository--Hardware Architecture"
        )
    )]
    ComputingResearchRepository__HardwareArchitecture,
    #[serde(
        alias = "cs.HC",
        rename(
            deserialize = "cs.hc",
            serialize = "Computing Research Repository--Human-Computer Interaction"
        )
    )]
    ComputingResearchRepository__Human_ComputerInteraction,
    #[serde(
        alias = "cs.IR",
        rename(
            deserialize = "cs.ir",
            serialize = "Computing Research Repository--Information Retrieval"
        )
    )]
    ComputingResearchRepository__InformationRetrieval,
    #[serde(
        alias = "cs.IT",
        rename(
            deserialize = "cs.it",
            serialize = "Computing Research Repository--Information Theory"
        )
    )]
    ComputingResearchRepository__InformationTheory,
    #[serde(
        alias = "cs.LO",
        rename(
            deserialize = "cs.lo",
            serialize = "Computing Research Repository--Logic in Computer Science"
        )
    )]
    ComputingResearchRepository__LogicinComputerScience,
    #[serde(
        alias = "cs.LG",
        rename(
            deserialize = "cs.lg",
            serialize = "Computing Research Repository--Machine Learning"
        )
    )]
    ComputingResearchRepository__MachineLearning,
    #[serde(
        alias = "cs.MS",
        rename(
            deserialize = "cs.ms",
            serialize = "Computing Research Repository--Mathematical Software"
        )
    )]
    ComputingResearchRepository__MathematicalSoftware,
    #[serde(
        alias = "cs.MA",
        rename(
            deserialize = "cs.ma",
            serialize = "Computing Research Repository--Multiagent Systems"
        )
    )]
    ComputingResearchRepository__MultiagentSystems,
    #[serde(
        alias = "cs.MM",
        rename(
            deserialize = "cs.mm",
            serialize = "Computing Research Repository--Multimedia"
        )
    )]
    ComputingResearchRepository__Multimedia,
    #[serde(
        alias = "cs.NI",
        rename(
            deserialize = "cs.ni",
            serialize = "Computing Research Repository--Networking and Internet Architecture"
        )
    )]
    ComputingResearchRepository__NetworkingAndInternetArchitecture,
    #[serde(
        alias = "cs.NE",
        rename(
            deserialize = "cs.ne",
            serialize = "Computing Research Repository--Neural and Evolutionary Computing"
        )
    )]
    ComputingResearchRepository__NeuralAndEvolutionaryComputing,
    #[serde(
        alias = "cs.NA",
        rename(
            deserialize = "cs.na",
            serialize = "Computing Research Repository--Numerical Analysis"
        )
    )]
    ComputingResearchRepository__NumericalAnalysis,
    #[serde(
        alias = "cs.OS",
        rename(
            deserialize = "cs.os",
            serialize = "Computing Research Repository--Operating Systems"
        )
    )]
    ComputingResearchRepository__OperatingSystems,
    #[serde(
        alias = "cs.OH",
        rename(
            deserialize = "cs.oh",
            serialize = "Computing Research Repository--Other Computer Science"
        )
    )]
    ComputingResearchRepository__OtherComputerScience,
    #[serde(
        alias = "cs.PF",
        rename(
            deserialize = "cs.pf",
            serialize = "Computing Research Repository--Performance"
        )
    )]
    ComputingResearchRepository__Performance,
    #[serde(
        alias = "cs.PL",
        rename(
            deserialize = "cs.pl",
            serialize = "Computing Research Repository--Programming Languages"
        )
    )]
    ComputingResearchRepository__ProgrammingLanguages,
    #[serde(
        alias = "cs.RO",
        rename(
            deserialize = "cs.ro",
            serialize = "Computing Research Repository--Robotics"
        )
    )]
    ComputingResearchRepository__Robotics,
    #[serde(
        alias = "cs.SI",
        rename(
            deserialize = "cs.si",
            serialize = "Computing Research Repository--Social and Information Networks"
        )
    )]
    ComputingResearchRepository__SocialAndInformationNetworks,
    #[serde(
        alias = "cs.SE",
        rename(
            deserialize = "cs.se",
            serialize = "Computing Research Repository--Software Engineering"
        )
    )]
    ComputingResearchRepository__SoftwareEngineering,
    #[serde(
        alias = "cs.SD",
        rename(
            deserialize = "cs.sd",
            serialize = "Computing Research Repository--Sound"
        )
    )]
    ComputingResearchRepository__Sound,
    #[serde(
        alias = "cs.SC",
        rename(
            deserialize = "cs.sc",
            serialize = "Computing Research Repository--Symbolic Computation"
        )
    )]
    ComputingResearchRepository__SymbolicComputation,
    #[serde(
        alias = "cs.SY",
        rename(
            deserialize = "cs.sy",
            serialize = "Computing Research Repository--Systems and Control"
        )
    )]
    ComputingResearchRepository__SystemsAndControl,
    #[serde(
        alias = "q-bio.BM",
        rename(
            deserialize = "q-bio.bm",
            serialize = "Quantitative Biology--Biomolecules"
        )
    )]
    QuantitativeBiology__Biomolecules,
    #[serde(
        alias = "q-bio.CB",
        rename(
            deserialize = "q-bio.cb",
            serialize = "Quantitative Biology--Cell Behavior"
        )
    )]
    QuantitativeBiology__CellBehavior,
    #[serde(
        alias = "q-bio.GN",
        rename(deserialize = "q-bio.gn", serialize = "Quantitative Biology--Genomics")
    )]
    QuantitativeBiology__Genomics,
    #[serde(
        alias = "q-bio.MN",
        rename(
            deserialize = "q-bio.mn",
            serialize = "Quantitative Biology--Molecular Networks"
        )
    )]
    QuantitativeBiology__MolecularNetworks,
    #[serde(
        alias = "q-bio.NC",
        rename(
            deserialize = "q-bio.nc",
            serialize = "Quantitative Biology--Neurons and Cognition"
        )
    )]
    QuantitativeBiology__NeuronsAndCognition,
    #[serde(
        alias = "q-bio.OT",
        rename(
            deserialize = "q-bio.ot",
            serialize = "Quantitative Biology--Other Quantitative Biology"
        )
    )]
    QuantitativeBiology__OtherQuantitativeBiology,
    #[serde(
        alias = "q-bio.PE",
        rename(
            deserialize = "q-bio.pe",
            serialize = "Quantitative Biology--Populations and Evolution"
        )
    )]
    QuantitativeBiology__PopulationsAndEvolution,
    #[serde(
        alias = "q-bio.QM",
        rename(
            deserialize = "q-bio.qm",
            serialize = "Quantitative Biology--Quantitative Methods"
        )
    )]
    QuantitativeBiology__QuantitativeMethods,
    #[serde(
        alias = "q-bio.SC",
        rename(
            deserialize = "q-bio.sc",
            serialize = "Quantitative Biology--Subcellular Processes"
        )
    )]
    QuantitativeBiology__SubcellularProcesses,
    #[serde(
        alias = "q-bio.TO",
        rename(
            deserialize = "q-bio.to",
            serialize = "Quantitative Biology--Tissues and Organs"
        )
    )]
    QuantitativeBiology__TissuesAndOrgans,
    #[serde(
        alias = "q-fin.CP",
        rename(
            deserialize = "q-fin.cp",
            serialize = "Quantitative Finance--Computational Finance"
        )
    )]
    QuantitativeFinance__ComputationalFinance,
    #[serde(
        alias = "q-fin.EC",
        rename(
            deserialize = "q-fin.ec",
            serialize = "Quantitative Finance--Economics"
        )
    )]
    QuantitativeFinance__Economics,
    #[serde(
        alias = "q-fin.GN",
        rename(
            deserialize = "q-fin.gn",
            serialize = "Quantitative Finance--General Finance"
        )
    )]
    QuantitativeFinance__GeneralFinance,
    #[serde(
        alias = "q-fin.MF",
        rename(
            deserialize = "q-fin.mf",
            serialize = "Quantitative Finance--Mathematical Finance"
        )
    )]
    QuantitativeFinance__MathematicalFinance,
    #[serde(
        alias = "q-fin.PM",
        rename(
            deserialize = "q-fin.pm",
            serialize = "Quantitative Finance--Portfolio Management"
        )
    )]
    QuantitativeFinance__PortfolioManagement,
    #[serde(
        alias = "q-fin.PR",
        rename(
            deserialize = "q-fin.pr",
            serialize = "Quantitative Finance--Pricing of Securities"
        )
    )]
    QuantitativeFinance__PricingOfSecurities,
    #[serde(
        alias = "q-fin.RM",
        rename(
            deserialize = "q-fin.rm",
            serialize = "Quantitative Finance--Risk Management"
        )
    )]
    QuantitativeFinance__RiskManagement,
    #[serde(
        alias = "q-fin.ST",
        rename(
            deserialize = "q-fin.st",
            serialize = "Quantitative Finance--Statistical Finance"
        )
    )]
    QuantitativeFinance__StatisticalFinance,
    #[serde(
        alias = "q-fin.TR",
        rename(
            deserialize = "q-fin.tr",
            serialize = "Quantitative Finance--Trading and Market Microstructure"
        )
    )]
    QuantitativeFinance__TradingAndMarketMicrostructure,
    #[serde(
        alias = "stat.AP",
        rename(deserialize = "stat.ap", serialize = "Statistics--Applications")
    )]
    Statistics__Applications,
    #[serde(
        alias = "stat.CO",
        rename(deserialize = "stat.co", serialize = "Statistics--Computation")
    )]
    Statistics__Computation,
    #[serde(
        alias = "stat.ML",
        rename(deserialize = "stat.ml", serialize = "Statistics--Machine Learning")
    )]
    Statistics__MachineLearning,
    #[serde(
        alias = "stat.ME",
        rename(deserialize = "stat.me", serialize = "Statistics--Methodology")
    )]
    Statistics__Methodology,
    #[serde(
        alias = "stat.OT",
        rename(deserialize = "stat.ot", serialize = "Statistics--Other Statistics")
    )]
    Statistics__OtherStatistics,
    #[serde(
        alias = "stat.TH",
        rename(deserialize = "stat.th", serialize = "Statistics--Statistics Theory")
    )]
    Statistics__StatisticsTheory,
    #[serde(
        alias = "eess.AS",
        rename(
            deserialize = "eess.as",
            serialize = "Electrical Engineering and Systems Science--Audio and Speech Processing"
        )
    )]
    ElectricalEngineeringAndSystemsScience__AudioAndSpeechProcessing,
    #[serde(
        alias = "eess.IV",
        rename(
            deserialize = "eess.iv",
            serialize = "Electrical Engineering and Systems Science--Image and Video Processing"
        )
    )]
    ElectricalEngineeringAndSystemsScience__ImageAndVideoProcessing,
    #[serde(
        alias = "eess.SP",
        rename(
            deserialize = "eess.sp",
            serialize = "Electrical Engineering and Systems Science--Signal Processing"
        )
    )]
    ElectricalEngineeringAndSystemsScience__SignalProcessing,
    #[serde(
        alias = "eess.SY",
        rename(
            deserialize = "eess.sy",
            serialize = "Electrical Engineering and Systems Science--Systems and Control"
        )
    )]
    ElectricalEngineeringAndSystemsScience__SystemsAndControl,
    #[serde(
        alias = "econ.EM",
        rename(deserialize = "econ.em", serialize = "Economics--Econometrics")
    )]
    Economics__Econometrics,
    #[serde(
        alias = "econ.GN",
        rename(deserialize = "econ.gn", serialize = "Economics--General Economics")
    )]
    Economics__GeneralEconomics,
    #[serde(
        alias = "econ.TH",
        rename(
            deserialize = "econ.th",
            serialize = "Economics--Theoretical Economics"
        )
    )]
    Economics__TheoreticalEconomics,
}

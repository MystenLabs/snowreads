export function parseCategory(category: string): { mainCategory: string, subCategory: string, path?: string } {
    const categoryLower = category.toLowerCase();
    let mainCategory: string;
    let subCategory: string;
    let path: string | undefined;

    switch (categoryLower) {
        case "astro-ph.ga": {
            mainCategory = "Astrophysics";
            subCategory = "Astrophysics of Galaxies";
            path = "astrophysics/astrophysics_of_galaxies";
            break;
        };
        case "astro-ph.co": {
            mainCategory = "Astrophysics";
            subCategory = "Cosmology and Nongalactic Astrophysics";
            path = "astrophysics/cosmology_and_nongalactic_astrophysics";

            break;
        }
        case "astro-ph.ep": {
            mainCategory = "Astrophysics";
            subCategory = "Earth and Planetary Astrophysics";
            path = "astrophysics/earth_and_planetary_astrophysics";
            break;
        }
        case "astro-ph.he": {
            mainCategory = "Astrophysics";
            subCategory = "High Energy Astrophysical Phenomena";
            path = "astrophysics/high_energy_astrophysical_phenomena";
            break;
        }
        case "astro-ph.im": {
            mainCategory = "Astrophysics";
            subCategory = "Instrumentation and Methods for Astrophysics";
            path = "astrophysics/instrumentation_and_methods_for_astrophysics";
            break;
        }
        case "astro-ph.sr": {
            mainCategory = "Astrophysics";
            subCategory = "Solar and Stellar Astrophysics";
            path = "astrophysics/solar_and_stellar_astrophysics";
            break;
        }
        case "cond-mat.dis-nn": {
            mainCategory = "Condensed Matter";
            subCategory = "Disordered Systems and Neural Networks";
            path = "condensed_matter/disordered_systems_and_neural_networks";
            break;
        }
        case "cond-mat.mtrl-sci": {
            mainCategory = "Condensed Matter";
            subCategory = "Materials Science";
            path = "condensed_matter/materials_science";
            break;
        }
        case "cond-mat.mes-hall": {
            mainCategory = "Condensed Matter";
            subCategory = "Mesoscale and Nanoscale Physics";
            path = "condensed_matter/mesoscale_and_nanoscale_physics";
            break;
        }
        case "cond-mat.other": {
            mainCategory = "Condensed Matter";
            subCategory = "Other Condensed Matter";
            path = "condensed_matter/other_condensed_matter";
            break;
        }
        case "cond-mat.quant-gas": {
            mainCategory = "Condensed Matter";
            subCategory = "Quantum Gases";
            path = "condensed_matter/quantum_gases";
            break;
        }
        case "cond-mat.soft": {
            mainCategory = "Condensed Matter";
            subCategory = "Soft Condensed Matter";
            path = "condensed_matter/soft_condensed_matter";
            break;
        }
        case "cond-mat.stat-mech": {
            mainCategory = "Condensed Matter";
            subCategory = "Statistical Mechanics";
            path = "condensed_matter/statistical_mechanics";
            break;
        }
        case "cond-mat.str-el": {
            mainCategory = "Condensed Matter";
            subCategory = "Strongly Correlated Electrons";
            path = "condensed_matter/strongly_correlated_electrons";
            break;
        }
        case "cond-mat.supr-con": {
            mainCategory = "Condensed Matter";
            subCategory = "Superconductivity";
            path = "condensed_matter/superconductivity";
            break;
        }
        case "gr-qc": {
            mainCategory = "Physics";
            subCategory = "General Relativity and Quantum Cosmology";
            path = "physics/general_relativity_and_quantum_cosmology";
            break;
        }
        case "hep-ex": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Experiment";
            path = "physics/high_energy_physics_-_experiment";
            break;
        }
        case "hep-lat": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Lattice";
            path = "physics/high_energy_physics_-_lattice";
            break;
        }
        case "hep-ph": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Phenomenology";
            path = "physics/high_energy_physics_-_phenomenology";
            break;
        }
        case "hep-th": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Theory";
            path = "physics/high_energy_physics_-_theory";
            break;
        }
        case "math-ph": {
            mainCategory = "Physics";
            subCategory = "Mathematical Physics";
            path = "physics/mathematical_physics";
            break;
        }
        case "nlin.ao": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Adaptation and Self-Organizing Systems";
            path = "nonlinear_sciences/adaptation_and_self-organizing_systems";
            break;
        }
        case "nlin.cg": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Cellular Automata and Lattice Gases";
            path = "nonlinear_sciences/cellular_automata_and_lattice_gases";
            break;
        }
        case "nlin.cd": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Chaotic Dynamics";
            path = "nonlinear_sciences/chaotic_dynamics";
            break;
        }
        case "nlin.si": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Exactly Solvable and Integrable Systems";
            path = "nonlinear_sciences/exactly_solvable_and_integrable_systems";
            break;
        }
        case "nlin.ps": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Pattern Formation and Solitons";
            path = "nonlinear_sciences/pattern_formation_and_solitons";
            break;
        }
        case "nucl-ex": {
            mainCategory = "Physics";
            subCategory = "Nuclear Experiment";
            path = "physics/nuclear_experiment";
            break;
        }
        case "nucl-th": {
            mainCategory = "Physics";
            subCategory = "Nuclear Theory";
            path = "physics/nuclear_theory";
            break;
        }
        case "physics.acc-ph": {
            mainCategory = "Physics";
            subCategory = "Accelerator Physics";
            path = "physics/accelerator_physics";
            break;
        }
        case "physics.app-ph": {
            mainCategory = "Physics";
            subCategory = "Applied Physics";
            path = "physics/applied_physics";
            break;
        }
        case "physics.ao-ph": {
            mainCategory = "Physics";
            subCategory = "Atmospheric and Oceanic Physics";
            path = "physics/atmospheric_and_oceanic_physics";
            break;
        }
        case "physics.atm-clus": {
            mainCategory = "Physics";
            subCategory = "Atomic and Molecular Clusters";
            path = "physics/atomic_and_molecular_clusters";
            break;
        }
        case "physics.atom-ph": {
            mainCategory = "Physics";
            subCategory = "Atomic Physics";
            path = "physics/atomic_physics";
            break;
        }
        case "physics.bio-ph": {
            mainCategory = "Physics";
            subCategory = "Biological Physics";
            path = "physics/biological_physics";
            break;
        }
        case "physics.chem-ph": {
            mainCategory = "Physics";
            subCategory = "Chemical Physics";
            path = "physics/chemical_physics";
            break;
        }
        case "physics.class-ph": {
            mainCategory = "Physics";
            subCategory = "Classical Physics";
            path = "physics/classical_physics";
            break;
        }
        case "physics.comp-ph": {
            mainCategory = "Physics";
            subCategory = "Computational Physics";
            path = "physics/computational_physics";
            break;
        }
        case "physics.data-an": {
            mainCategory = "Physics";
            subCategory = "Data Analysis, Statistics and Probability";
            path = "physics/data_analysis,_statistics_and_probability";
            break;
        }
        case "physics.flu-dyn": {
            mainCategory = "Physics";
            subCategory = "Fluid Dynamics";
            path = "physics/fluid_dynamics";
            break;
        }
        case "physics.gen-ph": {
            mainCategory = "Physics";
            subCategory = "General Physics";
            path = "physics/general_physics";
            break;
        }
        case "physics.geo-ph": {
            mainCategory = "Physics";
            subCategory = "Geophysics";
            path = "physics/geophysics";
            break;
        }
        case "physics.hist-ph": {
            mainCategory = "Physics";
            subCategory = "History and Philosophy of Physics";
            path = "physics/history_and_philosophy_of_physics";
            break;
        }
        case "physics.ins-det": {
            mainCategory = "Physics";
            subCategory = "Instrumentation and Detectors";
            path = "physics/instrumentation_and_detectors";
            break;
        }
        case "physics.med-ph": {
            mainCategory = "Physics";
            subCategory = "Medical Physics";
            path = "physics/medical_physics";
            break;
        }
        case "physics.optics": {
            mainCategory = "Physics";
            subCategory = "Optics";
            path = "physics/optics";
            break;
        }
        case "physics.soc-ph": {
            mainCategory = "Physics";
            subCategory = "Physics and Society";
            path = "physics/physics_and_society";
            break;
        }
        case "physics.ed-ph": {
            mainCategory = "Physics";
            subCategory = "Physics Education";
            path = "physics/physics_education";
            break;
        }
        case "physics.plasm-ph": {
            mainCategory = "Physics";
            subCategory = "Plasma Physics";
            path = "physics/plasma_physics";
            break;
        }
        case "physics.pop-ph": {
            mainCategory = "Physics";
            subCategory = "Popular Physics";
            path = "physics/popular_physics";
            break;
        }
        case "physics.space-ph": {
            mainCategory = "Physics";
            subCategory = "Space Physics";
            path = "physics/space_physics";
            break;
        }
        case "quant-ph": {
            mainCategory = "Physics";
            subCategory = "Quantum Physics";
            path = "physics/quantum_physics";
            break;
        }
        case "math.ag": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Geometry";
            path = "mathematics/algebraic_geometry";
            break;
        }
        case "math.at": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Topology";
            path = "mathematics/algebraic_topology";
            break;
        }
        case "math.ap": {
            mainCategory = "Mathematics";
            subCategory = "Analysis of PDEs";
            path = "mathematics/analysis_of_pdes";
            break;
        }
        case "math.ct": {
            mainCategory = "Mathematics";
            subCategory = "Category Theory";
            path = "mathematics/category_theory";
            break;
        }
        case "math.ca": {
            mainCategory = "Mathematics";
            subCategory = "Classical Analysis and ODEs";
            path = "mathematics/classical_analysis_and_odes";
            break;
        }
        case "math.co": {
            mainCategory = "Mathematics";
            subCategory = "Combinatorics";
            path = "mathematics/combinatorics";
            break;
        }
        case "math.ac": {
            mainCategory = "Mathematics";
            subCategory = "Commutative Algebra";
            path = "mathematics/commutative_algebra";
            break;
        }
        case "math.cv": {
            mainCategory = "Mathematics";
            subCategory = "Complex Variables";
            path = "mathematics/complex_variables";
            break;
        }
        case "math.dg": {
            mainCategory = "Mathematics";
            subCategory = "Differential Geometry";
            path = "mathematics/differential_geometry";
            break;
        }
        case "math.ds": {
            mainCategory = "Mathematics";
            subCategory = "Dynamical Systems";
            path = "mathematics/dynamical_systems";
            break;
        }
        case "math.fa": {
            mainCategory = "Mathematics";
            subCategory = "Functional Analysis";
            path = "mathematics/functional_analysis";
            break;
        }
        case "math.gm": {
            mainCategory = "Mathematics";
            subCategory = "General Mathematics";
            path = "mathematics/general_mathematics";
            break;
        }
        case "math.gn": {
            mainCategory = "Mathematics";
            subCategory = "General Topology";
            path = "mathematics/general_topology";
            break;
        }
        case "math.gt": {
            mainCategory = "Mathematics";
            subCategory = "Geometric Topology";
            path = "mathematics/geometric_topology";
            break;
        }
        case "math.gr": {
            mainCategory = "Mathematics";
            subCategory = "Group Theory";
            path = "mathematics/group_theory";
            break;
        }
        case "math.ho": {
            mainCategory = "Mathematics";
            subCategory = "History and Overview";
            path = "mathematics/history_and_overview";
            break;
        }
        case "math.it": {
            mainCategory = "Mathematics";
            subCategory = "Information Theory";
            break;
        }
        case "math.kt": {
            mainCategory = "Mathematics";
            subCategory = "K-Theory and Homology";
            path = "mathematics/k-theory_and_homology";
            break;
        }
        case "math.lo": {
            mainCategory = "Mathematics";
            subCategory = "Logic";
            path = "mathematics/logic";
            break;
        }
        case "math.mp": {
            mainCategory = "Mathematics";
            subCategory = "Mathematical Physics";
            break;
        }
        case "math.mg": {
            mainCategory = "Mathematics";
            subCategory = "Metric Geometry";
            path = "mathematics/metric_geometry";
            break;
        }
        case "math.nt": {
            mainCategory = "Mathematics";
            subCategory = "Number Theory";
            path = "mathematics/number_theory";
            break;
        }
        case "math.na": {
            mainCategory = "Mathematics";
            subCategory = "Numerical Analysis";
            path = "mathematics/numerical_analysis";
            break;
        }
        case "math.oa": {
            mainCategory = "Mathematics";
            subCategory = "Operator Algebras";
            path = "mathematics/operator_algebras";
            break;
        }
        case "math.oc": {
            mainCategory = "Mathematics";
            subCategory = "Optimization and Control";
            path = "mathematics/optimization_and_control";
            break;
        }
        case "math.pr": {
            mainCategory = "Mathematics";
            subCategory = "Probability";
            path = "mathematics/probability";
            break;
        }
        case "math.qa": {
            mainCategory = "Mathematics";
            subCategory = "Quantum Algebra";
            path = "mathematics/quantum_algebra";
            break;
        }
        case "math.rt": {
            mainCategory = "Mathematics";
            subCategory = "Representation Theory";
            path = "mathematics/representation_theory";
            break;
        }
        case "math.ra": {
            mainCategory = "Mathematics";
            subCategory = "Rings and Algebras";
            path = "mathematics/rings_and_algebras";
            break;
        }
        case "math.sp": {
            mainCategory = "Mathematics";
            subCategory = "Spectral Theory";
            path = "mathematics/spectral_theory";
            break;
        }
        case "math.st": {
            mainCategory = "Mathematics";
            subCategory = "Statistics Theory";
            path = "mathematics/statistics_theory";
            break;
        }
        case "math.sg": {
            mainCategory = "Mathematics";
            subCategory = "Symplectic Geometry";
        }
        case "cs.ai": {
            mainCategory = "Computer Science";
            subCategory = "Artificial Intelligence";
            path = "computer_science/artificial_intelligence";

            break;
        }
        case "cs.cl": {
            mainCategory = "Computer Science";
            subCategory = "Computation and Language";
            path = "computer_science/computation_and_language";
            break;
        }
        case "cs.cc": {
            mainCategory = "Computer Science";
            subCategory = "Computational Complexity";
            path = "computer_science/computational_complexity";
            break;
        }
        case "cs.ce": {
            mainCategory = "Computer Science";
            subCategory = "Computational Engineering, Finance, and Science";
            path = "computer_science/computational_engineering,_finance,_and_science";
            break;
        }
        case "cs.cg": {
            mainCategory = "Computer Science";
            subCategory = "Computational Geometry";
            path = "computer_science/computational_geometry";
            break;
        }
        case "cs.gt": {
            mainCategory = "Computer Science";
            subCategory = "Computer Science and Game Theory";
            path = "computer_science/computer_science_and_game_theory";
            break;
        }
        case "cs.cv": {
            mainCategory = "Computer Science";
            subCategory = "Computer Vision and Pattern Recognition";
            path = "computer_science/computer_vision_and_pattern_recognition";
            break;
        }
        case "cs.cy": {
            mainCategory = "Computer Science";
            subCategory = "Computers and Society";
            path = "computer_science/computers_and_society";
            break;
        }
        case "cs.cr": {
            mainCategory = "Computer Science";
            subCategory = "Cryptography and Security";
            path = "computer_science/cryptography_and_security";
            break;
        }
        case "cs.ds": {
            mainCategory = "Computer Science";
            subCategory = "Data Structures and Algorithms";
            path = "computer_science/data_structures_and_algorithms";
            break;
        }
        case "cs.db": {
            mainCategory = "Computer Science";
            subCategory = "Databases";
            path = "computer_science/databases";
            break;
        }
        case "cs.dl": {
            mainCategory = "Computer Science";
            subCategory = "Digital Libraries";
            path = "computer_science/digital_libraries";
            break;
        }
        case "cs.dm": {
            mainCategory = "Computer Science";
            subCategory = "Discrete Mathematics";
            path = "computer_science/discrete_mathematics";
            break;
        }
        case "cs.dc": {
            mainCategory = "Computer Science";
            subCategory = "Distributed, Parallel, and Cluster Computing";
            path = "computer_science/distributed_parallel_and_cluster_computing";
            break;
        }
        case "cs.et": {
            mainCategory = "Computer Science";
            subCategory = "Emerging Technologies";
            path = "computer_science/emerging_technologies";
            break;
        }
        case "cs.fl": {
            mainCategory = "Computer Science";
            subCategory = "Formal Languages and Automata Theory";
            path = "computer_science/formal_languages_and_automata_theory";
            break;
        }
        case "cs.gl": {
            mainCategory = "Computer Science";
            subCategory = "General Literature";
            path = "computer_science/general_literature";
            break;
        }
        case "cs.gr": {
            mainCategory = "Computer Science";
            subCategory = "Graphics";
            path = "computer_science/graphics";
            break;
        }
        case "cs.ar": {
            mainCategory = "Computer Science";
            subCategory = "Hardware Architecture";
            path = "computer_science/hardware_architecture";
            break;
        }
        case "cs.hc": {
            mainCategory = "Computer Science";
            subCategory = "Human-Computer Interaction";
            path = "computer_science/human-computer_interaction";
            break;
        }
        case "cs.ir": {
            mainCategory = "Computer Science";
            subCategory = "Information Retrieval";
            path = "computer_science/information_retrieval";
            break;
        }
        case "cs.it": {
            mainCategory = "Computer Science";
            subCategory = "Information Theory";
            path = "computer_science/information_theory";
            break;
        }
        case "cs.lo": {
            mainCategory = "Computer Science";
            subCategory = "Logic in Computer Science";
            path = "computer_science/logic_in_computer_science";
            break;
        }
        case "cs.lg": {
            mainCategory = "Computer Science";
            subCategory = "Machine Learning";
            path = "computer_science/machine_learning";
            break;
        }
        case "cs.ms": {
            mainCategory = "Computer Science";
            subCategory = "Mathematical Software";
            path = "computer_science/mathematical_software";
            break;
        }
        case "cs.ma": {
            mainCategory = "Computer Science";
            subCategory = "Multiagent Systems";
            path = "computer_science/multiagent_systems";
            break;
        }
        case "cs.mm": {
            mainCategory = "Computer Science";
            subCategory = "Multimedia";
            path = "computer_science/multimedia";
            break;
        }
        case "cs.ni": {
            mainCategory = "Computer Science";
            subCategory = "Networking and Internet Architecture";
            path = "computer_science/networking_and_internet_architecture";
            break;
        }
        case "cs.ne": {
            mainCategory = "Computer Science";
            subCategory = "Neural and Evolutionary Computing";
            path = "computer_science/neural_and_evolutionary_computing";
            break;
        }
        case "cs.na": {
            mainCategory = "Computer Science";
            subCategory = "Numerical Analysis";

            break;
        }
        case "cs.os": {
            mainCategory = "Computer Science";
            subCategory = "Operating Systems";
            path = "computer_science/operating_systems";
            break;
        }
        case "cs.oh": {
            mainCategory = "Computer Science";
            subCategory = "Other Computer Science";
            path = "computer_science/other_computer_science";
            break;
        }
        case "cs.pf": {
            mainCategory = "Computer Science";
            subCategory = "Performance";
            path = "computer_science/performance";
            break;
        }
        case "cs.pl": {
            mainCategory = "Computer Science";
            subCategory = "Programming Languages";
            path = "computer_science/programming_languages";
            break;
        }
        case "cs.ro": {
            mainCategory = "Computer Science";
            subCategory = "Robotics";
            path = "computer_science/robotics";
            break;
        }
        case "cs.si": {
            mainCategory = "Computer Science";
            subCategory = "Social and Information Networks";
            path = "computer_science/social_and_information_networks";
            break;
        }
        case "cs.se": {
            mainCategory = "Computer Science";
            subCategory = "Software Engineering";
            path = "computer_science/software_engineering";
            break;
        }
        case "cs.sd": {
            mainCategory = "Computer Science";
            subCategory = "Sound";
            path = "computer_science/sound";
            break;
        }
        case "cs.sc": {
            mainCategory = "Computer Science";
            subCategory = "Symbolic Computation";
            path = "computer_science/symbolic_computation";
            break;
        }
        case "cs.sy": {
            mainCategory = "Computer Science";
            subCategory = "Systems and Control";
            break;
        }
        case "q-bio.bm": {
            mainCategory = "Quantitative Biology";
            subCategory = "Biomolecules";
            path = "quantitative_biology/biomolecules";
            break;
        }
        case "q-bio.cb": {
            mainCategory = "Quantitative Biology";
            subCategory = "Cell Behavior";
            path = "quantitative_biology/cell_behavior";
            break;
        }
        case "q-bio.gn": {
            mainCategory = "Quantitative Biology";
            subCategory = "Genomics";
            path = "quantitative_biology/genomics";
            break;
        }
        case "q-bio.mn": {
            mainCategory = "Quantitative Biology";
            subCategory = "Molecular Networks";
            path = "quantitative_biology/molecular_networks";
            break;
        }
        case "q-bio.nc": {
            mainCategory = "Quantitative Biology";
            subCategory = "Neurons and Cognition";
            path = "quantitative_biology/neurons_and_cognition";
            break;
        }
        case "q-bio.ot": {
            mainCategory = "Quantitative Biology";
            subCategory = "Other Quantitative Biology";
            path = "quantitative_biology/other_quantitative_biology";
            break;
        }
        case "q-bio.pe": {
            mainCategory = "Quantitative Biology";
            subCategory = "Populations and Evolution";
            path = "quantitative_biology/populations_and_evolution";
            break;
        }
        case "q-bio.qm": {
            mainCategory = "Quantitative Biology";
            subCategory = "Quantitative Methods";
            path = "quantitative_biology/quantitative_methods";
            break;
        }
        case "q-bio.sc": {
            mainCategory = "Quantitative Biology";
            subCategory = "Subcellular Processes";
            path = "quantitative_biology/subcellular_processes";
            break;
        }
        case "q-bio.to": {
            mainCategory = "Quantitative Biology";
            subCategory = "Tissues and Organs";
            path = "quantitative_biology/tissues_and_organs";
            break;
        }
        case "q-fin.cp": {
            mainCategory = "Quantitative Finance";
            subCategory = "Computational Finance";
            path = "quantitative_finance/computational_finance";
            break;
        }
        case "q-fin.ec": {
            mainCategory = "Quantitative Finance";
            subCategory = "Economics";
            break;
        }
        case "q-fin.gn": {
            mainCategory = "Quantitative Finance";
            subCategory = "General Finance";
            path = "quantitative_finance/general_finance";
            break;
        }
        case "q-fin.mf": {
            mainCategory = "Quantitative Finance";
            subCategory = "Mathematical Finance";
            path = "quantitative_finance/mathematical_finance";
            break;
        }
        case "q-fin.pm": {
            mainCategory = "Quantitative Finance";
            subCategory = "Portfolio Management";
            path = "quantitative_finance/portfolio_management";
            break;
        }
        case "q-fin.pr": {
            mainCategory = "Quantitative Finance";
            subCategory = "Pricing of Securities";
            path = "quantitative_finance/pricing_of_securities";
            break;
        }
        case "q-fin.rm": {
            mainCategory = "Quantitative Finance";
            subCategory = "Risk Management";
            path = "quantitative_finance/risk_management";
            break;
        }
        case "q-fin.st": {
            mainCategory = "Quantitative Finance";
            subCategory = "Statistical Finance";
            path = "quantitative_finance/statistical_finance";
            break;
        }
        case "q-fin.tr": {
            mainCategory = "Quantitative Finance";
            subCategory = "Trading and Market Microstructure";
            path = "quantitative_finance/trading_and_market_microstructure";
            break;
        }
        case "stat.ap": {
            mainCategory = "Statistics";
            subCategory = "Applications";
            path = "statistics/applications";
            break;
        }
        case "stat.co": {
            mainCategory = "Statistics";
            subCategory = "Computation";
            path = "statistics/computation";
            break;
        }
        case "stat.ml": {
            mainCategory = "Statistics";
            subCategory = "Machine Learning";
            path = "statistics/machine_learning";
            break;
        }
        case "stat.me": {
            mainCategory = "Statistics";
            subCategory = "Methodology";
            path = "statistics/methodology";
            break;
        }
        case "stat.ot": {
            mainCategory = "Statistics";
            subCategory = "Other Statistics";
            path = "statistics/other_statistics";
            break;
        }
        case "stat.th": {
            mainCategory = "Statistics";
            subCategory = "Statistics Theory";
            break;
        }
        case "eess.as": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Audio and Speech Processing";
            path = "electrical_engineering_and_systems_science/audio_and_speech_processing"

            break;
        }
        case "eess.iv": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Image and Video Processing";
            path = "electrical_engineering_and_systems_science/image_and_video_processing"
            break;
        }
        case "eess.sp": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Signal Processing";
            path = "electrical_engineering_and_systems_science/signal_processing"
            break;
        }
        case "eess.sy": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Systems and Control";
            path = "electrical_engineering_and_systems_science/systems_and_control"
            break;
        }
        case "econ.em": {
            mainCategory = "Economics";
            subCategory = "Econometrics";
            path = "economics/econometrics";
            break;
        }
        case "econ.gn": {
            mainCategory = "Economics";
            subCategory = "General Economics";
            path = "economics/general_economics";
            break;
        }
        case "econ.th": {
            mainCategory = "Economics";
            subCategory = "Theoretical Economics";
            path = "economics/theoretical_economics";
            break;
        }
        default: {
            mainCategory = "Other";
            subCategory = "Other";
            break;
        }
    }
    return { mainCategory, subCategory, path };
}

export function from_path(path: string): { mainCategory: string, subCategory: string } {
    let mainCategory: string;
    let subCategory: string;

    switch (path) {
        case "astrophysics/astrophysics_of_galaxies": {
            mainCategory = "Astrophysics";
            subCategory = "Astrophysics of Galaxies";
            break;
        };
        case "astrophysics/cosmology_and_nongalactic_astrophysics": {
            mainCategory = "Astrophysics";
            subCategory = "Cosmology and Nongalactic Astrophysics";
            break;
        }
        case "astrophysics/earth_and_planetary_astrophysics": {
            mainCategory = "Astrophysics";
            subCategory = "Earth and Planetary Astrophysics";
            break;
        }
        case "astrophysics/high_energy_astrophysical_phenomena": {
            mainCategory = "Astrophysics";
            subCategory = "High Energy Astrophysical Phenomena";
            break;
        }
        case "astrophysics/instrumentation_and_methods_for_astrophysics": {
            mainCategory = "Astrophysics";
            subCategory = "Instrumentation and Methods for Astrophysics";
            break;
        }
        case "astrophysics/solar_and_stellar_astrophysics": {
            mainCategory = "Astrophysics";
            subCategory = "Solar and Stellar Astrophysics";
            break;
        }
        case "condensed_matter/disordered_systems_and_neural_networks": {
            mainCategory = "Condensed Matter";
            subCategory = "Disordered Systems and Neural Networks";
            break;
        }
        case "condensed_matter/materials_science": {
            mainCategory = "Condensed Matter";
            subCategory = "Materials Science";
            break;
        }
        case "condensed_matter/mesoscale_and_nanoscale_physics": {
            mainCategory = "Condensed Matter";
            subCategory = "Mesoscale and Nanoscale Physics";
            break;
        }
        case "condensed_matter/other_condensed_matter": {
            mainCategory = "Condensed Matter";
            subCategory = "Other Condensed Matter";
            break;
        }
        case "condensed_matter/quantum_gases": {
            mainCategory = "Condensed Matter";
            subCategory = "Quantum Gases";
            break;
        }
        case "condensed_matter/soft_condensed_matter": {
            mainCategory = "Condensed Matter";
            subCategory = "Soft Condensed Matter";
            break;
        }
        case "condensed_matter/statistical_mechanics": {
            mainCategory = "Condensed Matter";
            subCategory = "Statistical Mechanics";
            break;
        }
        case "condensed_matter/strongly_correlated_electrons": {
            mainCategory = "Condensed Matter";
            subCategory = "Strongly Correlated Electrons";
            break;
        }
        case "condensed_matter/superconductivity": {
            mainCategory = "Condensed Matter";
            subCategory = "Superconductivity";
            break;
        }
        case "physics/general_relativity_and_quantum_cosmology": {
            mainCategory = "Physics";
            subCategory = "General Relativity and Quantum Cosmology";
            break;
        }
        case "physics/high_energy_physics_-_experiment": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Experiment";
            break;
        }
        case "physics/high_energy_physics_-_lattice": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Lattice";
            break;
        }
        case "physics/high_energy_physics_-_phenomenology": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Phenomenology";
            break;
        }
        case "physics/high_energy_physics_-_theory": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Theory";
            break;
        }
        case "physics/mathematical_physics": {
            mainCategory = "Physics";
            subCategory = "Mathematical Physics";
            break;
        }
        case "nonlinear_sciences/adaptation_and_self-organizing_systems": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Adaptation and Self-Organizing Systems";
            break;
        }
        case "nonlinear_sciences/cellular_automata_and_lattice_gases": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Cellular Automata and Lattice Gases";
            break;
        }
        case "nonlinear_sciences/chaotic_dynamics": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Chaotic Dynamics";
            break;
        }
        case "nonlinear_sciences/exactly_solvable_and_integrable_systems": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Exactly Solvable and Integrable Systems";
            break;
        }
        case "nonlinear_sciences/pattern_formation_and_solitons": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Pattern Formation and Solitons";
            break;
        }
        case "physics/nuclear_experiment": {
            mainCategory = "Physics";
            subCategory = "Nuclear Experiment";
            break;
        }
        case "physics/nuclear_theory": {
            mainCategory = "Physics";
            subCategory = "Nuclear Theory";
            break;
        }
        case "physics/accelerator_physics": {
            mainCategory = "Physics";
            subCategory = "Accelerator Physics";
            break;
        }
        case "physics/applied_physics": {
            mainCategory = "Physics";
            subCategory = "Applied Physics";
            break;
        }
        case "physics/atmospheric_and_oceanic_physics": {
            mainCategory = "Physics";
            subCategory = "Atmospheric and Oceanic Physics";
            break;
        }
        case "physics/atomic_and_molecular_clusters": {
            mainCategory = "Physics";
            subCategory = "Atomic and Molecular Clusters";
            break;
        }
        case "physics/atomic_physics": {
            mainCategory = "Physics";
            subCategory = "Atomic Physics";
            break;
        }
        case "physics/biological_physics": {
            mainCategory = "Physics";
            subCategory = "Biological Physics";
            break;
        }
        case "physics/chemical_physics": {
            mainCategory = "Physics";
            subCategory = "Chemical Physics";
            break;
        }
        case "physics/classical_physics": {
            mainCategory = "Physics";
            subCategory = "Classical Physics";
            break;
        }
        case "physics/computational_physics": {
            mainCategory = "Physics";
            subCategory = "Computational Physics";
            break;
        }
        case "physics/data_analysis,_statistics_and_probability": {
            mainCategory = "Physics";
            subCategory = "Data Analysis, Statistics and Probability";
            break;
        }
        case "physics/fluid_dynamics": {
            mainCategory = "Physics";
            subCategory = "Fluid Dynamics";
            break;
        }
        case "physics/general_physics": {
            mainCategory = "Physics";
            subCategory = "General Physics";
            break;
        }
        case "physics/geophysics": {
            mainCategory = "Physics";
            subCategory = "Geophysics";
            break;
        }
        case "physics/history_and_philosophy_of_physics": {
            mainCategory = "Physics";
            subCategory = "History and Philosophy of Physics";
            break;
        }
        case "physics/instrumentation_and_detectors": {
            mainCategory = "Physics";
            subCategory = "Instrumentation and Detectors";
            break;
        }
        case "physics/medical_physics": {
            mainCategory = "Physics";
            subCategory = "Medical Physics";
            break;
        }
        case "physics/optics": {
            mainCategory = "Physics";
            subCategory = "Optics";
            break;
        }
        case "physics/physics_and_society": {
            mainCategory = "Physics";
            subCategory = "Physics and Society";
            break;
        }
        case "physics/physics_education": {
            mainCategory = "Physics";
            subCategory = "Physics Education";
            break;
        }
        case "physics/plasma_physics": {
            mainCategory = "Physics";
            subCategory = "Plasma Physics";
            break;
        }
        case "physics/popular_physics": {
            mainCategory = "Physics";
            subCategory = "Popular Physics";
            break;
        }
        case "physics/space_physics": {
            mainCategory = "Physics";
            subCategory = "Space Physics";
            break;
        }
        case "physics/quantum_physics": {
            mainCategory = "Physics";
            subCategory = "Quantum Physics";
            break;
        }
        case "mathematics/algebraic_geometry": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Geometry";
            break;
        }
        case "mathematics/algebraic_topology": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Topology";
            break;
        }
        case "mathematics/analysis_of_pdes": {
            mainCategory = "Mathematics";
            subCategory = "Analysis of PDEs";
            break;
        }
        case "mathematics/category_theory": {
            mainCategory = "Mathematics";
            subCategory = "Category Theory";
            break;
        }
        case "mathematics/classical_analysis_and_odes": {
            mainCategory = "Mathematics";
            subCategory = "Classical Analysis and ODEs";
            break;
        }
        case "mathematics/combinatorics": {
            mainCategory = "Mathematics";
            subCategory = "Combinatorics";
            break;
        }
        case "mathematics/commutative_algebra": {
            mainCategory = "Mathematics";
            subCategory = "Commutative Algebra";
            break;
        }
        case "mathematics/complex_variables": {
            mainCategory = "Mathematics";
            subCategory = "Complex Variables";
            break;
        }
        case "mathematics/differential_geometry": {
            mainCategory = "Mathematics";
            subCategory = "Differential Geometry";
            break;
        }
        case "mathematics/dynamical_systems": {
            mainCategory = "Mathematics";
            subCategory = "Dynamical Systems";
            break;
        }
        case "mathematics/functional_analysis": {
            mainCategory = "Mathematics";
            subCategory = "Functional Analysis";
            break;
        }
        case "mathematics/general_mathematics": {
            mainCategory = "Mathematics";
            subCategory = "General Mathematics";
            break;
        }
        case "mathematics/general_topology": {
            mainCategory = "Mathematics";
            subCategory = "General Topology";
            break;
        }
        case "mathematics/geometric_topology": {
            mainCategory = "Mathematics";
            subCategory = "Geometric Topology";
            break;
        }
        case "mathematics/group_theory": {
            mainCategory = "Mathematics";
            subCategory = "Group Theory";
            break;
        }
        case "mathematics/history_and_overview": {
            mainCategory = "Mathematics";
            subCategory = "History and Overview";
            break;
        }
        case "math.it": {
            mainCategory = "Mathematics";
            subCategory = "Information Theory";
            break;
        }
        case "mathematics/k-theory_and_homology": {
            mainCategory = "Mathematics";
            subCategory = "K-Theory and Homology";
            break;
        }
        case "mathematics/logic": {
            mainCategory = "Mathematics";
            subCategory = "Logic";
            break;
        }
        case "math.mp": {
            mainCategory = "Mathematics";
            subCategory = "Mathematical Physics";
            break;
        }
        case "mathematics/metric_geometry": {
            mainCategory = "Mathematics";
            subCategory = "Metric Geometry";
            break;
        }
        case "mathematics/number_theory": {
            mainCategory = "Mathematics";
            subCategory = "Number Theory";
            break;
        }
        case "mathematics/numerical_analysis": {
            mainCategory = "Mathematics";
            subCategory = "Numerical Analysis";
            break;
        }
        case "mathematics/operator_algebras": {
            mainCategory = "Mathematics";
            subCategory = "Operator Algebras";
            break;
        }
        case "mathematics/optimization_and_control": {
            mainCategory = "Mathematics";
            subCategory = "Optimization and Control";
            break;
        }
        case "mathematics/probability": {
            mainCategory = "Mathematics";
            subCategory = "Probability";
            break;
        }
        case "mathematics/quantum_algebra": {
            mainCategory = "Mathematics";
            subCategory = "Quantum Algebra";
            break;
        }
        case "mathematics/representation_theory": {
            mainCategory = "Mathematics";
            subCategory = "Representation Theory";
            break;
        }
        case "mathematics/rings_and_algebras": {
            mainCategory = "Mathematics";
            subCategory = "Rings and Algebras";
            break;
        }
        case "mathematics/spectral_theory": {
            mainCategory = "Mathematics";
            subCategory = "Spectral Theory";
            break;
        }
        case "mathematics/statistics_theory": {
            mainCategory = "Mathematics";
            subCategory = "Statistics Theory";
            break;
        }
        case "math.sg": {
            mainCategory = "Mathematics";
            subCategory = "Symplectic Geometry";
        }
        case "computer_science/artificial_intelligence": {
            mainCategory = "Computer Science";
            subCategory = "Artificial Intelligence";
            break;
        }
        case "computer_science/computation_and_language": {
            mainCategory = "Computer Science";
            subCategory = "Computation and Language";
            break;
        }
        case "computer_science/computational_complexity": {
            mainCategory = "Computer Science";
            subCategory = "Computational Complexity";
            break;
        }
        case "computer_science/computational_engineering,_finance,_and_science": {
            mainCategory = "Computer Science";
            subCategory = "Computational Engineering, Finance, and Science";
            break;
        }
        case "computer_science/computational_geometry": {
            mainCategory = "Computer Science";
            subCategory = "Computational Geometry";
            break;
        }
        case "computer_science/computer_science_and_game_theory": {
            mainCategory = "Computer Science";
            subCategory = "Computer Science and Game Theory";
            break;
        }
        case "computer_science/computer_vision_and_pattern_recognition": {
            mainCategory = "Computer Science";
            subCategory = "Computer Vision and Pattern Recognition";
            break;
        }
        case "computer_science/computers_and_society": {
            mainCategory = "Computer Science";
            subCategory = "Computers and Society";
            break;
        }
        case "computer_science/cryptography_and_security": {
            mainCategory = "Computer Science";
            subCategory = "Cryptography and Security";
            break;
        }
        case "computer_science/data_structures_and_algorithms": {
            mainCategory = "Computer Science";
            subCategory = "Data Structures and Algorithms";
            break;
        }
        case "computer_science/databases": {
            mainCategory = "Computer Science";
            subCategory = "Databases";
            break;
        }
        case "computer_science/digital_libraries": {
            mainCategory = "Computer Science";
            subCategory = "Digital Libraries";
            break;
        }
        case "computer_science/discrete_mathematics": {
            mainCategory = "Computer Science";
            subCategory = "Discrete Mathematics";
            break;
        }
        case "computer_science/distributed_parallel_and_cluster_computing": {
            mainCategory = "Computer Science";
            subCategory = "Distributed, Parallel, and Cluster Computing";
            break;
        }
        case "computer_science/emerging_technologies": {
            mainCategory = "Computer Science";
            subCategory = "Emerging Technologies";
            break;
        }
        case "computer_science/formal_languages_and_automata_theory": {
            mainCategory = "Computer Science";
            subCategory = "Formal Languages and Automata Theory";
            break;
        }
        case "computer_science/general_literature": {
            mainCategory = "Computer Science";
            subCategory = "General Literature";
            break;
        }
        case "computer_science/graphics": {
            mainCategory = "Computer Science";
            subCategory = "Graphics";
            break;
        }
        case "computer_science/hardware_architecture": {
            mainCategory = "Computer Science";
            subCategory = "Hardware Architecture";
            break;
        }
        case "computer_science/human-computer_interaction": {
            mainCategory = "Computer Science";
            subCategory = "Human-Computer Interaction";
            break;
        }
        case "computer_science/information_retrieval": {
            mainCategory = "Computer Science";
            subCategory = "Information Retrieval";
            break;
        }
        case "computer_science/information_theory": {
            mainCategory = "Computer Science";
            subCategory = "Information Theory";
            break;
        }
        case "computer_science/logic_in_computer_science": {
            mainCategory = "Computer Science";
            subCategory = "Logic in Computer Science";
            break;
        }
        case "computer_science/machine_learning": {
            mainCategory = "Computer Science";
            subCategory = "Machine Learning";
            break;
        }
        case "computer_science/mathematical_software": {
            mainCategory = "Computer Science";
            subCategory = "Mathematical Software";
            break;
        }
        case "computer_science/multiagent_systems": {
            mainCategory = "Computer Science";
            subCategory = "Multiagent Systems";
            break;
        }
        case "computer_science/multimedia": {
            mainCategory = "Computer Science";
            subCategory = "Multimedia";
            break;
        }
        case "computer_science/networking_and_internet_architecture": {
            mainCategory = "Computer Science";
            subCategory = "Networking and Internet Architecture";
            break;
        }
        case "computer_science/neural_and_evolutionary_computing": {
            mainCategory = "Computer Science";
            subCategory = "Neural and Evolutionary Computing";
            break;
        }
        case "computer_science/operating_systems": {
            mainCategory = "Computer Science";
            subCategory = "Operating Systems";
            break;
        }
        case "computer_science/other_computer_science": {
            mainCategory = "Computer Science";
            subCategory = "Other Computer Science";
            break;
        }
        case "computer_science/performance": {
            mainCategory = "Computer Science";
            subCategory = "Performance";
            break;
        }
        case "computer_science/programming_languages": {
            mainCategory = "Computer Science";
            subCategory = "Programming Languages";
            break;
        }
        case "computer_science/robotics": {
            mainCategory = "Computer Science";
            subCategory = "Robotics";
            break;
        }
        case "computer_science/social_and_information_networks": {
            mainCategory = "Computer Science";
            subCategory = "Social and Information Networks";
            break;
        }
        case "computer_science/software_engineering": {
            mainCategory = "Computer Science";
            subCategory = "Software Engineering";
            break;
        }
        case "computer_science/sound": {
            mainCategory = "Computer Science";
            subCategory = "Sound";
            break;
        }
        case "computer_science/symbolic_computation": {
            mainCategory = "Computer Science";
            subCategory = "Symbolic Computation";
            break;
        }
        case "quantitative_biology/biomolecules": {
            mainCategory = "Quantitative Biology";
            subCategory = "Biomolecules";
            break;
        }
        case "quantitative_biology/cell_behavior": {
            mainCategory = "Quantitative Biology";
            subCategory = "Cell Behavior";
            break;
        }
        case "quantitative_biology/genomics": {
            mainCategory = "Quantitative Biology";
            subCategory = "Genomics";
            break;
        }
        case "quantitative_biology/molecular_networks": {
            mainCategory = "Quantitative Biology";
            subCategory = "Molecular Networks";
            break;
        }
        case "quantitative_biology/neurons_and_cognition": {
            mainCategory = "Quantitative Biology";
            subCategory = "Neurons and Cognition";
            break;
        }
        case "quantitative_biology/other_quantitative_biology": {
            mainCategory = "Quantitative Biology";
            subCategory = "Other Quantitative Biology";
            break;
        }
        case "quantitative_biology/populations_and_evolution": {
            mainCategory = "Quantitative Biology";
            subCategory = "Populations and Evolution";
            break;
        }
        case "quantitative_biology/quantitative_methods": {
            mainCategory = "Quantitative Biology";
            subCategory = "Quantitative Methods";
            break;
        }
        case "quantitative_biology/subcellular_processes": {
            mainCategory = "Quantitative Biology";
            subCategory = "Subcellular Processes";
            break;
        }
        case "quantitative_biology/tissues_and_organs": {
            mainCategory = "Quantitative Biology";
            subCategory = "Tissues and Organs";
            break;
        }
        case "quantitative_finance/computational_finance": {
            mainCategory = "Quantitative Finance";
            subCategory = "Computational Finance";
            break;
        }
        case "quantitative_finance/general_finance": {
            mainCategory = "Quantitative Finance";
            subCategory = "General Finance";
            break;
        }
        case "quantitative_finance/mathematical_finance": {
            mainCategory = "Quantitative Finance";
            subCategory = "Mathematical Finance";
            break;
        }
        case "quantitative_finance/portfolio_management": {
            mainCategory = "Quantitative Finance";
            subCategory = "Portfolio Management";
            break;
        }
        case "quantitative_finance/pricing_of_securities": {
            mainCategory = "Quantitative Finance";
            subCategory = "Pricing of Securities";
            break;
        }
        case "quantitative_finance/risk_management": {
            mainCategory = "Quantitative Finance";
            subCategory = "Risk Management";
            break;
        }
        case "quantitative_finance/statistical_finance": {
            mainCategory = "Quantitative Finance";
            subCategory = "Statistical Finance";
            break;
        }
        case "quantitative_finance/trading_and_market_microstructure": {
            mainCategory = "Quantitative Finance";
            subCategory = "Trading and Market Microstructure";
            break;
        }
        case "statistics/applications": {
            mainCategory = "Statistics";
            subCategory = "Applications";
            break;
        }
        case "statistics/computation": {
            mainCategory = "Statistics";
            subCategory = "Computation";
            break;
        }
        case "statistics/machine_learning": {
            mainCategory = "Statistics";
            subCategory = "Machine Learning";
            break;
        }
        case "statistics/methodology": {
            mainCategory = "Statistics";
            subCategory = "Methodology";
            break;
        }
        case "statistics/other_statistics": {
            mainCategory = "Statistics";
            subCategory = "Other Statistics";
            break;
        }
        case "eess.as": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Audio and Speech Processing";
            path = "electrical_engineering_and_systems_science/audio_and_speech_processing"
            break;
        }
        case "eess.iv": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Image and Video Processing";
            path = "electrical_engineering_and_systems_science/image_and_video_processing"
            break;
        }
        case "eess.sp": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Signal Processing";
            path = "electrical_engineering_and_systems_science/signal_processing"
            break;
        }
        case "eess.sy": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Systems and Control";
            path = "electrical_engineering_and_systems_science/systems_and_control"
            break;
        }
        case "economics/econometrics": {
            mainCategory = "Economics";
            subCategory = "Econometrics";
            break;
        }
        case "economics/general_economics": {
            mainCategory = "Economics";
            subCategory = "General Economics";
            break;
        }
        case "economics/theoretical_economics": {
            mainCategory = "Economics";
            subCategory = "Theoretical Economics";
            break;
        }
        default: {
            mainCategory = "Other";
            subCategory = "Other";
            break;
        }
    }

        // case "stat.th": {
        //     mainCategory = "Statistics";
        //     subCategory = "Statistics Theory";
        //     break;
        // }
    //
        // case "cs.sy": {
        //     mainCategory = "Computer Science";
        //     subCategory = "Systems and Control";
        //     break;
        // }
    //
        // case "cs.na": {
        //     mainCategory = "Computer Science";
        //     subCategory = "Numerical Analysis";
        //     break;
        // }
    //
        // case "q-fin.ec": {
        //     mainCategory = "Quantitative Finance";
        //     subCategory = "Economics";
        //     break;
        // }
    return { mainCategory, subCategory };
}

export function parseCategory(category: string): { mainCategory: string, subCategory: string } {
    const categoryLower = category.toLowerCase();
    let mainCategory: string;
    let subCategory: string;
    switch (categoryLower) {
        case "astro-ph.ga": {
            mainCategory = "Astrophysics";
            subCategory = "Astrophysics of Galaxies";
            break;
        };
        case "astro-ph.co": {
            mainCategory = "Astrophysics";
            subCategory = "Cosmology and Nongalactic Astrophysics";
            break;
        }
        case "astro-ph.ep": {
            mainCategory = "Astrophysics";
            subCategory = "Earth and Planetary Astrophysics";
            break;
        }
        case "astro-ph.he": {
            mainCategory = "Astrophysics";
            subCategory = "High Energy Astrophysical Phenomena";
            break;
        }
        case "astro-ph.im": {
            mainCategory = "Astrophysics";
            subCategory = "Instrumentation and Methods for Astrophysics";
            break;
        }
        case "astro-ph.sr": {
            mainCategory = "Astrophysics";
            subCategory = "Solar and Stellar Astrophysics";
            break;
        }
        case "cond-mat.dis-nn": {
            mainCategory = "Condensed Matter";
            subCategory = "Disordered Systems and Neural Networks";
            break;
        }
        case "cond-mat.mtrl-sci": {
            mainCategory = "Condensed Matter";
            subCategory = "Materials Science";
            break;
        }
        case "cond-mat.mes-hall": {
            mainCategory = "Condensed Matter";
            subCategory = "Mesoscale and Nanoscale Physics";
            break;
        }
        case "cond-mat.other": {
            mainCategory = "Condensed Matter";
            subCategory = "Other Condensed Matter";
            break;
        }
        case "cond-mat.quant-gas": {
            mainCategory = "Condensed Matter";
            subCategory = "Quantum Gases";
            break;
        }
        case "cond-mat.soft": {
            mainCategory = "Condensed Matter";
            subCategory = "Soft Condensed Matter";
            break;
        }
        case "cond-mat.stat-mech": {
            mainCategory = "Condensed Matter";
            subCategory = "Statistical Mechanics";
            break;
        }
        case "cond-mat.str-el": {
            mainCategory = "Condensed Matter";
            subCategory = "Strongly Correlated Electrons";
            break;
        }
        case "cond-mat.supr-con": {
            mainCategory = "Condensed Matter";
            subCategory = "Superconductivity";
            break;
        }
        case "gr-qc": {
            mainCategory = "Physics";
            subCategory = "General Relativity and Quantum Cosmology";
            break;
        }
        case "hep-ex": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Experiment";
            break;
        }
        case "hep-lat": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Lattice";
            break;
        }
        case "hep-ph": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Phenomenology";
            break;
        }
        case "hep-th": {
            mainCategory = "Physics";
            subCategory = "High Energy Physics - Theory";
            break;
        }
        case "math-ph": {
            mainCategory = "Physics";
            subCategory = "Mathematical Physics";
            break;
        }
        case "nlin.ao": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Adaptation and Self-Organizing Systems";
            break;
        }
        case "nlin.cg": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Cellular Automata and Lattice Gases";
            break;
        }
        case "nlin.cd": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Chaotic Dynamics";
            break;
        }
        case "nlin.si": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Exactly Solvable and Integrable Systems";
            break;
        }
        case "nlin.ps": {
            mainCategory = "Nonlinear Sciences";
            subCategory = "Pattern Formation and Solitons";
            break;
        }
        case "nucl-ex": {
            mainCategory = "Physics";
            subCategory = "Nuclear Experiment";
            break;
        }
        case "nucl-th": {
            mainCategory = "Physics";
            subCategory = "Nuclear Theory";
            break;
        }
        case "physics.acc-ph": {
            mainCategory = "Physics";
            subCategory = "Accelerator Physics";
            break;
        }
        case "physics.app-ph": {
            mainCategory = "Physics";
            subCategory = "Applied Physics";
            break;
        }
        case "physics.ao-ph": {
            mainCategory = "Physics";
            subCategory = "Atmospheric and Oceanic Physics";
            break;
        }
        case "physics.atm-clus": {
            mainCategory = "Physics";
            subCategory = "Atomic and Molecular Clusters";
            break;
        }
        case "physics.atom-ph": {
            mainCategory = "Physics";
            subCategory = "Atomic Physics";
            break;
        }
        case "physics.bio-ph": {
            mainCategory = "Physics";
            subCategory = "Biological Physics";
            break;
        }
        case "physics.chem-ph": {
            mainCategory = "Physics";
            subCategory = "Chemical Physics";
            break;
        }
        case "physics.class-ph": {
            mainCategory = "Physics";
            subCategory = "Classical Physics";
            break;
        }
        case "physics.comp-ph": {
            mainCategory = "Physics";
            subCategory = "Computational Physics";
            break;
        }
        case "physics.data-an": {
            mainCategory = "Physics";
            subCategory = "Data Analysis, Statistics and Probability";
            break;
        }
        case "physics.flu-dyn": {
            mainCategory = "Physics";
            subCategory = "Fluid Dynamics";
            break;
        }
        case "physics.gen-ph": {
            mainCategory = "Physics";
            subCategory = "General Physics";
            break;
        }
        case "physics.geo-ph": {
            mainCategory = "Physics";
            subCategory = "Geophysics";
            break;
        }
        case "physics.hist-ph": {
            mainCategory = "Physics";
            subCategory = "History and Philosophy of Physics";
            break;
        }
        case "physics.ins-det": {
            mainCategory = "Physics";
            subCategory = "Instrumentation and Detectors";
            break;
        }
        case "physics.med-ph": {
            mainCategory = "Physics";
            subCategory = "Medical Physics";
            break;
        }
        case "physics.optics": {
            mainCategory = "Physics";
            subCategory = "Optics";
            break;
        }
        case "physics.soc-ph": {
            mainCategory = "Physics";
            subCategory = "Physics and Society";
            break;
        }
        case "physics.ed-ph": {
            mainCategory = "Physics";
            subCategory = "Physics Education";
            break;
        }
        case "physics.plasm-ph": {
            mainCategory = "Physics";
            subCategory = "Plasma Physics";
            break;
        }
        case "physics.pop-ph": {
            mainCategory = "Physics";
            subCategory = "Popular Physics";
            break;
        }
        case "physics.space-ph": {
            mainCategory = "Physics";
            subCategory = "Space Physics";
            break;
        }
        case "quant-ph": {
            mainCategory = "Physics";
            subCategory = "Quantum Physics";
            break;
        }
        case "math.ag": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Geometry";
            break;
        }
        case "math.at": {
            mainCategory = "Mathematics";
            subCategory = "Algebraic Topology";
            break;
        }
        case "math.ap": {
            mainCategory = "Mathematics";
            subCategory = "Analysis of PDEs";
            break;
        }
        case "math.ct": {
            mainCategory = "Mathematics";
            subCategory = "Category Theory";
            break;
        }
        case "math.ca": {
            mainCategory = "Mathematics";
            subCategory = "Classical Analysis and ODEs";
            break;
        }
        case "math.co": {
            mainCategory = "Mathematics";
            subCategory = "Combinatorics";
            break;
        }
        case "math.ac": {
            mainCategory = "Mathematics";
            subCategory = "Commutative Algebra";
            break;
        }
        case "math.cv": {
            mainCategory = "Mathematics";
            subCategory = "Complex Variables";
            break;
        }
        case "math.dg": {
            mainCategory = "Mathematics";
            subCategory = "Differential Geometry";
            break;
        }
        case "math.ds": {
            mainCategory = "Mathematics";
            subCategory = "Dynamical Systems";
            break;
        }
        case "math.fa": {
            mainCategory = "Mathematics";
            subCategory = "Functional Analysis";
            break;
        }
        case "math.gm": {
            mainCategory = "Mathematics";
            subCategory = "General Mathematics";
            break;
        }
        case "math.gn": {
            mainCategory = "Mathematics";
            subCategory = "General Topology";
            break;
        }
        case "math.gt": {
            mainCategory = "Mathematics";
            subCategory = "Geometric Topology";
            break;
        }
        case "math.gr": {
            mainCategory = "Mathematics";
            subCategory = "Group Theory";
            break;
        }
        case "math.ho": {
            mainCategory = "Mathematics";
            subCategory = "History and Overview";
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
            break;
        }
        case "math.lo": {
            mainCategory = "Mathematics";
            subCategory = "Logic";
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
            break;
        }
        case "math.nt": {
            mainCategory = "Mathematics";
            subCategory = "Number Theory";
            break;
        }
        case "math.na": {
            mainCategory = "Mathematics";
            subCategory = "Numerical Analysis";
            break;
        }
        case "math.oa": {
            mainCategory = "Mathematics";
            subCategory = "Operator Algebras";
            break;
        }
        case "math.oc": {
            mainCategory = "Mathematics";
            subCategory = "Optimization and Control";
            break;
        }
        case "math.pr": {
            mainCategory = "Mathematics";
            subCategory = "Probability";
            break;
        }
        case "math.qa": {
            mainCategory = "Mathematics";
            subCategory = "Quantum Algebra";
            break;
        }
        case "math.rt": {
            mainCategory = "Mathematics";
            subCategory = "Representation Theory";
            break;
        }
        case "math.ra": {
            mainCategory = "Mathematics";
            subCategory = "Rings and Algebras";
            break;
        }
        case "math.sp": {
            mainCategory = "Mathematics";
            subCategory = "Spectral Theory";
            break;
        }
        case "math.st": {
            mainCategory = "Mathematics";
            subCategory = "Statistics Theory";
            break;
        }
        case "math.sg": {
            mainCategory = "Mathematics";
            subCategory = "Symplectic Geometry";
        }
        case "cs.ai": {
            mainCategory = "Computing Research Repository";
            subCategory = "Artificial Intelligence";
            break;
        }
        case "cs.cl": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computation and Language";
            break;
        }
        case "cs.cc": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computational Complexity";
            break;
        }
        case "cs.ce": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computational Engineering, Finance, and Science";
            break;
        }
        case "cs.cg": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computational Geometry";
            break;
        }
        case "cs.gt": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computer Science and Game Theory";
            break;
        }
        case "cs.cv": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computer Vision and Pattern Recognition";
            break;
        }
        case "cs.cy": {
            mainCategory = "Computing Research Repository";
            subCategory = "Computers and Society";
            break;
        }
        case "cs.cr": {
            mainCategory = "Computing Research Repository";
            subCategory = "Cryptography and Security";
            break;
        }
        case "cs.ds": {
            mainCategory = "Computing Research Repository";
            subCategory = "Data Structures and Algorithms";
            break;
        }
        case "cs.db": {
            mainCategory = "Computing Research Repository";
            subCategory = "Databases";
            break;
        }
        case "cs.dl": {
            mainCategory = "Computing Research Repository";
            subCategory = "Digital Libraries";
            break;
        }
        case "cs.dm": {
            mainCategory = "Computing Research Repository";
            subCategory = "Discrete Mathematics";
            break;
        }
        case "cs.dc": {
            mainCategory = "Computing Research Repository";
            subCategory = "Distributed, Parallel, and Cluster Computing";
            break;
        }
        case "cs.et": {
            mainCategory = "Computing Research Repository";
            subCategory = "Emerging Technologies";
            break;
        }
        case "cs.fl": {
            mainCategory = "Computing Research Repository";
            subCategory = "Formal Languages and Automata Theory";
            break;
        }
        case "cs.gl": {
            mainCategory = "Computing Research Repository";
            subCategory = "General Literature";
            break;
        }
        case "cs.gr": {
            mainCategory = "Computing Research Repository";
            subCategory = "Graphics";
            break;
        }
        case "cs.ar": {
            mainCategory = "Computing Research Repository";
            subCategory = "Hardware Architecture";
            break;
        }
        case "cs.hc": {
            mainCategory = "Computing Research Repository";
            subCategory = "Human-Computer Interaction";
            break;
        }
        case "cs.ir": {
            mainCategory = "Computing Research Repository";
            subCategory = "Information Retrieval";
            break;
        }
        case "cs.it": {
            mainCategory = "Computing Research Repository";
            subCategory = "Information Theory";
            break;
        }
        case "cs.lo": {
            mainCategory = "Computing Research Repository";
            subCategory = "Logic in Computer Science";
            break;
        }
        case "cs.lg": {
            mainCategory = "Computing Research Repository";
            subCategory = "Machine Learning";
            break;
        }
        case "cs.ms": {
            mainCategory = "Computing Research Repository";
            subCategory = "Mathematical Software";
            break;
        }
        case "cs.ma": {
            mainCategory = "Computing Research Repository";
            subCategory = "Multiagent Systems";
            break;
        }
        case "cs.mm": {
            mainCategory = "Computing Research Repository";
            subCategory = "Multimedia";
            break;
        }
        case "cs.ni": {
            mainCategory = "Computing Research Repository";
            subCategory = "Networking and Internet Architecture";
            break;
        }
        case "cs.ne": {
            mainCategory = "Computing Research Repository";
            subCategory = "Neural and Evolutionary Computing";
            break;
        }
        case "cs.na": {
            mainCategory = "Computing Research Repository";
            subCategory = "Numerical Analysis";
            break;
        }
        case "cs.os": {
            mainCategory = "Computing Research Repository";
            subCategory = "Operating Systems";
            break;
        }
        case "cs.oh": {
            mainCategory = "Computing Research Repository";
            subCategory = "Other Computer Science";
            break;
        }
        case "cs.pf": {
            mainCategory = "Computing Research Repository";
            subCategory = "Performance";
            break;
        }
        case "cs.pl": {
            mainCategory = "Computing Research Repository";
            subCategory = "Programming Languages";
            break;
        }
        case "cs.ro": {
            mainCategory = "Computing Research Repository";
            subCategory = "Robotics";
            break;
        }
        case "cs.si": {
            mainCategory = "Computing Research Repository";
            subCategory = "Social and Information Networks";
            break;
        }
        case "cs.se": {
            mainCategory = "Computing Research Repository";
            subCategory = "Software Engineering";
            break;
        }
        case "cs.sd": {
            mainCategory = "Computing Research Repository";
            subCategory = "Sound";
            break;
        }
        case "cs.sc": {
            mainCategory = "Computing Research Repository";
            subCategory = "Symbolic Computation";
            break;
        }
        case "cs.sy": {
            mainCategory = "Computing Research Repository";
            subCategory = "Systems and Control";
            break;
        }
        case "q-bio.bm": {
            mainCategory = "Quantitative Biology";
            subCategory = "Biomolecules";
            break;
        }
        case "q-bio.cb": {
            mainCategory = "Quantitative Biology";
            subCategory = "Cell Behavior";
            break;
        }
        case "q-bio.gn": {
            mainCategory = "Quantitative Biology";
            subCategory = "Genomics";
            break;
        }
        case "q-bio.mn": {
            mainCategory = "Quantitative Biology";
            subCategory = "Molecular Networks";
            break;
        }
        case "q-bio.nc": {
            mainCategory = "Quantitative Biology";
            subCategory = "Neurons and Cognition";
            break;
        }
        case "q-bio.ot": {
            mainCategory = "Quantitative Biology";
            subCategory = "Other Quantitative Biology";
            break;
        }
        case "q-bio.pe": {
            mainCategory = "Quantitative Biology";
            subCategory = "Populations and Evolution";
            break;
        }
        case "q-bio.qm": {
            mainCategory = "Quantitative Biology";
            subCategory = "Quantitative Methods";
            break;
        }
        case "q-bio.sc": {
            mainCategory = "Quantitative Biology";
            subCategory = "Subcellular Processes";
            break;
        }
        case "q-bio.to": {
            mainCategory = "Quantitative Biology";
            subCategory = "Tissues and Organs";
            break;
        }
        case "q-fin.cp": {
            mainCategory = "Quantitative Finance";
            subCategory = "Computational Finance";
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
            break;
        }
        case "q-fin.mf": {
            mainCategory = "Quantitative Finance";
            subCategory = "Mathematical Finance";
            break;
        }
        case "q-fin.pm": {
            mainCategory = "Quantitative Finance";
            subCategory = "Portfolio Management";
            break;
        }
        case "q-fin.pr": {
            mainCategory = "Quantitative Finance";
            subCategory = "Pricing of Securities";
            break;
        }
        case "q-fin.rm": {
            mainCategory = "Quantitative Finance";
            subCategory = "Risk Management";
            break;
        }
        case "q-fin.st": {
            mainCategory = "Quantitative Finance";
            subCategory = "Statistical Finance";
            break;
        }
        case "q-fin.tr": {
            mainCategory = "Quantitative Finance";
            subCategory = "Trading and Market Microstructure";
            break;
        }
        case "stat.ap": {
            mainCategory = "Statistics";
            subCategory = "Applications";
            break;
        }
        case "stat.co": {
            mainCategory = "Statistics";
            subCategory = "Computation";
            break;
        }
        case "stat.ml": {
            mainCategory = "Statistics";
            subCategory = "Machine Learning";
            break;
        }
        case "stat.me": {
            mainCategory = "Statistics";
            subCategory = "Methodology";
            break;
        }
        case "stat.ot": {
            mainCategory = "Statistics";
            subCategory = "Other Statistics";
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
            break;
        }
        case "eess.iv": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Image and Video Processing";
            break;
        }
        case "eess.sp": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Signal Processing";
            break;
        }
        case "eess.sy": {
            mainCategory = "Electrical Engineering and Systems Science";
            subCategory = "Systems and Control";
            break;
        }
        case "econ.em": {
            mainCategory = "Economics";
            subCategory = "Econometrics";
            break;
        }
        case "econ.gn": {
            mainCategory = "Economics";
            subCategory = "General Economics";
            break;
        }
        case "econ.th": {
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
    return { mainCategory, subCategory };
}

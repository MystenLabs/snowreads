use serde::Deserialize;

use crate::category::Category;

#[derive(Debug, Clone, Deserialize)]
pub struct Entry {
    pub id: [String; 1],
    pub title: [String; 1],
    pub author: Vec<Author>,
    #[serde(rename = "arxiv:primary_category")]
    pub primary_category: [DollarSign; 1],
}

#[derive(Debug, Clone, Deserialize)]
pub struct Author {
    pub name: [String; 1],
}

#[derive(Debug, Clone, Deserialize)]
pub struct DollarSign {
    #[serde(rename = "$")]
    pub dollar_sign: PrimaryCategory,
}

#[derive(Debug, Clone, Deserialize)]
pub struct PrimaryCategory {
    #[serde(rename = "xmlns:arxiv")]
    pub xmlns_arxiv: String,
    pub term: Category,
    pub scheme: String,
}


//   "id": ["http://arxiv.org/abs/2406.00001v1"],
//   "updated": ["2024-04-22T06:35:08Z"],
//   "published": ["2024-04-22T06:35:08Z"],
//   "title": [
//     "PhyPlan: Generalizable and Rapid Physical Task Planning with Physics\\n  Informed Skill Networks for Robot Manipulators"
//   ],
//   "summary": [
//     "  Given the task of positioning a ball-like object to a goal region beyond\\ndirect reach, humans can often throw, slide, or rebound objects against the\\nwall to attain the goal. However, enabling robots to reason similarly is\\nnon-trivial. Existing methods for physical reasoning are data-hungry and\\nstruggle with complexity and uncertainty inherent in the real world. This paper\\npresents PhyPlan, a novel physics-informed planning framework that combines\\nphysics-informed neural networks (PINNs) with modified Monte Carlo Tree Search\\n(MCTS) to enable embodied agents to perform dynamic physical tasks. PhyPlan\\nleverages PINNs to simulate and predict outcomes of actions in a fast and\\naccurate manner and uses MCTS for planning. It dynamically determines whether\\nto consult a PINN-based simulator (coarse but fast) or engage directly with the\\nactual environment (fine but slow) to determine optimal policy. Given an unseen\\ntask, PhyPlan can infer the sequence of actions and learn the latent\\nparameters, resulting in a generalizable approach that can rapidly learn to\\nperform novel physical tasks. Evaluation with robots in simulated 3D\\nenvironments demonstrates the ability of our approach to solve 3D-physical\\nreasoning tasks involving the composition of dynamic skills. Quantitatively,\\nPhyPlan excels in several aspects: (i) it achieves lower regret when learning\\nnovel tasks compared to the state-of-the-art, (ii) it expedites skill learning\\nand enhances the speed of physical reasoning, (iii) it demonstrates higher data\\nefficiency compared to a physics un-informed approach.\\n"
//   ],
//   "author": [
//     { "name": ["Mudit Chopra"] },
//     { "name": ["Abhinav Barnawal"] },
//     { "name": ["Harshil Vagadia"] },
//     { "name": ["Tamajit Banerjee"] },
//     { "name": ["Shreshth Tuli"] },
//     { "name": ["Souvik Chakraborty"] },
//     { "name": ["Rohan Paul"] }
//   ],
//   "arxiv:comment": [
//     {
//       "$": { "xmlns:arxiv": "http://arxiv.org/schemas/atom" },
//       "_": "arXiv admin note: substantial text overlap with arXiv:2402.15767"
//     }
//   ],
//   "link": [
//     {
//       "$": {
//         "href": "http://arxiv.org/abs/2406.00001v1",
//         "rel": "alternate",
//         "type": "text/html"
//       }
//     },
//     {
//       "$": {
//         "title": "pdf",
//         "href": "http://arxiv.org/pdf/2406.00001v1",
//         "rel": "related",
//         "type": "application/pdf"
//       }
//     }
//   ],
//   "arxiv:primary_category": [
//     {
//       "$": {
//         "xmlns:arxiv": "http://arxiv.org/schemas/atom",
//         "term": "cs.RO",
//         "scheme": "http://arxiv.org/schemas/atom"
//       }
//     }
//   ],
//   "category": [
//     { "$": { "term": "cs.RO", "scheme": "http://arxiv.org/schemas/atom" } },
//     { "$": { "term": "cs.AI", "scheme": "http://arxiv.org/schemas/atom" } },
//     { "$": { "term": "cs.LG", "scheme": "http://arxiv.org/schemas/atom" } }
//   ]
// }

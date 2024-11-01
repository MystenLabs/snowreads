import Footer from "../Footer";
import LandingPage from "../../pages/LandingPage";
import { useEffect, useState } from "react";
import { AllPapers, IPaperTrimmed } from "../../interfaces/IAllPapers";
import { Spinner } from "../../components/common/Spinner";

async function fetchPapersForSubCategory(path: string): Promise<IPaperTrimmed[]> {
  const resp = await fetch(path);
  return await resp.json();
}

export type CategoryArg = {
  categoryName: string;
  subCategories: string[]
}

const LANDING_PAGE_CATEGORIES: CategoryArg[] = [{
  categoryName: "Computer Science",
  subCategories: [
    "Artificial Intelligence",
    "Computation and Language",
    "Robotics",
    "Computational Complexity"
  ],
}, {
  categoryName: "Physics",
  subCategories: [
    "General Relativity and Quantum Cosmology",
    "High Energy Physics - Experiment",
    "High Energy Physics - Lattice",
    "High Energy Physics - Phenomenology"
  ]
}, {
  categoryName: "Mathematics",
  subCategories: [
    "Algebraic Geometry",
    "Algebraic Topology",
    "Analysis of PDEs",
    "Category Theory",
  ]
}, {
  categoryName: "Quantitative Biology",
  subCategories: [
    "Biomolecules",
    "Cell Behavior",
    "Genomics",
    "Molecular Networks",
  ]
}, {
  categoryName: "Quantitative Finance",
  subCategories: [
    "Computational Finance",
    "Portfolio Management",
    "General Finance",
    "Mathematical Finance",
  ]
}, {
  categoryName: "Statistics",
  subCategories: [
    "Applications",
    "Computation",
    "Machine Learning",
    "Methodology",
  ]
}, {
  categoryName: "Electrical Engineering and Systems Science",
  subCategories: [
    "Audio and Speech Processing",
    "Image and Video Processing",
    "Signal Processing",
    "Systems and Control",
  ]
}, {
  categoryName: "Economics",
  subCategories: [
    "Econometrics",
    "General Economics",
    "Theoretical Economics",
  ]
}];

async function updateAllPapers(allPapers: AllPapers) {
  let promises = [];
  for (const catArg of LANDING_PAGE_CATEGORIES) {
    const cat = allPapers.categories.find((cat) => cat.name === catArg.categoryName);
    if (!cat) {
      throw `Did not find ${catArg.categoryName}`
    }
    for (const subCatArg of catArg.subCategories) {
      const subCat = cat.subCategories.find((subCat) => subCat.name === subCatArg);
      if (!subCat) {
        throw `Did not find ${catArg.categoryName}->${subCatArg}`;
      }
      const data = subCat.data;
      promises.push(fetchPapersForSubCategory(data).then((papers) => {
        subCat.papers = papers;
      }));
    }
  }
  console.log("Awaiting for all promises together");
  await Promise.all(promises);
}

const LandingPageLayout: React.FC = () => {
  const [allPapersData, setAllPapersData] = useState<AllPapers | null>(null);
  const [allCollectionsData, setAllCollectionsData] = useState<any>(null);

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
      .then(async (data: AllPapers) => {
        // Computer Science category
        if (!data) {
          throw "No data from /papers, or data not parsed correctly";
        }

        // data is changed here to include LANDING_PAGE_PAPERS
        await updateAllPapers(data);
        console.log("Promises finished");
        setAllPapersData(data);
      })
      .catch((error) => {
        console.log(error);
        //setError(error);
      });
  }, []);
  return (
    <div className="flex flex-col md:h-screen">
      <div className="flex-grow overflow-y-auto">
        {allCollectionsData && allPapersData ? (
          <LandingPage
            allPapersData={allPapersData}
            filledSubCategories={LANDING_PAGE_CATEGORIES}
            allCollectionsData={allCollectionsData}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;

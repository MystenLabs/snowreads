import { CategoryArg } from "../pages/LandingPage";
import { AllPapers } from "./IAllPapers";

export interface ILandingPageLayoutProps {
  allPapersData: AllPapers;
  filledSubCategories: CategoryArg[];
  allCollectionsData: any;
}

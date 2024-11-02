import { CategoryArg } from "../layout/landingLayout/LandingPageLayout";
import { AllPapers } from "./IAllPapers";

export interface ILandingPageLayoutProps {
  allPapersData: AllPapers;
  filledSubCategories: CategoryArg[];
  allCollectionsData: any;
}

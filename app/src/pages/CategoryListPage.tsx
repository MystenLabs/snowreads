import { useState } from "react";
import { PaperCard } from "../components/categoryListComponents/PaperCard";
import PaperCardContainer from "../components/categoryListComponents/PaperCardContainer";
import SidebarNav from "../components/common/SideNavbar";
import { ICategoryListPageProps } from "../interfaces/ICategoryListPageProps";
import MobileNavigationBar from "../components/common/MobileNavigationBar";

const CategoryListPage: React.FC<ICategoryListPageProps> = ({
  categories,
  papers,
  selected,
  type,
}) => {
  const [activeTab, setActiveTab] = useState("DOCUMENTS");

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center">
      <div className="pt-10 pb-5 text-center">
        <div className="text-sm text-gray-600">Home</div>
        <div className="flex justify-center">
          <div className="text-3xl font-medium text-gray-900 p-2 max-w-xl w-full text-center">
            {selected}
          </div>
        </div>
        <p className="text-gray-600 mb-6">120 MB</p>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "DOCUMENTS"
                ? "bg-tertiary text-black"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("DOCUMENTS")}
          >
            Documents
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "ABOUT"
                ? "bg-tertiary text-black"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("ABOUT")}
          >
            About
          </button>
        </div>
      </div>

      {/* Displaying this section when "Documents" tab is active */}
      {activeTab === "DOCUMENTS" && (
        <div className="flex w-full py-6 lg:max-w-[1100px]">
          <SidebarNav
            sections={categories}
            type={type}
            initialActive={selected}
          />
          <div className="flex-1 py-4 px-7">
            <div className="flex justify-between items-center mb-6">
              {type === "CATEGORIES" ? (
                <h1 className="text-2xl font-base">{selected}</h1>
              ) : (
                ""
              )}
            </div>
            <MobileNavigationBar options={categories} />
            <PaperCardContainer cardTitle={"576 Documents"}>
              {papers.map((paper, index) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  index={index}
                  hasVisibleIcon={true}
                />
              ))}
            </PaperCardContainer>
          </div>
        </div>
      )}

      {/* Displaying this section when "About" tab is active */}
      {activeTab === "ABOUT" && (
        <div className="flex flex-col items-center justify-center w-full h-full py-10">
          <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
            Welcome to the Computing Research Repository in WalrusArxiv. The
            Computer Science section was established in 2024 through a
            partnership of the Association for Computing Machinery, the
            Networked Computer Science Technical Reference Library, and arXiv.
          </p>

          <h2 className="sm:text-xl md:text-2xl lg:text-2xl mb-6 text-left w-full max-w-2xl p-5">
            Editorial Committee
          </h2>

          <p className="sm:text-sm md:text-base lg:text-base text-left max-w-2xl mb-4 px-5">
            The editorial committee members serve as consultants to Cornell
            University and to the arXiv Editorial Advisory Council. All arXiv
            policy decisions are ultimately made by Cornell University.
          </p>

          <ul className="list-disc text-left space-y-2 max-w-2xl w-full pl-10 sm:pl-15 md:pl-15 lg:pl-20 pr-5">
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Thomas Dietterich, Oregon State University (chair)
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Krzysztof Apt, Centrum Wiskunde & Informatica, and University of
              Amsterdam
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Ron Boisvert, National Institute of Standards and Technology
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Carol Hutchins, New York University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Scott Delman, Association for Computing Machinery
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Jon Doyle, North Carolina State
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Ed Fox, Virginia Tech
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Lee Giles, The Pennsylvania State University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Joseph Halpern, Cornell University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Michael Lesk, Rutgers University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Andrew McCallum, University of Massachusetts, Amherst
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Steve Minton, InferLink
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Andrew Odlyzko, University of Minnesota
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Michael O'Donnell, University of Chicago
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Erik Sandewall, Linköping University, Sweden
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Stuart Shieber, Harvard University
            </li>
            <li className="text-xs sm:text-sm md:text-base lg:text-base">
              Jeff Ullman, Stanford University
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;

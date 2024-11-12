import { Link } from "react-router-dom";
import { IPaperCardProps } from "../../interfaces/IPaperCardProps";
import 'katex/dist/katex.min.css';
import Latex from "react-latex-next";

export const PaperCard: React.FC<IPaperCardProps> = ({
  paper,
  hasVisibleIcon,
}) => {
  // REVIEW: Maybe now that we use katex and react-latex-next, we don't need the below?
  // Some titles have complex math symbols that break the layout so it is needed to break them
  const mathSymbolsRegex = /[\$\(\)\{\}]/g;
  const underscoreRegex = /_/g;
  const mathSymbolsCount = (paper.title.match(mathSymbolsRegex) || []).length;
  const underscoreCount = (paper.title.match(underscoreRegex) || []).length;
  const isComplexMathTitle = mathSymbolsCount > 13 || underscoreCount > 3;

  return (
  <Link
    to={paper.link}
    state={{ metadataBlobId: paper.metadataBlobId }}
    className="block bg-secondary p-4 my-2 rounded-md">
    <div className="flex space-x-4 items-start">
      {/* <span className="text-sm font-medium">{index + 1}.</span> */}
      {hasVisibleIcon ? (
        <img
          src="/paper_icon.png"
          className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          alt="Paper Icon"
        />
      ) : null}
      <div className="flex-1">
        <p className="text-gray-500 text-xs">{paper.arxiv_id}</p>
        <h2
          className={`text-sm sm:text-base font-medium ${isComplexMathTitle ? "break-all" : "break-words"
            } max-w-full`}
        >
          <Latex>{paper.title}</Latex>
        </h2>

        <p className="text-gray-500 text-xs">{paper.authors}</p>
      </div>
    </div>
  </Link>
  );
};

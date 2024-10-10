import { IPaperCardProps } from "../../interfaces/IPaperCardProps";

export const PaperCard: React.FC<IPaperCardProps> = ({
  paper,
  index,
  hasVisibleIcon,
}) => {
  //Some titles have complex math symbols that break the layout so it is needed to break them
  const mathSymbolsRegex = /[\$\(\)\{\}]/g;
  const mathSymbolsCount = (paper.title.match(mathSymbolsRegex) || []).length;
  const isComplexMathTitle = mathSymbolsCount > 13;
  return (
    <div className="bg-secondary p-4  rounded-md">
      <div className="flex space-x-4 items-start">
        <span className="text-sm font-medium">{index + 1}.</span>
        {hasVisibleIcon ? (
          <img
            src="/paper_icon.png"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
          ></img>
        ) : (
          ""
        )}
        <div className="flex-1">
          <p className="text-gray-500 text-xs">{paper.arxiv_id}</p>
          <h2
            className={`text-sm sm:text-base font-medium ${isComplexMathTitle ? "break-all" : "break-words"} max-w-full`}
          >
            <a href={paper.link}>{paper.title}</a>
          </h2>

          <p className="text-gray-500 text-xs">{paper.authors}</p>
        </div>
      </div>
    </div>
  );
};

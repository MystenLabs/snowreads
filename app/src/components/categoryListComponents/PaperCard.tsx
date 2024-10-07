import { IPaperCardProps } from "../../interfaces/IPaperCardProps";

export const PaperCard: React.FC<IPaperCardProps> = ({
  paper,
  index,
  hasVisibleIcon,
}) => {
  return (
    <div className="bg-secondary p-4  rounded-md">
      <div className="flex space-x-4 items-start">
        <span className="text-sm font-medium">{index + 1}.</span>
        {hasVisibleIcon ? (
          <img src="/paper_icon.png" className="w-16 h-16"></img>
        ) : (
          ""
        )}
        <div className="flex-1">
          <p className="text-gray-500 text-xs">{paper.arxiv_id}</p>
          <h2 className="text-base font-medium">
            <a href={paper.link} target="_blank" rel="noopener noreferrer">
              {paper.title}
            </a>
          </h2>
          <p className="text-gray-500 text-xs">{paper.authors}</p>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { IPaperAbstractProps } from "../../interfaces/IPaperAbstractProps";
import MobileNavigationBar from "../common/MobileNavigationBar";

const PaperAbstract: React.FC<IPaperAbstractProps> = ({
  arxiv_id,
  title,
  fileSize,
  authors,
  abstract,
  subjects,
  citation,
  submissionHistory,
  submissionAndUpdateText,
  license,
  onAbstractHeightChange,
}) => {
  const abstractRef = useRef<HTMLParagraphElement>(null);
  const [abstractYPosition, setAbstractYPosition] = useState<number>(0);

  useEffect(() => {
    if (abstractRef.current) {
      // Use getBoundingClientRect to get the Y position of the element
      const rect = abstractRef.current.getBoundingClientRect();
      const yPosition = rect.top + window.scrollY; // This gives the absolute Y position
      setAbstractYPosition(yPosition);
      onAbstractHeightChange(yPosition); // Pass the Y position to the parent
    }
  }, []);

  return (
    <section className="  flex-grow lg:w-2/4 w-full md:w-3/4">
      <div className="py-6 px-5 rounded-lg">
        <h1 className="text-3xl font-semibold mb-2 max-w-[90%] break-words">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mb-2">{submissionAndUpdateText}</p>
        <p className="text-sm text-gray-500 mb-4">{fileSize}</p>
        <p className="text-sm text-gray-500 mb-4">{arxiv_id}</p>
        <MobileNavigationBar
          mode="scroll"
          options={[
            { id: "article", label: "Article" },
            { id: "subjects", label: "Subjects" },
            { id: "cite-as", label: "Cite As" },
            { id: "submission-history", label: "Submission History" },
            { id: "license", label: "License" },
          ]}
        />
        <p className="text-[#8B28D2] mb-6">
          {authors.map((author, index) => (
            <span key={index}>
              <a
                href={author.link}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {author.name}
              </a>
              {index < authors.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p
          id="article"
          ref={abstractRef}
          className="text-gray-700 leading-relaxed mb-6"
        >
          {abstract}
        </p>

        <h2 id="subjects" className="text-xl font-semibold py-4 w-3/5">
          Subjects
        </h2>
        <p className="text-gray-700 mb-4">{subjects}</p>

        <h2 id="cite-as" className="text-xl font-semibold py-4 w-3/5">
          Cite As
        </h2>
        <p className="text-gray-700 mb-4">{citation}</p>

        <h2
          id="submission-history"
          className="text-xl font-semibold py-4 w-3/5"
        >
          Submission History
        </h2>
        <p className="text-gray-700 mb-4">{submissionHistory}</p>
        <h2 id="license" className="text-xl font-semibold py-4 w-3/5">
          License
        </h2>
        <p className="text-gray-700 mb-4">{license}</p>
      </div>
    </section>
  );
};

export default PaperAbstract;

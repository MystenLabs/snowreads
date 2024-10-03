import React from 'react';
import { IPaperAbstractProps } from '../../interfaces/IPaperAbstractProps';

const PaperAbstract: React.FC<IPaperAbstractProps> = ({
  arxiv_id,
  title,
  submissionDate,
  fileSize,
  authors,
  abstract,
  subjects,
  citation,
  submissionHistory
}) => {
  return (
    <section className=" px-6 flex-grow lg:w-2/4 w-full md:w-3/4">

      <div className="p-6 rounded-lg">
        <h1 id="article" className="text-3xl font-semibold mb-2 w-3/5">{title}</h1>
        <p className="text-sm text-gray-500 mb-2">Submitted on {submissionDate}</p>
        <p className="text-sm text-gray-500 mb-4">{fileSize}</p>
        <p className="text-sm text-gray-500 mb-4">{arxiv_id}</p>
        <p className="text-[#8B28D2] mb-6">
          {authors.map((author, index) => (
            <span key={index}>
              <a href={author.link} className="hover:underline">{author.name}</a>
              {index < authors.length - 1 && ', '}
            </span>
          ))}
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          {abstract}
        </p>

        <h2 id="subjects" className="text-xl font-semibold py-4 w-3/5">Subjects</h2>
        <p className="text-gray-700 mb-4">{subjects}</p>

        <h2 id="cite-as" className="text-xl font-semibold py-4 w-3/5">Cite As</h2>
        <p className="text-gray-700 mb-4">{citation}</p>

        <h2 id="submission-history" className="text-xl font-semibold py-4 w-3/5">Submission History</h2>
        <p className="text-gray-700 mb-4">{submissionHistory}</p>
      </div>
    </section>
  );
};

export default PaperAbstract;

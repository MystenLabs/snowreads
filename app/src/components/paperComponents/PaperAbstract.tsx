import React from 'react';

interface PaperAbstractProps {
  title: string;
  submissionDate: string;
  fileSize: string;
  authors: Array<{ name: string; link: string }>;
  abstract: string;
  subjects: string;
  citation: string;
  submissionHistory: string;
}

const PaperAbstract: React.FC<PaperAbstractProps> = ({
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
    <section className="w-3/5 px-6">

      {/* Main Article Section */}
      <div className="p-6 rounded-lg">
        {/* Title with ID for scrolling */}
        <h1 id="article" className="text-3xl font-semibold mb-2 w-3/5">{title}</h1>

        {/* Submission Date & File Size */}
        <p className="text-sm text-gray-500 mb-2">Submitted on {submissionDate}</p>
        <p className="text-sm text-gray-500 mb-4">{fileSize}</p>

        {/* Authors */}
        <p className="text-[#8B28D2] mb-6">
          {authors.map((author, index) => (
            <span key={index}>
              <a href={author.link} className="hover:underline">{author.name}</a>
              {index < authors.length - 1 && ', '}
            </span>
          ))}
        </p>

        {/* Abstract */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {abstract}
        </p>

        {/* Subjects with ID for scrolling */}
        <h2 id="subjects" className="text-xl font-semibold py-4 w-3/5">Subjects</h2>
        <p className="text-gray-700 mb-4">{subjects}</p>

        {/* Citation with ID for scrolling */}
        <h2 id="cite-as" className="text-xl font-semibold py-4 w-3/5">Cite As</h2>
        <p className="text-gray-700 mb-4">{citation}</p>

        {/* Submission History with ID for scrolling */}
        <h2 id="submission-history" className="text-xl font-semibold py-4 w-3/5">Submission History</h2>
        <p className="text-gray-700 mb-4">{submissionHistory}</p>
      </div>
    </section>
  );
};

export default PaperAbstract;

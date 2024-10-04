import { useState } from 'react';
import CategoryCard from '../components/landingComponents/CategoryCard';
import InformationPopup from '../components/landingComponents/InformationPopup';
import PaperCardContainer from '../components/categoryListComponents/PaperCardContainer';
import { PaperCard } from '../components/categoryListComponents/PaperCard';
import { Link } from 'react-router-dom';
import { ISubCategory } from '../interfaces/IAllPapers';

const LandingPage = (props: {
  artificialIntelligence: ISubCategory | null;
}) => {

  const [activeCategory, setActiveCategory] = useState("Computer Science");
  const categories = [
    "Computer Science",
    "Physics",
    "Mathematics",
    "Quantitative Biology",
    "Quantitative Finance",
    "Statistics",
    "Electrical Engineering and Systems Science",
    "Economics",
  ];
  
  const collections = [
    {
      icon: '/comp_sci_icon.png',
      category: 'Computer Science',
      title: 'Exploring the Edge of Artificial Intelligence Knowledge',
      documents: 34,
      size: '10.69MB',
    },
    {
      icon: '/physics_icon.png',
      category: 'Physics',
      title: 'Curious Conjectures About Artificial Intelligence and Beyond',
      documents: 12,
      size: '4.28MB',
    },
    {
      icon: '/maths_icon.png',
      category: 'Mathematics',
      title: 'Dynamic Systems and Fractals: A Mathematical Odyssey',
      documents: 34,
      size: '10.69MB',
    },
    {
      icon: '/quant_bio_icon.png',
      category: 'Quantitative Biology',
      title: 'The Math Behind the Cells: Unveiling Quantitative Biology Secrets',
      documents: 12,
      size: '4.28MB',
    },
    {
      icon: '/stats_icon.png',
      category: 'Statistics',
      title: `Machine Learning's Dark Side: The Unseen Consequences`,
      documents: 34,
      size: '10.69MB',
    },
    {
      icon: '/econ_icon.png',
      category: 'Economics',
      title: 'From Adam Smith to AI: The Evolution of Theoretical Economics',
      documents: 12,
      size: '4.28MB',
    },
    {
      icon: '/quant_fin_icon.png',
      category: 'Quantitative Finance',
      title: 'Beyond Black Swans: Exploring Quantitative Finance Frontiers',
      documents: 12,
      size: '4.28MB',
    },
    {
      icon: '/econ_icon.png',
      category: 'Economics',
      title: `Why Economics is Like Dating: It's All About Supply and Demand`,
      documents: 34,
      size: '10.69MB',
    },
    {
      icon: '/elect_eng_icon.png',
      category: 'Electrical Engineering',
      title: 'The Spark of Genius: Exploring Electrical Engineering Frontiers',
      documents: 34,
      size: '10.69MB',
    }
  ];

  const papers = [
    {
      id: '1',
      title: 'Navigating Process Mining: A Case study using pm4py',
      authors: 'Ali Jidi, László Kovács',
      link: `/abs/${2409.01294}`,
      categories: 'Artificial Intelligence',
      arxiv_id: '2409.01294',
    },
    {
      id: '2',
      title: 'Another Study in AI',
      authors: 'John Doe, Jane Smith',
      link: `/abs/${2409.01295}`,
      categories: 'Artificial Intelligence',
      arxiv_id: '2409.01295',
    },
    {
      id: '3',
      title: 'AI in Healthcare: An Overview',
      authors: 'Emily Zhang, Robert Brown',
      link: `/abs/${2409.01296}`,
      categories: 'Healthcare',
      arxiv_id: '2409.01296',
    },
    {
      id: '4',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '5',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '6',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '7',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '8',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '9',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    },
    {
      id: '10',
      title: 'AI Ethics and Society',
      authors: 'Michael Nguyen, Sarah Parker',
      link: `/abs/${2409.01297}`,
      categories: 'Ethics',
      arxiv_id: '2409.01297',
    }


  ];

  // Sort papers by most recent
  props.artificialIntelligence?.papers.sort((lhs, rhs) => {
    return rhs.timestamp - lhs.timestamp;
  });
  const artificial = (props.artificialIntelligence?.papers || []).map((paper) => {
    return {
      id: paper.id,
      title: paper.title,
      authors: paper.authorsParsed.map((author) => author.join(" ")).join(", "),
      link: `/abs/${paper.id}`,
      categories: "Artificial Intelligence",
      arxiv_id: paper.id,
    };
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-primary pb-20">
      <img src="/walrus_globe.png" alt="Logo" className="w-full max-w-[350px] h-auto mb-8 p-10" />
      <div className='pb-10 flex flex-col items-center'>
        <h1 className="text-3xl text-center">
          <span>Spark Your Curiosity: Collections</span><br />
          <span>That Challenge Your Thinking</span>
        </h1>
        <p className='text-sm pt-5'>240 MB</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full px-4 sm:px-8 md:px-12 lg:px-0 lg:max-w-[1100px] pb-10">
        {collections.map((item, index) => (
          <CategoryCard
            key={index}
            icon={item.icon}
            category={item.category}
            title={item.title}
            documents={item.documents}
            size={item.size}
            className="w-full" 
          />
        ))}
      </div>

      <div className='pt-20 pb-10 flex flex-col items-center'>
        <h1 className="text-3xl text-center">
            Browse All Categories
        </h1>
        <p className='text-sm pt-5'>240 MB</p>
      </div>
        
      <div className="flex flex-wrap justify-center gap-4 my-4 lg:px-60 md:px-40">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`${
            activeCategory === category ? "bg-tertiary" : "bg-white"
          } text-black rounded-full px-4 py-2 tx-sm`}
        >
          {category}
        </button>
      ))}
    </div>

    <div className="container mx-auto p-4 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Make number of containers dynamic */}
        <PaperCardContainer cardTitle={"Artificial Intelligence"} hasActionButton={true}>
          {artificial.map((paper, index) => (
            <PaperCard key={paper.id} paper={paper} index={index} hasVisibleIcon={true} />
          ))}
        </PaperCardContainer>
        <PaperCardContainer cardTitle={"Computation and Language"} hasActionButton={true}>
          {papers.map((paper, index) => (
            <PaperCard key={paper.id} paper={paper} index={index} hasVisibleIcon={true} />
          ))}
        </PaperCardContainer>
      </div>
      
      <div className="bg-white border border-black rounded-lg p-4 space-y-4 mt-8">
        <div className="flex justify-between items-center">
            <Link className="text-base font-medium" to={`/category/${activeCategory}`}>
              View all in {activeCategory}
            </Link>
            <div
              className="text-sm font-medium text-gray-600 hover:underline cursor-pointer"
            >
            5,242 documents, 420MB
            </div>
          </div>
      </div>
    </div>
    


      <InformationPopup />
    </div>
  );
};

export default LandingPage;

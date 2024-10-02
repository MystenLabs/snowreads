import CategoryCard from '../components/landingComponents/CategoryCard';
import InformationPopup from '../components/landingComponents/InformationPopup';


const LandingPage: React.FC = () => {
  const data = [
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
      },{
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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-[20%] bg-primary pb-20">
      <img src="/walrus_globe.png" alt="Logo" className="w-full max-w-[350px] h-auto mb-8 p-10" />
      <div className='pb-10 flex flex-col items-center'>
      <h1 className="text-2xl text-center">
        <span>Spark Your Curiosity: Collections</span><br />
        <span>That Challenge Your Thinking</span>
      </h1>
      <p className='text-xs p-3'>240 MB</p>
      </div>
      <div className="grid grid-cols-3 gap-5 w-full"> 
        {data.map((item, index) => (
          <CategoryCard
            key={index}
            icon={item.icon}
            category={item.category}
            title={item.title}
            documents={item.documents}
            size={item.size}
          />
        ))}
      </div>
      <InformationPopup/>
    </div>
  );
  
};

export default LandingPage;

import CategoryCard from '../components/landingComponents/CategoryCard';


const LandingPage: React.FC = () => {
  const data = [
    {
      icon: '/physics_icon.png',
      category: 'Physics',
      title: 'Curious Conjectures About Artificial Intelligence and Beyond',
      documents: 34,
      size: '10.69MB',
    },
    {
      icon: '/physics_icon.png',
      category: 'Mathematics',
      title: 'Advanced Theories of Quantum Mechanics',
      documents: 12,
      size: '4.28MB',
    },
    {
        icon: '/physics_icon.png',
        category: 'Physics',
        title: 'Curious Conjectures About Artificial Intelligence and Beyond',
        documents: 34,
        size: '10.69MB',
      },
      {
        icon: '/physics_icon.png',
        category: 'Mathematics',
        title: 'Advanced Theories of Quantum Mechanics',
        documents: 12,
        size: '4.28MB',
      },{
        icon: '/physics_icon.png',
        category: 'Physics',
        title: 'Curious Conjectures About Artificial Intelligence and Beyond',
        documents: 34,
        size: '10.69MB',
      },
      {
        icon: '/physics_icon.png',
        category: 'Mathematics',
        title: 'Advanced Theories of Quantum Mechanics',
        documents: 12,
        size: '4.28MB',
      },
      {
        icon: '/physics_icon.png',
        category: 'Physics',
        title: 'Curious Conjectures About Artificial Intelligence and Beyond',
        documents: 34,
        size: '10.69MB',
      },
      {
        icon: '/physics_icon.png',
        category: 'Mathematics',
        title: 'Advanced Theories of Quantum Mechanics',
        documents: 12,
        size: '4.28MB',
      },
      {
        icon: '/physics_icon.png',
        category: 'Physics',
        title: 'Curious Conjectures About Artificial Intelligence and Beyond',
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
    </div>
  );
  
};

export default LandingPage;

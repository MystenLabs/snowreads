import React from 'react';
import { Link } from 'react-router-dom';
import { ICategoryCardProps } from '../../interfaces/ICategoryCardProps';



const CategoryCard: React.FC<ICategoryCardProps> = ({ icon, category, title, documents, size }) => {
  return (
    <Link 
      to={`/category/${category}`}
      className="block p-4 rounded-lg text-center min-h-[180px] bg-white relative transform transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer" // Added hover effects
    >
      <div className="flex">
        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-4">
          <img 
            src={icon} 
            alt={`${category} icon`} 
            className="w-4 h-4" 
          />
        </div>
        <div className="text-left max-w-[80%]">
          <span className="text-sm text-gray-500 block">{category}</span>
          <Link className="text-lg font-semibold text-gray-800 py-1 hover:bg-secondary" to={`/collection/${title}`}>{title}</Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex w-full pr-4 text-xs text-gray-500">
        <span>{documents} Documents</span>
        <span className='ml-5'>{size}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
import { IPaperCardContainerProps } from '../../interfaces/IPaperCardContainerProps';
import { useNavigate } from 'react-router-dom';

const PaperCardContainer: React.FC<IPaperCardContainerProps> = ({
  children,
  cardTitle,
  hasActionButton
}) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white border border-black rounded-lg p-6 space-y-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-medium">
            {cardTitle}
          </div>
          {hasActionButton ? (<div
            className="text-sm font-medium text-gray-600 hover:underline cursor-pointer"
            onClick={() => navigate(`/category/${cardTitle}`)}
          >
            View all
          </div>) : ''}
        </div>
        {/* Add padding-right and negative margin-right to push scrollbar right */}
        <div className="overflow-y-auto pr-4" style={{ maxHeight: '600px', marginRight: '-1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PaperCardContainer;

import { IPaperCardContainerProps } from '../../interfaces/IPaperCardContainerProps';

const PaperCardContainer: React.FC<IPaperCardContainerProps> = ({
  children,
  documentCount,
  sinceYear,
  onFilterChange,
  activeFilter,
}) => {
  return (
    <div>
      <div className="bg-white border border-black rounded-lg p-6 space-y-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-medium">
            {documentCount} Documents &nbsp; <span className="text-gray-600">Since {sinceYear}</span>
          </div>
          <div className="flex space-x-4">
            <button
              className={`${
                activeFilter === 'Recent' ? 'text-purple-600' : 'text-gray-600'
              } hover:text-purple-600 text-sm`}
              onClick={() => onFilterChange('Recent')}
            >
              Recent
            </button>
            <button
              className={`${
                activeFilter === 'New' ? 'text-purple-600' : 'text-gray-600'
              } hover:text-purple-600 text-sm`}
              onClick={() => onFilterChange('New')}
            >
              New
            </button>
            <button
              className={`${
                activeFilter === 'Current Month' ? 'text-purple-600' : 'text-gray-600'
              } hover:text-purple-600 text-sm`}
              onClick={() => onFilterChange('Current Month')}
            >
              Current Month
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PaperCardContainer;

interface WalrusMetadataContainerProps {
  blobId?: string;
  objectId?: string;
  registeredEpoch?: number;
  certifiedEpoch?: number;
  startEpoch?: number;
  endEpoch?: number;
}

const WalrusMetadataContainer: React.FC<WalrusMetadataContainerProps> = ({
  blobId,
  objectId,
  registeredEpoch,
  certifiedEpoch,
  startEpoch,
  endEpoch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-black mt-5 max-w-[180px]">
      <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">
        Walrus Metadata
      </h2>
      <ul className="space-y-2">
        {objectId && (
          <li>
            <a
              href={`https://testnet.suivision.xyz/object/${objectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline font-medium"
            >
              ObjectId
            </a>
          </li>
        )}
        {blobId && (
          <li className="break-all">
            <span className="font-medium">BlobId:</span> <br /> {blobId}
          </li>
        )}
        {registeredEpoch !== undefined && (
          <li>
            <span className="font-medium">Registered Epoch: </span>
            {registeredEpoch}
          </li>
        )}
        {certifiedEpoch !== undefined && (
          <li>
            <span className="font-medium">Certified Epoch: </span>
            {certifiedEpoch}
          </li>
        )}
        {startEpoch !== undefined && (
          <li>
            <span className="font-medium">Start Epoch: </span> {startEpoch}
          </li>
        )}
        {endEpoch !== undefined && (
          <li>
            <span className="font-medium">End Epoch: </span> {endEpoch}
          </li>
        )}
      </ul>
    </div>
  );
};

export default WalrusMetadataContainer;

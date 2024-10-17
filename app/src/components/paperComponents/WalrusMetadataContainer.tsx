import { IWalrusMetadataContainerProps } from "../../interfaces/IWalrusMetadataContainerProps";

const WalrusMetadataContainer: React.FC<IWalrusMetadataContainerProps> = ({
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
        {blobId && (
          <li>
            <a
              href={`https://walruscan.com/testnet/blob/${blobId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B28D2] hover:underline font-medium"
            >
              Blob on Walrus
            </a>
          </li>
        )}
        {objectId && (
          <li>
            <a
              href={`https://testnet.suivision.xyz/object/${objectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B28D2] hover:underline font-medium"
            >
              Object on Sui
            </a>
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

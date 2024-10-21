import { IWalrusMetadataContainerProps } from "../../interfaces/IWalrusMetadataContainerProps";

const WalrusMetadataContainer: React.FC<IWalrusMetadataContainerProps> = ({
  blobId,
  objectId,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-black mt-5 ">
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
              className="hover:text-[#8B28D2]  font-medium"
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
              className="hover:text-[#8B28D2]  font-medium"
            >
              Object on Sui
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default WalrusMetadataContainer;

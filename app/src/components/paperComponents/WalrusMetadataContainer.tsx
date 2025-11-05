import { IWalrusMetadataContainerProps } from "../../interfaces/IWalrusMetadataContainerProps";

const WalrusMetadataContainer: React.FC<IWalrusMetadataContainerProps> = ({
  blobId,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-black mt-5 ">
      <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">
        Walrus Metadata
      </h2>
      <ul className="space-y-2">
        <li>
          <a
            href={blobId ? `https://walruscan.com/mainnet/blob/${blobId}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium ${
              blobId
                ? "hover:text-[#8B28D2] text-black"
                : "text-gray-400 cursor-not-allowed"
            }`}
            style={{ pointerEvents: blobId ? "auto" : "none" }}
          >
            Blob on Walrus
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WalrusMetadataContainer;

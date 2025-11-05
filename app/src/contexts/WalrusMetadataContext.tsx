import React, { createContext, useContext, useState, useCallback } from 'react';

interface WalrusMetadataContextType {
  blobIds: Record<string, string> | null; // arxivId -> pdfBlobId
  isLoading: boolean;
  loadMetadata: () => Promise<void>;
  getBlobId: (arxivId: string) => string | null;
}

const WalrusMetadataContext = createContext<WalrusMetadataContextType | undefined>(undefined);

export const WalrusMetadataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blobIds, setBlobIds] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lazy-load metadata only when first requested
  const loadMetadata = useCallback(async () => {
    // Already loaded or currently loading
    if (blobIds !== null || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/arxiv-to-blobid-map.json');
      if (response.ok) {
        const data = await response.json();
        // Extract only pdfBlobId for each paper
        const simplified: Record<string, string> = {};
        Object.keys(data).forEach(arxivId => {
          if (data[arxivId].pdfBlobId) {
            simplified[arxivId] = data[arxivId].pdfBlobId;
          }
        });
        setBlobIds(simplified);
      } else {
        // File not found (expected in production)
        setBlobIds({});
      }
    } catch (error) {
      // Network error or file not available
      console.debug('Walrus metadata not available:', error);
      setBlobIds({});
    } finally {
      setIsLoading(false);
    }
  }, [blobIds, isLoading]);

  const getBlobId = useCallback((arxivId: string): string | null => {
    if (blobIds === null) {
      return null;
    }
    return blobIds[arxivId] || null;
  }, [blobIds]);

  return (
    <WalrusMetadataContext.Provider value={{ blobIds, isLoading, loadMetadata, getBlobId }}>
      {children}
    </WalrusMetadataContext.Provider>
  );
};

export const useWalrusMetadata = () => {
  const context = useContext(WalrusMetadataContext);
  if (context === undefined) {
    throw new Error('useWalrusMetadata must be used within a WalrusMetadataProvider');
  }
  return context;
};

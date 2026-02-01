export type District = {
  id: string;
  cityId: string;
  name: string;
  priceRangeLabel: string;
  subtitle?: string;
  tags: Array<'Merkez' | 'Luks' | 'AileDostu' | 'Sakin' | 'OgrenciDostu' | 'Kulturel'>;
  imageUrl?: string;
};


export type PriceRange = {
  id: string;
  label: string;
  min?: number;
  max?: number;
  filterType: 'below' | 'range' | 'above';
};

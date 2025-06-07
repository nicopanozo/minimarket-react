import type { PriceRange } from '../types/PriceRange';

export const priceRangeData: PriceRange[] = [
  { id: 'under20', label: '< $20', max: 20, filterType: 'below' },
  { id: '20to50', label: '$20 - $50', min: 20, max: 50, filterType: 'range' },
  {
    id: '50to100',
    label: '$50 - $100',
    min: 50,
    max: 100,
    filterType: 'range',
  },
  {
    id: '100to150',
    label: '$100 - $150',
    min: 100,
    max: 150,
    filterType: 'range',
  },
  { id: 'above150', label: '$150+', min: 150, filterType: 'above' },
];

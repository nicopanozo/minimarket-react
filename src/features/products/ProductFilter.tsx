const ProductFilter: React.FC = () => {
  return (
    <div
      id="filter"
      className="h-max flex flex-col gap-4 p-4 rounded-2xl border border-neutral-300 bg-white w-full md:w-1/5"
    >
      <div id="filterButtonMobile" className="flex justify-end md:hidden">
        <button> show filters</button>
      </div>
      <div
        id="filterDesktopContainer"
        className="flex flex-col xs:hidden md:flex"
      >
        <div id="filter__search" className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
        <div id="filter__controls" className="mb-6 flex flex-col">
          <div id="filter__showControls" className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">
              Filters
            </span>
            <button className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors">
              Clear All
            </button>
          </div>
          <div id="filter__activeGroups" className="flex flex-wrap gap-3">
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>books</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
            <button className="flex flex-row items-center px-3 py-1 gap-2 font-medium rounded-xl bg-blue-600 text-white text-[11px] hover:bg-blue-700 transition-colors">
              <span>$50 - 100</span>
              <span>&times;</span>
            </button>
          </div>
        </div>
        <div id="filter__group" className="mb-4 flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-800 uppercase tracking-wide">
            Category
          </span>
          <ul id="filter__list" className="flex flex-col">
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              Books
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              Tech
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              Clothing
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              Paris
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              Home
            </li>
          </ul>
        </div>
        <div id="filter__group" className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-800 uppercase tracking-wide">
            Price
          </span>
          <ul id="filter__list">
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              &lt; $20
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              $20 - $50
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              $50 - $100
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              $50 - $150
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" />
              $150+
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

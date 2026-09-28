import { useRef } from "react";

const SearchBar = () => {
  const locationRef     = useRef(null);
  const distanceRef     = useRef(null);
  const maxGroupSizeRef = useRef(null);

  const searchHandler = (e) => {
    e.preventDefault();

    const location     = locationRef.current.value.trim();
    const distance     = distanceRef.current.value.trim();
    const maxGroupSize = maxGroupSizeRef.current.value.trim();

    if (!location || !distance || !maxGroupSize) {
      alert("All fields are required");
      return;
    }

    // TODO: navigate to /tours?location=...&distance=...&max=...
    console.log({ location, distance, maxGroupSize });
  };

  return (
    <form
      onSubmit={searchHandler}
      className="mt-8 bg-surface border border-border rounded-md shadow-sm
                 flex flex-col md:flex-row md:items-stretch
                 divide-y md:divide-y-0 md:divide-x divide-border
                 overflow-hidden"
    >
      {/* Location */}
      <label className="flex items-center gap-3 px-4 py-3 flex-1 cursor-text">
        <i className="ri-map-pin-line text-lg text-accent shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-text">Location</span>
          <input
            ref={locationRef}
            type="text"
            placeholder="Where are you going?"
            className="bg-transparent text-sm text-text placeholder:text-text-muted/70
                       outline-none w-full"
          />
        </div>
      </label>

      {/* Distance */}
      <label className="flex items-center gap-3 px-4 py-3 flex-1 cursor-text">
        <i className="ri-map-pin-time-line text-lg text-accent shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-text">Distance</span>
          <input
            ref={distanceRef}
            type="number"
            placeholder="Distance km"
            className="bg-transparent text-sm text-text placeholder:text-text-muted/70
                       outline-none w-full"
          />
        </div>
      </label>

      {/* Max people */}
      <label className="flex items-center gap-3 px-4 py-3 flex-1 cursor-text">
        <i className="ri-group-line text-lg text-accent shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-text">Max People</span>
          <input
            ref={maxGroupSizeRef}
            type="number"
            placeholder="0"
            className="bg-transparent text-sm text-text placeholder:text-text-muted/70
                       outline-none w-full"
          />
        </div>
      </label>

      {/* Submit */}
      <button
        type="submit"
        aria-label="Search tours"
        className="flex items-center justify-center px-5 py-4 md:py-0
                   bg-accent text-white text-lg
                   hover:bg-accent-hover transition-colors
                   cursor-pointer"
      >
        <i className="ri-search-ai-line" />
      </button>
    </form>
  );
};

export default SearchBar;
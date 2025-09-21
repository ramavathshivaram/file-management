import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const t = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  useEffect(() => {
    if (!query.trim()) {
      setOpen(false);
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const delayDebounceFn = setTimeout(() => {
      try {
        // Simulate search filter
        const results = t.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setData(results);
        setOpen(true);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong!");
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <>
      <input
        type="search"
        placeholder="Search..."
        className="outline-none p-1 w-full rounded text-lg"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {open && (
        <div className="absolute top-10 left-0 bg-white w-full shadow rounded z-10">
          {loading && <p className="p-2">Loading...</p>}
          {error && <p className="p-2 text-red-500">{error}</p>}
          {!loading && !error && data.length === 0 && (
            <p className="p-2">No results found</p>
          )}
          <ul className="list">
            {!loading &&
              !error &&
              data.map((item, idx) => (
                <li key={idx} className="p-2 hover:bg-gray-50 cursor-pointer">
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;

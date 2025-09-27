"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get("filter[price_from]") ?? "";
  const initialTo = searchParams.get("filter[price_to]") ?? "";

  const [showDropdown, setShowDropdown] = useState(false);
  const [priceFrom, setPriceFrom] = useState(initialFrom);
  const [priceTo, setPriceTo] = useState(initialTo);

  // update state if URL changes externally
  useEffect(() => {
    setPriceFrom(searchParams.get("filter[price_from]") ?? "");
    setPriceTo(searchParams.get("filter[price_to]") ?? "");
  }, [searchParams]);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (priceFrom) params.set("filter[price_from]", priceFrom);
    else params.delete("filter[price_from]");

    if (priceTo) params.set("filter[price_to]", priceTo);
    else params.delete("filter[price_to]");

    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
    setShowDropdown(false);
  };

  const clearFilter = () => {
    setPriceFrom("");
    setPriceTo("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter[price_from]");
    params.delete("filter[price_to]");
    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="price-filter-wrapper">
      <button onClick={() => setShowDropdown(!showDropdown)}>Filter</button>

      {showDropdown && (
        <div className="price-filter-dropdown">
          <div>
            <label>
              From:{" "}
              <input
                type="number"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
              />
            </label>
          </div>
          <div>
            <label>
              To:{" "}
              <input
                type="number"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
              />
            </label>
          </div>
          <button onClick={applyFilter}>Apply</button>
        </div>
      )}
    </div>
  );
}

export function ActiveInfo() {
  const searchParams = useSearchParams();
  const priceFrom = searchParams.get("filter[price_from]");
  const priceTo = searchParams.get("filter[price_to]");

  const router = useRouter();

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter[price_from]");
    params.delete("filter[price_to]");
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  if (!priceFrom && !priceTo) return null;

  return (
    <div className="active-filter-info">
      <span>
        Price: {priceFrom ?? "0"} - {priceTo ?? "∞"}
      </span>
      <button onClick={clearFilter}>x</button>
    </div>
  );
}

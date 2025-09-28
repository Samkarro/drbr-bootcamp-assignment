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

  useEffect(() => {
    setPriceFrom(searchParams.get("filter[price_from]") ?? "");
    setPriceTo(searchParams.get("filter[price_to]") ?? "");
  }, [searchParams]);

  const applyFilter = () => {
    if (!priceFrom || !priceTo || Number(priceFrom) > Number(priceTo)) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("filter[price_from]", priceFrom);
    params.set("filter[price_to]", priceTo);
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

  const isInvalid =
    !priceFrom || !priceTo || Number(priceFrom) > Number(priceTo);

  return (
    <div className="price-filter-wrapper">
      <svg
        className="clickable"
        onClick={() => setShowDropdown(!showDropdown)}
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 6.5L20.25 6.5M10.5 6.5C10.5 7.32843 9.82843 8 9 8C8.17157 8 7.5 7.32843 7.5 6.5M10.5 6.5C10.5 5.67157 9.82843 5 9 5C8.17157 5 7.5 5.67157 7.5 6.5M3.75 6.5H7.5M10.5 18.5H20.25M10.5 18.5C10.5 19.3284 9.82843 20 9 20C8.17157 20 7.5 19.3284 7.5 18.5M10.5 18.5C10.5 17.6716 9.82843 17 9 17C8.17157 17 7.5 17.6716 7.5 18.5M3.75 18.5L7.5 18.5M16.5 12.5L20.25 12.5M16.5 12.5C16.5 13.3284 15.8284 14 15 14C14.1716 14 13.5 13.3284 13.5 12.5M16.5 12.5C16.5 11.6716 15.8284 11 15 11C14.1716 11 13.5 11.6716 13.5 12.5M3.75 12.5H13.5"
          stroke="#0F172A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <button
        className="filter-open-button clickable"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Filter
      </button>
      {showDropdown && (
        <div className="price-filter-dropdown">
          <div>
            <p className="filter-heading-prompt">Select price</p>
          </div>
          <div className="filter-inputs-container">
            <input
              className="filter-input"
              placeholder="From"
              value={priceFrom}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setPriceFrom(onlyNums);
              }}
              required
            />
            <input
              className="filter-input"
              placeholder="To"
              value={priceTo}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                setPriceTo(onlyNums);
              }}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="cta-button"
              onClick={applyFilter}
              style={{
                height: "41px",
                width: "124px",
                fontSize: "14px",
                cursor: isInvalid ? "not-allowed" : "pointer",
              }}
              disabled={isInvalid}
            >
              Apply
            </button>
          </div>
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
    <div style={{ width: "1720px", marginBottom: "26px" }}>
      <div className="active-filter-info">
        <p>
          Price: {priceFrom ?? "0"}-{priceTo ?? "∞"}
        </p>
        <svg
          className="clickable"
          style={{ marginLeft: "8px" }}
          onClick={clearFilter}
          width="8"
          height="7"
          viewBox="0 0 8 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.734835 0.234835C0.881282 0.0883883 1.11872 0.0883883 1.26517 0.234835L4 2.96967L6.73483 0.234835C6.88128 0.0883887 7.11872 0.0883888 7.26517 0.234835C7.41161 0.381282 7.41161 0.618719 7.26517 0.765165L4.53033 3.5L7.26517 6.23483C7.41161 6.38128 7.41161 6.61872 7.26517 6.76517C7.11872 6.91161 6.88128 6.91161 6.73483 6.76517L4 4.03033L1.26517 6.76517C1.11872 6.91161 0.881282 6.91161 0.734835 6.76517C0.588388 6.61872 0.588388 6.38128 0.734835 6.23483L3.46967 3.5L0.734835 0.765165C0.588388 0.618719 0.588388 0.381282 0.734835 0.234835Z"
            fill="#3E424A"
          />
        </svg>
      </div>
    </div>
  );
}

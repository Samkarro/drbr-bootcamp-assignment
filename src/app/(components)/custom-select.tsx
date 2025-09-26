"use client";
import { useState } from "react";

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function CustomSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-wrapper">
      <button
        type="button"
        className="select-trigger"
        onClick={() => setOpen(!open)}
      >
        {value}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <ul className="select-dropdown">
          {options.map((opt) => (
            <li
              key={opt}
              className="select-option"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

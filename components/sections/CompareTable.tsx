"use client";

import { COMPARE } from "@/content/site";

export default function CompareTable() {
  return (
    <section className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[14px]">
        <h2 className="text-[26px] font-serif font-bold text-text">{COMPARE.title}</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">{COMPARE.subtext}</p>
      </div>

      <div className="compare-hint inline-flex items-center gap-[6px] mb-[10px] text-[12px] font-bold text-gold-deep bg-[rgba(184,134,46,0.08)] rounded-full px-[10px] py-[7px]">
        {COMPARE.swipeHint}
      </div>

      <div className="compare-wrap overflow-x-auto border border-line rounded-[14px] bg-surface shadow-sm no-scrollbar">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-[rgba(184,134,46,0.04)]">
              <th className="p-[11px_12px] text-left text-[14px] font-serif font-bold text-gold-deep border-b border-line w-[120px] sticky left-0 bg-surface z-10">
                Package
              </th>
              {COMPARE.columns.map((col, idx) => (
                <th
                  key={idx}
                  className="p-[11px_12px] text-left text-[14px] font-serif font-bold text-gold-deep border-b border-line whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`border-b border-line ${
                  rIdx % 2 === 1 ? "bg-[rgba(251,245,234,0.3)]" : ""
                } last:border-b-0`}
              >
                <th
                  scope="row"
                  className="p-[11px_12px] text-left text-[12.5px] font-bold text-text border-b border-line whitespace-nowrap sticky left-0 bg-surface z-10 border-r border-line/40"
                >
                  {row.label}
                </th>
                {row.values.map((val, cIdx) => (
                  <td
                    key={cIdx}
                    className="p-[11px_12px] text-left text-[12.5px] text-muted border-b border-line"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

"use client";

import { allProjectTags, type ProjectTagId } from "@/content/projects";

type TagFilterProps = {
  selectedIds: ProjectTagId[];
  onChange: (tags: ProjectTagId[]) => void;
};

const base =
  "rounded-full border px-3 py-1 text-xs font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent/50";
const inactive =
  "border-border bg-elevated/50 text-muted hover:border-accent/40 hover:text-foreground";
const active = "border-accent/50 bg-accent/20 text-accent-bright";

export function TagFilter({ selectedIds, onChange }: TagFilterProps) {
  function toggle(id: ProjectTagId) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((x) => x !== id));
      return;
    }
    onChange([...selectedIds, id]);
  }

  return (
    <div
      className="flex flex-wrap justify-center gap-2"
      role="group"
      aria-label="Filter by tag"
    >
      <button
        type="button"
        className={`${base} ${selectedIds.length === 0 ? active : inactive}`}
        aria-pressed={selectedIds.length === 0}
        onClick={() => onChange([])}
      >
        All
      </button>
      {allProjectTags.map((tag) => {
        const isSelected = selectedIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            className={`${base} ${isSelected ? active : inactive}`}
            aria-pressed={isSelected}
            onClick={() => toggle(tag.id)}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}

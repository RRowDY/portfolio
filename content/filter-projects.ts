import type { ProjectSummary, ProjectTagId } from "@/content/projects";
export function filterProjectsByTags(
  list: readonly ProjectSummary[],
  selectedTagIds: readonly ProjectTagId[],
): readonly ProjectSummary[] {
  if (selectedTagIds.length === 0) return list;
  return list.filter((project) =>
    project.tags.some((tagId) => selectedTagIds.includes(tagId)),
  );
}

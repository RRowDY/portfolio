import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ProjectSummary } from "./projects.ts";
import { filterProjectsByTags } from "./filter-projects.ts";
const projects = [
  {
    slug: "one",
    title: "One",
    shortDescription: "First",
    tags: ["software", "web"],
    thumbnail: { src: "/a.png", alt: "A" },
  },
  {
    slug: "two",
    title: "Two",
    shortDescription: "Second",
    tags: ["graphics", "web"],
    thumbnail: { src: "/b.png", alt: "B" },
  },
] satisfies ProjectSummary[];
describe("filterProjectsByTags", () => {
  it("returns every project when no tag is selected", () => {
    assert.deepEqual(filterProjectsByTags(projects, []), projects);
  });
  it("matches any selected tag", () => {
    assert.deepEqual(
      filterProjectsByTags(projects, ["software"]).map(
        (project) => project.slug,
      ),
      ["one"],
    );
    assert.deepEqual(
      filterProjectsByTags(projects, ["software", "graphics"]).map(
        (project) => project.slug,
      ),
      ["one", "two"],
    );
  });
  it("returns an empty list when nothing matches", () => {
    const onlyGraphics = projects.filter((project) =>
      project.tags.includes("graphics"),
    );
    assert.deepEqual(filterProjectsByTags(onlyGraphics, ["software"]), []);
  });
});

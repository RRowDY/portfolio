import { getTechById, type TechCategoryId } from "@/content/tech";

const modalCategories = [
  "frontend",
  "backend",
  "tools",
] as const satisfies readonly TechCategoryId[];

const categoryLabels: Record<TechCategoryId, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Workflow",
};

type TechStackProps = {
  techIds: string[];
};

export function TechStack({ techIds }: TechStackProps) {
  const items = techIds
    .map((id) => getTechById(id))
    .filter((item) => item !== undefined);

  const groups = modalCategories
    .map((category) => ({
      category,
      title: categoryLabels[category],
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 text-left">
      {groups.map((group) => (
        <div key={group.category}>
          <h3 className="mb-2 text-sm text-muted">{group.title}</h3>
          <ul className="flex flex-wrap gap-2" role="list">
            {" "}
            {group.items.map((item) => (
              <li key={item.id} role="listitem">
                <span className="group/tech inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 py-1.5 text-sm text-foreground transition-[background-color,border-color] duration-200 hover:border-accent/40 hover:bg-accent/10 motion-reduce:transition-none">
                  {" "}
                  <item.Icon
                    className="size-4 shrink-0 text-muted transition-colors duration-200 group-hover/tech:text-accent-bright motion-reduce:transition-none"
                    aria-hidden
                  />
                  {item.name}
                </span>{" "}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

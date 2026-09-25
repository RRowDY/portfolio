import { TechIconTile } from "@/components/tech-icon-tile";
import {
    getTechById,
    techCategoryTitles,
    type TechCatalogItem,
    type TechCategoryId,
} from "@/content/tech";

const modalCategories = ["frontend", "backend", "tools"] as const satisfies readonly TechCategoryId[];

type TechStackProps = {
    techIds: string[];
};

export function TechStack({ techIds }: TechStackProps) {
    const items = techIds
        .map((id) => getTechById(id))
        .filter((item): item is TechCatalogItem => item !== null);

    const groups = modalCategories
        .map((category) => ({
            category,
            title: techCategoryTitles[category],
            items: items.filter((item) => item.category === category),
        }))
        .filter((group) => group.items.length > 0);

    if (groups.length === 0) return null;

    return (
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            {groups.map((group) => (
                <div key={group.category}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                        {group.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-3 pb-10" role="list">
                        {group.items.map((item) => (
                            <li key={item.id} role="listitem">
                                <TechIconTile name={item.name} Icon={item.Icon} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
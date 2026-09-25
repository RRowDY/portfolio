import type { IconType } from "react-icons";
type TechIconTileProps = {
  name: string;
  Icon: IconType;
};
export function TechIconTile({ name, Icon }: TechIconTileProps) {
  return (
    <div className="group relative flex flex-col items-center" aria-label={name}>
      <div
        className={[
          "flex size-16 items-center justify-center rounded-xl border border-transparent",
          "text-muted transition-[transform,color,border-color,box-shadow] duration-200 ease-in-out",
          "group-hover:scale-105 group-hover:border-accent group-hover:text-accent",
          "group-focus-within:scale-105 group-focus-within:border-accent group-focus-within:text-accent",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        ].join(" ")}
      >
        <Icon className="size-8 shrink-0" aria-hidden />
      </div>
      <span
        className={[
          "pointer-events-none absolute top-full z-10 mt-2 whitespace-nowrap rounded-md",
          "border border-border bg-elevated px-2.5 py-1 text-sm font-medium text-foreground",
          "opacity-0 transition-[opacity,transform] duration-200 ease-in-out",
          "translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:translate-y-0",
          "motion-reduce:transition-none",
        ].join(" ")}
        aria-hidden
      >
        {name}
      </span>
    </div>
  );
}
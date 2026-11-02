function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-violet-700">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-[28px]">{title}</h2>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  );
}

export default PageHeading;

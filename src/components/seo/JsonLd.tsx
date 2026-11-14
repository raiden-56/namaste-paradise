/** Server-rendered JSON-LD block. */
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown> | null> | null }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!list.length) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; escape "<" to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(list.length === 1 ? list[0] : list).replace(/</g, '\\u003c') }}
    />
  );
}

/**
 * Renders a schema.org @graph as a single JSON-LD <script>.
 * Server component — zero client JS.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `</script>` inside JSON breaks the DOM; the replace keeps output safe.
      // Avoid HTML injection through structured data (OWASP/reviewer feedback).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

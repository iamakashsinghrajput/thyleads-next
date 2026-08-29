/**
 * Structured data, emitted as a script tag.
 *
 * `dangerouslySetInnerHTML` is required — React escapes text children, which
 * would turn the JSON into entity-encoded gibberish that no parser reads. The
 * payload is our own object, never user input, so there is nothing to inject.
 *
 * The `<` escape guards the one case that still bites: a string containing
 * "</script>" would close the tag early and break the page.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

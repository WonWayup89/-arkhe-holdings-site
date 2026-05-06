// Legacy /media route. The "Media & Community" vertical was rebranded to
// Arkhe Education and now lives at /education. We keep a permanent redirect
// here in addition to the rule in next.config.ts so deep links and crawlers
// always end up on the right page.

import { permanentRedirect } from "next/navigation";

export default function MediaLegacyRedirect() {
  permanentRedirect("/education");
}

import type { ReactNode } from 'react';

/** Re-mounts on every navigation — a short CSS fade gives page transitions without blocking content. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}

import type { SyntheticEvent } from "react";

export function witchOnDirectClick(
  func: () => void
): (e: SyntheticEvent) => void {
  return (e: SyntheticEvent) =>
    e.target === e.currentTarget ? func() : undefined;
}

import type { ChangeEvent } from "react";

export function withOnChange(
  func: (state: string) => void
): (e: ChangeEvent<HTMLInputElement>) => void {
  return (e) => {
    func(e.target.value);
  };
}

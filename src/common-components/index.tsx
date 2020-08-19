import React, { ReactElement } from "react";
import { ImgErrorPlaceholder } from "./styled";

export function ImgError({ size }: { size: string }): ReactElement {
  return (
    <ImgErrorPlaceholder size={size}>
      <p>Ooops! </p>
      <p>YouTube API quota limit is really low those days :)</p>
    </ImgErrorPlaceholder>
  );
}

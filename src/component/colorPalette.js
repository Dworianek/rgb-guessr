import React, { useEffect, useState } from "react";

import "../style/Palette.css";

let isDisabled = true;

function colorPalette(props) {
  return (
    <div
      disabled={true}
      onClick={() => props.handler(props.paletP)}
      className="paletteElement"
      style={{ backgroundColor: props.paletP }}
    ></div>
  );
}

export default colorPalette;

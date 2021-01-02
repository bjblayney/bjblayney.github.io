import React, { useState } from "react";
import "../styles/tip.css";

import { Pane, Heading, TextInputField } from "evergreen-ui";

function Tip() {
  const [withTip, setWithTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [tip, setTip] = useState(20);
  const calculateTip = (total, tipPercent = 0.2) => {
    // console.log(total, tipPercent);
    // console.log(parseFloat(total) + parseFloat(total) * parseFloat(tipPercent));
    setWithTip(parseFloat(total) + parseFloat(total) * parseFloat(tipPercent));
  };

  return (
    <div className="tipForm">
      <Pane
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        padding={16}
        background="tint2"
        borderRadius={3}
        margin={12}
      >
        <Pane justifyContent="center" display="flex">
          <Heading size={600} padding={16}>
            Tip Well.
          </Heading>
        </Pane>
        <Pane justifyContent="left" display="flex">
          <TextInputField
            label="Bill Total"
            placeholder="0"
            value={total}
            onChange={(e) => {
              calculateTip(e.target.value, tip / 100);
              setTotal(e.target.value);
            }}
          />
        </Pane>
        <Pane justifyContent="center" display="flex">
          <TextInputField
            label="Tip Percentage"
            hint="Default 20%"
            placeholder="20"
            value={tip}
            onChange={(e) => {
              calculateTip(total, e.target.value / 100);
              setTip(e.target.value);
            }}
          />
        </Pane>
        <Pane justifyContent="center" display="flex">
          <Heading size={600}>{withTip}</Heading>
        </Pane>
      </Pane>
    </div>
  );
}

export default Tip;

import React, { useState } from "react";
import "../styles/tip.css";

import { Pane, Heading, TextInputField } from "evergreen-ui";

function Tip() {
  const [withTip, setWithTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [peeps, setPeeps] = useState(1);
  const [tip, setTip] = useState(20);
  const calculateTip = (total, tipPercent = 0.2, peeps = 1) => {
    let intial = parseFloat(total) + parseFloat(total) * parseFloat(tipPercent);
    let final = intial / peeps;
    setWithTip(final);
  };

  return (
    <div className="tipForm">
      <Pane
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        padding={24}
        background="tint2"
        borderRadius={3}
        margin={12}
      >
        <Pane display="flex">
          <Heading size={800} paddingBottom={16}>
            Tip well.
          </Heading>
        </Pane>
        <Pane display="flex">
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
        <Pane display="flex">
          <TextInputField
            label="Tip Percentage"
            hint="Default 20%"
            placeholder="20"
            type="number"
            value={tip}
            onChange={(e) => {
              calculateTip(total, e.target.value / 100);
              setTip(e.target.value);
            }}
          />
        </Pane>
        <Pane display="flex">
          <TextInputField
            label="# of Peeps"
            placeholder="1"
            type="number"
            value={peeps < 1 ? 1 : peeps}
            onChange={(e) => {
              calculateTip(
                total,
                tip / 100,
                e.target.value < 1 ? 1 : e.target.value
              );
              setPeeps(e.target.value < 1 ? 1 : e.target.value);
            }}
          />
        </Pane>
        <Pane display="flex">
          <Heading size={800}>
            Tip:{" "}
            {parseFloat(
              (parseFloat(total) * (parseFloat(tip) / 100)) / peeps
            ).toFixed(2) > 0
              ? parseFloat(
                  (parseFloat(total) * (parseFloat(tip) / 100)) / peeps
                ).toFixed(2)
              : 0}
          </Heading>
        </Pane>
        <Pane display="flex">
          <Heading size={800}>Total: {parseFloat(withTip).toFixed(2)}</Heading>
        </Pane>
      </Pane>
    </div>
  );
}

export default Tip;

import React, { useState } from 'react';
import '../styles/tip.css';

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
      <div className="item">
        <input
          label="Bill Total"
          placeholder="0"
          marginBottom={0}
          value={total}
          onChange={(e) => {
            calculateTip(e.target.value, tip / 100);
            setTotal(e.target.value);
          }}
        />

        <input
          label="Tip Percentage"
          hint="Default 20%"
          placeholder="20"
          type="number"
          marginBottom={0}
          value={tip}
          onChange={(e) => {
            calculateTip(total, e.target.value / 100);
            setTip(e.target.value);
          }}
        />
        <input
          label="# of Peeps"
          placeholder="1"
          type="number"
          marginBottom={0}
          value={peeps < 1 ? 1 : peeps}
          onChange={(e) => {
            calculateTip(total, tip / 100, e.target.value < 1 ? 1 : e.target.value);
            setPeeps(e.target.value < 1 ? 1 : e.target.value);
          }}
        />
      </div>
      <div className="item">
        <h2>
          Tip:{' '}
          {parseFloat((parseFloat(total) * (parseFloat(tip) / 100)) / peeps).toFixed(2) > 0
            ? parseFloat((parseFloat(total) * (parseFloat(tip) / 100)) / peeps).toFixed(2)
            : 0}
        </h2>

        <h2>Total: {parseFloat(withTip).toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Tip;

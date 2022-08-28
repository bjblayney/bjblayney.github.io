import React, { useState } from 'react';
import '../styles/tip.css';

function Tip() {
  const [withTip, setWithTip] = useState(0);
  const [total, setTotal] = useState('');
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
        <label>
          Bill Total
          <input
            placeholder="0"
            value={total}
            onChange={(e) => {
              calculateTip(e.target.value, tip / 100, peeps < 1 ? 1 : peeps);
              setTotal(e.target.value);
            }}
          />
        </label>
        <label>
          Tip Percentage
          <input
            hint="Default 20%"
            placeholder="20"
            type="number"
            value={tip}
            onChange={(e) => {
              calculateTip(total, e.target.value / 100, peeps < 1 ? 1 : peeps);
              setTip(e.target.value);
            }}
          />
        </label>
        <label>
          # of Peeps
          <input
            placeholder="1"
            type="number"
            value={peeps < 1 ? 1 : peeps}
            onChange={(e) => {
              calculateTip(total, tip / 100, e.target.value < 1 ? 1 : e.target.value);
              setPeeps(e.target.value < 1 ? 1 : e.target.value);
            }}
          />
        </label>
      </div>
      <div className="item">
        <h2>
          Tip {peeps > 1 && 'each'}:{' '}
          {parseFloat((parseFloat(total) * (parseFloat(tip) / 100)) / peeps).toFixed(2) > 0
            ? parseFloat((parseFloat(total) * (parseFloat(tip) / 100)) / peeps).toFixed(2)
            : 0}
        </h2>

        <h2>
          Total {peeps > 1 && 'each'}: {parseFloat(withTip).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default Tip;

import React from 'react';
import './index.scss';

function Console({ enabled = true, output = [], onInput = () => {} }) {
  return (
    <div className="Console">
      <input
        type="text"
        className="input"
        disabled={!enabled}
        title={!enabled ? 'No further inputs allowed.' : undefined}
        onKeyPress={e => {
          if (!enabled) {
            e.preventDefault();
            return false;
          }
          if (e.charCode === 13 && enabled) {
            e.preventDefault();
            onInput(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <div className="output">
        {output.map((line, i) => (
          <div className="line" key={`line-${i}`}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default Console;

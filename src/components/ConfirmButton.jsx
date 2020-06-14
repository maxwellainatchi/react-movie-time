import React, { useState } from "react";

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export default ({ title, onClick }) => {
  const [isConfirming, setConfirming] = useState(false);

  return (
    <button
      onClick={async () => {
        if (isConfirming) {
          onClick();
          setConfirming(false);
          return;
        }
        setConfirming(true);
        await sleep(3000);
        setConfirming(false);
      }}
    >
      {isConfirming ? `Confirm` : title}
    </button>
  );
};

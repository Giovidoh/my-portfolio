'use client';

const PrintButton = () => (
  <button className="btn btn-primary btn-sm" type="button" onClick={() => window.print()}>
    Print / Save PDF
  </button>
);

export default PrintButton;

'use client';

const PrintButton = ({ label = 'Print / Save PDF' }: { label?: string }) => (
  <button className="btn btn-primary btn-sm" type="button" onClick={() => window.print()}>
    {label}
  </button>
);

export default PrintButton;

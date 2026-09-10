'use client';

/** The short label takes over on narrow screens — see .cv__print-* in the page's CSS. */
const PrintButton = ({
  label = 'Print / Save PDF',
  shortLabel = 'PDF',
}: {
  label?: string;
  shortLabel?: string;
}) => (
  <button
    className="btn btn-primary btn-sm"
    type="button"
    aria-label={label}
    onClick={() => window.print()}
  >
    <span className="cv__print-full">{label}</span>
    <span className="cv__print-short">{shortLabel}</span>
  </button>
);

export default PrintButton;

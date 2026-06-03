const DO_WHAT = [
  {
    k: '01',
    h: 'Product engineering',
    p: 'End-to-end features — schema, API, UI, tests, ship.',
  },
  {
    k: '02',
    h: 'Interface & design systems',
    p: 'Accessible, reusable components teams actually enjoy using.',
  },
  {
    k: '03',
    h: 'Performance & DX',
    p: 'Fast pages, clean codebases, tooling that gets out of the way.',
  },
];

const About = () => (
  <section className="section wrap" id="about">
    <div className="about__grid">
      <div className="about__intro reveal">
        <span className="eyebrow">About</span>
        <p className="about__lead" style={{ marginTop: 'var(--s-5)' }}>
          I&apos;m a developer who cares as much about <span className="hl">how it feels</span> as
          how it works.
        </p>
      </div>
      <div className="about__body reveal" data-d="1">
        <p>
          Based in Paris, I&apos;ve spent the last six years building web products for startups and
          agencies — shipping everything from design systems and dashboards to high-traffic
          marketing sites. I&apos;m happiest in the seam between design and engineering, turning
          sharp ideas into things that load fast and feel effortless.
        </p>
        <p>
          Right now I&apos;m looking for a full-stack role on a small, ambitious team that sweats
          the details and ships often.
        </p>
        <ul className="dowhat">
          {DO_WHAT.map((d) => (
            <li key={d.k}>
              <span className="k">{d.k}</span>
              <div>
                <h4>{d.h}</h4>
                <p>{d.p}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default About;

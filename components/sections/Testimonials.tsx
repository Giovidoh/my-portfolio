type Quote = {
  text: string;
  name: string;
  role: string;
  delay?: '1' | '2';
};

const QUOTES: Quote[] = [
  {
    text: 'Cir-Giovanni is the rare engineer who can own a feature from the database to the typography. Our product got measurably faster and noticeably more beautiful.',
    name: 'Marie Lefèvre',
    role: 'CTO, Northwind Studio',
  },
  {
    text: 'He shipped our entire client platform almost single-handedly, on time, and was a joy to work with. I’d hire him again in a heartbeat.',
    name: 'Thomas Bähr',
    role: 'Founder, Atelier Onze',
    delay: '1',
  },
  {
    text: 'Thoughtful, fast, and genuinely cares about accessibility and craft. The kind of teammate who quietly raises the bar for everyone.',
    name: 'Aïcha N’Diaye',
    role: 'Product Lead, Verdant',
    delay: '2',
  },
];

const Testimonials = () => (
  <section className="section wrap">
    <div className="section-head reveal">
      <div>
        <span className="eyebrow">Kind words</span>
        <h2 style={{ marginTop: 'var(--s-4)' }}>What people say</h2>
      </div>
    </div>
    <div className="quotes">
      {QUOTES.map((q) => (
        <figure className="quote reveal" key={q.name} data-d={q.delay}>
          <div className="mark">&ldquo;</div>
          <p>{q.text}</p>
          <figcaption className="quote__who">
            <span className="ph quote__av" />
            <div>
              <div className="n">{q.name}</div>
              <div className="r">{q.role}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;

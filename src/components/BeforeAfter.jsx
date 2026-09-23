import './BeforeAfter.css';

const timeline = [
  {
    time: '08:14:03',
    type: 'before',
    title: 'Manual production scheduling',
    body: 'Planners email Excel sheets to shop-floor supervisors. Version conflicts cause 3–4 re-schedules per week. Lead times bloat by 40%.',
    tags: ['Manufacturing', 'Operations'],
  },
  {
    time: '08:14:03',
    type: 'after',
    title: 'Automated MRP & shop-floor routing',
    body: 'Odoo MRP auto-schedules work orders based on live BOM, capacity, and material availability. Lead times reduced 38%. Zero version conflicts.',
    tags: ['Manufacturing', 'MRP'],
  },
  {
    time: '10:22:47',
    type: 'before',
    title: 'Purchase orders in three different systems',
    body: 'Procurement team manually reconciles POs from SAP, Tally, and email threads. Month-end closing takes 6 days and is error-prone.',
    tags: ['Finance', 'Procurement'],
  },
  {
    time: '10:22:47',
    type: 'after',
    title: 'Unified procurement & vendor portal',
    body: 'Single Odoo source. Vendors self-serve on a portal. Automated 3-way match (PO → Receipt → Invoice). Month-end closing down to 1 day.',
    tags: ['Finance', 'Automation'],
  },
  {
    time: '13:05:19',
    type: 'before',
    title: 'Inventory blind spots across warehouses',
    body: '4 warehouses, 4 spreadsheets. Stock-outs cause production stoppages twice a month. Excess inventory ties up ₹1.2Cr in working capital.',
    tags: ['Inventory', 'Warehouse'],
  },
  {
    time: '13:05:19',
    type: 'after',
    title: 'Real-time multi-warehouse inventory',
    body: 'Odoo\'s real-time lot/serial tracking across all locations. Automated reorder rules. Stock-outs eliminated. Working capital freed by 28%.',
    tags: ['Inventory', 'WMS'],
  },
  {
    time: '15:40:02',
    type: 'before',
    title: 'Customer quotes take 3 days',
    body: 'Sales team manually pulls BOM costs, margin tables, and shipping rates from different tools. Quotes arrive after competitor quotes are accepted.',
    tags: ['Sales', 'CRM'],
  },
  {
    time: '15:40:02',
    type: 'after',
    title: 'One-click professional quotations',
    body: 'Odoo Sales auto-populates BOMs, costs, and custom pricing rules. Quotes sent in 20 minutes. Win rate improved 22% in 6 months.',
    tags: ['Sales', 'CRM'],
  },
  {
    time: '17:59:58',
    type: 'before',
    title: 'Compliance & traceability is a fire drill',
    body: 'Audit requests require manual lot tracking across paper records. ISO audit prep costs 40 man-hours. Recall readiness: zero.',
    tags: ['Compliance', 'Construction'],
  },
  {
    time: '17:59:58',
    type: 'after',
    title: 'Full traceability in 3 clicks',
    body: 'Odoo\'s lot/serial traceability gives regulators a full downstream/upstream chain instantly. ISO audit prep reduced to 2 hours.',
    tags: ['Compliance', 'Quality'],
  },
];

const tagColors = {
  Manufacturing: { bg: '#dbeafe', color: '#1d4ed8' },
  Operations: { bg: '#f3e8ff', color: '#7c3aed' },
  Finance: { bg: '#dcfce7', color: '#15803d' },
  Procurement: { bg: '#fef9c3', color: '#b45309' },
  Inventory: { bg: '#ffedd5', color: '#c2410c' },
  Warehouse: { bg: '#fce7f3', color: '#be185d' },
  Sales: { bg: '#e0f2fe', color: '#0369a1' },
  CRM: { bg: '#d1fae5', color: '#065f46' },
  Compliance: { bg: '#fee2e2', color: '#b91c1c' },
  Construction: { bg: '#fef3c7', color: '#92400e' },
  MRP: { bg: '#dbeafe', color: '#1e40af' },
  Automation: { bg: '#dcfce7', color: '#166534' },
  WMS: { bg: '#ffedd5', color: '#9a3412' },
  Quality: { bg: '#f0fdf4', color: '#15803d' },
};

function TagBadge({ tag }) {
  const style = tagColors[tag] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span className="ba-tag" style={{ background: style.bg, color: style.color }}>
      {tag}
    </span>
  );
}

export default function BeforeAfter() {
  const pairs = [];
  for (let i = 0; i < timeline.length; i += 2) {
    pairs.push({ before: timeline[i], after: timeline[i + 1] });
  }

  return (
    <section className="ba section-gray" id="before-after" aria-label="Before and After Odoo">
      <div className="container">
        {/* Header */}
        <div className="ba__header">
          <div className="eyebrow">The Transformation</div>
          <h2 className="ba__title">
            Before Odoo → After Odoo
          </h2>
          <p className="ba__sub">
            Real pain points from real manufacturers — and exactly how Odoo with Jupical fixed them.
          </p>
        </div>

        {/* Column headers */}
        <div className="ba__cols-header">
          <div className="ba__col-label ba__col-label--before">
            <span className="ba__col-dot ba__col-dot--red"/>
            <span>BEFORE — What Failed</span>
          </div>
          <div className="ba__col-label ba__col-label--after">
            <span className="ba__col-dot ba__col-dot--green"/>
            <span>AFTER — What Held</span>
          </div>
        </div>

        {/* Timeline rows */}
        <div className="ba__log">
          {pairs.map((pair, idx) => (
            <div className="ba__row" key={idx} id={`ba-row-${idx}`}>
              {/* Timestamp */}
              <div className="ba__timestamp" aria-label="Event timestamp">
                <span className="ba__time">{pair.before.time}</span>
                <div className="ba__timestamp-line"/>
              </div>

              {/* Before card */}
              <div className="ba__card ba__card--before">
                <div className="ba__card-top">
                  <span className="ba__indicator ba__indicator--before">BEFORE</span>
                </div>
                <h3 className="ba__card-title">{pair.before.title}</h3>
                <p className="ba__card-body">{pair.before.body}</p>
                <div className="ba__card-tags">
                  {pair.before.tags.map((t) => <TagBadge key={t} tag={t} />)}
                </div>
              </div>

              {/* Arrow */}
              <div className="ba__arrow" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="15" fill="var(--brand-blue)" fillOpacity="0.08" stroke="var(--brand-blue)" strokeOpacity="0.3" strokeWidth="1"/>
                  <path d="M10 16h12M18 12l4 4-4 4" stroke="var(--brand-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* After card */}
              <div className="ba__card ba__card--after">
                <div className="ba__card-top">
                  <span className="ba__indicator ba__indicator--after">AFTER</span>
                </div>
                <h3 className="ba__card-title">{pair.after.title}</h3>
                <p className="ba__card-body">{pair.after.body}</p>
                <div className="ba__card-tags">
                  {pair.after.tags.map((t) => <TagBadge key={t} tag={t} />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="ba__cta">
          <a href="#contact" id="ba-cta-btn" className="btn-primary">
            Start Your Transformation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

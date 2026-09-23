import './Clients.css';

// The EXACT 27 Client Logos extracted from the reference sheet
const allClients = [
  { name: 'Luxuria', src: '/clients/luxuria.png', label: 'Luxuria' },
  { name: 'PROCOM', src: '/clients/procom.png', label: 'Procom' },
  { name: 'POWERPACE', src: '/clients/powerpace.png', label: 'Powerpace' },
  { name: 'Millennium', src: '/clients/millennium.png', label: 'Millennium' },
  { name: 'Travenza', src: '/clients/travenza.png', label: 'Travenza' },
  { name: 'SRN Integrated', src: '/clients/srn_integrated.png', label: 'SRN Integrated' },
  { name: 'Heben Cranes', src: '/clients/heben.png', label: 'Heben Cranes' },
  { name: 'RotoRiko', src: '/clients/rotoriko.png', label: 'RotoRiko' },
  { name: 'SRP', src: '/clients/srp.png', label: 'SRP' },
  { name: 'ALLFOLD', src: '/clients/allfold.png', label: 'Allfold' },
  { name: 'Antra', src: '/clients/antra.png', label: 'Antra' },
  { name: 'Emblem', src: '/clients/emblem.png', label: 'Emblem' },
  { name: 'Green Hexagon', src: '/clients/green_hexagon.png', label: 'Green Hexagon' },
  { name: 'Shiksha Guru', src: '/clients/shiksha_guru.png', label: 'Shiksha Guru' },
  { name: 'Brixton', src: '/clients/brixton.png', label: 'Brixton' },
  { name: 'Indus Aushadhi', src: '/clients/indus.png', label: 'Indus' },
  { name: 'CitaGlobal', src: '/clients/citaglobal.png', label: 'CitaGlobal' },
  { name: 'IFSB', src: '/clients/ifsb.png', label: 'IFSB' },
  { name: 'H Logo', src: '/clients/h_logo.png', label: 'H Logo' },
  { name: 'IndiaFinds', src: '/clients/indiafinds.png', label: 'IndiaFinds' },
  { name: 'Shivansh', src: '/clients/shivansh.png', label: 'Shivansh' },
  { name: 'Baldertech', src: '/clients/baldertech.png', label: 'Baldertech' },
  { name: 'Ehsaas', src: '/clients/ehsaas.png', label: 'Ehsaas' },
  { name: 'MIT-MUT', src: '/clients/mit_mut.png', label: 'MIT-MUT' },
  { name: '42Gears', src: '/clients/gears42.png', label: '42Gears' },
  { name: 'eTeki', src: '/clients/eteki.png', label: 'eTeki' },
  { name: 'Crest', src: '/clients/crest.png', label: 'Crest' },
];

const marqueeClients = [...allClients, ...allClients];

export default function Clients() {
  return (
    <section className="clients section-white" id="clients" aria-label="Our Clients">
      <div className="container clients__header-container">
        {/* Header */}
        <div className="clients__header">
          <div className="eyebrow-pill clients__eyebrow-pill">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0075FA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>OUR CLIENTS</span>
          </div>

          <h2 className="clients__title">
            Trusted by <span className="text-blue-accent">Leading Brands</span> Worldwide
          </h2>
          <p className="clients__sub">
            We are proud to partner with innovative companies delivering excellence across the globe.
          </p>
        </div>
      </div>

      {/* Main Continuous Marquee Showcase */}
      <div className="clients__showcase-stage">
        {/* Continuous Horizontal Marquee Container */}
        <div className="clients__marquee-container">
          <div className="clients__marquee-track">
            {marqueeClients.map((client, idx) => (
              <div key={`${client.name}-${idx}`} className="clients__item">
                <div className="clients__card" title={client.name}>
                  <img 
                    src={client.src} 
                    alt={client.name} 
                    className="clients__card-img" 
                    loading="eager"
                  />
                </div>
                <span className="clients__company-name">{client.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

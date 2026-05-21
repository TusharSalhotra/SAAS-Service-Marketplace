import { ArrowRight, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import SectionCard from '../../components/layout/section-card';
import Button from '../../components/ui/button';
import StatusBadge from '../../components/ui/status-badge';
import { enrollmentSteps, offices, operationalQueue, platformMetrics, roleCards, services } from '../../data/marketplace-data';

export default function Marketplace() {
  return (
    <div className="page-stack">
      <section className="workspace-hero">
        <div>
          <p className="eyebrow">Service marketplace</p>
          <h2>Multi-tenant office, service, payment, and approval command center</h2>
          <p>Super admins can approve offices, monitor GMV, track the 15% platform fee, and oversee services, clients, bookings, payouts, and audit-sensitive operations.</p>
        </div>
        <div className="hero-actions">
          <Button icon={<CheckCircle2 size={18} />}>Approve Queue</Button>
          <Button variant="outline" icon={<ArrowRight size={18} />}>Open Portal</Button>
        </div>
      </section>

      <div className="metrics-grid">
        {platformMetrics.map(({ Icon, ...metric }) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-icon"><Icon size={20} /></span>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.detail}</small>
            <b>{metric.trend}</b>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Operational Queue">
          <div className="queue-list">
            {operationalQueue.map((item) => (
              <div key={item.label}>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </div>
                <span>{item.value}</span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Role Model">
          <div className="role-grid">
            {roleCards.map(({ Icon, ...role }) => (
              <article key={role.role}>
                <Icon size={18} />
                <strong>{role.role}</strong>
                <p>{role.description}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <section className="table-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Office listing</p>
            <h2>Registration Form and tenant management</h2>
          </div>
          <div className="table-tools">
            <button title="Search"><Search size={18} /></button>
            <button title="Filters"><SlidersHorizontal size={18} /></button>
          </div>
        </div>
        <div className="data-table">
          <div className="table-row table-head">
            <span>Office</span>
            <span>Owner</span>
            <span>City</span>
            <span>Revenue</span>
            <span>Clients</span>
            <span>Status</span>
          </div>
          {offices.map((office) => (
            <div className="table-row" key={office.name}>
              <strong>{office.name}</strong>
              <span>{office.owner}</span>
              <span>{office.city}</span>
              <span>{office.revenue}</span>
              <span>{office.clients}</span>
              <StatusBadge status={office.status} />
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <SectionCard title="Registration Form Workflow">
          <div className="step-list">
            {enrollmentSteps.map(({ Icon, ...step }) => (
              <article key={step.title}>
                <Icon size={18} />
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Published Services">
          <div className="service-list">
            {services.map((service) => (
              <article key={service.name}>
                <div>
                  <strong>{service.name}</strong>
                  <small>{service.office} · {service.category}</small>
                </div>
                <span>{service.price}</span>
                <small>{service.duration}</small>
                <b>{service.purchases} sold</b>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

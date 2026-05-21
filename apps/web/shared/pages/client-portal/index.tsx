import { CalendarDays, Clock, CreditCard, ReceiptText, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/button';
import { checkoutSummary, services } from '../../data/marketplace-data';

const platformFee = checkoutSummary.subtotal * checkoutSummary.platformFeeRate;
const officeGross = checkoutSummary.subtotal - platformFee;

export default function ClientPortal() {
  return (
    <div className="client-portal">
      <section className="portal-hero">
        <div>
          <p className="eyebrow">Luma Beauty Lounge</p>
          <h2>Book services and pay securely from the office portal</h2>
          <p>Clients can browse published services, pick availability, pay through checkout, and receive receipts while the platform records commission and payout details.</p>
        </div>
        <Button icon={<CalendarDays size={18} />}>Book Now</Button>
      </section>

      <div className="portal-layout">
        <section className="catalog-grid">
          {services.map((service) => (
            <article className="service-card" key={service.name}>
              <span>{service.category}</span>
              <h3>{service.name}</h3>
              <p>{service.office}</p>
              <div>
                <strong>{service.price}</strong>
                <small><Clock size={14} /> {service.duration}</small>
              </div>
              <Button variant="secondary">Select Service</Button>
            </article>
          ))}
        </section>

        <aside className="checkout-panel">
          <div>
            <p className="eyebrow">Checkout</p>
            <h2>{checkoutSummary.service}</h2>
            <span>{checkoutSummary.office}</span>
          </div>
          <div className="checkout-lines">
            <p><span>Client payment</span><strong>${checkoutSummary.subtotal.toFixed(2)}</strong></p>
            <p><span>15% platform fee</span><strong>${platformFee.toFixed(2)}</strong></p>
            <p><span>Office gross</span><strong>${officeGross.toFixed(2)}</strong></p>
            <p><span>Processor estimate</span><strong>${checkoutSummary.processorFee.toFixed(2)}</strong></p>
          </div>
          <div className="checkout-assurance">
            <span><ShieldCheck size={16} /> Verified checkout</span>
            <span><CreditCard size={16} /> Stripe Connect ready</span>
            <span><ReceiptText size={16} /> Receipt generated</span>
          </div>
          <Button icon={<CreditCard size={18} />}>Pay ${checkoutSummary.subtotal.toFixed(2)}</Button>
        </aside>
      </div>
    </div>
  );
}

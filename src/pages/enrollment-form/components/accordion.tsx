import type { ReactNode } from 'react';
import type { EnrollmentSection } from '../../../data/enrollment-data';

type AccordionProps = {
  items: EnrollmentSection[];
  renderContent: (id: string) => ReactNode;
};

export default function AccordionComponent({ items, renderContent }: AccordionProps) {
  return (
    <div className="accordion-list">
      {items.map(({ id, title, Icon }) => (
        <details className="accordion-item" key={id} open>
          <summary>
            <span><Icon size={18} /> {title}</span>
          </summary>
          {renderContent(id)}
        </details>
      ))}
    </div>
  );
}

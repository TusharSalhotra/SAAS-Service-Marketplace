import { CheckCircle2, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cx } from '../../../lib/utils';
import ProgressComponent from './progress';

export type EnrollmentTab = {
  value: string;
  label: string;
  content: ReactNode;
  hasError?: boolean;
};

type TabsProps = {
  activeIndex: number;
  tabs: EnrollmentTab[];
  onTabChange: (index: number) => void;
};

export default function TabsComponent({ activeIndex, tabs, onTabChange }: TabsProps) {
  const progress = Math.round(((activeIndex + 1) / tabs.length) * 100);

  return (
    <div className="tabs-component">
      <div className="tabs-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            className={cx('tab-trigger', activeIndex === index && 'active')}
            onClick={() => onTabChange(index)}
            role="tab"
            aria-selected={activeIndex === index}
          >
            <span className="tab-number">{index + 1}</span>
            <span>{tab.label}</span>
            {tab.hasError ? <span className="tab-error-dot" aria-label={`${tab.label} has validation errors`} /> : index < activeIndex && <CheckCircle2 size={16} className="tab-check" />}
            {index < tabs.length - 1 && <ChevronRight size={16} className="tab-chevron" />}
          </button>
        ))}
      </div>
      <ProgressComponent value={progress} />
      <div className="tab-content" role="tabpanel">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}

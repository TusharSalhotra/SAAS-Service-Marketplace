import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import Button from '../../components/ui/button';
import AccordionComponent from './components/accordion';
import TabsComponent, { type EnrollmentTab } from './components/tabs';
import { documentationSections, officeSections, reviewSections } from '../../data/enrollment-data';
import AdministratorInformation from './components/office-info/administrator-information';
import OfficeInformation from './components/office-info/office-information';
import OfficeAddress from './components/office-info/office-address';
import ContactInformation from './components/office-info/contact-information';
import OwnerInfo from './components/owner-info';
import BankInformation from './components/documentation/bank-information';
import UploadDocumentation from './components/documentation/upload-documentation';
import ReviewContactInfo from './components/review-submit/contact-info';
import ReviewOfficeInfo from './components/review-submit/office-info';
import ReviewOwnerInfo from './components/review-submit/owner-info';
import UploadedDocumentation from './components/review-submit/uploaded-documentation';
import PolicyAgreement from './components/review-submit/policy-agreement';

const renderOfficeSection = (id: string) => {
  if (id === 'admin') return <AdministratorInformation />;
  if (id === 'office') return <OfficeInformation />;
  if (id === 'address') return <OfficeAddress />;
  return <ContactInformation />;
};

const renderDocumentationSection = (id: string) => {
  if (id === 'bank') return <BankInformation />;
  return <UploadDocumentation />;
};

const renderReviewSection = (id: string) => {
  if (id === 'contact') return <ReviewContactInfo />;
  if (id === 'office') return <ReviewOfficeInfo />;
  if (id === 'owners') return <ReviewOwnerInfo />;
  return <UploadedDocumentation />;
};

export default function EnrollmentForm({ onComplete }: { onComplete: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs: EnrollmentTab[] = useMemo(
    () => [
      {
        value: 'office-info',
        label: 'Office Info',
        content: <AccordionComponent items={officeSections} renderContent={renderOfficeSection} />,
      },
      {
        value: 'owners-info',
        label: 'Owners Info',
        content: <OwnerInfo />,
      },
      {
        value: 'documentation',
        label: 'Documentation',
        content: <AccordionComponent items={documentationSections} renderContent={renderDocumentationSection} />,
      },
      {
        value: 'review-submit',
        label: 'Review and Submit',
        content: (
          <>
            <AccordionComponent items={reviewSections} renderContent={renderReviewSection} />
            <PolicyAgreement />
          </>
        ),
      },
    ],
    []
  );

  const handleNext = () => {
    setSaveMessage('');
    if (activeIndex === tabs.length - 1) {
      onComplete();
      return;
    }
    setActiveIndex((index) => index + 1);
  };

  const handleBack = () => {
    setSaveMessage('');
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  return (
    <div className="enrollment-page">
      <div className="enrollment-title">
        <p className="eyebrow">Registration Form</p>
        <h2>Registration Form</h2>
      </div>
      <div className="enrollment-panel">
        <div className="mobile-tab-label">{tabs[activeIndex].label}</div>
        <TabsComponent tabs={tabs} activeIndex={activeIndex} onTabChange={setActiveIndex} />
        <div className="form-actions">
          {activeIndex > 0 ? (
            <Button variant="ghost" icon={<ArrowLeft size={18} />} onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          <div className="action-group">
            {saveMessage && <span className="save-message">{saveMessage}</span>}
            <Button variant="outline" icon={<Save size={18} />} onClick={() => setSaveMessage('Progress saved locally for this demo.')}>
              Save for Later
            </Button>
            <Button icon={<ArrowRight size={18} />} onClick={handleNext}>
              {activeIndex === tabs.length - 1 ? 'Submit' : 'Proceed to Next Step'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

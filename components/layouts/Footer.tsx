import BaseButton from '@/components/buttons/BaseButton';
import SectionContainer from '@/components/containers/SectionContainer';

const Footer = () => {
  return (
    <footer className="border-t">
      <SectionContainer className="pt-20 pb-40">
        <div className="flex w-full justify-between gap-5 max-sm:flex-col max-sm:items-center">
          <div>Cir-Giovanni IDOH</div>
          <div className="flex flex-col items-end gap-4 max-sm:items-center">
            <BaseButton>Download my Resume</BaseButton>
            <BaseButton>Get in touch</BaseButton>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;

import BaseButton from '@/components/buttons/BaseButton';
import SectionContainer from '@/components/containers/SectionContainer';
import { selectedProfile } from '@/hooks/useProfile';

const Footer = async () => {
  const profile = await selectedProfile();

  return (
    <footer className="border-t">
      <SectionContainer className="pt-20 pb-40">
        <div className="flex w-full justify-between gap-5 max-sm:flex-col max-sm:items-center">
          <div>{profile?.fullName}</div>
          <div className="flex flex-col items-end gap-4 max-sm:items-center">
            {profile?.callToActions?.map((callToAction) => (
              <BaseButton key={callToAction._key} isLink={true} href={callToAction.url || ''}>
                {callToAction.label}
              </BaseButton>
            ))}
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;

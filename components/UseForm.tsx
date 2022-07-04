import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import { ProfileDataProps } from '@/pages/settings';

type ProfileHandler = (data: ProfileDataProps) => void;

interface ProfileFormProps {
  profile: ProfileDataProps;
  createOrUpdateProfile: ProfileHandler;
}

export const CreateUpdateProfileForm = ({ profile, createOrUpdateProfile }: ProfileFormProps) => {
  const { website, about, first_name, last_name, email, avatar_url } = profile;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      website,
      about,
      first_name,
      last_name,
      email,
      avatar_url,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(createOrUpdateProfile)}>
        <Input register={register('website')} type="text" />
      </form>
    </div>
  );
};

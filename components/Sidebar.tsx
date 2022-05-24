import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/common/Input';
import { SelectorIcon } from '@/components/icons/svg';
import { useSession, signIn, signOut } from 'next-auth/react';

// inspiration: https://tailwindui.com/components/application-ui/page-examples/home-screens
export const Sidebar = () => {
  const [input, setInput] = useState('');

  const { data: session } = useSession();

  return (
    <div className="w-60 border-solid border-[1px] border-gray-200">
      <h3>Logo</h3>

      <div className="flex items-center justify-center my-5">
        {session ? (
          <div>
            <p>Signed in as {session?.user?.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
            <button onClick={() => signIn('google', { callbackUrl: '/' })}>
              Sign in with Google.
            </button>
          </div>
        )}
        <Image src="/temp-avatar.png" width={30} height={30} alt="avatar" />
        <span className="px-3">Jessy Schwarz</span>
        <Icons name="selector" />
      </div>

      <div className="flex justify-center">
        <Input
          type="text"
          name="search"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

// TODO: we will eventually have more icons on this component.
// TODO: find a way to color svg
function Icons({ name }: { name: string }) {
  const sideBarIcon = {
    selector: SelectorIcon,
  };

  const Icon = sideBarIcon[name as keyof typeof sideBarIcon];

  return <Icon />;
}

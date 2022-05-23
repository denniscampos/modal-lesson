import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/common/Input';
import { SelectorIcon } from '@/components/icons/svg';

// inspiration: https://tailwindui.com/components/application-ui/page-examples/home-screens
export const Sidebar = () => {
  const [input, setInput] = useState('');

  return (
    <div className="w-60 border-solid border-[1px] border-gray-200">
      <h3>Logo</h3>

      <div className="flex items-center justify-center my-5">
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

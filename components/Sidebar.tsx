import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/common/Input';

// inspiration: https://tailwindui.com/components/application-ui/page-examples/home-screens
export const Sidebar = () => {
  const [input, setInput] = useState('');

  return (
    <div className="bg-secondary w-60">
      <h3>Logo</h3>

      <div className="flex items-center justify-center my-5">
        <Image src="/temp-avatar.png" width={40} height={40} alt="avatar" />
        <span className="px-3">Jessy Schwarz</span>
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

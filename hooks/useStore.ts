import create from 'zustand';

type StateProps = {
  postTitle: string;
  postText: string;
  setPostTitle: (postTitle: string) => void;
  setPostText: (postText: string) => void;
};

export const useStore = create<StateProps>((set) => ({
  postTitle: '',
  postText: '',
  setPostTitle: (postTitle: string) => set({ postTitle }),
  setPostText: (postText: string) => set({ postText }),
}));

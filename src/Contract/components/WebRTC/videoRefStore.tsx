import { create } from 'zustand';

type VideoRefsState = {
  localVideoRef: HTMLVideoElement | null;
  remoteVideoRef: HTMLVideoElement | null;
  setLocalVideoRef: (ref: HTMLVideoElement | null) => void;
  setRemoteVideoRef: (ref: HTMLVideoElement | null) => void;
};

export const useVideoRefsStore = create<VideoRefsState>((set) => ({
  localVideoRef: null,
  remoteVideoRef: null,
  setLocalVideoRef: (ref) => set({ localVideoRef: ref }),
  setRemoteVideoRef: (ref) => set({ remoteVideoRef: ref }),
}));

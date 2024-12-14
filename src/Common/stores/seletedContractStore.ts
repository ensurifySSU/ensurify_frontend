/** createRoom에서 선택된 계약, 고객 정보 */
import { create } from 'zustand';
import { IClientListType, IContractDocsType } from '../../CreateRoom/types/createRoomTypes';

// 상태 저장소 정의
interface RoomState {
  selectedContract: IContractDocsType | null;
  selectedClient: IClientListType | null;
  setSelectedContract: (contract: RoomState['selectedContract']) => void;
  setSelectedClient: (client: RoomState['selectedClient']) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  selectedContract: null,
  selectedClient: null,
  setSelectedContract: (contract) => set(() => ({ selectedContract: contract })),
  setSelectedClient: (client) => set(() => ({ selectedClient: client })),
}));

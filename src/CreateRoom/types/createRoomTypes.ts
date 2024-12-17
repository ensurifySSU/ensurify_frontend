export interface IClientListType {
  clientId: number;
  name: string;
  email: string;
}

export interface IContractDocsType {
  contractDocumentId: number;
  category: string;
  name: string;
}

export interface IcreateRoomValue {
  contractDocumentId: number;
  clientId: number;
}

export interface IClientInfoType {
  name: string;
  age: number;
  gender: string;
  email: string;
}

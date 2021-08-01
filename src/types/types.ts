export enum EnumSocketClientEvents {
  ADD_MESSAGE = 'ADD_MESSAGE',
  DISCONNECT = 'DISCONNECT',
}

export enum EnumBESocketEvents {
  BE_ADD_MESSAGE = 'BE_ADD_MESSAGE',
  BE_DISCONNECT = 'BE_DISCONNECT',
}

export interface DisconnectEvent {
  user: string
  date: Date | string
}

export interface CreateRoomDto {
  name: string,
  isPublic: boolean
}

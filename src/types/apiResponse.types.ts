export interface Room {
  code: string
  startedAt: Date
  endedAt?: Date
}

export interface Message {
  user: string
  text: string
  date: Date | string
}

export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

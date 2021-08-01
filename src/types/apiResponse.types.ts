export interface Room {
  name?: string
  code: string
  startedAt: Date
  isPublic: boolean
  participants: number
  lastActivity: Date
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

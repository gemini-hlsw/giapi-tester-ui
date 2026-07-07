import type { IsdStateUpdate } from "@/types"

// services/WebSocketService.ts
type MessageCallback = (data: IsdStateUpdate[]) => void

class WebSocketService {
  private static instance: WebSocketService
  private socket: WebSocket | null = null
  private listeners: Set<MessageCallback> = new Set()
  private is_connected: boolean = false

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  connect(url: string) {
    if (this.socket) return

    this.socket = new WebSocket(url)

    this.socket.onopen = () => {
      this.is_connected = true
      window.dispatchEvent(new Event("wsConnected"))
    }

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        this.listeners.forEach((callback) => callback(data))
        this.is_connected = true
        window.dispatchEvent(new Event("wsConnected"))
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error)
      this.is_connected = false
      window.dispatchEvent(new Event("wsConnected"))
      this.socket = null

      // Reconnect after 5 seconds
      setTimeout(() => this.connect(url), 5000)
    }

    this.socket.onclose = () => {
      this.is_connected = false
      window.dispatchEvent(new Event("wsConnected"))
      this.socket = null

      // Reconnect after 5 seconds
      setTimeout(() => this.connect(url), 5000)
    }
  }

  subscribe(callback: MessageCallback) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  send(data: object) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data))
    }
  }

  isConnected() {
    return this.is_connected
  }
}

export const wsService = WebSocketService.getInstance()

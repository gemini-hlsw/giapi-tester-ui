"use client"

import React, { useEffect } from "react"
import { wsService } from "@/services/WebsocketService"
import { WebSocketContext } from "./WebSocketContext"

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    wsService.connect("ws://localhost:7000/ws/")
  }, [])

  return (
    <WebSocketContext.Provider value={wsService}>
      {children}
    </WebSocketContext.Provider>
  )
}

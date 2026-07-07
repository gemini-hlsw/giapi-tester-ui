"use client"

import { wsService } from "@/services/WebsocketService"
import { createContext, useContext } from "react"

export const WebSocketContext = createContext(wsService)
export const useWebSocket = () => useContext(WebSocketContext)

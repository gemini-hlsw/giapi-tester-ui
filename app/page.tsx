"use client"

import { useWebSocket } from "@/context/websocket/WebSocketContext"
import { WebSocketProvider } from "@/context/websocket/WebSocketProvider"
import { INITITAL_ISD_STATE, isdState, STATE_OPTIONS } from "@/helpers/state"
import { IsdId } from "@/types"
import { useEffect, useReducer } from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"

export default function Home() {
  const ws = useWebSocket()
  const [state, dispatch] = useReducer(isdState, INITITAL_ISD_STATE)

  useEffect(() => {
    // Subscribe to the singleton's event emitter
    const unsubscribe = ws.subscribe((data) => {
      dispatch(data)
    })

    return () => {
      if (ws) unsubscribe()
    }
  }, [ws])

  if (!ws || !state || Object.keys(state).length === 0)
    return <div>Loading...</div>

  function handleChange(key: IsdId, value: number, type?: string) {
    if (value !== undefined && value !== null && value !== state[key]) {
      fetch("/api/state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value, type }),
      })
    }
  }

  return (
    <WebSocketProvider>
      <main>
        <h1>Update state</h1>
        <div className="grid grid-cols-6">
          {Object.keys(state).map((key) => {
            const option = STATE_OPTIONS.find((o) => o.name === key)
            if (!option) return null

            if (option.type === "integer") {
              return (
                <div
                  className="flex flex-col gap-2 border rounded p-2"
                  key={key}
                >
                  <div className="flex flex-row">
                    <h2 className="w-30">{key}:</h2>
                    <span>{state[key as IsdId]}</span>
                  </div>
                  <Combobox
                    items={option.options}
                    value={state[key as IsdId]}
                    onValueChange={(value) =>
                      handleChange(key as IsdId, value ?? 0, "integer")
                    }
                  >
                    <ComboboxInput placeholder={`Select new ${key}`} />
                    <ComboboxContent>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
              )
            } else {
              return (
                <div
                  className="flex flex-col gap-2 border rounded p-2"
                  key={key}
                >
                  <div className="flex flex-row">
                    <h2 className="w-30">{key}:</h2>
                    <span>{state[key as IsdId]}</span>
                  </div>
                  <Input
                    type="number"
                    placeholder={`Enter new ${key}`}
                    onChange={(e) =>
                      handleChange(
                        key as IsdId,
                        Number(e.target.value),
                        "double",
                      )
                    }
                  />
                </div>
              )
            }
          })}
        </div>
      </main>
    </WebSocketProvider>
  )
}

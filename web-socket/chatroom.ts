import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let sockets = new Map<string, WebSocket>()

interface BroadcastObj {
    name: string,
    message: string
}
const broadcastEvent = (obj: BroadcastObj) => {
    sockets.forEach((ws: WebSocket) => {
        ws.send(JSON.stringify(obj))
    })
}

const chatConnection = async (ws: WebSocket) => {
    // Generate a v4 uuid
    const myUUID = v4.generate();

    sockets.set(myUUID, ws)

    for await (const event of ws) {

        if(isWebSocketCloseEvent(event)) {
            sockets.delete(myUUID)
        }

        if( typeof event === 'string') {
            let eventObject = JSON.parse(event)
            broadcastEvent(eventObject)
        }
    }
}

export { chatConnection }
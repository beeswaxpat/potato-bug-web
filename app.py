"""
PotatoBugCrypto Web - Backend Server
FastAPI + WebSocket chat for mobile web access
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import asyncio
from datetime import datetime
from typing import Dict, Set
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="PotatoBugCrypto")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Room management
class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Set[WebSocket]] = {}
        self.user_rooms: Dict[WebSocket, str] = {}
        self.usernames: Dict[WebSocket, str] = {}
        self.room_activity: Dict[str, datetime] = {}

    async def join_room(self, websocket: WebSocket, room_code: str, username: str):
        """Add user to a room"""
        if room_code not in self.rooms:
            self.rooms[room_code] = set()

        self.rooms[room_code].add(websocket)
        self.user_rooms[websocket] = room_code
        self.usernames[websocket] = username
        self.room_activity[room_code] = datetime.now()

        # Notify room about new user
        await self.broadcast_to_room(room_code, {
            "type": "user_joined",
            "username": username,
            "timestamp": datetime.now().isoformat()
        })

        # Send user count update
        await self.broadcast_to_room(room_code, {
            "type": "user_count",
            "count": len(self.rooms[room_code])
        })

        logger.info(f"User '{username}' joined room '{room_code}'. Room size: {len(self.rooms[room_code])}")

    async def leave_room(self, websocket: WebSocket):
        """Remove user from their room"""
        if websocket not in self.user_rooms:
            return

        room_code = self.user_rooms[websocket]
        username = self.usernames.get(websocket, "Unknown")

        self.rooms[room_code].discard(websocket)
        del self.user_rooms[websocket]
        del self.usernames[websocket]

        # Notify room about user leaving
        await self.broadcast_to_room(room_code, {
            "type": "user_left",
            "username": username,
            "timestamp": datetime.now().isoformat()
        })

        # Send user count update
        if self.rooms[room_code]:
            await self.broadcast_to_room(room_code, {
                "type": "user_count",
                "count": len(self.rooms[room_code])
            })

        # Clean up empty rooms
        if not self.rooms[room_code]:
            del self.rooms[room_code]
            del self.room_activity[room_code]
            logger.info(f"Room '{room_code}' deleted (empty)")
        else:
            logger.info(f"User '{username}' left room '{room_code}'. Room size: {len(self.rooms[room_code])}")

    async def broadcast_to_room(self, room_code: str, message: dict):
        """Send message to all users in a room"""
        if room_code not in self.rooms:
            return

        disconnected = set()
        for websocket in self.rooms[room_code]:
            try:
                await websocket.send_json(message)
            except Exception as e:
                logger.error(f"Error sending to websocket: {e}")
                disconnected.add(websocket)

        # Clean up disconnected websockets
        for websocket in disconnected:
            await self.leave_room(websocket)

    async def send_message(self, websocket: WebSocket, message: str):
        """Send chat message from user to their room"""
        if websocket not in self.user_rooms:
            return

        room_code = self.user_rooms[websocket]
        username = self.usernames.get(websocket, "Unknown")

        await self.broadcast_to_room(room_code, {
            "type": "chat_message",
            "username": username,
            "message": message,
            "timestamp": datetime.now().isoformat()
        })

room_manager = RoomManager()

# Fren Bot announcements (runs independently)
async def fren_bot_task():
    """Fren Bot sends market updates to all active rooms"""
    while True:
        try:
            await asyncio.sleep(600)  # Every 10 minutes

            # Send announcement to all active rooms
            for room_code in list(room_manager.rooms.keys()):
                # Bot messages are data-driven and friendly
                # Actual announcements will be triggered by frontend based on market data
                pass
        except Exception as e:
            logger.error(f"Fren Bot error: {e}")

@app.on_event("startup")
async def startup_event():
    """Start background tasks"""
    asyncio.create_task(fren_bot_task())
    logger.info("PotatoBugCrypto server started")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for chat"""
    await websocket.accept()
    logger.info("New WebSocket connection")

    try:
        while True:
            data = await websocket.receive_json()

            if data["type"] == "join":
                await room_manager.join_room(
                    websocket,
                    data["room_code"],
                    data["username"]
                )

            elif data["type"] == "message":
                await room_manager.send_message(websocket, data["message"])

            elif data["type"] == "fren_bot":
                # Fren Bot announcement triggered by frontend
                room_code = room_manager.user_rooms.get(websocket)
                if room_code:
                    await room_manager.broadcast_to_room(room_code, {
                        "type": "chat_message",
                        "username": "Fren Bot",
                        "message": data["message"],
                        "timestamp": datetime.now().isoformat(),
                        "is_bot": True
                    })

            elif data["type"] == "fireworks":
                # Fireworks trigger - broadcast to all users in the room
                room_code = room_manager.user_rooms.get(websocket)
                username = room_manager.usernames.get(websocket, "Unknown")
                if room_code:
                    await room_manager.broadcast_to_room(room_code, {
                        "type": "fireworks",
                        "username": username,
                        "timestamp": datetime.now().isoformat()
                    })

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected")
        await room_manager.leave_room(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await room_manager.leave_room(websocket)

@app.get("/")
async def read_root():
    """Serve the main HTML page"""
    return FileResponse("static/index.html")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "active_rooms": len(room_manager.rooms),
        "total_users": len(room_manager.user_rooms)
    }

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)

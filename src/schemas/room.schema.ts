import type { FieldValue, Timestamp } from "firebase/firestore";

// Interface para Room/Chat
export interface Room {
  id: string;
  participants: string[]; // Array de UIDs (siempre 2 usuarios)
  createdAt: Timestamp | FieldValue;
  lastMessage: LastMessage | null;
}

// Interface para el último mensaje en un room
export interface LastMessage {
  text: string;
  senderId: string;
  timestamp: Timestamp | FieldValue;
}

// Interface para Mensaje
export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Timestamp | FieldValue;
}

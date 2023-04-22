import { AlertColor } from "@mui/material";

export interface formFields {
  name: string;
  purpose: string;
  choice: string;
  totalParticipants: number;
}

export interface ApiResponseData1 {
  message: string;
  id: string;
  link: string;
  name: string;
  code: string;
}

export interface ApiResponseData2 {
  message: string;
  task: Task;
}

export interface Task {
  name: string;
  id: string;
  purpose: string;
}

export interface SnakeBar {
  message: string;
  messageType: AlertColor;
  open: boolean;
}

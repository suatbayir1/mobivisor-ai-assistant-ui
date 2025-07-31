export type Source = {
  id: string;
  text: string;
  score: number;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};
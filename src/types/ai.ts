export interface AIResponse {
  model: string
  response: string
  error?: string
}

export interface ModelInfo {
  humanReadableName: string
  modelId: string
  version: string
  description: string
}

export interface AIError {
  message: string
  code: string
  details?: unknown
}

export type AIModelType = "GPT4" | "CLAUDE" | "GEMINI"

export interface PromptHistoryItem {
  prompt: string
  timestamp: number
  responses?: AIResponse[]
}
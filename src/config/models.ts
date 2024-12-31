import { ModelInfo, AIModelType } from "@/types/ai"

export const MODEL_INFO: Record<AIModelType, ModelInfo> = {
  GPT4: {
    humanReadableName: "GPT-4o mini",
    modelId: "gpt-4o-mini",
    version: "gpt-4o-mini",
    description: "OpenAI's GPT-4 optimized model"
  },
  CLAUDE: {
    humanReadableName: "Claude 3.5 Haiku",
    modelId: "claude-3-5-haiku-20241022",
    version: "claude-3-5-haiku-20241022",
    description: "Anthropic's Claude 3.5 Haiku model"
  },
  GEMINI: {
    humanReadableName: "Gemini 2.0 Flash",
    modelId: "gemini-2.0-flash-exp",
    version: "gemini-2.0-flash-exp",
    description: "Google's Gemini 2.0 Flash model"
  }
}

export const API_TIMEOUT = 30000
export const MAX_HISTORY_ITEMS = 50
export const MAX_TOKENS = 1024
export const TEMPERATURE = 0.7
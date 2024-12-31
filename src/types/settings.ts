export interface ModelSettings {
  temperature: number
  maxTokens: number
  enabled: boolean
}

export interface ThemeSettings {
  mode: "light" | "dark" | "system"
  fontSize: "sm" | "md" | "lg"
}

export interface UserSettings {
  models: {
    GPT4: ModelSettings
    CLAUDE: ModelSettings
    GEMINI: ModelSettings
  }
  theme: ThemeSettings
  history: {
    maxItems: number
    autoSave: boolean
  }
  display: {
    showVersionInfo: boolean
    showModelDescriptions: boolean
    responseFormat: "markdown" | "plain"
  }
}

export type SettingsUpdateAction = 
  | { type: "UPDATE_MODEL_SETTINGS"; model: string; settings: Partial<ModelSettings> }
  | { type: "UPDATE_THEME"; settings: Partial<ThemeSettings> }
  | { type: "UPDATE_HISTORY_SETTINGS"; settings: Partial<UserSettings["history"]> }
  | { type: "UPDATE_DISPLAY_SETTINGS"; settings: Partial<UserSettings["display"]> }
  | { type: "RESET_SETTINGS" }
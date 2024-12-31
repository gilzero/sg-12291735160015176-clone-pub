import { createContext, useContext, useReducer, useEffect } from "react"
import { UserSettings, SettingsUpdateAction } from "@/types/settings"
import { TEMPERATURE, MAX_TOKENS } from "@/config/models"

const defaultSettings: UserSettings = {
  models: {
    GPT4: {
      temperature: TEMPERATURE,
      maxTokens: MAX_TOKENS,
      enabled: true
    },
    CLAUDE: {
      temperature: TEMPERATURE,
      maxTokens: MAX_TOKENS,
      enabled: true
    },
    GEMINI: {
      temperature: TEMPERATURE,
      maxTokens: MAX_TOKENS,
      enabled: true
    }
  },
  theme: {
    mode: "system",
    fontSize: "md"
  },
  history: {
    maxItems: 50,
    autoSave: true
  },
  display: {
    showVersionInfo: true,
    showModelDescriptions: true,
    responseFormat: "markdown"
  }
}

const SettingsContext = createContext<{
  settings: UserSettings
  updateSettings: (action: SettingsUpdateAction) => void
}>({
  settings: defaultSettings,
  updateSettings: () => {}
})

function settingsReducer(state: UserSettings, action: SettingsUpdateAction): UserSettings {
  switch (action.type) {
    case "UPDATE_MODEL_SETTINGS":
      return {
        ...state,
        models: {
          ...state.models,
          [action.model]: {
            ...state.models[action.model as keyof typeof state.models],
            ...action.settings
          }
        }
      }
    case "UPDATE_THEME":
      return {
        ...state,
        theme: {
          ...state.theme,
          ...action.settings
        }
      }
    case "UPDATE_HISTORY_SETTINGS":
      return {
        ...state,
        history: {
          ...state.history,
          ...action.settings
        }
      }
    case "UPDATE_DISPLAY_SETTINGS":
      return {
        ...state,
        display: {
          ...state.display,
          ...action.settings
        }
      }
    case "RESET_SETTINGS":
      return defaultSettings
    default:
      return state
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings)

  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        Object.entries(parsed.models).forEach(([model, settings]) => {
          dispatch({
            type: "UPDATE_MODEL_SETTINGS",
            model,
            settings: settings as Partial<UserSettings["models"]["GPT4"]>
          })
        })
        if (parsed.theme) {
          dispatch({ type: "UPDATE_THEME", settings: parsed.theme })
        }
        if (parsed.history) {
          dispatch({ type: "UPDATE_HISTORY_SETTINGS", settings: parsed.history })
        }
        if (parsed.display) {
          dispatch({ type: "UPDATE_DISPLAY_SETTINGS", settings: parsed.display })
        }
      } catch (error) {
        console.error("Error parsing saved settings:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings))
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings: dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
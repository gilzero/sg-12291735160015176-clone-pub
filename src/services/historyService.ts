import { PromptHistoryItem } from "@/types/ai"
import { MAX_HISTORY_ITEMS } from "@/config/models"

export const historyService = {
  getHistory(): PromptHistoryItem[] {
    try {
      return JSON.parse(localStorage.getItem("promptHistory") || "[]")
    } catch {
      return []
    }
  },

  addToHistory(item: PromptHistoryItem): void {
    try {
      const history = this.getHistory()
      const newHistory = [item, ...history].slice(0, MAX_HISTORY_ITEMS)
      localStorage.setItem("promptHistory", JSON.stringify(newHistory))
    } catch (error) {
      console.error("Error saving to history:", error)
    }
  },

  clearHistory(): void {
    localStorage.removeItem("promptHistory")
  }
}
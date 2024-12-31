import { db } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { UserSettings } from "@/types/settings"

export const settingsService = {
  async saveSettings(userId: string, settings: UserSettings) {
    try {
      await setDoc(doc(db, "userSettings", userId), settings)
    } catch (error) {
      console.error("Error saving settings:", error)
      throw error
    }
  },

  async loadSettings(userId: string): Promise<UserSettings | null> {
    try {
      const docRef = doc(db, "userSettings", userId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? (docSnap.data() as UserSettings) : null
    } catch (error) {
      console.error("Error loading settings:", error)
      throw error
    }
  }
}
// -------------------- OTHER IMPORT FILES -------------------- //
import { handleDeleteSession } from "../services/appwrite"
import { redirectTo } from "../../../shared/lib/commonUtiles"

const logOutHandler = async () => {
    await handleDeleteSession()
    await clearLocalStoreage()
    redirectTo("/")
}

const clearLocalStoreage = (key) => {
    localStorage.removeItem(key || "")
}

export { logOutHandler }


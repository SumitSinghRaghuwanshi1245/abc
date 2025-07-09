// -------------------- PACKAGE IMPORT FILES -------------------- //
import { ID } from "appwrite";

// -------------------- OTHER IMPORT FILES -------------------- //
import { account } from "../../../shared/config/appwriteConfig"

const createCredentials = async (phoneNumber) => {
    const token = await account.createPhoneToken(
        ID.unique(),
        phoneNumber
    );
    return token;
}
const verifyToken = async (tokenData, otp) => {
    const { userId } = tokenData
    const session = await account.createSession(
        userId,
        otp
    )
    return session;
}

const handleDeleteSession = async () => {
    await account.deleteSession("current")
}

export { createCredentials, verifyToken, handleDeleteSession }

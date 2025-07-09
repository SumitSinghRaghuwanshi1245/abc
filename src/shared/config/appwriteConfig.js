// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Client , Account} from "appwrite";

const ENDPOINT = import.meta.env.VITE_APP_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APP_APPWRITE_PROJECT_ID;

const appWriteCredentials = {

  endPoint : ENDPOINT,
  projectID : PROJECT_ID
}

const client = new Client().setEndpoint(appWriteCredentials.endPoint).setProject(appWriteCredentials.projectID)
const account = new Account(client);

export {appWriteCredentials, client, account}
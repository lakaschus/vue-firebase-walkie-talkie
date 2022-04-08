import { db } from "@/firebase/config"
import { addDoc, collection } from "@firebase/firestore"

const createDoc = async (colName, json) => {
  /**
   * @name createDoc
   * @param {string} colName Name of the collection you want to create a document into.
   * @param {object} json JSON object containing attributes of new document
   */
  const colRef = collection(db, colName)
  try {
    await addDoc(colRef, json)
  } catch (err) {
    console.log("something went wrong: ", err)
  }
}

export default createDoc

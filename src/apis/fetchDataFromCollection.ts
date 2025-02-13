import { databases } from "./appWrite";
import { Query } from "appwrite";

export default async function fetchDataFromCollection(
  dataBaseId: string,
  collectionId: string,
  documentId: string,
  queryKey: string,
  selectKey: string
) { //main behavior is to fetch data using ID
  const document = await databases.listDocuments(
    dataBaseId,
    collectionId,
    [Query.equal(queryKey, documentId)]
  );
  const data = document.documents[0][selectKey];
  console.log(data,"data")
  return JSON.parse(data);
  
}
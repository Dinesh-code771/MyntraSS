import { Query } from "appwrite";
import { databases } from "./appWrite.js";

export async function insertDataIntoDocument(
    data,
    databaseId,
    collectionId,
    columnName,
    value
){
    try{
        //getting document using colName and val
        const queryResponse = await databases.listDocuments(databaseId,collectionId, [
            Query.equal(columnName, value),
        ]);
       
        if (queryResponse.documents.length === 0){
            console.log("No documents found matching the query.");
            return;
        }
        //using document ID we are updating the value
        const documentId = queryResponse.documents[0].$id;
        const response = await databases.updateDocument(
            databaseId,
            collectionId,
            documentId,
            { //the latest data we got from selectedFilters we are passing to DB
                selectedFilters:data, 
            }
        );
        return response;
        console.log(response);
    } catch(error){
        console.error(error);
    }
}
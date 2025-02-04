import { Query } from 'appwrite';
import { databases } from './appWrite.js';

export async function insertPerticularColumn(
  data,
  databaseId,
  collectionId,
  columnName,
  value,
  key
) {
  try {
    console.log('called', columnName, value, key, data);
    //getting document using colName and val
    const queryResponse = await databases.listDocuments(
      databaseId,
      collectionId,
      [Query.equal(columnName, value)]
    );

    if (queryResponse.documents.length === 0) {
      console.log('No documents found matching the query.');
      return;
    }

    function checkAndInsert(array, value){
        if(array.includes(value)){
            return array.filter((val)=> val != value);
        } else {
            return [...array, value];
        }
    }

    //using document ID we are updating the value
    const documentId = queryResponse.documents[0].$id;
    console.log(queryResponse.documents[0], "document");
    const particularColumn = JSON.parse(queryResponse.documents[0][key]).map(
      (value, index) => {
        if (index === data.index) {
          return {
            ...value,
            selectedValues: checkAndInsert(value.selectedValues, data.value),
          };
        } else {
          return value;
        }
      }
    );
    console.log(particularColumn, "particularColumn");
    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      documentId,
      {
        [key]: JSON.stringify(particularColumn),
      }
    );
    return response;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

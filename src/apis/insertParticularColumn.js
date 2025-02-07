import { Query } from 'appwrite';
import { databases } from './appWrite.js';

export async function insertParticularColumn(
  data,
  databaseId,
  collectionId,
  columnName,
  value,
  key,
  isTopFilter = true //we gave this condition because this component can work for both topFilters & wishList also
) {
  try {
    //CN-cateroryType,Value-mens,key-WishListitems,data-[]
    //console.log('called_insertParticularColumn', columnName, value, key, data);
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

    //to add in wishList cart
    function checkAndInsert(array, value){
        if(array.includes(value)){//if val present in array move to next line
            return array.filter((val)=> val != value);//if that value is already there in that array remove that value 
        } else {
            return [...array, value];//if val is not there in that array addIt 
        }
    }

    //using document ID we are updating the value
    const documentId = queryResponse.documents[0].$id;
    //console.log(queryResponse.documents[0], "document");
    const particularColumn = JSON.parse(queryResponse.documents[0][key])?.map(
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
    //console.log(particularColumn, "particularColumn_insertParticularColumn");
    const response = await databases.updateDocument(
      databaseId,
      collectionId,
      documentId,
      {
        // [key]: JSON.stringify(particularColumn),
        [key]: isTopFilter
          ? JSON.stringify(particularColumn)
          : JSON.stringify(data),
      }
    );
    return response;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

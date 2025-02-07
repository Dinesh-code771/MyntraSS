import { Query } from 'appwrite';
import { databases } from './appWrite.js';

export async function listDocuments(
  databaseId,
  collectionId,
  columnName, //categoryType
  value, //kids,mens,womens
  getThisDetails //column[categories,brands,--]
) {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal(columnName, value),
    ]);
    // console.log(
    //   `columnName = ${columnName} , value = ${value} and getThisDetails = ${JSON.stringify(getThisDetails)}`
    // );
    const { documents } = response;
    let details = {};
    for (let i = 0; i < getThisDetails.length; i++) {
      details[getThisDetails[i]] = JSON.parse(
        //convert to obj and send to details
        documents[0][getThisDetails[i]]
      );
    }
    //console.log(details);
    return details;
  } catch (error) {
    console.error(error, 'error');
  }
}
//another way
// export async function listDocuments(
//     databaseId,
//     collectionId,
//     columnName,
//     value,
//     getThisDetails
// ){
//     try{
//         const { documents } = await databases.listDocuments(databaseId,collectionId, [
//             Query.equal(columnName, value),
//         ]);
//         let details = keys.reducer((acc, key)=>{
//             acc[key] = JSON.parse(documents[0]?.[key]||"{}");
//             return acc;
//         },{});

//         return details;
//     } catch(error){
//         console.error(error,"error");
//     }
// }

import { colors } from "@mui/material";
import { Client, Databases, ID } from "appwrite";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("676a1d49003bb5132d38");

const databases = new Databases(client);

// const promise = databases.updateDocument(
//   "676a1ec4001bf5b712d9", //dabase id
//   "676a1ee4001ae452e2df", // collectoin id
//   "677dfbf5000825b848bf",
//   {
//     CategoryType: "Women",
// //     productDetails: "",
// //   }
// // );

// productDetails: JSON.stringify([
//   {
//     title: "Indo Era",
//     description:
//       "Ethnic Motifs Embroidered Regular Thread Work Kurta with Salwar & Dupatta",
//     price: 1679,
//     images: [
//       "https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/29629130/2024/5/18/c78e6ae4-0d17-4a46-915e-d955d92487a01716000841537IndoEraBlackEmbroideredStraightKurtaSalwarWithDupattaset1.jpg",
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/29629130/2024/5/18/62ee6452-9507-45f8-90cd-1718fd794b691716000841511IndoEraBlackEmbroideredStraightKurtaSalwarWithDupattaset2.jpg",
//     ],
//     rating: 4.4,
//     likes: 4.5,
//   },
//   {
//     title: "all about you",
//     description: "Embroidered Satin Saree",
//     price: 1449,
//     images: [
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28206710/2024/3/12/8f5a1d59-a5f8-44d4-b1cb-a72a9e1ad7bf1710233595802MaroonSatinSolidwithEmbroideredLaceSaree1.jpg",
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/28206710/2024/3/12/6abf2374-8aa4-4c3e-8561-787d4f2f06e51710233595829MaroonSatinSolidwithEmbroideredLaceSaree2.jpg",
//     ],
//     rating: 5.0,
//     likes: 4.5,
//   },
//   {
//     title: "GoSriKi",
//     description: "Women Kurta with Trousers & Dupatta set",
//     price: 997,
//     images: [
//       "https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/31079027/2025/1/9/43b9a255-c141-4e2f-ae6c-16794b3f9f251736429142375-GoSriKi-Women-Kurta-with-Trousers--Dupatta-set-9071736429141-1.jpg",
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/31079027/2025/1/9/65679973-30ae-4f14-a69e-3aac4e4099811736429142238-GoSriKi-Women-Kurta-with-Trousers--Dupatta-set-9071736429141-6.jpg"
//     ],
//     rating: 4.2,
//     likes: 4.5,
//   },
//   {
//     title: "kasee",
//     description: "Solid Beads and Stones Saree",
//     price: 1647,
//     images: [
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2024/AUGUST/6/uQlZNooT_ac6154ed7e364c8bb16a32f54c5b6405.jpg",
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2024/AUGUST/6/WPnrDiaU_bbd9484b45504dc08bf04a8ab6673569.jpg",
//     ],
//     rating: 4.0,
//     likes: 4.5,
//   },
//   {
//     title: "House of Pataudi",
//     description: "Embroidered Saree With Blouse",
//     price: 897,
//     images: [
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2024/SEPTEMBER/10/fPNrS6ib_3e4a4cc69d4d4e08bf073c25782d2e00.jpg",
//       "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2024/SEPTEMBER/10/YIrq7Thc_1580bfd115fa4865988315d72c38cd5d.jpg",
//     ],
//     rating: 3.5,
//     likes: 4.5,
//   },
//   {
//     title: "GoSriKi",
//     description: "Ethnic Motifs Yoke Design Gotta Patti Kurta With Trousers & Dupatta",
//     price: 872,
//     images: [
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/25260156/2023/9/29/3d04b8b4-1104-4801-bed4-17ebf98223301695968509595KALINIWomenPinkEthnicMotifsYokeDesignRegularGottaPattiKurtaw1.jpg",
//     "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/25260156/2023/9/29/82246570-679e-46a0-83f3-caa71bc1ae631695968509746KALINIWomenPinkEthnicMotifsYokeDesignRegularGottaPattiKurtaw7.jpg"
//     ],
//     rating: 4.0,
//     likes: 4.3,
//   },

// ])
//   }
// )

//               colors: JSON.stringify([
//                 {
//                   filterName:
//                     "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[red]'></div> <p>Red</p></div>",
//                   type: "Colors",
//                 },
//                 {
//                   filterName:
//                     "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[blue]'></div> <p>blue</p></div>",
//                   type: "Colors",
//                 },
//                 {
//                   filterName:
//                     "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[green]'></div> <p>green</p></div>",
//                   type: "Colors",
//                 },
//                 {
//                   filterName:
//                     "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[black]'></div> <p>black</p></div>",
//                   type: "Colors",
//                 },
//                 {
//                   filterName:
//                     "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[white]'></div> <p>white</p></div>",
//                   type: "Colors",
//                 },
//               ])
//             }
// )

// discountRange: JSON.stringify([
// { filterName: '10% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '20% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '30% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '40% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '50% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '60% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '70% and above', type: 'DISCOUNT RANGE' },
//                     { filterName: '80% and above', type: 'DISCOUNT RANGE' },
// ])

//   }
// )

//     colors: JSON.stringify([
//       {
//         filterName:
//           "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[red]'></div> <p>Red</p></div>",
//         type: "Colors",
//       },
//       {
//         filterName:
//           "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[blue]'></div> <p>blue</p></div>",
//         type: "Colors",
//       },
//       {
//         filterName:
//           "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[green]'></div> <p>green</p></div>",
//         type: "Colors",
//       },
//       {
//         filterName:
//           "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[black]'></div> <p>black</p></div>",
//         type: "Colors",
//       },
//       {
//         filterName:
//           "<div className='flex items-center gap-3'> <div className='w-[13px] h-[13px] border rounded-full bg-[white]'></div> <p>white</p></div>",
//         type: "Colors",
//       }

// Gender: JSON.stringify([
// {
//   filterName: "Boys",
//   type: "Gender",
// },
// {
//   filterName: "Girls",
//   type: "Gender",
// },
// {
//   filterName: "Men",
//   type: "Gender",
// },
// {
//   filterName: "Women",
//   type: "Gender",
// },
// ])
//   }
// )

//     selectedFilters: JSON.stringify({
//       Categorie: [],
//       Brand: [],
//       Colors: [],
//       Discount: [],
//       Gender: [],
//       prices: {},
//       params: "",
//     }),
//   }
// );

export { client, databases };

// databases
//   .getDocument(
//     "676a1ec4001bf5b712d9",
//     "676a1ee4001ae452e2df",
//     "677dfbf5000825b848bf"
//   )
//   .then((response) => {
//     console.log(
//       "Documents:",
//       response.brands,
//       typeof response.brands,
//       JSON.parse(response.brands)[0].filterName
//     );
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// import { Client, Databases, ID } from "appwrite";
// // import {json} from "stream/consumers";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("676a1d49003bb5132d38");

// const databases = new Databases(client);

// // const promise = databases.updateDocument(
// //   "676a1ec4001bf5b712d9", //database id
// //   "676a1ee4001ae452e2df", //collection id
// //   "677dfbf5000825b848bf",

// //   {
// //     CategoryType: "Women",
// //     brands: JSON.stringify([
// //       {
// //         filterName: "Zara",
// //         count: 90,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "H&M",
// //         count: 75,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "Forever 21",
// //         count: 60,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "puma",
// //         count: 100,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "Nike",
// //         count: 100,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "Adidas",
// //         count: 100,
// //         type: "Brand",
// //       },
// //       {
// //         filterName: "Reebok",
// //         count: 100,
// //         type: "Brand",
// //       },
// //     ]),
// //     productDetails: JSON.stringify([{
// //         "productName": "Women's Running Shoes",
// //         "brand": "Nike",
// //         "price": 120,
// //         "availability": "In Stock",
// //         "category": "Shoes"
// //       },
// //       {
// //         "productName": "Casual T-shirt",
// //         "brand": "Puma",
// //         "price": 30,
// //         "availability": "Limited Stock",
// //         "category": "T-shirts"
// //       },
// //       {
// //         "productName": "Slim Fit Jeans",
// //         "brand": "Levi's",
// //         "price": 80,
// //         "availability": "In Stock",
// //         "category": "Bottomwear"
// //       },
// //       {
// //         "productName": "Formal Shirt",
// //         "brand": "H&M",
// //         "price": 50,
// //         "availability": "In Stock",
// //         "category": "Shirts"
// //       }
// //     ]),
// //     categories: JSON.stringify([
// //         {
// //             "filterName": "Jeans",
// //             "count": 80,
// //             "type": "Categories"
// //           },
// //           {
// //             "filterName": "Dresses",
// //             "count": 60,
// //             "type": "Categories"
// //           },
// //           {
// //             "filterName": "Shoes",
// //             "count": 50,
// //             "type": "Categories"
// //           },
// //           {
// //             "filterName": "Activewear",
// //             "count": 70,
// //             "type": "Categories"
// //           },
// //       {
// //         filterName: "T-shirts",
// //         count: 100,
// //         type: "Categories",
// //       },
// //       {
// //         filterName: "Shirts",
// //         count: 100,
// //         type: "Categories",
// //       },
// //     ]),
// //   }
// // );

// //     categories:JSON.stringify([
// //         {
// //             filterName: "T-shirts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Shirts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Yoga Mats",
// //             count: 100,
// //             type: "Categories",
// //         }
// //     ])
// // }
// // )

// // const promise = databases.updateDocument(
// //     "676a1ec4001bf5b712d9", //database id
// //     "676a1ee4001ae452e2df", //collection id
// //     "676cc1a7001c009ca249", //document id

// // {
// //     CategoryType:"Kids",
// //     brands:JSON.stringify([
// //         {
// //             filterName:"puma",
// //             count:100,
// //             type:"Brand",
// //         },
// //         {
// //             filterName:"Nike",
// //             count:100,
// //             type:"Brand",
// //         },
// //         {
// //             filterName:"Adidas",
// //             count:100,
// //             type:"Brand",
// //         },
// //         {
// //             filterName:"Reebok",
// //             count:100,
// //             type:"Brand",
// //         },
// //         {
// //             filterName:"Levis",
// //             count:100,
// //             type:"Brand",
// //         }

// //     ]),
// //     categories:JSON.stringify([
// //         {
// //             filterName: "T-shirts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Shirts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Yoga Mats",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Shorts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Accessories",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Perfume",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Organisers",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Shirts",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Perfume",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Wall Decor",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Accessories",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Perfume",
// //             count: 100,
// //             type: "Categories",
// //           },
// //           {
// //             filterName: "Organisers",
// //             count: 100,
// //             type: "Categories",
// //           },
// //     ]),
// //     productDetails:JSON.stringify([

// //             {
// //               title: "H&M",
// //               description: "Boys Teddy Hoody",
// //               price: 1999,
// //               images: ["/product1.png", "/product2.png"],
// //               rating: 4.5,
// //               likes: 4.5,
// //             },
// //             {
// //               title: "H&M",
// //               description: "Boys Teddy Hoody",
// //               price: 1999,
// //               images: ["/product2.png", "/product1.png"],
// //               rating: 4.5,
// //               likes: 4.5,
// //             },
// //             {
// //               title: "H&M",
// //               description: "Boys Teddy Hoody",
// //               price: 1999,
// //               images: ["/product3.png", "/product2.png"],
// //               rating: 4.5,
// //               likes: 4.5,
// //             },

// //     ])
// // }
// //     );

// export { client, databases };

// // databases.getDocument("676a1ec4001bf5b712d9","676a1ee4001ae452e2df","676cc1a7001c009ca249")
// // .then((response)=>{
// //     console.log("Documents:",
// //     response.brands,
// //     typeof response.brands,
// //     JSON.parse(response.brands)[0].filterName);
// // })
// // .catch((error)=>{
// //     console.error("Errors:",error);
// // })

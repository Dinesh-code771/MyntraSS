import { Client, Databases, ID } from 'appwrite';
//import { json } from "stream/consumers";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('676a1d49003bb5132d38');

const databases = new Databases(client);

// const promise = databases.updateDocument(
//   "676a1ec4001bf5b712d9",//DB id
//   "676a1ee4001ae452e2df",//collection id
//   "677de5d100032d5b630a",
//   {
//       CategoryType:"mens",
//         brands:JSON.stringify([
//             {
//                 filterName:"Raymond",
//                 count:5740,
//                 type:"Brand",
//             },
//             {
//                 filterName: 'Jompers',
//                 count: 3033,
//                 type: 'Brand',
//               },
//               { filterName: 'Anouk', count: 4703, type: 'Brand' },
//               { filterName: 'KISAH', count: 4105, type: 'Brand' },
//               { filterName: 'VASTRAMAY', count: 2063, type: 'Brand' },
//               { filterName: 'See Designs', count: 1705, type: 'Brand' },
//               { filterName: 'Hangup', count: 1688, type: 'Brand' },
//               { filterName: 'Raymond', count: 1474, type: 'Brand' },
//               { filterName: 'Turtle', count: 1445, type: 'Brand' },
//               { filterName: 'DEVOILER', count: 5268, type: 'Brand' },
//               { filterName: 'ALMORA', count: 4703, type: 'Brand' },
//               { filterName: 'AKS', count: 4105, type: 'Brand' },
//               { filterName: 'BELLAZO', count: 2063, type: 'Brand' },
//               { filterName: 'Buta buti', count: 1705, type: 'Brand' },
//               { filterName: 'Bushirt', count: 1688, type: 'Brand' },
//               { filterName: 'Cult indie', count: 1474, type: 'Brand' },
//               { filterName: 'Cbazaar', count: 1445, type: 'Brand' },
//               { filterName: 'DEVOILER', count: 5268, type: 'Brand' },
//               { filterName: 'EMV', count: 4703, type: 'Brand' },
//               {
//                 filterName: 'Divra clothing',
//                 count: 4105,
//                 type: 'Brand',
//               },
//               { filterName: 'even', count: 2063, type: 'Brand' },
//               { filterName: 'Ekasya', count: 1705, type: 'Brand' },
//               { filterName: 'Ethnic Bay', count: 1688, type: 'Brand' },
//               { filterName: 'FoxDX', count: 1474, type: 'Brand' },
//               { filterName: 'FABRIC FITOOR', count: 1445, type: 'Brand' },
//               {
//                 filterName: 'Louis Philippe',
//                 count: 5268,
//                 type: 'Brand',
//               },
//               { filterName: 'GLITO', count: 4703, type: 'Brand' },
//               { filterName: 'GODFREY', count: 4105, type: 'Brand' },
//               { filterName: 'Hangup', count: 2063, type: 'Brand' },
//               { filterName: 'High star', count: 1705, type: 'Brand' },
//               { filterName: 'Indo Era', count: 1688, type: 'Brand' },
//               { filterName: 'IMAGO', count: 1474, type: 'Brand' },
//               { filterName: 'Jompers', count: 1445, type: 'Brand' },
//               { filterName: 'KISAH', count: 1688, type: 'Brand' },
//               { filterName: 'Koshin', count: 1474, type: 'Brand' },
//               { filterName: 'KALKI Fashion', count: 1445, type: 'Brand' },
//               { filterName: 'Larwa', count: 4105, type: 'Brand' },
//               { filterName: 'High star', count: 2063, type: 'Brand' },
//               { filterName: 'Maharaja', count: 1705, type: 'Brand' },
//               { filterName: 'ROYAL KURTA', count: 1688, type: 'Brand' },
//               { filterName: 'Nimayaa', count: 1474, type: 'Brand' },
//               { filterName: 'NABIA', count: 1445, type: 'Brand' },
//               { filterName: 'OUTLUK', count: 5268, type: 'Brand' },
//               { filterName: 'ODETTE', count: 4703, type: 'Brand' },
//               {
//                 filterName: 'PRINTINDIA',
//                 count: 4105,
//                 type: 'Brand',
//               },
//               { filterName: 'Purple state', count: 2063, type: 'Brand' },
//               { filterName: 'Pluss', count: 1705, type: 'Brand' },
//               { filterName: 'ROYAL KURTA', count: 1688, type: 'Brand' },
//               { filterName: 'RANAK', count: 1474, type: 'Brand' },
//               { filterName: 'Ramas', count: 1445, type: 'Brand' },
//               {
//                 filterName: 'TAG 7',
//                 count: 5268,
//                 type: 'Brand',
//               },
//               { filterName: 'SHOWOFF', count: 4703, type: 'Brand' },
//               { filterName: 'Sztori', count: 4105, type: 'Brand' },
//               { filterName: 'Springberry', count: 2063, type: 'Brand' },
//               { filterName: 'TABARD', count: 1705, type: 'Brand' },
//               { filterName: 'TATTVA', count: 1688, type: 'Brand' },
//               { filterName: 'Tulsattva', count: 1474, type: 'Brand' },
//               { filterName: 'TAG 7', count: 1445, type: 'Brand' },
//               { filterName: 'Turtle', count: 1688, type: 'Brand' },
//               { filterName: 'univibe', count: 1474, type: 'Brand' },
//               { filterName: 'VASTRAMAY', count: 1445, type: 'Brand' },
//               { filterName: 'VILLAIN', count: 1474, type: 'Brand' },
//               { filterName: 'Vartah', count: 1445, type: 'Brand' },
//               { filterName: 'Wintage', count: 1688, type: 'Brand' },
//               { filterName: 'WESTCLO', count: 1474, type: 'Brand' },
//               { filterName: 'Yugnik', count: 1445, type: 'Brand' },
//               { filterName: 'YU by Pantaloons', count: 4105, type: 'Brand' },
//               { filterName: 'ZOIS', count: 2063, type: 'Brand' },
//               { filterName: 'ZARIMO', count: 1705, type: 'Brand' },
//               { filterName: 'Zombom', count: 1688, type: 'Brand' },
//               { filterName: 'ZARI', count: 1474, type: 'Brand' },
//         ]),
//     }
//   );

// const promise = databases.createDocument(
//     "676a1ec4001bf5b712d9",
//     "676a1ee4001ae452e2df",
//     ID.unique(),
//     data
// );

//  const promise = databases.updateDocument(
//   "676a1ec4001bf5b712d9", //dabase id
//   "676a1ee4001ae452e2df", // collectoin id
//   "677de5d100032d5b630a",
//   {
//     CategoryType: "mens",
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
//       },
//     ]),
//   }
// );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9",//DB id
//     "676a1ee4001ae452e2df",//collection id
//     "677de5d100032d5b630a",
//     {
//         CategoryType:"mens",
//         Gender:JSON.stringify([
//           { filterName: 'Men', type: 'Gender' },
//           { filterName: 'Women', type: 'Gender' },
//           { filterName: 'Boys', type: 'Gender' },
//           { filterName: 'Girls', type: 'Gender' },
//           ]),
//     },
// );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9",//DB id
//     "676a1ee4001ae452e2df",//collection id
//     "677de5d100032d5b630a",
//     {
//         CategoryType:"mens",
//         categories:JSON.stringify([
//           { filterName: 'Shirts', count: 100, type: 'Categorie' },
//                     { filterName: 'T-Shirts', count: 100, type: 'Categorie' },
//                     { filterName: 'Kurtas', count: 100, type: 'Categorie' },
//                     { filterName: 'Jackets', count: 100, type: 'Categorie' },
//                     { filterName: 'Jeans', count: 100, type: 'Categorie' },
//                     { filterName: 'Shoes', count: 100, type: 'Categorie' },
//                     { filterName: 'Watches', count: 100, type: 'Categorie' },
//         ]),
//     },
// );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9",//DB id
//     "676a1ee4001ae452e2df",//collection id
//     "677de5d100032d5b630a",
//     {
//         CategoryType:"mens",
//         discountRange:JSON.stringify([
//                     { filterName: '10% and above', type: 'Discount' },
//                     { filterName: '20% and above', type: 'Discount' },
//                     { filterName: '30% and above', type: 'Discount' },
//                     { filterName: '40% and above', type: 'Discount' },
//                     { filterName: '50% and above', type: 'Discount' },
//                     { filterName: '60% and above', type: 'Discount' },
//                     { filterName: '70% and above', type: 'Discount' },
//                     { filterName: '80% and above', type: 'Discount' },
// ]),
//     },
// );

//  const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9",//DB id
//     "676a1ee4001ae452e2df",//collection id
//     "677de5d100032d5b630a",
//     {
//         CategoryType:"mens",
//         Gender:JSON.stringify([
//
//     ]),
//      },
//       );

// const promise = databases.updateDocument(
//   "676a1ec4001bf5b712d9",//DB id
//   "676a1ee4001ae452e2df",//collection id
//   "677de5d100032d5b630a",
//   {
//       CategoryType:"mens",
//       productDetails:" ",
//   },
// );

// const promise = databases.updateDocument(
//   "676a1ec4001bf5b712d9",//DB id
//   "676a1ee4001ae452e2df",//collection id
//   "677de5d100032d5b630a",
//   {
//       CategoryType:"mens",
//       topFilters:JSON.stringify([
//         { name: 'Bundles', values: ['Bundles', 'Single Styles'],selectedValues:[], },
//         {
//           name: 'Country Of Origin',
//           values: [
//             'All Countries',
//             'India',
//             'USA',
//             'China',
//             'Turkey',
//             'Malaysia',
//             'Portugal',
//             'Vietnam',
//             'Jordan',
//           ],
//           selectedValues:[],
//         },
//         { name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'],selectedValues:[], },
//       ]),
//   },
// );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9",//DB id
//     "676a1ee4001ae452e2df",//collection id
//     "677de5d100032d5b630a",
//     {
//         CategoryType:"mens",
//         productDetails:JSON.stringify([
//              {
//             id:20,
//             title:'Shirts',
//             description:'Raymond - Pure Cotton Formal Shirts',
//             categoryType:'shirts',
//             brand:'Raymond',
//             colors:["white"],
//             gender:'mens',
//             discount:10,
//             Bundles:"single style" ,
//             countryOfOrigin:"India",
//             size:"M",
//             price:799,
//             images: ['https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/17091614/2022/2/18/779ac019-8b8c-48f7-9c5e-b3e2fe3004b01645166457327-Men-White-Casual-Shirt-5731645166456476-1.jpg',
//                     'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/9162675/2019/12/3/79b2dbb2-f8bf-4fb4-9d74-122f7f7ad8dd1575363062409-HIGHLANDER-Men-White-Slim-Fit-Solid-Casual-Shirt-86115753630-1.jpg'],
//             rating:4.5,
//             likes:'3.2k',
//           },
//           {
//               id:21,
//               title:'Shirts',
//               description:'SHOWOFF - Pure Cotton Formal Shirts',
//               categoryType:'shirts',
//               brand:'SHOWOFF',
//               colors:["black"],
//               gender:'mens',
//               discount:20,
//               bundles:"single style" ,
//               countryOfOrigin:"India",
//               size:"L",
//               price:1999,
//               images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/31361076/2025/1/14/b285f610-c074-46ef-ad91-a328ecd97f5c1736845910243-glitchez-Men-Shirts-8691736845909529-1.jpg',
//                        'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/21990854/2023/3/1/03f8fda7-2b7e-4355-8fe6-3e0ef81b91fc1677665302445-Roadster-Men-Shirts-9901677665301830-1.jpg'],
//               rating:4.5,
//               likes:'3.2k',
//             },
//           {
//             id:22,
//             title:'T-Shirt',
//             description:'High star - T-shirt',
//             categoryType:'T-Shirts',
//             brand:'High star',
//             colors:["white"],
//             gender:'mens',
//             discount:30,
//             bundles:"bundles" ,
//             countryOfOrigin:"USA",
//             size:"L",
//             price: 1200,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/24951624/2023/9/14/96fb6931-1709-40eb-a2f8-24af25714df61694713189695KETCHUnisexWhiteTypographyPrintedAppliqueT-shirt1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/30379842/2024/10/16/6aceec4a-6075-4e31-9a3e-4bb6ffcc1c3f1729057632829-Kook-N-Keech-Toons-Men-Tshirts-5561729057632379-1.jpg'],
//             rating: 4.5,
//             likes: '4.5k',
//           },
//           {
//               id:23,
//             title:'T-Shirt',
//             description:'FoxDX-Green T-shirt',
//             categoryType:'T-Shirts',
//             brand:'FoxDX',
//             colors:["green"],
//             gender:'mens',
//             discount:40,
//             bundles:"single style" ,
//             countryOfOrigin:"malaysia",
//             size:"XL",
//             price: 999,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/20560730/2022/11/7/ccb55dbb-cf4f-4c1f-ba1b-37b45bf5cd9c1667815830436-U-S-Polo-Assn-Men-Green-Pure-Cotton-Solid-Polo-Collar-T-shir-6.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/NOVEMBER/27/tDoTykb5_74482bb48b3740b38c72b7f71bf8b853.jpg'],
//             rating: 4.8,
//             likes: '3.2k',
//           },
//           {
//               id:24,
//             title:'Kurtas',
//             description:'Springberry-Kurtas',
//             categoryType:'Kurtas',
//             brand:'Springberry',
//             colors:["white"],
//             gender:'mens',
//             discount:40,
//             bundles:"bundles" ,
//             countryOfOrigin:"Jordan",
//             size:"XS",
//             price: 1500,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/29102934/2024/4/23/233cad9f-765e-4869-bae9-41b80c547e6a1713857663669JompersMenMirrorWorkKurta1.jpg',
//                     'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/kZXFWHXt_d78e856c1b9b4162ac6b840eb18d267c.jpg'],
//             rating: 4.1,
//             likes: '3.2k',
//           },
//           {
//               id:25,
//             title:'Kurtas',
//             description:'Anouk-Kurtas',
//             categoryType:'Kurtas',
//             brand:'Anouk',
//             colors:["white","blue"],
//             gender:'mens',
//             discount: 50,
//             bundles:"single style" ,
//             countryOfOrigin:"portugal",
//             size:"M",
//             price: 3500,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/JULY/31/Ck1VZzjo_861f52755e084aa0816e03869f2bcbf9.jpg',
//                     'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/30171580/2024/7/10/93b1139e-e4b3-4567-a5fc-c1cce692db6e1720588585950FoxDXMenGeometricFlaredSleevesThreadWorkKurta1.jpg'],
//             rating: 4.1,
//             likes: '3.9k',
//           },
//           {
//               id:26,
//             title:'Jackets',
//             description:'RANAK-Jackets',
//             categoryType:'Jackets',
//             brand:'RANAK',
//             colors:["red"],
//             gender:'mens',
//             discount: 20,
//             bundles:"single style" ,
//             countryOfOrigin:"India",
//             size:"S",
//             price: 2000,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/20360312/2022/10/27/017db221-e963-4429-96a3-51a42cee6c9d1666873240979-Allen-Solly-Men-Jackets-7861666873240308-1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/30424960/2024/11/12/d4ddeaf9-6d8c-470d-b871-aa9f7b2037ef1731402131814-US-Polo-Assn-Men-Jackets-2031731402131263-1.jpg'],
//             rating: 4.8,
//             likes: '4.5k',
//           },
//           {
//               id:27,
//             title:'Jackets',
//             description:'Vartah-Jackets',
//             categoryType:'Jackets',
//             brand:'Vartah',
//             colors:["blue"],
//             gender:'mens',
//             discount: 30,
//             bundles:"single style" ,
//             countryOfOrigin:"China",
//             size:"XS",
//             price: 2000,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/19/LZJqFuZj_b9d24f3a7c024b8080e8a375f9380f04.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/NOVEMBER/27/4HBasqzz_61f7ebf328264213bb3e95fc23838eb7.jpg'],
//             rating: 4.5,
//             likes: '4.0k',
//           },
//           {
//               id:28,
//             title:'Jeans',
//             description:'Hangup-Jeans',
//             categoryType:'Jeans',
//             brand:'Hangup',
//             colors:["blue"],
//             gender:'mens',
//             discount: 10,
//             bundles:"single style" ,
//             countryOfOrigin:"USA",
//             size:"M",
//             price: 1000,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/22575926/2023/3/30/26c78091-cad4-4150-b0f6-28d1b3bc2fb01680166125045LevisMenBlueSlimFitLowDistressHeavyFadeJeans1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/22575922/2023/3/30/05080d6e-539c-4868-a6ef-5c43dc31cf501680167456303LevisMenBlueTaperedFitLowDistressJeans1.jpg'],
//             rating: 3.5,
//             likes: '4.2k',
//           },
//           {
//               id:29,
//             title:'Shoes',
//             description:'Purple state-Shoes ',
//             categoryType:'Shoes',
//             brand:'Purple state',
//             colors:["white"],
//             gender:'mens',
//             discount:80,
//             bundles:"single style" ,
//             countryOfOrigin:"USA",
//             size:"M",
//             price: 2500,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/10339033/2025/1/1/52a50df4-90fa-4769-b383-028bb73496471735727218485-US-Polo-Assn-Men-White-Clarkin-Sneakers-1761735727218289-1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/24045570/2023/7/17/d00ec9e7-83c6-4a93-b73c-73e75af92caa1689570597018RoadsterMenColor-blockedLightweightSneakers1.jpg'],
//             rating: 4.0,
//             likes: '3.7k',
//           },
//           {
//               id:30,
//             title:'Shoes',
//             description:'Sztori-Shoes ',
//             categoryType:'Shoes',
//             brand:'Sztori',
//             colors:["black"],
//             gender:'mens',
//             discount:70,
//             bundles:"single style" ,
//             countryOfOrigin:"vietnam",
//             size:"M",
//             price: 1999,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/29553910/2024/5/16/eaa9ca5d-d8ad-462d-8add-4a513407cfec1715810989377HRXbyHrithikRoshanUnisexSlip-OnSneakers1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/28930216/2024/4/15/1b6c4346-8782-4dc5-a014-f7eb7c5536081713169977145HRXbyHrithikRoshanMenColourblockedSneakers1.jpg'],
//             rating: 4.7,
//             likes: '4.2k',
//           },
//           {
//               id:31,
//             title:'Shoes',
//             description:'Pluss-Blue Shoes ',
//             categoryType:'Shoes',
//             brand:'Pluss',
//             colors:["blue"],
//             gender:'mens',
//             discount:60,
//             bundles:"single style" ,
//             countryOfOrigin:"Turkey",
//             size:"L",
//             price: 1500,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/17305046/2022/2/26/d3e17ae1-f482-42d1-bc3b-a46afb1a25c01645858426508KillerMenNavyBlueSlip-OnSneakers1.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/27751380/2024/2/22/316b9684-b931-4caf-a311-ef8bf080ca311708584252730SparxMenSlip-OnSneakers1.jpg'],
//             rating: 4.2,
//             likes: '3.2k',
//           },
//           {
//               id:32,
//             title:'Watches',
//             description:'Turtle-Watches ',
//             categoryType:'Watches',
//             brand:'Turtle',
//             colors:["blue","white"],
//             gender:'mens',
//             discount:10,
//             bundles:"single style" ,
//             countryOfOrigin:"USA",
//             size:"XL",
//             price: 5000,
//             images: ['https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/NOVEMBER/19/FZ8D04oS_3bbf701070834b5ab9e49b5df13593f8.jpg',
//                      'https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2024/NOVEMBER/22/ds4SMnvL_93ce469e099d42419f9a87037d30042f.jpg'],
//             rating: 4.5,
//             likes: '3.5k',
//           },
//         ]),
//     },
// );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9", //dabase id
//     "676a1ee4001ae452e2df", // collectoin id
//     "677de5d100032d5b630a",
//     {
//       CategoryType: "mens",
//       wishListItems:"",
//      }
//   );

// const promise = databases.updateDocument(
//     "676a1ec4001bf5b712d9", //dabase id
//     "676a1ee4001ae452e2df", // collectoin id
//     "677de5d100032d5b630a",
//     {
//       CategoryType: "mens",
//       selectedFilters: JSON.stringify({
//         Categorie: [],
//         Brand: [],
//         Colors: [],
//         Discount: [],
//         Gender: [],
//         prices: {},
//         params: "",
//       }),
//     }
//   );

export { client, databases };

// databases.getDocument("676a1ec4001bf5b712d9","676a1ee4001ae452e2df","676cc1a7001c009ca249")
// .then((response)=>{
//     console.log("Documents:",
//     response.brands,
//     typeof response.brands,
//     JSON.parse(response.brands)[0].filterName);
// })
// .catch((error)=>{
//     console.error("Error:",error);
// })

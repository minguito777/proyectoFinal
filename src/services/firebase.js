import { initializeApp } from "firebase/app";
import { getFirestore , collection , getDocs, getDoc, doc ,query , where, addDoc,writeBatch, documentId} from "firebase/firestore"; //  SDK -> soft development kit
import algoliasearch from 'algoliasearch/lite'




const APPLICATION_ID = 'A4REJH6ERF'
const SEARCH_API_KEY = 'edb7cb65fbc2aaec208b165d0c6ece29'
const ALGOLIA_INDEX = 'prod_of_ecommerce'

const client = algoliasearch( APPLICATION_ID , SEARCH_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX)

const firebaseConfig = {
  apiKey: "AIzaSyANISM4nTSnWsiQfFpFIVHXA37eQAZ4V6U",
  authDomain: "jane-modas.firebaseapp.com",
  projectId: "jane-modas",
  storageBucket: "jane-modas.appspot.com",
  messagingSenderId: "291577574635",
  appId: "1:291577574635:web:4407ba2820d408044fbaae",
  // measurementId: "G-FXR7KF6YYS"
};


const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);



export async function CatchProducts (){

  const productsRef = collection(dataBase, 'products')
  
 
  const snapshot = await getDocs( productsRef )
  
  const products = snapshot.docs.map( (elem) =>{
    let product = elem.data();
    console.log(product)
    product.id = elem.id;
    
    return product;
    
  })

  return products
  
  }  

  
  

export async function getProduct(idSelected) {
  const productsRef = collection(dataBase, 'products')
  const docRef = doc(productsRef, idSelected)
  const snapshot = await getDoc(docRef);
  return {...snapshot.data(), id: snapshot.id}
}


export async function getProductByConsole(ItemConsole){
  const productsRef = collection(dataBase, 'products');
  const q  = query( productsRef , where( "console", "==" , ItemConsole ) )
  const snapshot = await getDocs(q)
  const products = snapshot.docs.map( (elem) =>{
    let product = elem.data();
    product.id = elem.id;
    return product
  })
  
  return products
  }
  


export async function getProductByName(ItemName){
  const { hits } = await index.search( ItemName,{
    hitsPerPage: 3
  })
  const products = hits.map(({objectID, price, img, ...rest}) => ({
    id: objectID,
    price: price,
    img: img,
    ...rest
    
  }))
  return products
  
}



export async function createOrder(order){
  const orderRef = collection( dataBase, 'order')
  const productsRef = collection(dataBase, 'products')
  

  
  const batch= writeBatch(dataBase)
 
  const arrayId = order.items.map( item => item.id ) 

  const q = query( productsRef , where( documentId(), 'in', arrayId ))
  const querySnapshot = await getDocs(q)
  const docsToUpdate= querySnapshot.docs

  docsToUpdate.forEach( doc => {
   
    let stock = doc.data().stock
   
  let itemInCart=  order.items.find( item => item.id === doc.id)
  let countInCart= itemInCart.quantity
 
  let newStock = stock - countInCart
 
  if(newStock <0){
    throw new Error (alert(`No hay stock suficiente para realizar la orden de compra`))
  }else{
    batch.update( doc.ref, { stock: newStock })
  }
  })

  
  await batch.commit()

  
  let newOrder = await addDoc( orderRef , order)
  return newOrder.id

  
}



// export async function DataMockToDb(){
//     Promise.all(
//       products.map( async (post)=> {
//         const resp = await (
//           delete post.id,
//           addDoc(collection(dataBase, 'products'), post));
//         return console.log(resp.title);
//     })
//     )
// }
// DataMockToDb()



export default dataBase;

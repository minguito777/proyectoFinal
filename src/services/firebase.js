import { initializeApp } from "firebase/app";
import { getFirestore , collection , getDocs, getDoc, doc ,query , where, addDoc,writeBatch, documentId} from "firebase/firestore"; //  SDK -> soft development kit
import algoliasearch from 'algoliasearch/lite'
// para actualizar los productos debo descomentar este import y luego la funcion de la linea 97 a 107.
import { products } from '../services/productsDB'


// inizializo algolia
const APPLICATION_ID = 'A4REJH6ERF'
const SEARCH_API_KEY = 'edb7cb65fbc2aaec208b165d0c6ece29'
const ALGOLIA_INDEX = 'prod_of_ecommerce'

const client = algoliasearch( APPLICATION_ID , SEARCH_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX)

const firebaseConfig = {
    apiKey: "AIzaSyDBvFqBKHbFIiWbk-aWRUibHwqGz_YaCfM",
    authDomain: "coderhouse-ecommerce-gaming.firebaseapp.com",
    projectId: "coderhouse-ecommerce-gaming",
    storageBucket: "coderhouse-ecommerce-gaming.appspot.com",
    messagingSenderId: "338743471227",
    appId: "1:338743471227:web:f66b00e386f92cf9d546de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);

// obtener todos los productos de la bd
export async function CatchProducts (){
  //obtener todos los 'documentos' de firestore
  //1- referencia a nuestra coleccion
  const productsRef = collection(dataBase, 'products')
  //2 - obtenemos todos los docts de 'products' ( getDocs)
  const snapshot = await getDocs( productsRef )
  const products = snapshot.docs.map( (elem) =>{
    let product = elem.data();
    product.id = elem.id;
    return product
  })

  return products
  }  

  
  
// obtener los productos por ID
export async function getProduct(idSelected) {
  const productsRef = collection(dataBase, 'products')
  const docRef = doc(productsRef, idSelected)
  const snapshot = await getDoc(docRef);
  return {...snapshot.data(), id: snapshot.id}
}

// obtener los productos por categoria
export async function getProductByConsole(ItemConsole){
  const productsRef = collection(dataBase, 'products');
  const q  = query( productsRef , where( "console", "==" , ItemConsole ) )
  const snapshot = await getDocs(q)
  const products = snapshot.docs.map( (elem) =>{
    let product = elem.data();
    product.id = elem.id;
    return product
  })
  console.log(products)
  return products
  }
  

// funcion para buscar por palabra en los productos , utilize la extension de Algolia
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

  //1 se crea un nuevo lote o 'batch' utilizando writeBatch
  const batch= writeBatch(dataBase)
  //2 se actualiza cada item segun la compra del usuario
  //2.a se hace un listado de items a actualizar
  const arrayId = order.items.map( item => item.id ) 
  //2.b obtener la data de cada producto a actualizar utilizando una Query
  const q = query( productsRef , where( documentId(), 'in', arrayId ))
  const querySnapshot = await getDocs(q)
  const docsToUpdate= querySnapshot.docs
  //3 para cada documento en la DB comprobar si hay stock para realizar la compra
  docsToUpdate.forEach( doc => {
  //3.a obtener el stock real del producto en la base de datos  
    let stock = doc.data().stock
  //3.b encontrar el item que estamos iterando en el carrito 
  let itemInCart=  order.items.find( item => item.id === doc.id)
  let countInCart= itemInCart.quantity
  //3.c calculamos la cantidad de stock restante si se realiza la compra ( tiene que ser 0 o mayor para que sea posible)
  let newStock = stock - countInCart
  //4 validar si hay stock para realizar la compra
  if(newStock <0){
    throw new Error (alert(`No hay stock suficiente para realizar la orden de compra`))
  }else{
    batch.update( doc.ref, { stock: newStock })
  }
  })

  //5 para finalizar , se hace un commit del batch y actualizar la base de datos.
  await batch.commit()

  //6 generamos la orden de compra
  let newOrder = await addDoc( orderRef , order)
  return newOrder.id

  
}


//todo: importante no borrar esta funcion.
// Para cargar los productos des-comentar esta funcion y regargar pagina
// los productos los cargo desde el archivo productsDB 'products'

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

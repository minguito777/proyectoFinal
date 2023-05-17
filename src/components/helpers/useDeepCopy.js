

function useDeepCopy(obj) {
    console.log('creando copia')
    let deepCopy = JSON.parse( JSON.stringify( obj ))
  return deepCopy
}

export default useDeepCopy

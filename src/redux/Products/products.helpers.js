import { firestore } from '../../firebase/utils'

export const handleAddProduct = (product) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc()
			.set(product)
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const handleFetchProducts = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.get()
			.then((snapshot) => {
				const productsArray = snapshot.docs.map((doc) => {
					return {
						...doc.data(),
						documentID: doc.id,
					}
				})
				resolve(productsArray)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const handleDeleteProduct = (documentID) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(documentID)
			.delete()
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error)
			})
	})
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addProduct } from '../../redux/Cart/cart.actions'
import {
	fetchProductStart,
	setProduct,
} from '../../redux/Products/products.action'
import Button from '../Form/Button'

import './styles.scss'

const mapState = ({ productsData }) => ({
	product: productsData.product,
})

const ProductCard = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { productID } = useParams()
	const { product } = useSelector(mapState)

	const { productName, productThumbnail, productPrice, productDesc } = product

	useEffect(() => {
		dispatch(fetchProductStart(productID))

		return () => {
			dispatch(setProduct({}))
		}
	}, [])

	const handleAddToCart = (product) => {
		if (!product) return
		dispatch(addProduct(product))
		history.push('/cart')
	}

	const configAddToCartBtn = {
		type: 'button',
	}

	return (
		<section className='product-card'>
			<div className='hero'>
				<img src={productThumbnail} alt={productName} />
			</div>
			<div className='product-details'>
				<ul>
					<li>
						<h1>{productName}</h1>
					</li>
					<li>
						<span>${productPrice}</span>
					</li>
					<li>
						<div className='add-to-cart'>
							<Button
								{...configAddToCartBtn}
								onClick={() => handleAddToCart(product)}>
								Add To Cart
							</Button>
						</div>
					</li>
					<li>
						<span dangerouslySetInnerHTML={{ __html: productDesc }} />
					</li>
				</ul>
			</div>
		</section>
	)
}

export default ProductCard

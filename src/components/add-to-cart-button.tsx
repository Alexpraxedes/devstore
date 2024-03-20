'use client'

import { useCart } from "@/contexts/cart-context";

interface AddToCartButtonProps {
  productId: number
}

export default function AddToCartButton( { productId }: AddToCartButtonProps ) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(productId)}
      type='button'
      className='mt-8 h-12 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-200'
    >
      Adicionar ao carrinho
    </button>
  )
}
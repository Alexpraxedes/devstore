import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import ProductImage from './product-image';
import AddToCartButton from '@/components/add-to-cart-button';

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    }
  });
  
  const product = await response.json();
  return product;
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: product.title,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json() 

  return products.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug);
  const sizes = ['P', 'M', 'G', 'GG', 'XG'];
  
  return (
    <div className='relative grid max-h-[800px] grid-cols-3'>
      <ProductImage params={{ image: product.image, alt: product.title }} />

      <div className='flex flex-col justify-center px-12'>
        <h1 className='text-3xl font-bold leading-tight'>
          {product.title}
        </h1>
        <p className='mt-2 leading-relaxed text-zinc-400'>
          {product.description}
        </p>

        <div className='mt-8 flex items-center gap-3'>
          <span className='online-block px-5 py-2.5 font-semibold rounded-full bg-violet-500'>
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className='mt-8 space-y-4'>
          <span className='block font-semibold'>Tamanhos</span>
          <div className='flex gap-2'>
            {sizes.map((size) => (
              <button
                key={size}
                type='button'
                className='flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-600 transition-colors duration-200'
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
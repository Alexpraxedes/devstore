import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    }
  });

  const products = await response.json();
  return products;
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'The best products for you',
};

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
   <div className='grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6'>
    <Link
      href={`/products/${highlightedProduct.slug}`} 
      className='group relative col-span-6 row-span-6 bg-zinc-900 rounded-lg p-8 flex items-center justify-center overflow-hidden'>
      <Image 
        src={highlightedProduct.image} 
        className='group-hover:scale-110 transition-transform duration-500'
        alt={highlightedProduct.title} 
        draggable={false}
        quality={100}
        height={800} 
        width={800} 
        />

        <div className='absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
          <span className='text-sm truncate'>{highlightedProduct.title}</span>
          <span className='flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold'>
            {highlightedProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
    </Link>

    {otherProducts.map((product) => (
      <Link 
        key={product.slug}
        href={`/products/${product.slug}`} 
        className='group relative col-span-3 row-span-3 bg-zinc-900 rounded-lg p-4 flex items-center justify-center overflow-hidden'
      >
        <Image 
          src={product.image} 
          className='group-hover:scale-110 transition-transform duration-500'
          alt={product.title} 
          draggable={false}
          quality={100}
          height={800} 
          width={800} 
          />

          <div className='absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5'>
            <span className='text-sm truncate'>{product.title}</span>
            <span className='flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold'>
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
      </Link>
    ))}
   </div>
  );
}

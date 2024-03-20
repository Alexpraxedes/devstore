import { Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CartWidget from './cart-widget';
import { SearchForm } from './search-form';
import { Suspense } from 'react';

export function Header() {
  return(
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <Link href='/' className='text-2xl font-extrabold text-white'>
          devstore
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>
      <div className='flex items-center gap-4'>
        <CartWidget />
        <div className='w-px h-4 bg-zinc-700'/>
        <Link href='/' className='flex items-center gap-2 hover:underline'>
          <span className='text-sm'>Account</span>
          <Image 
            src='https://github.com/Alexpraxedes.png'
            height={24}
            width={24}
            className='h-6 w-6 rounded-full' 
            alt='User photo' 
          />
        </Link>
      </div>
    </div>
  );
}
'use client';

import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { set } from 'zod';

interface ProductImageProps {
  params: {
    image: string
    alt: string
  }
}

const MAGNIFY_SIZE = 200;
const MAGNIFY_OFFSET = MAGNIFY_SIZE / 2;

export default function ProductImage({ params }: ProductImageProps) {
  const [magnifyStyle, setMagnifyStyle] = useState({
    backgroundImage: `url(${params.image})`,
  });

  const handleMouseMove = (e: any) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const xPercentage = (offsetX / offsetWidth) * 100;
    const yPercentage = (offsetY / offsetHeight) * 100;

    setMagnifyStyle((prev) => ({
      ...prev,
      display: 'block',
      top: `${offsetY - MAGNIFY_OFFSET}px`,
      left: `${offsetX - MAGNIFY_OFFSET}px`,
      backgroundPosition: `${xPercentage}% ${yPercentage}%`,
    }));
  }

  const handleMouseLeave = () => {
    setMagnifyStyle((prev) => ({ ...prev, display: 'none' }));
  }
  
  return (
    <div className='col-span-2 overflow-hidden cursor-none'>
      <Image
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        src={params.image} 
        alt={params.alt} 
        draggable={false}
        quality={100}
        height={800} 
        width={800} 
      />
      <div className={`magnify w-[${MAGNIFY_SIZE}px] h-[${MAGNIFY_SIZE}px]`} style={magnifyStyle}/>
    </div>
  )}
import React from 'react';
import ProductCategory from './ProductCategory';

export default function ProductCategoryWrapper() {
  return (
    <div>
      <ProductCategory
        productDetails={[
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/MensShirt.jpg', '/MensShirt1.jpg', '/MensShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/WomenShirt1.jpg', '/WomenShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/MensShirt.jpg', '/MensShirt1.jpg', '/MensShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/WomenShirt1.jpg', '/WomenShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/MensShirt.jpg', '/MensShirt1.jpg', '/MensShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
          {
            title: 'H&M',
            description: 'Pure Cotton Formal shirt',
            price: 1999,
            images: ['/WomenShirt1.jpg', '/WomenShirt2.jpg'],
            rating: 4.5,
            likes: '3.2k',
          },
        ]}
      />
    </div>
  );
}

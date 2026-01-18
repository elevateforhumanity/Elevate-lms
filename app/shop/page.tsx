import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, Filter, Search, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = { title: 'Shop | Elevate LMS' };

export default function ShopPage() {
  const products = [
    { id: '1', name: 'HVAC Tool Kit', price: 149.99, rating: 4.8, reviews: 124, category: 'Tools', image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', name: 'Medical Scrubs Set', price: 49.99, rating: 4.6, reviews: 89, category: 'Apparel', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', name: 'Barber Shears Pro', price: 89.99, rating: 4.9, reviews: 156, category: 'Tools', image: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '4', name: 'Study Guide Bundle', price: 29.99, rating: 4.7, reviews: 234, category: 'Books', image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '5', name: 'Safety Glasses', price: 24.99, rating: 4.5, reviews: 67, category: 'Safety', image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '6', name: 'Elevate Hoodie', price: 59.99, rating: 4.8, reviews: 178, category: 'Apparel', image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const categories = ['All', 'Tools', 'Apparel', 'Books', 'Safety', 'Accessories'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-slate-900 text-white py-16">
        <Image
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Shop"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Elevate Shop</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl">
            Get the tools and gear you need for your training programs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} className={`px-4 py-2 rounded-lg text-sm ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64" />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/shop/product/${product.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-blue-600 font-medium">{product.category}</span>
                <h3 className="font-semibold text-gray-900 mt-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

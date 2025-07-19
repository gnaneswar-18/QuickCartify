import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../components/loading.jsx';
import currency from '../utils/currency.jsx';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const allProducts = useSelector(state => state.product.allproduct);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    const filtered = allProducts.filter(item =>
      item.name.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue)
    );
    setData(filtered);
  }, [allProducts, searchValue]);

  return (
    <section>
      <div className='container mx-auto p-4'>
        <p className='font-semibold mb-4'>Search result: {data.length}</p>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {loading ? <Loading /> : (
            data.map(product => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="border rounded-xl bg-white shadow-md hover:shadow-lg p-2 pt-4 relative"
              >
                {product.discount > 0 && (
                  <div className="bg-red-500 text-white p-1 rounded-full text-xs -rotate-45 absolute top-2 left-2">
                    {product.discount}% off
                  </div>
                )}

                <div className="h-28 flex justify-center items-center">
                  <img
                    src={product.image[0]?.url || "placeholder.jpg"}
                    alt={product.name}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="bg-green-50 text-green-800 w-fit py-1 px-2 rounded-full text-sm mt-2">
                  {product.unit}
                </div>

                <div className="font-bold mt-1 text-ellipsis line-clamp-2">
                  {product.name}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="bg-blue-50 text-blue-700 font-semibold p-1">
                    {currency(product.price)}
                  </div>

                  <div>
                    {product.stock === 0 ? (
                      <p className="text-sm text-red-400">Out of stock</p>
                    ) : (
                      <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition">
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;

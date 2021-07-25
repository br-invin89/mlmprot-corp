const initialState = {
  products: [
    {
      id: 1,
      title: 'IGNITE',
      member_price: 80,
      volume: 80,
      cv: 36,
      short_description: 'Natural Sustainable Energy',
      product_images: [
        {
          image: '/images/image_35.png',
        }
      ]
    },
    {
      id: 2,
      title: 'G / Burn',
      member_price: 80,
      volume: 80,
      cv: 36,
      short_description: 'Healthy Weight loss Supplement',
      product_images: [
        {
          image: '/images/pro2.png'
        }
      ]
    },
    {
      id: 5,
      title: 'Member Pack',
      member_price: 500,
      volume: 500,
      cv: 250,
      short_description: '$500.00',
      product_images: [
        {
          image: '/images/pro5.png'
        }
      ]
    },
    {
      id: 3,
      title: 'Premium Subscription',
      member_price: 120,
      volume: 120,
      cv: 54,
      short_description: '',
      product_images: [
        {
          image: '/images/pro3.png'
        }
      ]
    },
    {
      id: 4,
      title: 'Premium PLUS Subscription',
      member_price: 180,
      volume: 180,
      cv: 82,
      short_description: '',
      product_images: [
        {
          image: '/images/pro4.png'
        }
      ]
    },    
  ],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return { ...state, products: action.payload };

    default:
      return state;
  }
};
export default productsReducer;

require('dotenv').config();

module.exports = {
  get_products: process.env.REACT_APP_BASE_URL + 'products',
  get_products_maker: process.env.REACT_APP_BASE_URL + 'products_maker',
  get_products_category: process.env.REACT_APP_BASE_URL + 'products_category',
  get_products_maker_category: process.env.REACT_APP_BASE_URL + 'products_maker_category',

  product_rating: process.env.REACT_APP_BASE_URL + 'rating/',
  get_products_and_ratings: process.env.REACT_APP_BASE_URL + 'products_all_ratings',

  get_makers: process.env.REACT_APP_BASE_URL + 'makers',
  get_categories: process.env.REACT_APP_BASE_URL + 'categories',
  get_skin_profiles: process.env.REACT_APP_BASE_URL + 'profiles',

  login: process.env.REACT_APP_BASE_URL + 'login',
  logout: process.env.REACT_APP_BASE_URL + 'logout',
  register: process.env.REACT_APP_BASE_URL + 'register',
  get_user_profile: process.env.REACT_APP_BASE_URL + 'user_profile',
  update_skin_profile: process.env.REACT_APP_BASE_URL + 'update_profile',

  check_token: process.env.REACT_APP_BASE_URL + 'check_token',
};

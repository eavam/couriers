import Axios from 'axios';

const baseURL = 'https://virtserver.swaggerhub.com/egorAva/delivery-api/1.0.0';
Axios.defaults.headers.get.Accept = 'application/json';
Axios.defaults.headers.post.Accept = 'application/json';

export default Axios.create({
  baseURL,
});

import { combineReducers } from 'redux';
import filters from './filters';
import lists from './lists';
import courierEditModal from './CourierEditModal';

export default combineReducers({
  filters,
  lists,
  courierEditModal,
});

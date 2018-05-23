import { combineReducers } from 'redux';
import courierFilters from './CourierFilters';
import courierContent from './CourierContent';
import courierEditModal from './CourierEditModal';

export default combineReducers({
  courierFilters,
  courierContent,
  courierEditModal,
});

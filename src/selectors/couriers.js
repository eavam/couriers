export const getCouriers = state => state.courierContent.couriersList;
export const getCouriersFetching = state =>
  state.courierContent.fetchingCouriers;

export const getVisableEditModal = state => state.courierEditModal.visible;
export const getCourierLoading = state => state.courierEditModal.loading;
export const getCourierId = state => state.courierEditModal.courierId;
export const getCourierData = state => state.courierEditModal.data;

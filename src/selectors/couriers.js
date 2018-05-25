export const getCouriers = state => state.courierContent.couriersList;
export const getCouriersLoading = state => state.courierContent.loading;

export const getVisableEditModal = state => state.courierEditModal.visible;
export const getCourierLoading = state => state.courierEditModal.loading;
export const getCourierId = state => state.courierEditModal.courierId;
export const getCourierData = state => state.courierEditModal.data;
export const getSchedules = state => state.courierEditModal.schedulesList;

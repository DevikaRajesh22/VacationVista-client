import Api from "../Service/axios";
import AdminEndpoint from '../Service/endpoints/adminEndpoint'
import adminRoute from '../Service/endpoints/adminEndpoint';

export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(AdminEndpoint.adminLogin, { email, password })
        return res
    } catch (error) {
        console.log(error)
    }
};

export const adminLogout = async () => {
    try {
        const res = await Api.post(AdminEndpoint.adminLogout)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const users = async () => {
    try {
        const res = await Api.get(AdminEndpoint.adminUser)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const blockUser = async (id: string) => {
    try {
        const res = await Api.post(`${adminRoute.blockUser}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const hosts = async () => {
    try {
        const res = await Api.get(AdminEndpoint.adminHost)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const blockSeller = async (id: string) => {
    try {
        const res = await Api.post(`${adminRoute.blockSeller}/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addCategory = async (name: string, description: string) => {
    try {
        const res = await Api.post(AdminEndpoint.addCategory, { name, description })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (id: string, name: string, description: string) => {
    try {
        const res = await Api.post(AdminEndpoint.adminEditCategory, { id, name, description })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const category = async () => {
    try {
        const res = await Api.get(AdminEndpoint.adminCategory)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const hideCategory = async (id: string) => {
    try {
        const res = await Api.post(AdminEndpoint.hideCategory, { id })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const property = async () => {
    try {
        const res = await Api.get(AdminEndpoint.adminProperty)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const changePropertyStatus = async (id: string, status: string) => {
    try {
        const res = await Api.post(AdminEndpoint.propertyStatusChange, { id, status });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const hideProperty = async (id: string) => {
    try {
        const res = await Api.post(AdminEndpoint.hideProperty, { id })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findCategory = async (id: string) => {
    try {
        const res = await Api.get(`${AdminEndpoint.findCategory}?id=${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBooking = async () => {
    try {
        const res = await Api.get(AdminEndpoint.getBooking)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const fetchReservation = async (filter: string) => {
    try {
        const res = await Api.get(`${AdminEndpoint.fetchReservation}?filter=${filter}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const dashboard = async () => {
    try {
        const res = await Api.get(AdminEndpoint.dashboard)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getMonthlySales = async () => {
    try {
        const res = await Api.get(AdminEndpoint.getMonthlySales)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getMonthlyRevenue = async () => {
    try {
        const res = await Api.get(AdminEndpoint.getMonthlyRevenue)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const propertyRequest = async () => {
    try {
        const res = await Api.get(AdminEndpoint.propertyRequest)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addNotification = async (sellerId: string, status: string, id: string) => {
    try {
        const res = await Api.post(AdminEndpoint.addNotification, { sellerId, status, id });
        return res
    } catch (error) {
        console.log(error)
    }
}
import client_stores from './client.js'
import store from '@/store'
import utils from '@/store/utils'

export default {

    getOwners: async () => {
        let response;
        try {
            //call to axios
            response = await client_stores.get('/api/v1/owner/list');
        } catch (error) {
            response = error.response;
        }
        if (response.status === 400) {
            await store.dispatch(
                'owners/establishErrors',
                {
                    api_data: response.data,
                    code: response.status
                }
            );
            return;
        }
        if (response.status !== 200) {
            await utils.handleErrorsFromServer(
                response.data.errors,
                response.data.messages,
                response.status
            );
            return;
        }
        await store.dispatch(
            'owners/registerOwnersList',
            {api_data: response.data, code: response.status}
        );
    },

    deleteOwner: async (owner_id) => {
        let response;
        let body = {
            hard_delete: 'true',
            _method: 'delete'
        }
        try {
            //call to axios
            response = await client_stores.post('/api/v1/owner/delete/'+ owner_id, body);
        } catch (error) {
            response = error.response;
        }
        if (response.status === 400) {
            await store.dispatch( 'owners/establishErrors',
                {
                    api_data: response.data,
                    code: response.status
                }
            );

            await store.dispatch(
                'owners/establishProcess',
                {executing: false, action: 'delete', status: 'uncompleted'}
            );

            return;
        }
        if (response.status !== 200) {
            await utils.handleErrorsFromServer(
                response.data.errors,
                response.data.messages,
                response.status
            );
            await store.dispatch(
                'owners/establishProcess',
                {executing: false, action: 'delete', status: 'uncompleted'}
            );
            return;
        }
        await store.dispatch(
            'owners/establishProcess',
            {executing: false, action: 'delete', status: 'completed'}
        );
    },

    registerOwner: async (owner) => {
        let response;
        try {
            //call to axios
            response = await client_stores.post('/api/v1/owner/register', owner);
        } catch (error) {
            response = error.response;
        }
        if (response.status === 400) {
            console.log('error 400');
            await store.dispatch( 'owners/establishErrors',
                {
                    api_data: response.data,
                    code: response.status
                }
            );
            return;
        }
        if (response.status !== 200) {
            console.log('error != 200')
            await utils.handleErrorsFromServer(
                response.data.errors,
                response.data.messages,
                response.status
            );
            return;
        }
        await store.dispatch(
            'owners/registerOwner',
            {api_data: response.data, code: response.status}
        );
    }
}
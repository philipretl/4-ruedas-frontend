import api from './api'
import api_utils from '@/store/utils'
import store from '@/store'

const owners = {
    namespaced: true,
    state:{
        owner: {},
        owners_list: [],
        errors: [],
        messages:[],
        loading: false,
        meta_info:{},
        links:{},
        is_creating_owner: false,
        is_deleting_owner: false,
        is_updating_owner: false,
        process: {
            executing: false,
            action: '',
            status: 'uncompleted'
        }
    },
    getters: {
        isLoading(state){
            return state.loading;
        },
        hasErrors(state){
            return state.errors.length !== 0;
        },
        hasMessages(state){
            return state.messages.length !== 0;
        },
        isEmptyOwnersList(state){
         return state.owners_list.length === 0;
        },
        errors(state){
            return state.errors;
        },
        owner(state){
            return state.owner;
        },
        ownersList(state){
            return state.owners_list;
        },
        meta_info(state){
            return state.meta_info;
        },
        isCreatingOwner(state){
            return state.is_creating_owner;
        },
        isDeletingOwner(state){
            return state.is_deleting_owner;
        },
        isUpdatingOwner(state){
            return state.is_updating_owner;
        },
        getProcess(state){
            return state.process;
        },
        getMessages(state){
            return state.messages;
        },
    },
    mutations:{
        setLoading(state, loading){
            state.loading = loading;
        },

        setOwner(state, owner){
            state.owner = owner;
            state.owners_list.push(state.owner);
        },

        setOwnersList(state, owners_list){
            state.owners_list = owners_list;
        },

        setErrors(state, errors){
            state.errors = errors;
        },

        setMetaInfo(state, meta_info){
            state.meta_info = meta_info;
        },

        setCreatingOwner(state, creating_owner){
            state.is_creating_owner = creating_owner;
        },

        setUpdatingOwner(state, updating_owner){
            state.is_updating_owner = updating_owner;
        },

        setDeletingOwner(state, deleting_owner){
            state.is_deleting_owner = deleting_owner;
        },

        setMessages(state, messages){
            state.messages = messages;
        },
        replaceOwner(state, data){
            state.owners_list.splice(data.index, 1, data.owner_updated);
        },
        setProcess(state, process){
            state.process = {
                executing: process.executing,
                action: process.action,
                status: process.status,
            }
        },

        resetStore(state){
            state.errors = [];
            state.owner = {};
            state.owners_list = [];
            state.loading = false;
            state.meta_info = {};
        }
    },
    actions:{
        loadOwnersServer: async (context)=>{
            context.commit('setOwnersList',[]);
            context.commit('setLoading', true);
            await api.getOwners();
            context.commit('setLoading', false);

        },

        registerOwnerServer: async (context, owner)=>{
            context.commit('setLoading', true);
            await api.registerOwner(owner);
            context.commit('setLoading', false);

        },

        updateOwnerServer: async (context, data)=>{
            context.commit('setLoading', true);
            context.commit('setProcess', {
                executing: true,
                action: 'put',
                status: 'uncompleted'
            });
            await api.updateOwner(data.owner_to_update, data.owner_id);

        },

        registerOwnersList(context, response){

            if(api_utils.containsCodeMessage(response.api_data.messages, 'EMPTY_LIST')){
                return;
            }
            context.commit(
                'setOwnersList',
                response.api_data.data.owners_paginated.owners
            );
            context.commit(
                'setMetaInfo',
                response.api_data.data.owners_paginated.meta
            );
        },
        updateOwner(context, response){
            let owner_list = store.getters['owners/ownersList'];
            let index =  owner_list.findIndex(owner => owner.id === response.api_data.data.owner.id);
            context.commit('replaceOwner',{
                index: index,
                owner_updated: {
                    id: response.api_data.data.owner.id,
                    full_name : response.api_data.data.owner.full_name,
                    dni: response.api_data.data.owner.dni,
                    name: response.api_data.data.owner.name,
                    last_name: response.api_data.data.owner.last_name,
                }
            });
            context.commit('setCreatingOwner', false);
            context.commit('setLoading', false);
        },

        registerOwner(context, response){
            context.commit('setOwner',{
                id: response.api_data.data.owner.id,
                full_name : response.api_data.data.owner.full_name,
                dni: response.api_data.data.owner.dni,
                name: response.api_data.data.owner.name,
                last_name: response.api_data.data.owner.last_name,
            });
            context.commit('setCreatingOwner', false);
            context.commit('setLoading', false);
        },

        deleteOwnerServer: async(context, owner_id)=>{
            context.commit('setLoading', true);
            context.commit('setProcess', {
                executing: true,
                action: 'delete',
                status: 'uncompleted'
            });
            await api.deleteOwner(owner_id);
        },

        establishErrors(context, response){
            console.log(response);
            context.commit('setErrors', api_utils.handleErrors(response.api_data));
            context.commit('setLoading', false);
        },

        establishCreatingOwner(context, is_creating){
            context.commit('setCreatingOwner', is_creating);
            context.commit('setErrors',[]);
        },

        establishUpdatingOwner(context, is_updating){
            context.commit('setUpdatingOwner', is_updating);
            context.commit('setErrors',[]);
        },

        establishDeletingOwner(context, is_deleting){
            context.commit('setDeletingOwner', is_deleting);
            context.commit('setErrors',[]);
        },

        establishProcess: async function (context, process){
            context.commit('setLoading', false);
            context.commit('setProcess', process);

            if(process.status === 'completed' && process.action === 'delete'){
                context.commit('setMessages', [
                    {
                        message_code : 'DELETED',
                        message: 'Propietario eliminado correctamente',
                    }
                ]);
                await sleep(2000);
                await store.dispatch('owners/loadOwnersServer');
                await store.dispatch('owners/establishDeletingOwner', false);
                context.commit("setMessages", []);
                context.commit('setProcess', {
                    executing: false,
                    action: '',
                    status: 'uncompleted'
                });
            }

            if(process.status === 'completed' && process.action === 'put'){
                context.commit('setMessages', [
                    {
                        message_code : 'UPDATED',
                        message: 'Propietario actualizado correctamente',
                    }
                ]);
                await sleep(2000);
                await store.dispatch('owners/loadOwnersServer');
                await store.dispatch('owners/establishUpdatingOwner', false);
                context.commit("setMessages", []);
                context.commit('setProcess', {
                    executing: false,
                    action: '',
                    status: 'uncompleted'
                });
            }
        }
    }
}

export default owners;
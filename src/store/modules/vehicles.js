import api from './api'
import api_utils from '@/store/utils'

const owners = {
    namespaced: true,
    state:{

    },
    getters: {

    },
    mutations:{

    },
    actions:{

    }
}

function handleErrors(data){
    if(api_utils.containsCodeMessage(data.messages,'CHECK_DATA')){
        return data.errors;
    }
}

export default owners;
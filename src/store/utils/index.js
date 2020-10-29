import router from '@/router'

export default {
  containsCodeMessage(messages, code_message){
    return messages.some((message)  => {
      return message.message_code === code_message;
    });
  },

  containsErrorCode(errors, error_code){
    return errors.some((error)  => {
      return error.error_code === error_code;
    });
  },

  handleErrorsFromServer: async function(errors, messages, status_code){
    if(status_code === 500){
      await router.push({
        name: 'error_server',
        params: {
          error_code: 500,
          message: 'Error en el servidor',
        }
      });
    }
    if(status_code === 404){
      await router.push({
        name: 'error_server',
        params: {
          error_code: status_code,
          message: this.containsErrorCode(errors, 'ROUTE_NOT_FOUND') ? 'Route not found in the server': ''
        }
      });
    }
    if(status_code === 401){
      await router.push({
        name: 'error_server',
        params: {
          error_code: status_code,
          message: this.containsErrorCode(errors, 'UNAUTHORIZE') ? 'Reset your credentials': ''
        }
      });
    }
    if(status_code === 405){
      await router.push({
        name: 'error_server',
        params: {
          error_code: status_code,
          message: this.containsErrorCode(errors, 'METHOD_NOT_ALLOWED') ? '': 'Estas intentando acceder a un recurso con un metodo http diferente'
        }
      });
    }
  },

  handleErrors: function(data){
    console.log(data);
    let errors = [];
    if(this.containsCodeMessage(data.messages,'CHECK_DATA')){
      if(this.containsErrorCode(data.errors, 'UNIQUE')){
        errors.push({
          error_code: 'UNIQUE',
          field: 'dni',
          message: 'El dni ya se encuentra en uso'
        });
      }
    }
    return errors;
  }

}

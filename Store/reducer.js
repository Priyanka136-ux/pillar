import * as Types from './types';
const initialState = {
    data: ''
}

const reducer = (state=initialState,action)=>{
   switch(action.type){
       case  Types.MNEMONIC_CHANGE :
           return {...state,data:action.payload.mnemonic}
  default : return state;
        }
}

export {reducer};
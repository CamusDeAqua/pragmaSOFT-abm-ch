import axios from 'axios';


export function getInfo(){ 
    return async (dispatch)=>{
        let json = await axios.get('https://ps-ch-deploy.herokuapp.com/pragmasoft')
        console.log(json.data.series)
        return dispatch({
            type: 'GET_INFO',
            payload: json.data.series
        })        
    }    
}

export function postLogin(input){
    return async (dispatch) => {
        let json = await axios.post("https://ps-ch-deploy.herokuapp.com/login", input);
        return dispatch({
            type: 'POST_LOGIN',
            payload: json.data
        })                
    }
}
export function registerOperation(payload){
    return async () => {
        let json = await axios.post('https://ps-ch-deploy.herokuapp.com/pragmasoft', payload);
        return json;        
    }
}

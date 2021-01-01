import Cookies from 'js-cookie';
import qs from 'qs';
//const base="http://localhost:5000";
const base ="http://alunos.b7web.com.br:501";

//O back ta na pasta vendas/backend
const apiFetchPost= async(endpoint,body)=>{
    if(!body.token){
        let token =Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res=await fetch(base+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed){
        window.location.href="/signin";
    }

    return json;
}
const apiFetchPut= async(endpoint,body)=>{
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res=await fetch(base+endpoint, {
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if(json.notallowed){
        window.location.href="/signin";
    }
    return json;
}
const apiFetchFile = async(endpoint,body=[])=>{
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.append('token',token);
        }
    }
    const res = await fetch(base+endpoint, {
        method:'POST',
        body
    });
    const json = await res.json();
    if(json.notallowed){
        window.location.href="/signin";
    }

    return json;
}

const apiFetchGet = async(endpoint,body=[])=>{
    if(!body.token){
        let token =Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res=await fetch(`${base+endpoint}?${qs.stringify(body)}`);
    
    const json = await res.json();
    if(json.notallowed){
        console.log('aqui');
        window.location.href="/signin";
    }
 
    return json;
}


const OlxAPI = {
    login:async(email,password)=>{
        const json = await apiFetchPost(
            '/user/signin',
            {email,password}
        );
        return json;
    },
    getStates:async()=>{
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },
    register:async(name,email,password,stateLoc)=>{
        const json =await apiFetchPost(
            '/user/signup',
            {name,email,password,state:stateLoc}
        );
        return json;
    },
    getCategories: async()=>{
        const json =await apiFetchGet(
            '/categories'
        );
        return json.categories;
        
    },
    getAds: async(options)=>{
        const json =await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd:async(id,otherAds=false)=>{
        const json = await apiFetchGet(
            '/ad/item',
            {id,otherAds}
        );
        return json;
    },
    addAd:async(formData)=>{
        const json = await apiFetchFile(
            '/ad/add',
            formData
        );
        return json
    },
    getUser:async()=>{
        const json =  await apiFetchGet(
            '/user/me',
        );
        return json
    },
    putUser:async(name,email,password,state)=>{
        const json =await apiFetchPut(
            '/user/me',
            {name,password,state}
        );
        
        return json;
    },
    updateAd:async(formData,id)=>{
        console.log('Iniciou');
        console.log( `/ad/${id}`);
        const json = await apiFetchFile(
            `/ad/${id}`,
            formData
        );
        console.log(json);
        return json
    }
};
export default ()=>OlxAPI;
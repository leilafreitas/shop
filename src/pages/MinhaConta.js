import React,{useState,useEffect} from 'react';
import {PageArea} from './SigninStyled';
import useApi from '../helpers/OLXAPI';
import {doLogin} from '../helpers/authHandler';
import {UserDiv,AdsDiv} from './MinhaContaStyled';
import AdItem from '../components/partials/AdItem';
import {PageContainer, PageTitle,ErrorMessage} from '../components/TemplateComponents'
function MinhaConta(){
    const api= useApi();
    const [user,setUser] = useState([]);
    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');
    const [name,setName] = useState('');
    const [state,setState] = useState('');
    const [confirmpassword,SetConfirmPassword] = useState('');
    const [stateList,setLStateList] = useState([]);
    const [error,setError]=useState('');
    const [resultOpacity,setResulOpacity] = useState(0.3);
    const [loading,setLoading] = useState(true);
    const [adList,setAdList] = useState([]);

    useEffect(()=>{
        const getUser = async()=>{
            const json = await api.getUser();
            console.log(json);
            setUser(json);
            setState(json.state);
            SetConfirmPassword(json.password);
            SetEmail(json.email);
            setName(json.name);
            setAdList(json.ads)
        }
        getUser();
    },[])
    useEffect(()=>{
        const getStates = async()=>{
            const json = await api.getStates();
            setLStateList(json);
        }
        getStates();
    }
    ,[])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        if(password !== confirmpassword){
            setError('Senhas não conferem');
            return;
        }
        const json = await api.putUser(name,email,password,state);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token);
            console.log('CHEGOU AQUI ESSA COISA');
            window.location.href='/';
        }
        
    }
    return(
        <>
            <UserDiv>
                {
                   error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                       <div className="area-title">Nome</div>
                       <div className="area-input">
                           <input required type='text' value={name} onChange={e=>setName(e.target.value)} />
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Estado</div>
                       <div className="area-input">
                           <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                                <option></option>
                               {
                                   stateList.map((item,key)=>
                                        <option key={key} value={item.name}>{item.name}</option>
                                   )
                               }

                           </select>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">E-mail</div>
                       <div className="area-input">
                           <input required type='email' value={email} onChange={e=>SetEmail(e.target.value)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Senha</div>
                       <div className="area-input">
                           <input required type='password'  value={password} onChange={e=>SetPassword(e.target.value)} placeholder={'Informe a senha'}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Confirmar Senha</div>
                       <div className="area-input">
                           <input required type='password'  value={confirmpassword} onChange={e=>SetConfirmPassword(e.target.value)} placeholder={'Confirme a senha'}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title"></div>
                       <div className="area-input">
                           <button>Atualizar Dados</button>
                       </div>
                   </label>
                </form>
            </UserDiv>
            <br/>

            
        </>
    );

}
export default MinhaConta;
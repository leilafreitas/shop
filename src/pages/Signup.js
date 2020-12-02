import React,{useState,useEffect} from 'react';
import {PageArea} from './SignupStyled';
import useApi from '../helpers/OLXAPI';
import {doLogin} from '../helpers/authHandler';
import {PageContainer, PageTitle,ErrorMessage} from '../components/TemplateComponents'
function Signup(){
    const api=useApi();
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [name,setName]=useState('');
    const [stateLoc,setStateLoc]=useState('');
    const [confirmpassword,SetConfirmPassword]=useState('');
    const [disabled, setDisabled]=useState(false);
    const [error,setError]=useState('');
    const [stateList,setLStateList]=useState([]);
    useEffect(()=>{
        const getStates= async()=>{
            const slists = await api.getStates();
            setLStateList(slists);
        }
        getStates();
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        if(password !== confirmpassword){
            setError('Senhas não conferem');
            setDisabled(false);
            return;
        }

        const json = await api.register(name,email,password,stateLoc);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token);
            window.location.href='/';
        }
        setDisabled(false);
    }
    return(
       <PageContainer>
           <PageTitle>Cadastro</PageTitle>
           <PageArea>
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
                           <input required type='text' disabled={disabled} value={name} onChange={e=>setName(e.target.value)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Estado</div>
                       <div className="area-input">
                           <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                <option></option>
                               {
                                   stateList.map((item,key)=>
                                        <option key={key} value={item._id}>{item.name}</option>
                                   )
                               }

                           </select>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">E-mail</div>
                       <div className="area-input">
                           <input required type='email' disabled={disabled} value={email} onChange={e=>SetEmail(e.target.value)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Senha</div>
                       <div className="area-input">
                           <input required type='password' disabled={disabled}  value={password} onChange={e=>SetPassword(e.target.value)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title">Confirmar Senha</div>
                       <div className="area-input">
                           <input required type='password' disabled={disabled} value={confirmpassword} onChange={e=>SetConfirmPassword(e.target.value)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title"></div>
                       <div className="area-input">
                           <button disabled={disabled}>Fazer Cadastro</button>
                       </div>
                   </label>
               </form>
           </PageArea>
       </PageContainer>
    );

}
export default Signup;
import React,{useState} from 'react';
import {PageArea} from './SigninStyled';
import useApi from '../helpers/OLXAPI';
import {doLogin} from '../helpers/authHandler';
import {PageContainer, PageTitle,ErrorMessage} from '../components/TemplateComponents'
function Signin(){
    const api=useApi();
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [remenberPassword,SetRemenberPassword]=useState(false);
    const [disabled, setDisabled]=useState(false);
    const [error,setError]=useState('');
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setDisabled(true);
        const json= await api.login(email,password);
        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token,remenberPassword);
            window.location.href='/';
        }
        setDisabled(false);
    }
    return(
       <PageContainer>
           <PageTitle>Login</PageTitle>
           <PageArea>
               {
                   error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
               }
               <form onSubmit={handleSubmit}>
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
                       <div className="area-title">Lembrar Senha?</div>
                       <div className="area-input">
                           <input type='checkbox' checked={remenberPassword}  disabled={disabled} onClick={()=>SetRemenberPassword(!remenberPassword)}/>
                       </div>
                   </label>
                   <label className="area">
                       <div className="area-title"></div>
                       <div className="area-input">
                           <button disabled={disabled}>Fazer Login</button>
                       </div>
                   </label>
               </form>
           </PageArea>
       </PageContainer>
    );

}
export default Signin;
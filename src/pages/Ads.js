import React,{useState,useEffect} from 'react';
import {PageArea} from './AdsStyled';
import {useHistory,useLocation} from 'react-router-dom';
import useApi from '../helpers/OLXAPI';
import AdItem from '../components/partials/AdItem';
import {PageContainer} from '../components/TemplateComponents'
function Home(){
    const api=useApi();
    const history=useHistory();
    const useQueryString =()=>{
        return new URLSearchParams(useLocation().search);
    }
    const query=useQueryString();
    const [q,setQ] = useState(query.get('q') != null ? query.get('q'):'');
    const [cat,setCat] = useState(query.get('cats') != null ? query.get('cats'):'');
    const [state,setState] = useState(query.get('state') != null ? query.get('state'):'');
    const [listState,setListState]=useState([]);
    const [categories,setCategories]=useState([]);
    const [adList,setAdList]=useState([]);
    
    useEffect(()=>{
        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cats=${cat}`);
        }
        if(state){
            queryString.push(`state=${state}`);
        }
        history.replace({
            search:`?${queryString.join('&')}`
        })
    },[q,cat,state]);
    useEffect(()=>{
        const getList=async()=>{
            const slists= await api.getStates();
            setListState(slists);
        } 
        getList();
    },[])
    useEffect(()=>{
        const getCategories=async()=>{
            const cats= await api.getCategories();
            setCategories(cats);
        } 
        
        getCategories();
    },[])
    useEffect(()=>{
        const getAds=async()=>{
            const json= await api.getAds({
                sort:'desc',
                limit:8

            });
            setAdList(json.ads);
        } 
        
        getAds();
    },[])

    return(
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input type="text" name="q" placeholder="O que você procura?" value={q} onChange={e=>setQ(e.target.value)}/>
                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {
                                listState.map((item,key)=>{
                                    return <option value={item.name} key={key}>{item.name}</option>
                                })
                            }
                        </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {
                                categories.map((item,key)=>{
                                    return <li key={key} className={cat==item.slug ? 'active':""} onClick={()=>setCat(item.slug)}>
                                        <img src={item.img} alt=""/>
                                        <span>{item.name}</span>
                                    </li>
                                })
                            }
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    ...
                </div>
            </PageArea>
        </PageContainer>
        

    );

}
export default Home;

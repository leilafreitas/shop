import React,{useState,useEffect} from 'react';
import {PageArea,SearchArea} from './HomeStyled';
import {Link} from 'react-router-dom';
import useApi from '../helpers/OLXAPI';
import AdItem from '../components/partials/AdItem';
import {PageContainer} from '../components/TemplateComponents'
function Home(){
    const api=useApi();
    const[listState,setListState]=useState([]);
    const[categories,setCategories]=useState([]);
    const[adList,setAdList]=useState([]);
    

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
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action ="/ads">
                            <input type='text' name='q' placeholder="O que você procura?"/>
                            <select name="state">
                            {
                                listState.map((item,key)=>{
                                return <option  key={key} value={item._id}>{item.name}</option>
                                })
                            }
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                            {   
                                
                                categories.map((item,key)=>{
                                    return (<Link key={key} className="categoryItem" to={`/ads?cats=${item.slug}`}>
                                        <img src={item.img} alt=""/>
                                        <span>{item.name}</span>
                                    </Link>)
                                })
                            }
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>        
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        { 
                            adList.map((item,key)=>
                                <AdItem key={key} data={item}/>
                            )
                        }
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr/>
                    ...
                </PageArea>
            </PageContainer>
        </>
        

    );

}
export default Home;
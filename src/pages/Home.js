import React,{useState,useEffect} from 'react';
import {PageArea,SearchArea} from './HomeStyled';
import {Link} from 'react-router-dom';
import useApi from '../helpers/OLXAPI';
import {PageContainer} from '../components/TemplateComponents'
function Home(){
    const api=useApi();
    const[listState,setListState]=useState([]);
    const[categories,setCategories]=useState([]);

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
                    
                </PageArea>
            </PageContainer>
        </>
        

    );

}
export default Home;
import React,{useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {PageArea,Fake,OthersArea,BreadChumb} from './AdPageStyled';
import useApi from '../helpers/OLXAPI';
import {PageContainer} from '../components/TemplateComponents';
import {Slide} from 'react-slideshow-image';
import AdItem from '../components/partials/AdItem';
import 'react-slideshow-image/dist/styles.css'
function AdPage(){
    const api= useApi();
    const {id}= useParams();
    const [loading,setLoading]= useState(true);
    const [adInfo,setAdInfo]= useState({});
    useEffect(()=>{
        const getAdInfo= async(id)=>{
            const json= await api.getAd(id,true);
            setAdInfo(json);
            setLoading(false);
            console.log(json);
        }
        getAdInfo(id);
    },[])
    function formatDate(dateCreated){
        let dateN= new Date(dateCreated);
        let months=['janeiro', 'fevereiro', 'março', 'abril','maio', 'junho','julho','agosto','setembro','outubro','novembro','dezembro'];
        let day= dateN.getDate();
        let month=dateN.getMonth();
        let year= dateN.getFullYear();
        return `${day} de ${months[month]} de ${year}`;
    }
    return (
        <PageContainer>
            {adInfo.category && 
                <BreadChumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cats=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    /
                    <Link to="">{adInfo.title}</Link>
                </BreadChumb>            
            }
            <PageArea>
                <div className="leftSide">
                    <div className='box'>
                        <div className='adImage'>
                           {loading && <Fake height={300}/>}
                           {adInfo.images &&
                            <Slide>
                                {adInfo.images.map((img,key)=>
                                    <div key={key} className="each-slide">
                                         <img src={img} alt=""/>   
                                    </div>
                                )}
                            </Slide>
                           }
                        </div>
                        <div className='adInfor'>
                            <div className='adName'>
                                {loading && <Fake height={20}/>}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }    
                                {adInfo.dateCreated &&
                                    <small>Creiando em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">{loading && <Fake height={100}/>}
                            {adInfo.description}
                            <hr/>
                            {adInfo.views &&
                                <small>Visualizações:{adInfo.views}</small>
                            }
                            </div>
                        </div>

                    </div>

                </div>
                <div className="rightSide">
                    <div className='box box--padding'>
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegotiable && 
                        "Preço Negociável"}
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    <div className='box box--padding'>
                        {loading && <Fake height={20}/>}
                        {adInfo.userInfo &&
                            <>
                                <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSeller">Fale com o anunciante</a>
                                <div className=" createdBy box box--padding">
                                    <strong>{adInfo.userInfo.name}</strong>
                                    <small>{adInfo.userInfo.email}</small>
                                    <small>{adInfo.stateName}</small>

                                </div>

                            </>
                        }
                    </div>
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras Ofertas do vendedor:</h2>
                        <div className='list'>
                            {
                                adInfo.others.map((item,key)=>{
                                    return <AdItem key={key} data={item}/>
                                })
                            }
                        </div>
                    </>

                }

            </OthersArea>
        </PageContainer>

    );

}
export default AdPage;
/**
 *                 <div className="rightSide">
                    <div className='box box-padding'>
                        {loading && <Fake height={20}/>}
                    </div>
                    <div className='box box-padding'>
                        {loading && <Fake height={20}/>}
                    </div>
                </div>
 */
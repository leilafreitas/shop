import React,{useState,useRef,useEffect} from 'react';
import {Item} from './ItemEditStyled';
import useApi from '../../helpers/OLXAPI';
import Modal from './Modal';
import MaskedInput from 'react-text-mask';
import {useHistory} from 'react-router-dom';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
export default (props)=>{

    const api=useApi();
    const [modalVisible,setModalVisible] = useState(false);
    const handleModal = () => {
        setModalVisible(true);
    }

    const priceMask=createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    return (
        <Item onClick={handleModal}>     
                <div className="itemImage">
                    <img src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`} alt={props.data.title}/>
                </div>
                <div className="itemName">{props.data.title}</div>
                <div>Categoria:{props.data.category}</div>
                {
                    props.data.priceNegotiable? <div>Preço negociável</div>:<div>R$ {props.data.price}</div>
                }
                
                <Modal show={modalVisible} setShow ={setModalVisible} data={props.data}>

                </Modal>
        </Item>

    );
}

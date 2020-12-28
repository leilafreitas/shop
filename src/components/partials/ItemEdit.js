import React,{useState} from 'react';
import {Item} from './ItemEditStyled';
import Modal from './Modal';
export default (props)=>{
    const [modalVisible,setModalVisible] = useState(false);
    const handleModal = () => {
        setModalVisible(true);
    }
    const handleFecha = () =>{
        setModalVisible(false)
        alert(modalVisible);
    }
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
                
                <Modal Visible={modalVisible} setVisible={setModalVisible}>
                    <h1>TESTE 123</h1>
                </Modal>
        </Item>

    );
}

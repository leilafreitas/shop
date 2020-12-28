import React from 'react';
import {Item} from './ItemEditStyled';
export default (props)=>{
    return (
        <Item>     
                <div className="itemImage">
                    <img src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`} alt={props.data.title}/>
                </div>
                <div className="itemName">{props.data.title}</div>
                <div>Categoria:{props.data.category}</div>
                {
                    props.data.priceNegotiable? <div>"Preço negociável"</div>:<div>R$ {props.data.price}</div>
                }
        </Item>

    );
}

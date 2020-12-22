import React from 'react';
import {Link} from 'react-router-dom';
import {Item} from './AdItemStyled';
export default (props)=>{
    return (
        <Item>     
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image} alt={props.data.title}/>
                </div>
                <div className="itemName">{props.data.title}</div>
                {
                    props.data.priceNegotiable? <div>"Preço negociável"</div>:<div>R$ {props.data.price}</div>
                }
            </Link>
        </Item>

    );
}

/**
 * className="adItem" 
 * 
*/
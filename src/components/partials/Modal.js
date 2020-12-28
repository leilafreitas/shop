import React,{useState,useEffect} from 'react';
import {ModalBackground,ModalArea} from './ModalStyled';
function Modal(props){
    const handleBackgroundClick = () => {
        props.setVisible(false);
        console.log(props.Visible);
    }
    return (
        <>
        {props.Visible === true &&
            <ModalBackground onClick = {handleBackgroundClick}>
                <ModalArea>
                    {props.children}
                </ModalArea>
            </ModalBackground>
        }
        </>
    );

}
export default Modal;
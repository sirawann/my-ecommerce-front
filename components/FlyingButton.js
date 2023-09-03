import styled from 'styled-components';
import { ButtonStyle } from '@/components/Button';
import { primary } from '@/lib/colors';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from './CartContext';


const FlyingButtonWrapper = styled.div`
    button{
        ${ButtonStyle};
        ${props => props.main ? `
        background-color: ${primary};
        color: white;
        `: `
        background-color: transparent;
        border: 1px solid ${primary};
        color:${primary};
        `}
        ${props => props.white && `
        background-color: white ;
        border: 1px solid white;
        font-weight: 500;
        `}
    }
    @keyframes fly {
        100%{
            top:0;
            left:100%;
            opacity:0;
            display: none;
            max-width: 50px;
            max-height: 50px;
        }
    }
    img{
        display: none;
        max-width: 100px;
        max-height: 100px;
        capacity: 1;
        position: fixed;
        display:none;
        animation: fly 1s;
        border-radius:10px;
    }
`;
export default function FlyingButton(props) { 
    const { addProduct } = useContext(CartContext);
    const imgRef = useRef();
    function sendImageToCart(ev) {
        imgRef.current.style.display = 'inline-block';
        imgRef.current.style.left = (ev.clientX-50) + 'px';
        imgRef.current.style.top = (ev.clientY-50) + 'px';
        setTimeout(() => {
            imgRef.current.style.display = 'none';
        }, 1000)
    }
    useEffect(() => {
        const interval = setInterval(() => {
          const reveal = imgRef.current?.closest('div[data-sr-id]');
          if (reveal?.style.opacity === '1') {
            // visible
            reveal.style.transform = 'none';
          }
        }, 100);
    
        return () => clearInterval(interval);
      }, []);
    return (
        <>
            
            <div style={{width:'1px',height:'1px'}}></div>
            <FlyingButtonWrapper
                white={props.white}
                main={props.main}
                onClick={() => addProduct(props._id)}>
                <img src={props.src} alt="" ref={imgRef} />
                <button onClick={ev => sendImageToCart(ev, props.src)} {...props}/>
                           
            </FlyingButtonWrapper>
       
            
        </>
        
    );
   
}
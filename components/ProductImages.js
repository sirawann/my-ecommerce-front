import { useState } from "react";
import styled from "styled-components";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    align-items: center;
`;

const ImageButton = styled.div`
    ${props => props.active ? `
        border-color: #ccc;
    ` : `
        border-color: transparent;
    `}
    border: 2px solid #ccc;
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`;

const BigImageWrapper = styled.div`
    text-align: center;
    margin-top: 10px;
`;

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]);
    
    return (
        <div>
            <BigImageWrapper>
                <BigImage src={activeImage} alt="Product Image" />
            </BigImageWrapper>
            
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}>
                        <Image src={image} alt="Thumbnail" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </div>
    );
}

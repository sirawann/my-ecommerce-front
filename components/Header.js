import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import BarIcon from "./icons/Bars";
import { useState } from "react";
import SearchIcon from "./SearchIcon";


const StyledHeader = styled.header`
    background-color: #222;
    position: sticky;
    top:0;
    z-index:10;
`;
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 3;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;
const StyledNav = styled.nav`
    ${props => props.mobileNavActive ?`
        display: block;
    ` : `
        display: none;
    `}
    gap: 15px;
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #222;
    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`;
const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    min-width: 30px;
    padding: 10px 0;
    svg{
        height: 20px;
    }
    @media screen and (min-width: 768px) {
        padding:0;
    }
`;
const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px){
        display: none;

    }
`;

const SideIcon = styled.div`
    display: flex;
    align-items: center;
    a{
        display: inline-block;
        min-width:20px;
        color: white;
        svg{
            width: 14px;
            height: 14px;
        }
    }
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>       
                        <StyledNav mobileNavActive={ mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Product</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                        </StyledNav>   
                        <SideIcon>
                            <Link href={'/search'}><SearchIcon /></Link>
                            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                                <BarIcon />
                            </NavButton>  
                        </SideIcon>                    
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}
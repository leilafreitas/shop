import styled from 'styled-components';

export const HeaderArea = styled.div`
    background-color:#FFF;
    height:60px;
    border-bottom:1px solid #ccc;
    .container{
        max-width:1000px;
        margin:auto;
        display:flex;
    }
    a{
        text-decoration:none;
    }
    .logo{
        flex:1;
        display:flex;
        align-items:center;
        height:60px;

        .logo-1,
        .logo-2,
        .logo-3{
            font-size:27px;
            font-weight:bold;
        }
        .logo-1{color:#FF0000;}
        .logo-2{color:#00FF00;}
        .logo-3{color:#0000FF;}
    }
    nav{
        padding-top:10px;
        padding-bottom:10px;

        ul,li{
            margin:0;
            padding:0;
            list-style:none;
        }
        ul{
            display:flex;
            align-items:center;
            height:40px;

        }
        li{
            margin:0 20px 0 20px;

            a,button{
                background:none;
                border:0;
                cursor:pointer;
                outline:0;
                color:#000;
                font-size:14px;

                &:hover{
                    color:#999;
                }
                &.button{
                    background-color:#FF8100;
                    border-radius:4px;
                    color:#fff;
                    padding:5px 10px;

                    &:hover{
                        background-color:#e57706;
                    }
                }
                
            }
        }
    }
    
`;
import styled from 'styled-components';
export const UserDiv = styled.div`
    form{
        background-color:#fff;
        border-radius:3px;
        box-shadow: 0px 0px 3px #999;
        padding:10px;

        .area{
            display:flex;
            align-items:center;
            padding:10px;
            max-width:500px;

            .area-title{
                width:200px;
                text-align:right;
                padding-right:20px;
                font-weight:bold;
                font-size:14px;

            }
            .area-input{
                flex:1;
                
                input{
                    width:100%;
                    font-size:14px;
                    padding:5px;
                    border:1px solid #DDD;
                    border-radius:3px;
                    outline:0;
                    transition:all ease 0.4s;
                    &:focus{
                        border:1px solid #333;
                        color:#333;
                    }
                    
                }
                button{
                    background-color:#0089ff;
                    border:0;
                    outline:0;
                    padding:5px 10px;
                    border-radius:4px;
                    color:#fff;
                    font-size:15px;
                    cursor:pointer;
                    &:hover{
                        background-color:#006fce;
                    }
                }

            }
        }
    }
`;
export const AdsDiv = styled.div`
   flex:1;

    h2{
        margin-top:0;
        font-size:18px;
    }
    .list{
        display:flex;
        flex-wrap:wrap;
        .adItem{
            width:33%;
        }
    }
    .pagination{
        display:flex;
        align-items:center;
        justify-content:center;
        .pagItem{
            width:30px;
            height:30px;
            border:1px solid #000;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:14px;
            margin-right:5px;
            cursor:pointer;
            &:hover{
                border:1px solid #ccc;
            }

            &.active{
                background-color:#ccc;
            }
        }
    }

`;
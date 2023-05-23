import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

import asd from "../../../assets/img/ProfilePicture-1679239292550-408532255.jpeg";

const Header = styled(Box)`
    height: 45px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    justify-content:center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;



const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;

const ChatHeader = ({ person }) => {  

    const url = person?.picture || asd;
    const activeUsers = useSelector((state) => state.socket.activeUsers);
    
    console.log(activeUsers,person._id);

    return (
        <Header>
           {// <Image src={url} alt="display picture" />
           }     
            <Box>
                <Name>{person._id}</Name>
                <Status>{activeUsers?.find(user=>user.id==person._id)?'Online':'Offline'}</Status>    
            </Box>   
        </Header>
    )
}

export default ChatHeader;
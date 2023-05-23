import React, { useEffect, useState } from 'react';
import { Divider, styled, Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveUsers, getSocket } from "../../../redux/socketSlice";

import Conversation from './Conversation';

const StyledDivider = styled(Divider)`
  margin: 0px 0 0 80px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector(state => state.user);
  
  const socket = getSocket(); // Access the socket instance from the redux store
  const dispatch = useDispatch();
  //console.log(socket,"Pop")
  const getContactList = async () => {
    try {
      const response = await axios.get("/api/conversation/contactList", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response) {
        return alert("Something went wrong");
      }

      const filteredData = response.data.filter(user =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filteredData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    socket.emit('addUser', user);
    socket.on("getUsers", users => {
      dispatch(setActiveUsers(users));
    });

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off("getUsers");
    };
    
  }, [user, socket, dispatch]);

  useEffect(() => {
    getContactList();
  }, [text, socket]);

  
  return (
  


    <Component>
        {
                users && users.map((user, index) => (
                   
                        <>
                            <Conversation usr={user} key={user._id}/>
                            {
                                users.length !== (index + 1)  && <StyledDivider />
                            }
                        </>
                ))
            }
    </Component>
  )
}

export default Conversations

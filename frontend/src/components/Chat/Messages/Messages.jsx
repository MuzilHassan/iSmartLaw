import React,{useEffect, useState,useRef} from 'react'
import { Box,styled } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import Footer from './Footer';
import { getSocket } from '../../../redux/socketSlice';
import Message from './Message';


const Wrapper= styled(Box)`
background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
background-size: 50%;
`;
const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;
const Messages = ({person,conversationId}) => {
  const {user}=useSelector((state)=>state.user);
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const socket = getSocket();
  const dispatch = useDispatch();

  const scrollRef=useRef()
  console.log(socket,"Pop123")
  const newMessages = async (data) => {
    try {
        return await axios.post(`api/messages/add`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}
const getMessages = async (id) => {
  try {
      let response = await axios.get(`api/messages/get/${id}`);
      setMessages(response.data)
  } catch (error) {
      console.log('Error while calling getMessages API ', error);
  }
}

 
/*
useEffect(() => {
    socket.current.on('getMessage', data => {
      setIncomingMessage({
          ...data,
          createdAt: Date.now()
      })
  })
}, []);

    useEffect(() => {
      incomingMessage && conversationId?.members?.includes(incomingMessage.senderId) && 
          setMessages((prev) => [...prev, incomingMessage]);
      
  }, [incomingMessage, conversationId]);
*/
  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if(code === 13) { 
      let message = {};
      if (!file) {
          message = {
            senderId: user.id,
            conversationId: conversationId,
            receiverId: person._id,
              type: 'text',
              text: value
          };
      } else {
          message = {
            senderId: user.id,
            conversationId: conversationId,
            receiverId: person._id,
              type: 'file',
              text: image
          }; 
    } 
    //socket.current.emit('sendMessage', message);
    newMessages(message)
    setValue('');
    setFile();
    setImage('');
}
  }

 useEffect(()=>{
      
       conversationId && getMessages(conversationId);
       
 },[conversationId,person])
 
 useEffect(() => {
  scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [messages]);
  return (
   <Wrapper>
    <Component>
     {
      messages && messages.map(message=>(
      <Container key={message._id}> <Message message={message} /></Container>
     ))
     }
    </Component>
    <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage}/>
   </Wrapper>
  )
}

export default Messages

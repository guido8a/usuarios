import { Alert, AlertTitle } from '@mui/material';
import { ChatController, MuiChat } from 'chat-ui-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { retornaChatsxRoom } from '../../acciones/chats';


export const ChatForm = (id) => {

  const dispatch = useDispatch();

  const [chatCtl] = React.useState(new ChatController());

 
  // React.useMemo(async () => {
    // Chat content is displayed using ChatController
    // await chatCtl.addMessage({

  // React.useEffect(() => {
  //   dispatch(retornaChatsxRoom(id));
  // }, [dispatch])

  const { chatRooms, room, chats } = useSelector(state => state.chat)

    
  chats.map((chat) => (
      chatCtl.addMessage({
      type: 'text',
      content: `${chat.texto || 'Buenos días'}`,
      self: false,
    })
  ))
 
    // const name = await chatCtl.setActionRequest({ type: 'text', always: true });
    const name = chatCtl.setActionRequest({ type: 'text', always: true, sendButtonText: 'Enviar' });

  // }, [chatCtl]);

  // Only one component used for display
  return (
    <div>
      <Alert severity="success">
        <AlertTitle><strong>Tarea:</strong> {room[0].nombre || ''} </AlertTitle>          
      </Alert>
      <Alert severity='info' sx={{display: 'flex'}}>
        <MuiChat chatController={chatCtl} />
      </Alert>
      
    </div>
  )
}

import { Alert, AlertTitle } from '@mui/material';
import { ChatController, MuiChat } from 'chat-ui-react';
import React from 'react'
import { useSelector } from 'react-redux';

export const ChatForm = () => {


  const [chatCtl] = React.useState(new ChatController());

  const { chatRooms, room } = useSelector(state => state.chat)

  // React.useMemo(async () => {
    // Chat content is displayed using ChatController
    // await chatCtl.addMessage({
    chatCtl.addMessage({
      type: 'text',
      content: `Buenos días`,
      self: false,
    });
    // const name = await chatCtl.setActionRequest({ type: 'text', always: true });
    const name = chatCtl.setActionRequest({ type: 'text', always: true });

    console.log("--> ", name.value)

  // }, [chatCtl]);

  // Only one component used for display
  return (
    <div>
      <Alert severity="success">
        <AlertTitle>Tarea: {room[0].nombre || ''} </AlertTitle>          
      </Alert>
      <Alert severity='info' sx={{display: 'flex'}}>
        <MuiChat chatController={chatCtl} />
      </Alert>
      
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { startDM, getRooms, checkRooms } from '../../../../../../Core/components/Messaging/methods';
import { GET_USER } from '../../../Resolvers';
import { useHistory } from 'react-router-dom';
import { message } from '../../../../../../global/icons/message';
import axios from 'axios'

const MessageCoachButton = ({ post, coach }) => {

  const history = useHistory();
 
  const messageCoach =  () => {
      const sender = localStorage.getItem('id')
      const reciever = post.coach.id
      const chatId = [sender, reciever].sort().join('')
        localStorage.setItem('chatId', chatId)
          axios.post('http://localhost:3300/api/newRoom', { id: chatId, user_1: sender, user_2: reciever })
          .then(res => {
              history.push(`/interviewq/inbox`)
            })
          .catch(error => {
              if (error.response.status === 409){
                history.push(`/interviewq/inbox`)
              }
              else{
                  alert(`Oops, something went wrong. Please try again later.`)
              }
          })
      }

  
return(
  <div className='message-icon'  onClick={()=> messageCoach()}>{message()}</div>
  )
 }

export default MessageCoachButton;
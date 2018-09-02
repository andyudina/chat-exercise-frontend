import io from 'socket.io-client'

import { SERVER_URL } from 'app-constants'

const socket = io(SERVER_URL)

console.log(socket)

export const joinChat = (chatId) => {
  socket.emit('join chat', chatId)
}

export const leaveChat = (chatId) => {
  socket.emit('leave chat', chatId)
}

export const sendMessage = (chatId) => {
  socket.emit('new message', chatId)
}

export const onRefreshMessges = (callback) => {
  socket.on('refresh messages', chatId => callback(chatId))
}

import React from 'react'

export const CalendarioEvento = ({event}) => {
    // console.log(event)
  return (
    <div>
        <span>{event.title}</span>
        <strong>..{event.usuario.nombre}</strong>
    </div>
  )
}

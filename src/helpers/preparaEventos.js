import moment from "moment"

export const preparaEventos = ( eventos = [] ) => { //[] habilita ayudas
    return eventos.map( 
        (e) => ({
            ...e,
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate(),
        })
    )
}
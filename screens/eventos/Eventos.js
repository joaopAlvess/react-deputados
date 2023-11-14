import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView } from 'react-native'
import { Card, Text } from 'react-native-paper'

const Eventos = ({ navigation }) => {
    const [eventos, setEventos] = useState([])

    useEffect(() => {

        apiDeputados.get('/eventos/').then(resultado => {
            setEventos(resultado.data.dados)
        })
    }, [])
    return (
        <>
            <ScrollView>

                {eventos.map((item) => (
                    <Card key={item.id}>
                        <Card.Content>
                            <Text>{item.descricaoTipo} - {item.situacao}</Text>
                            <Text>{item.descricao}</Text>

                        </Card.Content>

                    </Card>
                ))}
            </ScrollView>
        </>
    )
}

export default Eventos
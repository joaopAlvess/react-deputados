import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'

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
                    <Card mode='outlined' key={item.id}
                        //onPress={() => navigation.push('detalhes', { id: item.id })}
                        style={{ margin: 15, backgroundColor: '#dae8de'}}>
                        <Card.Content style={{ margin: 15 }}>
                            <Text variant="titleLarge" style={{ padding: 15 }}>Nº: {item.id}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Descrição: {item.descricaoTipo}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>{item.descricao}</Text>
                            <Divider />
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </>
    )
}

export default Eventos
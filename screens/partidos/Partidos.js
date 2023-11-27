import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import axios from "axios";

const Partidos = ({ navigation }) => {



    const [partidos, setPartidos] = useState([]);

    useEffect(() => {
        apiDeputados.get('/partidos/').then(resultado => {
            setPartidos(resultado.data.dados)
        })
    }, [])

    return (
        <>
            <ScrollView>

                {partidos.map((item) => (
                    <Card mode='outlined' key={item.id}
                        style={{ margin: 15 }}>
                        <Card.Content style={{ margin: 15, backgroundColor: '#dae8de', borderRadius: 8 }}>
                            <Text variant="titleLarge" style={{ padding: 15 }}>Nº: {item.id}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Nome: {item.nome}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Sigla: {item.sigla}</Text>
                            <Divider />
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </>
    );
}

export default Partidos
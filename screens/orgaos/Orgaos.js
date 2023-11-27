import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import axios from "axios";

const Orgaos = ({ navigation }) => {



    const [orgaos, setOrgaos] = useState([]);

    useEffect(() => {
        apiDeputados.get('/orgaos/').then(resultado => {
            setOrgaos(resultado.data.dados)
        })
    }, [])

    return (
        <>
            <ScrollView>

                {orgaos.map((item) => (
                    <Card mode='outlined' key={item.id}
                        style={{ margin: 15 }}>
                        <Card.Content style={{ margin: 15, backgroundColor: '#dae8de' }}>
                            <Text variant="titleLarge" style={{ padding: 15 }}>Nº: {item.id}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Identificação: {item.codTipoOrgao}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Nome: {item.nomePublicacao}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Tipo: {item.tipoOrgao}</Text>
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

export default Orgaos
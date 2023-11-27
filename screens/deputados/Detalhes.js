import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import axios from "axios";

const Detalhes = ({ navigation, route }) => {

    const [deputado, setDeputado] = useState({})
    const [gastos, setGastos] = useState([])
    const [despesas, setDespesas] = useState([]);

    useEffect(() => {
        const id = route.params.id
        apiDeputados.get(`/deputados/${id}`).then(resultado => {
            setDeputado(resultado.data.dados)
        })

        apiDeputados.get(`/deputados/${id}/despesas?itens=100`).then(resultado => {
            const despesas = resultado.data.dados.map(item => ({
                nome: item.valorDocumento,
                gastos: item.tipoDespesa,
            }))
            setGastos(despesas)
        })
    }, [])

    return (
        <>
            {deputado.id &&
                <ScrollView>
                    <Card style={{marginTop: 15, backgroundColor: '#dae8de' }}>
                        <Card.Cover
                            source={{ uri: deputado.ultimoStatus.urlFoto }} style={{ width: 400, height: 300, padding: 20 }}
                        />
                        <Card.Content>
                            <Text variant="titleLarge" style={{fontSize: 20, margin: 15, textAlign: 'center'}}>{deputado.ultimoStatus.nome}</Text>
                        </Card.Content>
                    </Card>

                    <Text variant='titleLarge' style={{ textAlign: 'center', margin: 15, fontWeight: 'bold', fontSize: 30 }}>Informações</Text>

                    <Card style={{margin: 15 }} mode='outlined'>
                        <Card.Content style={{ marginBottom: 15, backgroundColor: '#dae8de' }} mode='outlined'>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Email: {deputado.ultimoStatus.gabinete.email}</Text>
                            <Divider/>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Data de nascimento: {deputado.dataNascimento}</Text>
                            <Divider/>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Telefone: {deputado.ultimoStatus.gabinete.telefone}</Text>
                            <Divider/>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Situação: {deputado.ultimoStatus.situacao}</Text>
                        </Card.Content>
                    </Card>

                    <Text variant='titleLarge' style={{ textAlign: 'center', margin: 15, fontWeight: 'bold', fontSize: 30 }}>Gastos do Deputado</Text>

                    <View>
                        <VictoryPie
                            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                            data={gastos}
                            x="gastos"
                            y="nome"
                            labelRadius={70}
                            labelComponent={<VictoryTooltip />}

                        />
                    </View>
                </ScrollView>
            }
        </>
    );
}

export default Detalhes
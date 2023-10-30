import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'

const Detalhes = ({ navigation, route }) => {

    const [deputado, setDeputado] = useState({})
    const [gastos, setGastos] = useState([])


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
                <ScrollView style={{ padding: 15 }}>
                    <Card style={{ marginBottom: 15 }}>
                        <Card.Cover
                            source={{ uri: deputado.ultimoStatus.urlFoto }}
                        />
                        <Card.Content>
                            <Text variant="titleLarge"><center>{deputado.ultimoStatus.nome}</center></Text>
                        </Card.Content>
                    </Card>

                    <Text>Informações</Text>

                    <Card style={{ marginBottom: 15 }} mode='outlined'>
                        <Card.Content style={{ marginBottom: 15 }} mode='outlined'>
                            <Text variant="bodyMedium">Email: {deputado.ultimoStatus.gabinete.email}</Text>
                            <Text variant="bodyMedium">Data de nascimento: {deputado.dataNascimento}</Text>
                            <Text variant="bodyMedium">Telefone: {deputado.ultimoStatus.gabinete.telefone}</Text>
                            <Text variant="bodyMedium">Situação: {deputado.ultimoStatus.situacao}</Text>
                        </Card.Content>
                    </Card>

                    <Text>Gastos dos Deputados</Text>

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
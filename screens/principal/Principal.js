import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import axios from "axios";

const principal = ({ navigation }) => {





    // onPress={() => navigation.push('detalhes', { id: item.id })}

    return (
        <>
            <ScrollView>
                <Card mode='outlined' key={item.id}
                    style={{ margin: 15 }}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content style={{ margin: 15, backgroundColor: '#dae8de' }}>
                        <Text variant="titleLarge" style={{ padding: 15 }}>Nº: {item.id}</Text>
                        <Divider />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Nome: {item.nome}</Text>
                        <Divider />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Sigla: {item.sigla}</Text>
                        <Divider />
                    </Card.Content>
                </Card>

            </ScrollView>
        </>
    );
}

export default principal
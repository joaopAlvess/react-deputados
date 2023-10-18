import React, { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { Link } from '@react-navigation/native';
import apiDeputados from '../../service/apiDeputados';

const Deputados = ({ navigation }) => {
    const [deputados, setDeputados] = useState([])

    useEffect(() => {

        apiDeputados.get('/deputados/').then(resultado => {
            setDeputados(resultado.data.dados)
        })
    }, [])
    return (
        <>
            <ScrollView>

                {deputados.map((item) => (
                    <Card key={item.id}
                        onPress={() => navigation.push('detalhes', { id: item.id })}
                        style={{marginBottom: 15}}>                           
                        <Card.Cover
                            source={item.urlFoto} style={{ width: 400, height: 600 }} />                       
                    </Card>
                ))}
            </ScrollView>
        </>
    )
}

export default Deputados
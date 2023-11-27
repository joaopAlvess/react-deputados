import React, { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { Link } from '@react-navigation/native';
import apiDeputados from '../../service/apiDeputados';

const Deputados = ({ navigation, route }) => {
    const [deputados, setDeputados] = useState([])

    useEffect(() => {


        apiDeputados.get('/deputados/').then(resultado => {
            setDeputados(resultado.data.dados)
        })
       

    }, [])
    
    return (
        <>
            <ScrollView>

                <Text variant='titleLarge' style={{ color: 'green', textAlign: 'center', margin: 15 }}>Deputados</Text>
                {deputados.map((item) => (
                    <Card mode='outlined' key={item.id}
                        onPress={() => navigation.push('detalhes', { id: item.id })}
                        style={{ marginBottom: 15 }}>
                        <Card.Cover
                            source={item.urlFoto} style={{ width: 400, height: 600, padding: 20 }} 
                            
                            />
                        <Card.Content style={{ marginBottom: 15, border: 1 }}>
                            <Text variant="titleLarge" style={{ padding: 15 }}>{item.nome}</Text>
                            <Divider />
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Email: {item.email}</Text>
                            <Divider />
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Uf: {item.siglaUf}</Text>
                            <Divider />
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Legislatura: {item.idLegislatura}</Text>
                            <Divider />
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView >
        </>
    )
}

export default Deputados
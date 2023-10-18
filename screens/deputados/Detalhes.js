import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { Image, ScrollView } from 'react-native'
import { Card, Text } from 'react-native-paper'

const Detalhes = ({ navigation }) => {

    const [deputado, setDeputado] = useState({})
    

    useEffect(() => {
        
        apiDeputados.get(`/deputados/${id}`).then(resultado => {
            setDeputado(resultado.data.dados)
        })
       
    }, [])

  return ( 

        <>
            <ScrollView style={{ padding: 15 }}>
                <Card style={{ marginBottom: 15 }}>
                <Image
                source={deputado.ultimoStatus.urlFoto}/>
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
            </ScrollView>
        </>
  )
}

export default Detalhes
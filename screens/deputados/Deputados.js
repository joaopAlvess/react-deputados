import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Divider, Text, TextInput } from 'react-native-paper';
import apiDeputados from '../../service/apiDeputados';



const Deputados = ({ navigation, route }) => {
    const [deputados, setDeputados] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        apiDeputados.get('/deputados/').then(resultado => {
            setDeputados(resultado.data.dados)
        })
    }, [])

    const filtrarPorNome = () => {
        return deputados.filter((deputado) =>
            deputado.nome.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <ScrollView>
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10, borderRadius: 10 }}
                        placeholder="Pesquisar por nome"
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                    />

                    {/* Chame a função filtrarPorNome() aqui */}
                    {filtrarPorNome().map((item) => (
                        <Card
                            mode="outlined"
                            key={item.id}
                            onPress={() => navigation.push('detalhes', { id: item.id })}
                            style={{ marginBottom: 15, marginTop: 15, backgroundColor: '#dae8de' }}
                        >
                            <Card.Cover source={{ uri: item.urlFoto }} style={{ width: 400, height: 400, padding: 20 }} />
                            <Card.Content style={{ marginBottom: 15, border: 1 }}>
                                <Text variant="titleLarge" style={{ padding: 15 }}>
                                    {item.nome}
                                </Text>
                                <Divider />
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Email: {item.email}</Text>
                                <Divider />
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Uf: {item.siglaUf}</Text>
                                <Divider />
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Legislatura: {item.idLegislatura}</Text>
                                <Divider />
                            </Card.Content>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default Deputados
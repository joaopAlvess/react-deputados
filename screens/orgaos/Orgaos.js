import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, View } from 'react-native'
import { Button, Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import axios from "axios";
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Orgaos = ({ navigation }) => {



    const [orgaos, setOrgaos] = useState([]);
    const [paginas, setPaginas] = useState(6);

    const handleCarregarMais = () => {
        let numeroDePaginas = paginas;
        numeroDePaginas += 6;
        setPaginas(numeroDePaginas);
    };

    useEffect(() => {
        const pegarOrgao = async () => {

            const resultado = await apiDeputados.get('/orgaos/').then(resultado => {
                const dados = resultado.data.dados.slice(0, paginas);
                setOrgaos(dados);
                return resultado.data;
            });
        };
        pegarOrgao();
    }, [paginas]);

    return (
        <>
            <ScrollView>
                <View>

                    {orgaos.map((item) => (
                        <Card mode='outlined' key={item.id}
                            style={{ margin: 15, backgroundColor: '#dae8de' }}>
                            <Card.Content style={{ margin: 15, backgroundColor: '#dae8de', borderRadius: 8 }}>
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

                    <TouchableOpacity
                        style={[styles.button, { alignSelf: 'center' }]}
                        onPress={handleCarregarMais}
                    >
                        <Text style={styles.buttonText}>Carregar Mais</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15,
        width: 150
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Orgaos
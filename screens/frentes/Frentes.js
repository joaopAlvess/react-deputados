import React, { useEffect, useState } from 'react'
import apiDeputados from '../../service/apiDeputados'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import { VictoryPolarAxis, VictoryChart, VictoryTooltip, VictoryPie } from 'victory'
import { TouchableOpacity } from 'react-native'

const Frentes = ({ navigation }) => {



    const [frentes, setFrentes] = useState([]);
    const [paginas, setPaginas] = useState(6);

    const handleCarregarMais = () => {
        let numeroDePaginas = paginas;
        numeroDePaginas += 6;
        setPaginas(numeroDePaginas);
    };

    useEffect(() => {
        const pegarFrente = async () => {

            const resultado = await apiDeputados.get('/frentes/').then(resultado => {
                const dados = resultado.data.dados.slice(0, paginas);
                setFrentes(dados);
                return resultado.data;
            });
        };
        pegarFrente();
    }, [paginas]);

    return (
        <>
            <ScrollView>
                <View>
                    {frentes.map((item) => (
                        <Card mode='outlined' key={item.id}
                            style={{ margin: 15 }}>
                            <Card.Content style={{ margin: 15, backgroundColor: '#dae8de', borderRadius: 8 }}>
                                <Text variant="titleLarge" style={{ padding: 15 }}>Nº: {item.id}</Text>
                                <Divider />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>{item.titulo}</Text>
                                <Divider />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 7 }}>Legislatura: {item.idLegislatura}</Text>
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

export default Frentes
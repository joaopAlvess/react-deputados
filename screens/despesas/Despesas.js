import React, { useState, useEffect } from 'react'
import { Image, View } from 'react-native'
import { Card, Text, TextInput } from 'react-native-paper'
import { VictoryChart, VictoryLine } from 'victory'
import apiDeputados from '../../service/apiDeputados'
import { Chart } from 'chart.js'
import { Link } from '@react-navigation/native'




const Despesas = ({
  deputadosDF,
  deputadosGO,
  deputadosMT,
  deputadosMS,
  somaTotalDespesasDF,
  somaTotalDespesasGO,
  somaTotalDespesasMT,
  somaTotalDespesasMS,
}) => {
  const [mesAno, setMesAno] = useState("");
  const [gastosEstados, setGastosEstados] = useState({});

  const handleMesAnoChange = (event) => {
    setMesAno(event.target.value);
  };

  const filtrarDeputadosDespesasAltas = (deputados) => {
    if (!mesAno) {
      return deputados;
    }

    const [mes, ano] = mesAno.split("-");

    const deputadosFiltrados = deputados
      .map((deputado) => ({
        ...deputado,
        despesasFiltradas: deputado.despesas.filter((despesa) => {
          const [despesaMes, despesaAno] = despesa.dataDocumento.split("-");
          return despesaMes === mes && despesaAno === ano;
        }),
      }))
      .filter((deputado) => deputado.despesasFiltradas.length > 0)
      .map((deputado) => ({
        ...deputado,
        totalDespesasFiltradas: deputado.despesasFiltradas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      }));

    return deputadosFiltrados.sort(
      (a, b) => b.totalDespesasFiltradas - a.totalDespesasFiltradas
    );
  };
  useEffect(() => {
    const calcularGastosEstados = () => {
      const estados = {
        DF: somaTotalDespesasDF,
        GO: somaTotalDespesasGO,
        MT: somaTotalDespesasMT,
        MS: somaTotalDespesasMS,
      };

      setGastosEstados(estados);
    };

    calcularGastosEstados();
  }, [
    somaTotalDespesasDF,
    somaTotalDespesasGO,
    somaTotalDespesasMT,
    somaTotalDespesasMS,
  ]);

  useEffect(() => {
    const renderLineChart = () => {
      const ctx = document.getElementById("lineChart").getContext("2d");
      const labels = ["DF", "GO", "MT", "MS"];
      const data = [
        gastosEstados.DF || 0,
        gastosEstados.GO || 0,
        gastosEstados.MT || 0,
        gastosEstados.MS || 0,
      ];

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Gastos por Estado",
              data: data,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    renderLineChart();
  }, [gastosEstados]);

  return (
    <>
      <View>
        
         <Text>Despesas dos deputados do Centro-Oeste no ano de 2023</Text>       
          <canvas id="lineChart"></canvas>
            <Text>Selecione o Mês:</Text>
            <TextInput type="month" value={mesAno} onChange={handleMesAnoChange} />
          
          <Text>
            <strong>Soma total das despesas dos deputados do DF: </strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(somaTotalDespesasDF)}
          </Text>
          
            {filtrarDeputadosDespesasAltas(deputadosDF.deputados).map(
              (item) => (
                
                  <Card>
                    <Card.Header>
                      <Image
                        variant="top"
                        className={styles.photo}
                        src={item.urlFoto}
                      />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <strong>{item.nome}</strong>
                      </Card.Title>
                      
                        <strong>Partido: </strong>
                        {item.siglaPartido}
                      
                      
                        <strong>UF: </strong>
                        {item.siglaUf}
                      
                        <strong>
                          Total de despesas no período selecionado:{" "}
                        </strong>
                        {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                    </Card.Body>
                  </Card>
              )
            )}

          <Text>
            <strong>Soma total das despesas dos deputados de Goiás: </strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(somaTotalDespesasGO)}
          </Text>
          
            {filtrarDeputadosDespesasAltas(deputadosGO).map((item) => (
              
                <Card>
                  <Card.Header>
                    <Image
                      variant="top"
                      className={styles.photo}
                      src={item.urlFoto}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <strong>{item.nome}</strong>
                    </Card.Title>
                    
                      <strong>Partido: </strong>
                      {item.siglaPartido}
                    
                    
                      <strong>UF: </strong>
                      {item.siglaUf}
                    
                      <strong>
                        Total de despesas no período selecionado:{" "}
                      </strong>
                      {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </Card.Body>
                </Card>
              
            ))}
          

          <Text>
            <strong>
              Soma total das despesas dos deputados do Mato Grosso:{" "}
            </strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(somaTotalDespesasMT)}
          </Text>
          
            {filtrarDeputadosDespesasAltas(deputadosMT).map((item) => (
              
                <Card >
                  <Card.Header>
                    <Image
                      variant="top"
                      className={styles.photo}
                      src={item.urlFoto}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <strong>{item.nome}</strong>
                    </Card.Title>
                   
                      <strong>Partido: </strong>
                      {item.siglaPartido}
                   
                      <strong>UF: </strong>
                      {item.siglaUf}
                   
                      <strong>
                        Total de despesas no período selecionado:{" "}
                      </strong>
                      {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </Card.Body>
                </Card>
              
            ))}
         

          <Text>
            <strong>
              Soma total das despesas dos deputados de Mato Grosso do Sul:{" "}
            </strong>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(somaTotalDespesasMS)}
          </Text>
          
            {filtrarDeputadosDespesasAltas(deputadosMS).map((item) => (
           
                <Card >
                  <Card.Header>
                    <Image
                      variant="top"
                      className={styles.photo}
                      src={item.urlFoto}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title >
                      <strong>{item.nome}</strong>
                    </Card.Title>
                  
                      <strong>Partido: </strong>
                      {item.siglaPartido}
                    
                      <strong>UF: </strong>
                      {item.siglaUf}
                    
                      <strong>
                        Total de despesas no período selecionado:{" "}
                      </strong>
                      {item.totalDespesasFiltradas?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </Card.Body>
                </Card>
              
            ))}
          
        
      </View>
    </>
  );
};

export async function getServerSideProps(context) {
  const resultadoDF = await apiDeputados.get("/deputados/?siglaUf=DF");
  const deputadosDF = resultadoDF.data.dados;

  const deputadosComDespesasDF = await Promise.all(
    deputadosDF.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasDF = deputadosComDespesasDF.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoGO = await apiDeputados.get("/deputados/?siglaUf=GO");
  const deputadosGO = resultadoGO.data.dados;

  const deputadosComDespesasGO = await Promise.all(
    deputadosGO.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasGO = deputadosComDespesasGO.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoMT = await apiDeputados.get("/deputados/?siglaUf=MT");
  const deputadosMT = resultadoMT.data.dados;

  const deputadosComDespesasMT = await Promise.all(
    deputadosMT.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasMT = deputadosComDespesasMT.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  const resultadoMS = await apiDeputados.get("/deputados/?siglaUf=MS");
  const deputadosMS = resultadoMS.data.dados;

  const deputadosComDespesasMS = await Promise.all(
    deputadosMS.map(async (item) => {
      const despesasResult = await apiDeputados.get(
        `/deputados/${id}/despesas?itens=100`
      );
      const despesas = despesasResult.data.dados;

      return {
        ...item,
        despesas,
        totalDespesas: despesas.reduce(
          (acumulador, despesa) =>
            acumulador + parseFloat(despesa.valorDocumento),
          0
        ),
      };
    })
  );

  const somaTotalDespesasMS = deputadosComDespesasMS.reduce(
    (acumulador, deputado) => acumulador + deputado.totalDespesas,
    0
  );

  return {
    props: {
      deputadosDF: {
        deputados: deputadosComDespesasDF,
      },
      deputadosGO: deputadosComDespesasGO,
      deputadosMT: deputadosComDespesasMT,
      deputadosMS: deputadosComDespesasMS,
      somaTotalDespesasDF,
      somaTotalDespesasGO,
      somaTotalDespesasMT,
      somaTotalDespesasMS,
    },
  };
}

export default Despesas

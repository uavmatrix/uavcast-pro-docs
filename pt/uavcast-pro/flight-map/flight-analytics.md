# Análise de Voo

> Gere gráficos da telemetria MAVLink ao vivo ou de um arquivo .tlog gravado na Análise de Voo do UAVcast-Pro. Escolha até 10 parâmetros, compare-os ao longo do tempo e revise um voo no drone.

A Análise de Voo plota valores MAVLink ao longo do tempo, ao vivo do controlador de voo ou a partir de um arquivo `.tlog` gravado. Use-a para verificar vibração, queda de tensão da bateria, manutenção de altitude ou valores de sinal sem copiar logs para um PC. Abra **Mapa de Voo → Análise de Voo**.

![Aba Análise de Voo sem arquivo de log carregado, o botão Abrir Arquivo de Log, a chave Ao Vivo e o painel de Parâmetros](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-map--flight-analytics.webp)

*Análise de Voo antes de carregar um log. Abrir Arquivo de Log carrega um .tlog.*

## Plotar telemetria ao vivo

1. Selecione **Ao Vivo**. A lista de parâmetros é preenchida conforme as mensagens chegam. Se continuar em *Aguardando Dados MAVLink*, conecte primeiro o controlador de voo.
2. Pesquise em **Parâmetros** e marque os valores a plotar. Você pode plotar até **10** de uma vez.
3. Ative **Acumular dados** para manter cada ponto (*Armazenando todos os pontos*). Desativado, o gráfico mantém uma janela deslizante (*Últimos … pontos*).

## Analisar um log gravado

1. Selecione **Abrir Arquivo de Log**.
2. Em **Selecionar Arquivo de Log**, escolha um `.tlog` gravado. Os logs de telemetria vêm de [Gravações](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/) (por padrão, um por voo armado).
3. Marque os parâmetros a plotar. A **Duração** e o número de **Parâmetros** do arquivo são mostrados no topo.

**Limpar Tudo** remove todos os parâmetros plotados.

## De onde vêm os logs

A telemetria é registrada no drone de acordo com **Gravar telemetria** em **Câmera → Gravações → Configurações**: **Enquanto armado** (padrão), **Sempre que conectado** ou **Desligado**. Os mesmos arquivos `.tlog` abrem no Mission Planner, MAVExplorer e UAV Log Viewer.

A aba lateral **Gravações** do Mapa de Voo lista os mesmos logs de telemetria com **Mensagens**, **Alt Máx** e **Distância**, e permite **Baixar .tlog**, **Excluir** ou **Reproduzir** um log. A reprodução transmite a telemetria gravada para o mapa como se o drone estivesse voando.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/flight-analytics/

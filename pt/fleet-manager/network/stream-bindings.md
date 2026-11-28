# Vinculações de fluxo

> Encaminhe vídeo e MAVLink de qualquer drone para qualquer estação de controle terrestre pela VPN, veja como o Fleet Manager atribui portas UDP e como configurar QGC e Mission Planner.

Uma vinculação de fluxo diz a um drone para enviar seu vídeo e sua telemetria a uma estação de controle terrestre pela VPN da sua organização. Um drone pode transmitir para várias estações, e uma estação pode receber vários drones. O Fleet Manager escolhe as portas para que os fluxos nunca colidam.

## Antes de começar

- [VPN ativada](https://docs.uavmatrix.com/pt/fleet-manager/network/#enable-vpn) e o drone na VPN (tipo **UAV** em **Connected Devices**).
- A estação de controle terrestre [conectada e configurada como **GCS**](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/).
- Função **Owner ou Admin**.
- O drone **online**. O Fleet Manager envia os novos destinos ao UAVcast-Pro imediatamente e aguarda a confirmação dele.

## Adicionar uma vinculação

1. Vá em **Network → Stream Bindings** e selecione **Add Binding**.
2. Em **Add Stream Binding**, escolha o **Drone** e a **Ground Station**.
3. Selecione **Create Binding**.

![Caixa de diálogo Add Stream Binding com seletores de drone e estação de controle terrestre e uma nota sobre portas automáticas](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--add-binding.webp)

*Caixa de diálogo Add Stream Binding com um drone e uma estação de controle terrestre selecionados, e a nota de que as portas são atribuídas automaticamente.*

A vinculação aparece na tabela com **Video** e **Telemetry** ativados e suas **Ports** (vídeo / telemetria). O UAVcast-Pro começa a enviar em poucos segundos.

Se o drone não confirmar em 15 segundos, o Fleet Manager cancela a vinculação com **Failed to send configuration to drone - it may be offline**. Verifique se o drone está online e tente novamente.

## Como as portas são atribuídas

As portas são contadas **por estação de controle terrestre**. Cada vinculação recebe seu próprio bloco de portas UDP nessa estação, então os drones nunca se sobrepõem:

- uma porta de **vídeo** para a câmera 1, seguida de espaço para a **câmera 2** (dual stream) e para o **áudio**, que o UAVcast-Pro envia para as portas seguintes à porta de vídeo;
- uma porta de **telemetria** para o MAVLink.

A primeira vinculação em uma estação usa os padrões: vídeo **5600** e telemetria **14550**. As vinculações seguintes recebem o próximo bloco livre.

Algumas consequências que vale conhecer:

- **Toda estação começa nos padrões.** O mesmo drone pode ter portas diferentes em dois notebooks, dependendo do que cada notebook recebe.
- **Portas liberadas são reutilizadas.** Remover uma vinculação libera seu bloco para a próxima nova vinculação com aquele notebook.
- **As portas não acompanham o drone.** Remover e adicionar novamente uma vinculação pode resultar em portas diferentes. Sempre leia a coluna **Ports** antes de configurar o software da estação de controle terrestre.
- As portas são atribuídas pelo Fleet Manager e não podem ser editadas no aplicativo.
- Uma **Porta de Vídeo (Câmera 2)** definida manualmente no drone só é mantida quando o Fleet Manager atualiza seus destinos a partir do UAVcast-Pro 6.5.3. Em versões anteriores, a próxima atualização a apaga.

## Configurar o software da estação de controle terrestre

Use as portas da coluna **Ports** da vinculação. O fluxo chega a partir do endereço VPN do drone.

**QGroundControl**

- **Telemetria:** o QGroundControl escuta a UDP 14550 por padrão, então o primeiro drone conecta sozinho. Para mais drones, abra **Application Settings → Comm Links**, adicione um link do tipo **UDP** com a porta de telemetria da vinculação e conecte-o.
- **Vídeo:** em **Application Settings → Video** (em **General** nas versões mais antigas), defina **Source** como **UDP h.264 Video Stream** e a porta UDP como a porta de vídeo da vinculação (**UDP URL** `0.0.0.0:<port>` nas versões atuais). O QGroundControl mostra um vídeo por vez; para assistir a vários drones, execute uma segunda instância ou use um player de vídeo para os outros.

**Mission Planner**

- **Telemetria:** na lista suspensa de conexão no canto superior direito, escolha **UDP**, selecione **Connect** e digite a porta de telemetria da vinculação. Para vários drones, conecte uma vez por porta; o Mission Planner lista cada veículo pelo ID do sistema.
- **Vídeo:** clique com o botão direito no HUD, escolha **Video → Set GStreamer Source** e digite um pipeline que escute na porta de vídeo da vinculação. Veja [Mission Planner](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/mission-planner/) para o pipeline exato.

> **Dê a cada drone seu próprio ID de sistema MAVLink**
>
> Quando uma estação de controle terrestre recebe vários drones, cada controlador de voo precisa de um `SYSID_THISMAV` exclusivo (ArduPilot) ou `MAV_SYS_ID` (PX4). Caso contrário, a estação mistura os drones.

Mais sobre como operar muitos veículos a partir de uma estação: [Transmita para várias estações de controle terrestre](https://docs.uavmatrix.com/pt/guides/multiple-ground-stations/).

## Pausar ou remover uma vinculação

- Desligue **Video** ou **Telemetry** na tabela para interromper esse fluxo sem perder a vinculação nem suas portas. Faça isso com o drone online, para que ele receba a alteração.
- Selecione o ícone de lixeira para remover a vinculação. As portas ficam livres para a próxima vinculação com essa estação de controle terrestre.

Use a caixa de busca e o filtro **Video Status** (**All Video**, **Video On**, **Video Off**) para encontrar vinculações em uma frota grande.

![Tabela Stream Bindings listando drones, estações de controle terrestre, chaves de vídeo e telemetria e portas](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--stream-bindings.webp)

*Aba Stream Bindings: cada vinculação lista seu drone, sua estação de controle terrestre, as chaves Video e Telemetry e suas portas.*

## Vinculações na página do UAV

Cada [página do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/#connected-ground-stations) lista suas estações de controle terrestre em **Connected Ground Stations**, com as mesmas chaves e **Pause** / **Resume**. **Add GCS** ali cria uma vinculação da mesma forma que **Add Binding** aqui, com as próximas portas livres naquela estação.

## Nenhum fluxo chegando?

Veja [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/) e [Sem vídeo na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/). As causas mais comuns são um firewall no notebook bloqueando UDP de entrada, o software da estação escutando na porta errada ou o fluxo desativado na vinculação.

Source: https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/

# Início rápido

> Conecte um controlador de voo MAVLink ao UAVcast-Pro e obtenha telemetria e vídeo ao vivo no Mission Planner ou no QGroundControl, primeiro na sua rede local e depois via 4G/LTE.

Este guia leva um drone com o UAVcast-Pro instalado até a telemetria e o vídeo ao vivo no Mission Planner ou no QGroundControl. Você começará pela sua rede local, onde há menos coisas que podem dar errado, e depois passará para o 4G/LTE. A parte local leva cerca de 10 minutos.

## Antes de começar

- UAVcast-Pro instalado e o dispositivo reiniciado. Veja [Instalação](https://docs.uavmatrix.com/pt/get-started/installation/).
- Sua chave de licença. Veja [Licenciamento e ativação](https://docs.uavmatrix.com/pt/get-started/license-activation/).
- O controlador de voo conectado ao computador companheiro por USB ou por uma porta TELEM, e alimentado.
- Uma câmera conectada (opcional).
- Um notebook com Mission Planner ou QGroundControl na **mesma rede** do drone. Anote o endereço IP do notebook (`ipconfig` no Windows, `ip a` no Linux, **Ajustes do Sistema → Rede** no macOS).

## 1. Ative a licença

> Você precisa de uma licença do UAVcast-Pro para ativar o drone. Compre uma na loja da UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

1. Abra `http://<drone-ip>` em um navegador. Você cairá em **Aplicação**.
2. Cole sua chave em **Digite a Chave de Licença** e selecione **Validar**.

A barra lateral é desbloqueada. Agora vá em **Users**, selecione **Add User** e crie uma conta de administrador, para que a interface web não fique aberta a qualquer pessoa da rede.

## 2. Conecte o controlador de voo

1. Vá em **Controlador de Voo → Conexão**.
2. Em **Tipo de Conexão**, escolha **USB** ou **UART / Serial**, conforme a sua fiação.
3. Deixe **Porta** e **Taxa de Transmissão** em **Automático**.
4. Se o painel de status indicar **Link parado**, selecione **Conectar**.
5. Aguarde o estado mudar para **Conectado**. **Informações Mavlink** é preenchido com o tipo de veículo, o modo de voo, o GPS e a bateria, e a barra superior mostra **FC Conectado**.

![Página de Conexão do Controlador de Voo mostrando Conectado via USB, a verificação de conexão com quatro etapas aprovadas e o Inspetor MAVLink](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-controller.webp)

*Controlador de Voo → Conexão com um link USB funcionando.*

Travado em **Aguardando dispositivo**, **Detectando taxa de transmissão** ou **Sem heartbeat**? Selecione **Detecção automática** e leia o painel **Verificação de conexão**: ele informa o primeiro problema. Mais informações em [Controlador de voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/).

## 3. Envie telemetria e vídeo para o seu notebook

1. Vá em **Estações de Controle Terrestre**. Já há um cartão de destino vazio.
2. Digite um **Nome**, por exemplo `Laptop`.
3. Em **IP ou Host de Destino**, digite o endereço IPv4 do seu notebook, por exemplo `192.168.1.20`, e pressione Enter. Uma marca verde indica que foi salvo.
4. Deixe **Porta de Telemetria** em `14550` e **Porta de Vídeo** em `5600`.
5. Ligue a opção **Ativar Telemetria**.
6. Ligue a opção **Ativar Vídeo**, se você tiver uma câmera.

Os campos são salvos ao sair deles. Não há botão Salvar.

## 4. Inicie a câmera

Pule esta etapa se você não tiver câmera.

1. Vá em **Câmera → Configurações da câmera**.
2. Defina **Ativar Câmera?** como **Sim**.
3. Clique no slot **CAM 1** e escolha sua câmera, por exemplo *Raspberry Pi Camera - imx708 (CSI)* ou sua webcam USB.
4. Em **Configurações da câmera**, escolha uma **Resolução**. Comece com `1280x720` ou o tamanho mais próximo que sua câmera oferecer.
5. Deixe **Selecionar FPS** em **Automático** e **Taxa de Bits** em `0` (automático).
6. Em **Configurações de transmissão**, marque **Ativar Pré-visualização ao Vivo?** e selecione **Iniciar**. A **Visualização ao Vivo** mostra a imagem.

## 5. Abra sua estação de controle terrestre

**QGroundControl**

O QGroundControl escuta a UDP 14550 por padrão, então o drone aparece sozinho em poucos segundos.

Para vídeo: clique no ícone **Q** → **Application Settings** → **Video** (em versões mais antigas, a seção **Video** de **General**). Defina **Source** como **UDP h.264 Video Stream** e mantenha a porta UDP padrão `5600`. O vídeo aparece na visualização Fly.

**Mission Planner**

No canto superior direito, escolha **UDP**, selecione **Connect** e aceite a porta `14550`.

![Visualização Flight Data do Mission Planner conectada via UDP: a caixa de conexão no canto superior direito mostra UDP, o link UDP14550-1-QUADRO e o botão DISCONNECT; o HUD mostra DISARMED, Unhealthy AHRS e GPS: No Fix](https://docs.uavmatrix.com/pt/img/screenshots/gcs/mission-planner--connected.webp)

*Mission Planner conectado via UDP 14550: a caixa de conexão (canto superior direito) mostra o link e o DISCONNECT. Configuração de bancada sem GPS, por isso Unhealthy AHRS e GPS: No Fix no HUD.*

Para vídeo: clique com o botão direito no HUD → **Video** → **Set GStreamer Source** e cole:

```text
udpsrc port=5600 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! rtpjitterbuffer ! rtph264depay ! avdec_h264 ! videoconvert ! video/x-raw,format=BGRA ! appsink name=outsink
```

Guias completos com capturas de tela e soluções: [Mission Planner](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/mission-planner/), [QGroundControl](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/qgroundcontrol/), [Android](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/android/), e GStreamer no [Windows](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-windows/), [Linux](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-linux/) ou [macOS](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/gstreamer-macos/).

> **Firewall do Windows**
>
> O Windows bloqueia UDP de entrada, a menos que o aplicativo tenha solicitado uma exceção. Se a telemetria ou o vídeo não chegarem, permita o Mission Planner ou o QGroundControl no firewall para redes **privadas e públicas**, ou libere as portas UDP 14550 e 5600.

Agora você tem telemetria e vídeo na sua rede local. A linha **Estação de controle terrestre** do painel mostra *Enviando · … pacotes/s*.

## 6. Voe sobre 4G/LTE

Em uma rede celular, o drone não tem um endereço que o seu notebook consiga alcançar; por isso, os dois entram na mesma VPN. A VPN do Fleet Manager está incluída na sua licença.

1. Conecte o modem. Em **Modem**, defina **Tipo de modem** como **HiLink** ou **Tradicional (PPP)**. Deixe **Nome do Ponto de Acesso** vazio: o UAVcast-Pro encontra o APN. Veja [Modem celular](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/cellular-modem/).
2. Entre no [Fleet Manager](https://fleet-manager.uavmatrix.com/), abra **Network** e selecione **Enable VPN Network**, se ela ainda não estiver ativa.
3. Pareie o drone: no UAVcast-Pro, vá em **Gerenciamento → Fleet Management → Connect to Fleet Manager** e depois digite o código no Fleet Manager em **Fleet → Pair Device**. Mantenha a opção **Enable VPN for this UAV** marcada.
4. Coloque o notebook na VPN: instale o Tailscale e execute o **GCS Connection Command** na página **Network** do Fleet Manager; depois, marque o notebook como **Ground Control Station (GCS)**.
5. Em **Network → Stream Bindings**, adicione uma vinculação do drone para o notebook. O Fleet Manager envia o destino ao drone, e a coluna **Ports** mostra em quais portas escutar.
6. Em **Redes**, selecione **Prioridade Modem (Modo Externo)** para que o tráfego passe pelo modem quando o Wi-Fi cair.

Tutorial completo: [Voe além do alcance visual via 4G](https://docs.uavmatrix.com/pt/guides/bvlos-4g/). Já tem sua própria rede Tailscale ou ZeroTier? Em vez disso, adicione o drone e o notebook a ela e use o IP de VPN do notebook como destino: veja [VPN](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/).

> **Configure um failsafe de GCS antes de voar sobre LTE**
>
> Enlaces celulares caem. Certifique-se de que o controlador de voo tenha um failsafe de GCS configurado (`FS_GCS_ENABLE` no ArduPilot, `NAV_DLL_ACT` no PX4). A barra superior mostra **Failsafe GCS Ativado** ou **Failsafe GCS Desativado**.

## Próximos passos

- [Duas câmeras, troca por RC e fluxo duplo](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/)
- [Grave cada voo no drone](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/)
- [Correções RTK via 4G com NTRIP](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/)
- [Pareie o drone com o Fleet Manager](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/)

Source: https://docs.uavmatrix.com/pt/get-started/quick-start/

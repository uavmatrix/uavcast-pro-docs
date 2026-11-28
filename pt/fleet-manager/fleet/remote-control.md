# Controle remoto

> Altere modos de voo, arme ou desarme, execute missões e inicie uma calibração pré-voo pelo painel de controle do UAV no Fleet Manager, com verificações de segurança.

O **UAV Control Panel** envia comandos ao controlador de voo pelo UAVcast-Pro, por meio da conexão criptografada do Fleet Manager. Ele funciona por qualquer link de internet que o drone tenha, inclusive 4G, e não precisa da VPN.

Abra-o com **Operations** em um card da [Frota](https://docs.uavmatrix.com/pt/fleet-manager/fleet/), ou com **Controls** no popup de um drone no [mapa da frota](https://docs.uavmatrix.com/pt/fleet-manager/map/). No mapa, o painel também tem as abas **Terminal** e **Logs**.

![UAV Control Panel com as colunas Flight Mode, Mission e Actions para um quadricóptero armado](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/control-panel.webp)

*UAV Control Panel de um quadricóptero armado em LOITER: Flight Mode com os botões RTL, Circle e Loiter, Mission com uma missão de levantamento de 18 waypoints selecionada, e Actions com Arm e Disarm.*

Somente **Owners** e **Admins** podem enviar comandos. Veja [Funções e permissões](https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/).

> **Comandos remotos movimentam aeronaves reais**
>
> Um comando do Fleet Manager age na aeronave como se tivesse sido enviado por uma estação de controle terrestre. Mantenha um piloto com uma estação de controle terrestre ou um transmissor RC no controle de cada voo, siga as regras locais para operações remotas e BVLOS, e trate o Fleet Manager como uma ferramenta de supervisão e despacho, não como seu único link.

## Cabeçalho

O cabeçalho mostra o status do drone, as sinalizações **ARMED** e **FAILSAFE**, um selo **GCS Failsafe**, o seletor de cor do mapa (**Change map color**, com **Reset to auto**) e um link **Details** para a [página do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/).

Se o failsafe de GCS do controlador de voo estiver desativado, o painel exibe o aviso: **GCS Failsafe not enabled. Without GCS failsafe, the vehicle will not return to launch if it loses connection to the ground station.** Configure o failsafe no software da sua estação de controle terrestre (parâmetro do ArduPilot `FS_GCS_ENABLE`) antes de voar além da linha de visada.

## Flight Mode

Escolha um modo na lista suspensa ou use os botões rápidos **RTL**, **Circle** e **Loiter** (**Hold** nos rovers). Cada mudança de modo pede confirmação, e quanto mais perigoso o modo, mais forte é a verificação:

| Confirmação | Modos |
| --- | --- |
| Simples **Change to *MODE*?** | STABILIZE, ALT_HOLD, LOITER, POSHOLD, BRAKE, FLOWHOLD, HOLD, FBWA, FBWB, CRUISE, QHOVER, QLOITER, QSTABILIZE |
| Confirmação com uma descrição do que o modo faz | AUTO, GUIDED, RTL, SMART_RTL, CIRCLE, FOLLOW, ZIGZAG, QRTL, TAKEOFF, AVOID_ADSB, ACRO, MANUAL |
| Digite o nome do modo para confirmar | LAND, SPORT, AUTOTUNE, FLIP, DRIFT, THROW, QLAND, QACRO, AUTOROTATE |

![Diálogo de confirmação de mudança de modo pedindo para digitar LAND para confirmar](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/control-panel--mode-confirm.webp)

*Confirmação para LAND, um modo que precisa ser digitado para confirmar.*

As listas de modos são do ArduPilot (Copter, Plane, Rover e Sub). Em um controlador de voo PX4, use a sua estação de controle terrestre para mudar os modos.

## Mission

Executa [missões](https://docs.uavmatrix.com/pt/fleet-manager/missions/) salvas na sua organização:

- **Select mission** escolhe uma missão salva. O contador mostra o ponto de rota (waypoint) atual e o total, por exemplo `3/18`, ou **None**.
- **Start** primeiro lê a missão no drone e a compara com a que você selecionou. Se forem diferentes, **Mission Not Loaded on Drone** oferece **Upload & Start**.
- **Stop**, **Read** (buscar a missão no drone) e **Clear**.

Cada ação pede confirmação.

## Actions

- **Arm** e **Disarm**. O diálogo de armar diz **This will arm the UAV. Ensure all personnel are clear of the propellers before arming.** Marque **Force arm (bypass pre-arm checks)** apenas na bancada: essa opção ignora as verificações que impedem uma decolagem insegura.
- **Select action... → Preflight Calibration** calibra o giroscópio e nivela o acelerômetro. Mantenha o veículo completamente parado sobre uma superfície nivelada e selecione **Start Calibration**.

![Diálogo de confirmação de armar com o aviso das hélices e a caixa Force arm](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/control-panel--arm-confirm.webp)

*Diálogo de armar com o aviso das hélices e a caixa Force arm (bypass pre-arm checks) desmarcada.*

Armar, desarmar e a calibração pré-voo exigem o UAVcast-Pro **6.3.0_rc13** ou posterior no drone. Em versões anteriores, o painel mostra **UAVcast Upgrade Required**. Veja [Atualização](https://docs.uavmatrix.com/pt/get-started/updating/).

## Quando um comando não é executado

- O drone precisa estar online. Comandos enviados a um drone offline falham.
- O Fleet Manager aguarda o reconhecimento do drone para cada comando. Se o controlador de voo recusar, por exemplo ao armar com verificações pré-armamento reprovadas, o erro aparece no painel e nas mensagens de status do drone.
- As mensagens do controlador de voo (falhas de pré-armamento, mudanças de modo) aparecem no popup do drone no mapa e na aba [Logs](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/#logs).

Para telas de celular, veja [Visualização Lite](https://docs.uavmatrix.com/pt/fleet-manager/lite-view/).

Source: https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-control/

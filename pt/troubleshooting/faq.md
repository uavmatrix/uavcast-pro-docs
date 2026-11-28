# Perguntas frequentes

> Respostas curtas sobre hardware do UAVcast-Pro, modems LTE, estações de controle terrestre, portas, uso offline, licenciamento, atualizações, gravação e pareamento com o Fleet Manager.

## Hardware e configuração

### Preciso de um modem LTE?

Não. O UAVcast-Pro funciona com qualquer conexão IP: 4G/LTE, Wi-Fi ou Ethernet. Um modem permite voar além do alcance do Wi-Fi. Muitos operadores testam no Wi-Fi e trocam para o modem antes do voo em **Redes → Prioridade de Rede → Prioridade Modem (Modo Externo)**.

### Quais computadores podem executar o UAVcast-Pro?

Qualquer placa ou PC Linux de 64 bits em arm64 ou amd64 com Raspberry Pi OS, Debian ou Ubuntu: Raspberry Pi Zero 2 W, 3, 4 e 5, NVIDIA Jetson, Orange Pi e mini PCs x86. Um Raspberry Pi 4 ou 5 é a escolha confortável para vídeo. Veja [Hardware compatível](https://docs.uavmatrix.com/pt/reference/supported-hardware/).

### Quais controladores de voo são suportados?

Qualquer controlador de voo que fale MAVLink por USB ou por uma porta TELEM: ArduPilot (Copter, Plane, Rover, VTOL e os outros tipos de veículo) e PX4, em placas das famílias Pixhawk e Cube, Matek e similares. Telemetria, vídeo e roteamento para estações de controle terrestre funcionam com todos eles. Os botões de modo de voo no Mapa de Voo e no Fleet Manager usam os nomes de modo do ArduPilot; com PX4, troque os modos pela sua estação de controle terrestre.

### Posso conectar pela porta USB do controlador de voo?

Pode, e é a opção mais simples: conecte e deixe a **Porta** em **Automático**. Use um cabo curto que transmita dados. Veja [Sem heartbeat MAVLink](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/) se ele não for encontrado.

## Estações de controle terrestre e rede

### Quais estações de controle terrestre funcionam?

Qualquer software que receba MAVLink por UDP, incluindo QGroundControl, Mission Planner e MAVProxy. O vídeo é H.264 sobre RTP/UDP, que o QGroundControl e o Mission Planner reproduzem diretamente. GStreamer e VLC também funcionam: veja [Estações de controle terrestre e vídeo](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/).

### Várias estações podem assistir ao mesmo tempo?

Sim. Adicione um destino por computador em **Estações de Controle Terrestre**, cada um com seus próprios interruptores para vídeo e telemetria. Use **Read Only** para estações que devem apenas assistir. Veja [Transmitir para várias estações de controle terrestre](https://docs.uavmatrix.com/pt/guides/multiple-ground-stations/).

### Quais portas o UAVcast-Pro usa?

Por padrão, a telemetria vai para a UDP **14550** e o vídeo para a UDP **5600** em cada estação de controle terrestre; uma segunda câmera usa a porta de vídeo + 1, e o áudio, a porta de vídeo + 2. A interface web fica na porta **80**. A lista completa está em [Portas e protocolos](https://docs.uavmatrix.com/pt/reference/ports-and-protocols/).

### Preciso de redirecionamento de portas no roteador?

Não. Pelo 4G, coloque o drone e a estação de controle terrestre na mesma VPN: a VPN do Fleet Manager (incluída na sua licença), ou a sua própria rede Tailscale ou ZeroTier. O drone envia telemetria e vídeo para o endereço de VPN da estação. Veja [Voo além do alcance visual pelo 4G](https://docs.uavmatrix.com/pt/guides/bvlos-4g/).

### Ainda posso conectar pela TCP 5760?

Não. Desde a v6.5.0, a TCP 5760 está fechada, para que só as estações que você adicionar recebam dados. Adicione o seu computador como destino e use UDP.

### Funciona sem internet?

Sim. A conexão com o controlador de voo, a telemetria e o vídeo começam ao ligar, sem esperar pela internet, então uma rede Wi-Fi local ou um link de rádio funciona. Ativar a licença precisa de internet uma vez. Depois disso, uma falha na verificação da licença causada por perda de conexão não desativa o dispositivo.

## Licença e conta

> Você precisa de uma licença do UAVcast-Pro para ativar o drone. Compre uma na loja da UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

### Minha licença não ativa. E agora?

Veja [Licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/). As causas mais comuns são uma chave digitada errada, nenhuma vaga de dispositivo livre ou nenhuma internet no dispositivo.

### O que acontece quando minha licença expira?

O UAVcast-Pro fica bloqueado: a interface web só abre **Aplicação**, e a telemetria, o vídeo e os outros serviços param até você renovar. Renove na loja antes da data de expiração e depois valide a chave no drone. Veja [Quando uma licença expira](https://docs.uavmatrix.com/pt/get-started/license-activation/#when-a-license-expires).

### O Fleet Manager está incluído na minha licença?

Sim. O Fleet Manager, incluindo a VPN dele, está incluído na sua licença do UAVcast-Pro sem custo extra.

### Troquei o cartão SD. Preciso de uma nova licença?

Não, mas o dispositivo conta como novo e ocupa uma vaga. Desregistre a entrada antiga em **Aplicação → Gerenciador de Licença → Dispositivos Ativados**.

### O Fleet Manager é um produto separado?

O Fleet Manager é o painel web da UAVmatrix para gerenciar vários drones em [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/). Ele está incluído na sua licença do UAVcast-Pro. Você entra com a sua conta uavmatrix.com, e cada drone que você parear precisa de uma licença ativa do UAVcast-Pro pertencente a um membro da sua organização. Veja [Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/).

### Como faço para parear um drone com o Fleet Manager?

No UAVcast-Pro, abra **Fleet Management** e pressione **Connect to Fleet Manager**. Digite o código de 8 dígitos no Fleet Manager em **Fleet → Pair Device** em até 5 minutos. Veja [Pareie seu primeiro UAV](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/) e, se falhar, [Código de pareamento inválido ou expirado](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/).

## Atualizações e dados

### Como atualizo o UAVcast-Pro?

Vá em **Aplicação → Atualizar Aplicação**, escolha uma versão em **Selecione a versão para atualizar** e pressione **Atualizar Agora**. Se o cartão mostrar **Reinicialização Pendente**, pressione **Reiniciar Agora**. Você também pode executar o instalador de novo.

### Posso importar configurações da v4 ou da v5?

Não. A v6 usa um novo banco de dados, então configure tudo de novo após uma instalação limpa. Dentro da v6, use **Aplicação → Banco de Dados → Fazer Backup do Banco de Dados** e **Restaurar Banco de Dados** para mover configurações entre instalações.

### O UAVcast-Pro consegue gravar vídeo?

Sim, desde a v6.5.1. Ele grava as câmeras 1 e 2 a partir do mapa de voo, ou automaticamente enquanto o drone está armado, junto com um registro de telemetria. Veja [Grave voos e revise-os](https://docs.uavmatrix.com/pt/guides/recording-flight-review/).

### Onde o UAVcast-Pro guarda os seus arquivos?

Em `/opt/uavcast-pro`: o banco de dados `uavcast.db`, `logs/`, `recordings/` e `missions/`. Veja [Serviços e arquivos](https://docs.uavmatrix.com/pt/reference/services-and-files/).

### Esqueci a senha de administrador.

Não há redefinição de senha na interface web. Outro administrador pode excluir o seu usuário em **Users** e criá-lo de novo. Se você era o único administrador, a recuperação não é autônoma: entre em contato com **[support@uavmatrix.com](mailto:support@uavmatrix.com)** com os detalhes listados em [Esqueci a senha de administrador](https://docs.uavmatrix.com/pt/uavcast-pro/users/#forgot-the-admin-password).

### Onde obtenho ajuda?

Colete os logs como descrito em [Colete logs para o suporte](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) e envie um e-mail para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, ou pergunte no [Discord da UAVmatrix](https://discord.gg/xwqMTXh).

Source: https://docs.uavmatrix.com/pt/troubleshooting/faq/

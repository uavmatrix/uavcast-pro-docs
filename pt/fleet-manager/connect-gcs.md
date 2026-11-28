# Conectar uma estação de controle terrestre

> Conecte um notebook com QGroundControl ou Mission Planner à VPN da sua organização com um único comando do Tailscale e comece a receber vídeo e telemetria dos drones.

Uma estação de controle terrestre (GCS) é o notebook ou PC onde o piloto executa o QGroundControl, o Mission Planner ou um software semelhante. Para receber o vídeo e a telemetria de um drone pelo Fleet Manager, a estação de controle terrestre entra na rede privada virtual da sua organização. Depois disso, você decide quais drones transmitem para ela, usando as [vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/).

Isso leva cerca de cinco minutos por estação de controle terrestre.

## Antes de começar

- **Função Owner ou Admin.** Viewers podem ver a página **Network**, mas não a chave de autenticação nem o comando de conexão, e não podem ativar a VPN nem configurar dispositivos. Eles veem *Ask an Owner or Admin of this organization to connect a new device to the VPN.*
- **VPN ativada** para a organização. Se **Network** mostrar **Enable VPN Network**, selecione essa opção primeiro. Veja [Rede e VPN](https://docs.uavmatrix.com/pt/fleet-manager/network/).
- **Direitos de administrador no computador** da estação de controle terrestre, para instalar o Tailscale e executar um comando.
- Pelo menos um drone [pareado](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/) e conectado à VPN.

> **O Fleet Manager executa o próprio servidor VPN**
>
> A rede da organização usa o cliente Tailscale, mas o servidor de controle é do próprio Fleet Manager, e não uma conta em tailscale.com. Você não precisa criar uma conta no Tailscale. Se o computador já estiver em outra rede Tailscale, o comando abaixo o move para a rede da sua organização.

## Conectar a estação de controle terrestre à VPN

1. **Instale o Tailscale** na estação de controle terrestre em [tailscale.com/download](https://tailscale.com/download) (Windows, macOS ou Linux).

2. **Copie o comando de conexão.** No Fleet Manager, abra **Network**, permaneça na aba **Devices** e localize **Connect a Device**. Em **GCS Connection Command**, copie o comando. Ele tem esta forma:

   ```bash
   tailscale up --authkey=<your-org-key> --login-server=https://vpn-connect.uavmatrix.com
   ```

   ![Card Connect a Device com o aviso GCS Computer Only e o comando tailscale up](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--connect-device.webp)

   *Network → Devices → Connect a Device, com o aviso GCS Computer Only e o botão de copiar ao lado do comando (chave de autenticação desfocada).*

   > **Somente para a estação de controle terrestre**
   >
   > Não cole este comando no UAVcast-Pro nem o execute no drone. Os drones entram na VPN durante o pareamento ou com **Push to Drone** nesta mesma página.

3. **Execute o comando como administrador.**

   - Windows: abra o **Terminal** ou o **PowerShell** com a opção **Run as administrator** e cole o comando.
   - macOS e Linux: cole o comando em um terminal, precedido de `sudo`.

   Quando o comando retornar sem erro, o computador estará na rede. `tailscale status` lista os drones e os outros dispositivos que ele consegue ver.

4. **Encontre o computador em Connected Devices.** De volta ao Fleet Manager, o computador aparece em **Connected Devices** com seu hostname e um endereço `100.x.y.z`. Selecione **Sync** se ele não aparecer em poucos segundos. Um dispositivo novo tem o tipo **Unknown**, e um banner informa quantos dispositivos precisam de configuração.

5. **Marque-o como estação de controle terrestre.** Na coluna **Type**, selecione **Configure**. Escolha **Ground Control Station (GCS)**, selecione **Continue** e depois **Complete Setup**.

   ![Assistente de configuração do dispositivo perguntando qual é o tipo do dispositivo, com Ground Control Station selecionado](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/network--setup-wizard.webp)

   *Diálogo Configure: What type of device is this? com Ground Control Station (GCS) selecionado para um notebook chamado ops-laptop-03.*

O computador agora tem o selo **GCS** e aparece na lista **Ground Station** ao adicionar uma vinculação de fluxo.

> **Nomeie as estações de controle terrestre pela pessoa ou pela função**
>
> Use **Rename** no menu de ações do dispositivo (o botão **⋯**) para dar um nome como "Notebook de campo – Equipe Norte". As listas de vinculação ficam muito mais fáceis de ler em uma frota grande.

## Começar a receber um drone

1. Vá em **Network → Stream Bindings** e selecione **Add Binding**.

2. Escolha o **Drone** e a **Ground Station**, depois selecione **Create Binding**. O drone precisa estar online.

3. Leia as portas na coluna **Ports**, por exemplo `5600 / 14550`.

4. No seu software de controle terrestre, escute nessas portas:

   - **QGroundControl:** a telemetria na UDP 14550 conecta automaticamente. Para o vídeo, abra **Application Settings → Video** (em **General** nas versões antigas), defina **Source** como **UDP h.264 Video Stream** e a porta UDP como a porta de vídeo da vinculação (**UDP URL** `0.0.0.0:<port>` nas versões atuais). Para outros drones, adicione um link UDP na porta de telemetria de cada vinculação em **Application Settings → Comm Links**.
   - **Mission Planner:** escolha **UDP** na lista de conexão, selecione **Connect** e informe a porta de telemetria.

Para mais detalhes, incluindo vários drones em uma mesma estação de controle terrestre, veja [Vinculações de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/) e [Transmitir para várias estações de controle terrestre](https://docs.uavmatrix.com/pt/guides/multiple-ground-stations/).

## A chave de autenticação

O comando contém uma chave reutilizável para a rede da sua organização. Ela é válida por 90 dias e pode ser usada em qualquer número de estações de controle terrestre. Owners e Admins podem selecionar o botão de atualizar em **Connect a Device** para criar uma nova chave. As estações que já entraram continuam conectadas. Se o card mostrar **No valid auth key available. Generate a new key to connect devices.**, a chave expirou. Crie uma nova.

## Remover uma estação de controle terrestre

Em **Network → Devices**, abra o menu de ações do dispositivo e selecione **Remove Device**. Isso o remove da VPN e exclui as suas vinculações de fluxo. Para conectá-lo novamente depois, execute o comando de conexão outra vez.

## Solução de problemas

- **O comando falha ou expira:** verifique se o computador consegue acessar `https://vpn-connect.uavmatrix.com` e se a chave não expirou.
- **Estação conectada, mas sem telemetria ou vídeo:** verifique se há uma vinculação, se **Video** e **Telemetry** estão ativados e se o software de controle terrestre escuta nas portas da vinculação. O firewall do Windows costuma bloquear UDP de entrada para um aplicativo novo. Veja [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/) e [Sem vídeo na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/).
- **Não é possível acessar o drone pela VPN:** veja [VPN conectada, mas sem acesso ao drone](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/).

Source: https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/

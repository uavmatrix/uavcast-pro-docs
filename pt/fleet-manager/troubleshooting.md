# Solução de problemas do Fleet Manager

> Resolva problemas comuns do Fleet Manager: erros de pareamento, drones presos em PAIRING ou offline, Re-pair required, fluxos ausentes e comandos com falha.

Comece pelo que você vê. Cada linha leva à correção, abaixo ou nas páginas compartilhadas de [solução de problemas](https://docs.uavmatrix.com/pt/troubleshooting/).

| O que você vê | Causa provável | Onde ir |
| --- | --- | --- |
| **Invalid pairing code**, **This pairing code has expired**, **This pairing code has already been used** | Erro de digitação, código com mais de 5 minutos ou já utilizado | [Código de pareamento inválido ou expirado](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/) |
| **License is not owned by any member of this organization** | Licença comprada com um e-mail que não é membro | [Licenças compradas com outro e-mail](https://docs.uavmatrix.com/pt/fleet-manager/licenses/#licenses-bought-with-another-email) |
| **This UAV is already paired to an organization** | O drone ainda pertence a outra organização | [Mova um drone](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#move-a-drone-to-another-organization) |
| O UAVcast-Pro mostra **No valid license found** ou **Invalid or inactive license** | Licença não ativada no drone, expirada ou reembolsada | [A licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/) |
| Sem o botão **Pair Device** | Você é Viewer | [Funções e permissões](https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/) |
| Drone preso em **PAIRING** | O drone ainda não se conectou ao broker | [Preso em PAIRING](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#stuck-on-pairing) |
| Drone **OFFLINE** | Sem internet, porta 8883 bloqueada ou UAVcast-Pro não está em execução | [Drone offline no Fleet Manager](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/) |
| **Re-pair required** | Certificado de conexão antigo | [Pareie um drone novamente](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone) |
| **NO MAVLINK** no mapa | O UAVcast-Pro não tem dados do controlador de voo | [Sem heartbeat MAVLink](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/) |
| Falha na vinculação: **Failed to send configuration to drone - it may be offline** | Drone offline ou que não confirmou em 15 s | [A vinculação não é salva](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#binding-wont-save) |
| A vinculação existe, mas não há telemetria nem vídeo na estação de controle terrestre | Firewall, porta errada ou fluxo desativado | [Sem fluxo na estação de controle terrestre](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#no-stream-at-the-ground-station) |
| A estação de controle terrestre entrou na VPN, mas não alcança o drone | Tipo do dispositivo, drone fora da VPN ou UDP bloqueado | [VPN conectada, mas não alcança o drone](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/) |
| Comandos não funcionam, **UAVcast Upgrade Required** | Drone offline, função Viewer ou UAVcast-Pro antigo | [Comandos falham](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#commands-fail) |
| **Request timed out. UAVcast may be unreachable.** ao abrir o UAVcast-Pro remotamente | Link lento pelo proxy | [O proxy está lento ou incompleto](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#proxy-is-slow-or-incomplete) |
| O e-mail de convite nunca chegou | Filtro de spam ou endereço errado | [Convite não recebido](https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/#invitation-not-received) |

## Preso em PAIRING

**PAIRING** significa que o Fleet Manager aceitou o código e aguarda o primeiro heartbeat do drone via MQTT.

1. Veja a página **Fleet Management** do UAVcast-Pro. Se ela ainda mostrar **Waiting for Manager to confirm pairing...**, o drone não obteve o certificado. Verifique se ele tem acesso à internet.

2. Verifique a porta TCP 8883 de saída no drone:

   ```bash
   nc -vz fleet-manager.uavmatrix.com 8883
   ```

3. Se você digitou um código **antigo** do mesmo drone (por exemplo, depois de selecionar **Connect to Fleet Manager** duas vezes), o UAVcast-Pro não está aguardando por ele. Selecione **Disconnect from Fleet**, se aparecer, obtenha um novo código e pareie novamente na mesma organização. O drone mantém o registro dele.

O drone tem 15 minutos após a expiração do código para obter o certificado. Depois disso, pareie novamente.

## A vinculação não é salva

O Fleet Manager só salva uma vinculação depois que o drone a confirma. Verifique se o drone mostra **ONLINE** e tente novamente. Se o drone estiver online, mas as vinculações continuarem falhando, ele talvez não esteja na VPN: verifique em **Network → Connected Devices** se ele aparece com o tipo **UAV**, ou use **Push to Drone**.

## Sem fluxo na estação de controle terrestre

1. Em **Network → Stream Bindings**, verifique se **Video** e **Telemetry** estão ativados e anote as **Ports**.
2. Verifique se o software da estação de controle terrestre escuta exatamente essas portas. Somente o primeiro drone em um notebook usa 5600 / 14550; cada drone adicional tem as próprias portas.
3. Permita UDP de entrada nessas portas no firewall do notebook. No Windows, permita QGroundControl ou Mission Planner nas redes **Private** e **Public**.
4. Execute `tailscale status` no notebook e verifique se o drone aparece na lista.

Mais detalhes: [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/) e [Sem vídeo na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/).

## Comandos falham

- O drone precisa estar **ONLINE**.
- Somente Owners e Admins podem enviar comandos. Viewers não recebem os botões de comando, e o servidor rejeita os comandos deles.
- Armar, desarmar e a calibração pré-voo exigem o UAVcast-Pro 6.3.0_rc13 ou posterior. [Atualize o UAVcast-Pro](https://docs.uavmatrix.com/pt/get-started/updating/).
- O controlador de voo pode recusar um comando, por exemplo, armar com verificações pré-armamento reprovadas. Leia a mensagem dele no popup do mapa ou na aba **Logs**.

## O proxy está lento ou incompleto

**Open via Proxy** envia cada requisição de página pelo link do drone, com 30 segundos por requisição, e não transporta recursos ao vivo (WebSocket). Em um link celular fraco, aguarde a página terminar de carregar, ou entre na VPN e use **Open via VPN**. Consulte [Abra o UAVcast-Pro remotamente](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-uavcast/).

## Convite não recebido

Peça à pessoa que verifique a caixa de spam. Em **Team**, confira o e-mail em **Pending Invitations**. Se estiver errado, **Revoke** o convite e convide novamente. Os convites expiram após 7 dias.

## Ainda com problemas

Abra um ticket pelo botão de suporte com uma captura de tela, ou envie um e-mail para [support@uavmatrix.com](mailto:support@uavmatrix.com). Inclua o nome do drone e o ID do dispositivo (na página do UAV). Envie o pacote de registros do UAVcast-Pro (um ZIP) para [support@uavmatrix.com](mailto:support@uavmatrix.com) com o número do seu ticket, já que os tickets aceitam apenas imagens. Consulte [Suporte](https://docs.uavmatrix.com/pt/fleet-manager/support/) e [Colete registros](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/).

Source: https://docs.uavmatrix.com/pt/fleet-manager/troubleshooting/

# Abrir o UAVcast-Pro remotamente

> Acesse as configurações do UAVcast-Pro de um drone de qualquer lugar pelo Fleet Manager, pelo proxy integrado sem VPN ou diretamente pela VPN da sua organização.

Você pode alterar as configurações do UAVcast-Pro de um drone (câmera, modem, estações de controle terrestre e assim por diante) sem estar na mesma rede do drone. Na [página do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/), o card **UAVcast Application** tem dois botões:

| Botão | Como conecta | Use para |
| --- | --- | --- |
| **Open via Proxy** | Pela conexão criptografada do Fleet Manager até o drone. Funciona com qualquer drone online, sem VPN. | Alterações de configuração e gestão básica. |
| **Open via VPN** | Abre `http://<endereço VPN do drone>` diretamente. Aparece somente quando o drone está na VPN da sua organização, e o seu computador também precisa estar nessa VPN. | Tudo, inclusive o mapa de voo ao vivo e a telemetria. |

O proxy é para Owners e Admins. O Fleet Manager recusa o acesso a Viewers com a mensagem **Access denied. Only administrators can access UAVcast remotely.**

## Open via Proxy

1. Na página do UAV, selecione **Open via Proxy**.
2. Leia o diálogo **Remote UAVcast Access via Proxy** e selecione **Continue**.
3. O UAVcast-Pro abre em uma nova aba, na página **Application**. Faça login com o usuário do UAVcast-Pro do drone: o proxy não repassa o seu login do Fleet Manager. (Um drone que ainda não tem usuários no UAVcast-Pro abre sem pedir login.)

![Diálogo Remote UAVcast Access via Proxy listando os recursos indisponíveis](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/drone-detail--proxy-warning.webp)

*Diálogo Remote UAVcast Access via Proxy, listando os recursos WebSocket indisponíveis: telemetria ao vivo, status da conexão MAVLink e o mapa de voo.*

O proxy transporta requisições comuns de página, não conexões ao vivo. **WebSocket features unavailable** significa que estes recursos não funcionam por ele:

- telemetria ao vivo e atualizações em tempo real
- status da conexão MAVLink
- o mapa de voo

Cada requisição tem 30 segundos para ser concluída. Em um link lento, páginas grandes podem expirar com a mensagem **Request timed out. UAVcast may be unreachable.** Se o drone estiver offline, você verá **Drone is offline. UAVcast interface is not available.**

> **Cuidado com as configurações de rede pelo proxy**
>
> O proxy funciona pela própria conexão de internet do drone. Se você alterar o modem, a prioridade de rede ou as configurações de VPN e o drone perder a internet, o proxy cai junto, e será preciso acesso local para corrigir.

## Open via VPN

Conecte o seu computador à VPN da organização da mesma forma que uma estação de controle terrestre (veja [Conectar uma estação de controle](https://docs.uavmatrix.com/pt/fleet-manager/connect-gcs/)). Depois, **Open via VPN** abre a interface do drone diretamente, com todos os recursos ao vivo. É a melhor opção para qualquer coisa além de alterar uma configuração.

Source: https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-uavcast/

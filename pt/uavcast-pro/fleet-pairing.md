# Pareie com o Fleet Manager

> Conecte um drone com UAVcast-Pro ao UAVmatrix Fleet Manager: obtenha o código de pareamento no drone, digite-o no Fleet Manager, verifique a conexão, renomeie ou desfaça o pareamento.

O pareamento conecta um drone com UAVcast-Pro à sua organização no [UAVmatrix Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/), o painel em nuvem da sua frota. Depois de pareado, o drone mantém uma conexão criptografada e autenticada por certificado com o Fleet Manager e se reconecta sozinho após uma reinicialização ou uma mudança de rede. Você começa o pareamento no drone e o conclui no Fleet Manager. O processo leva cerca de dois minutos.

## Antes de começar

- UAVcast-Pro com uma **licença ativada** no drone. Sem ela, o pareamento é recusado (*Nenhuma licença válida encontrada. Ative sua licença primeiro.*).
- Um usuário **admin** no UAVcast-Pro. **Fleet Management** fica oculto para usuários somente leitura.
- Uma conta no Fleet Manager com a função **Owner** ou **Admin** na organização. A licença do drone deve pertencer a um membro dessa organização.
- Internet no drone, com TCP **8883** de saída (MQTT sobre TLS) e HTTPS (443) liberados.

## Pareie o drone

1. Na interface web do drone, acesse **Gerenciamento → Fleet Management**.
2. Selecione **Connect to Fleet Manager**. O drone solicita um código ao Fleet Manager e mostra um **Pairing Code** com a contagem regressiva **Expires in** e, em seguida, *Waiting for Manager to confirm pairing...*.
3. Em outra aba, faça login em [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) e acesse **Fleet → Pair Device**.
4. Digite o código exibido no drone e confirme se os detalhes do dispositivo (hostname, arquitetura, versão do UAVcast-Pro) correspondem ao drone à sua frente.
5. Conclua as etapas no Fleet Manager (escolha da VPN e nome).
6. De volta ao drone, a página muda para **Fleet Connection** com o status **Connected**.

![Cartão Connect to Fleet Manager com o botão Connect to Fleet Manager](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/fleet--connect.webp)

*Gerenciamento → Fleet Management em um drone que ainda não está pareado. Ao selecionar Connect to Fleet Manager, este cartão é substituído pelo Pairing Code de 8 dígitos e pela contagem regressiva Expires in.*

> **O código é válido por 5 minutos**
>
> Se ele expirar antes de você digitá-lo, selecione **Connect to Fleet Manager** novamente para gerar um novo código.

O lado do Fleet Manager, incluindo organizações, VPN e o que fazer com o drone depois de incluí-lo na frota, é descrito em [Adicione seu primeiro drone ao Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).

## Após o pareamento

O cartão **Fleet Connection** mostra:

| Campo | Significado |
| --- | --- |
| **Connected** / **Disconnected** | Se o drone está se comunicando com o Fleet Manager neste momento. |
| **Device Name** | O nome exibido no Fleet Manager. Edite-o aqui ou no Fleet Manager. *Managed by Fleet Manager* significa que o nome é definido lá. |
| **Hostname**, **Device ID** | Como o Fleet Manager identifica este drone. |
| **Manager URL** | A instância do Fleet Manager com a qual o drone está pareado. |
| **Last Connected** | Quando o drone se conectou ao Fleet Manager pela última vez. |

O que o Fleet Manager recebe do drone: telemetria ao vivo (posição, bateria, GPS, estado do voo), status do sistema UAVcast-Pro e controle remoto de serviços. Os destinos de estação de controle terrestre criados pelo Fleet Manager por meio de vinculações de fluxo aparecem em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/) com um ícone de nuvem.

Para incluir o drone na VPN da sua organização depois, use a aba **Fleet Manager** em [Rede Privada Virtual](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/).

## Desfazer o pareamento

1. Acesse **Gerenciamento → Fleet Management**.
2. Selecione **Disconnect from Fleet** e confirme.

Isso remove o pareamento e os certificados do drone. Para usar o drone no Fleet Manager novamente, pareie-o de novo com um novo código. Remova também o drone da sua frota no Fleet Manager, para que ele não continue listado como offline.

## Solução de problemas

| Sintoma | Verificar |
| --- | --- |
| *Nenhuma licença válida encontrada. Ative sua licença primeiro.* | Ative a licença em **Aplicação**. Veja [Licenciamento e ativação](https://docs.uavmatrix.com/pt/get-started/license-activation/). |
| O Fleet Manager informa que a licença não pertence a um membro da organização | A licença foi comprada com um e-mail que não é membro da organização. Adicione esse e-mail no Fleet Manager (veja [Licenças](https://docs.uavmatrix.com/pt/fleet-manager/licenses/)), ou convide essa conta para a organização. |
| Código expirado | Selecione **Connect to Fleet Manager** novamente. |
| Pareado, mas o status continua **Desconectado** | O drone não consegue alcançar o Fleet Manager na porta TCP 8883. Algumas redes bloqueiam essa porta. Verifique a conexão com a internet do drone e o firewall. |

Mais ajuda: [Código de pareamento inválido](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/) e [Drone offline no Fleet Manager](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/

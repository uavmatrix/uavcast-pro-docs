# Frota

> A página Fleet lista todos os UAVs da sua organização com status ao vivo, bateria e último sinal, e é onde você pareia drones e abre os controles.

**Fleet** (barra lateral **Fleet Management → Fleet**) lista todos os UAVs da organização selecionada. A lista é atualizada em tempo real, então você pode deixá-la aberta em uma tela na sala de controle, ao lado do [mapa](https://docs.uavmatrix.com/pt/fleet-manager/map/).

![Página Fleet com uma grade de cards de UAV mostrando status online e offline, bateria e último sinal](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/fleet.webp)

*Página Fleet com UAVs (46): cards ONLINE com níveis de bateria e cards OFFLINE escurecidos com horários de Last seen.*

## Cards de UAV

O cabeçalho mostra **UAVs (n)**. Cada card exibe:

- **Name** e um selo de status: **ONLINE**, **OFFLINE** ou **PAIRING**.
- **Battery** em porcentagem. Fica amarelo abaixo de 50 % e vermelho abaixo de 20 %.
- **Last seen**, como tempo relativo. Os cards offline aparecem escurecidos.
- **Re-pair required**, quando o drone precisa ser pareado mais uma vez (veja [Parear um drone novamente](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone)).

Um drone é considerado offline após **20 segundos** sem nenhuma mensagem do UAVcast-Pro, que envia um heartbeat a cada 5 segundos.

Dois botões em cada card:

- **Operations** abre o [painel de controle](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-control/): modos de voo, armar e desarmar, missões.
- **Details** abre a [página do UAV](https://docs.uavmatrix.com/pt/fleet-manager/fleet/uav-details/): telemetria ao vivo, terminal, registros, ações de sistema, renomear e remover.

## Botões da página

- **Pair Device** inicia o [assistente de pareamento](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/). Somente Owners e Admins.
- **Refresh** recarrega a lista.
- **Need more devices?** → **View Plans** abre a loja da UAVmatrix, onde você compra mais licenças do UAVcast-Pro. Veja [Licenças](https://docs.uavmatrix.com/pt/fleet-manager/licenses/).

## Banner de re-pareamento

Quando um ou mais drones usam um certificado de conexão mais antigo, um banner no topo informa **n UAV(s) must be re-paired**. Pareie novamente cada drone listado; ele mantém o nome e o histórico. Veja [Parear um drone novamente](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#re-pair-a-drone).

![Página Fleet com um banner de re-pareamento e selos Re-pair required em dois cards](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/fleet--repair-required.webp)

*Página Fleet com o banner 2 UAVs must be re-paired e o selo Re-pair required nos dois cards afetados.*

## Dicas para frotas grandes

- **Dê nomes aos drones para o mapa.** Os nomes aparecem nos rótulos do mapa e nas listas de vinculação. Um número de cauda ou uma função ("Inspeção-07") é melhor que o hostname padrão. Renomeie a partir da página do UAV.
- **Dê uma cor para cada drone.** O Fleet Manager atribui cores automaticamente a partir de uma paleta de 24 cores. Defina uma cor fixa no painel de controle (**Change map color**) para drones que sua equipe precisa reconhecer de relance.
- **Use organizações para separar clientes.** Cada drone pertence a exatamente uma organização. Se você opera para vários clientes que devem ver apenas os próprios drones, crie uma organização para cada um.

Source: https://docs.uavmatrix.com/pt/fleet-manager/fleet/

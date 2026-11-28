# Missões

> Desenhe missões de pontos de rota no mapa, escolha comandos MAVLink e referências de altitude, salve missões para toda a organização e envie-as a qualquer drone online.

**Missions** (barra lateral **Fleet Management → Missions**) é um planejador de pontos de rota no navegador. As missões são salvas para a organização, então qualquer pessoa da equipe pode carregar uma, e um Owner ou Admin pode enviá-la a qualquer drone online.

![Mission Planner com um padrão de levantamento de pontos de rota desenhado em um mapa de satélite](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/missions.webp)

*Mission Planner no estilo Satellite, com uma grade de levantamento de 18 pontos de rota, Takeoff e Return to Launch, e o cabeçalho mostrando 18 waypoints e a distância total.*

Viewers podem abrir e consultar missões salvas. Salvar, enviar e excluir exigem Owner ou Admin.

## Planejar uma missão

1. Selecione **Create New** (ou **Missions → New Mission**).
2. Clique no mapa para adicionar pontos de rota. Arraste um ponto para movê-lo. Durante a colocação, **Next WP** mostra a distância do ponto anterior (**Prev:**) e da origem (**Home:**).
3. Abra a gaveta de pontos de rota (**n Waypoints**) para editar cada linha: **Command**, **Params**, **Alt**, **Frame** e **Radius**. Arraste as linhas para reordená-las. A linha **H** é a origem.
4. Defina os **Defaults** para novos pontos de rota no topo da gaveta: **Alt** (padrão 50 m) e **WP Radius** (padrão 30 m).

![Gaveta de pontos de rota com colunas para comando, parâmetros, coordenadas, altitude, referência, raio e distância](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/missions--waypoint-drawer.webp)

*Gaveta de pontos de rota com um Takeoff, vários pontos de rota, um Change Speed e um Return to Launch, com Frame em Relative.*

### Referências de altitude

| Referência | A altitude é medida a partir de |
| --- | --- |
| **Relative** (padrão) | A posição de origem |
| **Absolute** | O nível médio do mar |
| **Terrain** | O solo abaixo do ponto de rota (requer dados de terreno no controlador de voo) |

### Comandos

O seletor **Command** é pesquisável e lista os comandos de missão MAVLink que o ArduPilot entende, agrupados em:

- **Navegação:** Waypoint, Takeoff, Land, Return to Launch, Loiter Unlim, Loiter Turns, Loiter Time, Loiter to Alt, Spline Waypoint, Vtol Takeoff, Vtol Land, Payload Place, Delay e outros.
- **Condições:** Delay, Change Alt, Distance, Yaw.
- **Comandos de ação:** Change Speed, Set ROI Location, Set Servo, Set Relay, Jump, Digicam Control, Set Cam Trigg Dist, Mount Control, Gripper, Parachute, VTOL Transition e outros.

Comandos que recebem parâmetros (por exemplo, tempo de atraso, número de voltas de loiter, velocidade ou PWM de servo) têm campos editáveis em **Params**.

Limites: altitude de 0 a 10.000 m, raio de 1 a 1.000 m, e pelo menos um ponto de rota.

## Salvar

Selecione **Save**, digite um **Name** (até 100 caracteres) e uma **Description** opcional, e confirme **Save Mission**. O cabeçalho mostra **Unsaved** enquanto houver alterações; **Update Mission** as salva. Abra missões salvas em **Missions → Saved Missions**.

## Enviar para um drone

1. Salve a missão. Uma missão não salva não pode ser enviada (**Mission not saved**).
2. Selecione **Upload to Drone**, escolha o UAV em **Select UAV** e confirme.
3. Aguarde a confirmação. O envio expira após 30 segundos se o drone não responder.

![Caixa de diálogo Upload Mission to Drone com lista de UAVs online](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/missions--upload.webp)

*Caixa de diálogo Upload Mission to Drone com os UAVs online disponíveis para escolha.*

Para voar, selecione a missão no [painel de controle](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remote-control/#mission) do drone e selecione **Start**. Se a missão no drone for diferente da que você selecionou, o painel oferece **Upload & Start**.

## Ler uma missão de um drone

Em **Missions → Read from Drone**, escolha um drone online. A missão atual dele é carregada no planejador como **Mission from *name***. Salve-a para manter uma cópia, por exemplo antes de sobrescrevê-la.

> **Verifique a missão na sua estação de controle terrestre antes do voo**
>
> O Fleet Manager envia exatamente o que você planejou. Antes de um voo automático, verifique a missão e os failsafes do veículo no QGroundControl ou no Mission Planner, como faria com qualquer outra ferramenta de planejamento.

Source: https://docs.uavmatrix.com/pt/fleet-manager/missions/

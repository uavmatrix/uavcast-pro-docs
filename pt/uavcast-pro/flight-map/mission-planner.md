# Aba Planejador de Missões

> Planeje uma missão de pontos de rota na aba Planejador de Missões do UAVcast-Pro, defina o quadro de altitude e o raio, salve-a como arquivo .waypoints e envie-a ao controlador de voo ArduPilot.

A aba Planejador de Missões permite planejar uma missão simples de pontos de rota no navegador e enviá-la ao controlador de voo pelo UAVcast-Pro, de qualquer lugar em que a interface web esteja acessível. As missões são salvas no mesmo formato `.waypoints` (QGC WPL 110) usado pelo Mission Planner e pelo QGroundControl, para que você possa movê-las entre as ferramentas. Abra **Mapa de Voo → Planejador de Missões**.

![Aba Planejador de Missões com um mapa de satélite, uma tabela de pontos de rota vazia e os botões Salvar, Carregar, Enviar, Ler e Limpar](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/flight-map--mission-planner.webp)

*Mapa de Voo → Planejador de Missões antes de qualquer ponto de rota ser adicionado. Clique no mapa para adicionar um.*

## Planejar uma missão

1. Clique no mapa onde deve estar o primeiro ponto de rota. Na primeira vez, **Definir Valores Padrão** pede **Altitude Padrão (metros)**, **Raio do Ponto de Rota (metros)** e **Quadro de Altitude**. Selecione **Continuar**.
2. Continue clicando para adicionar pontos de rota. Arraste um marcador para movê-lo.
3. Ajuste cada ponto de rota na tabela: **Alt (m)**, **Quadro** e **Raio (m)**. Remova um ponto de rota na coluna **Ação**.
4. Confira **Pontos de Rota** e **Distância** para ver o total da rota.

| Padrão | Valor | Opções |
| --- | --- | --- |
| **Altitude Padrão (metros)** | `100` | qualquer valor |
| **Raio do Ponto de Rota (metros)** | `30` | qualquer valor |
| **Quadro de Altitude** | **Relativa** | **Relativa** (acima do home), **Absoluta** (acima do nível médio do mar), **Terreno** (acima do solo; requer dados de terreno no controlador de voo) |

Na tabela, os quadros aparecem abreviados como **Rel**, **Abs** e **Ter**. Os pontos de rota são enviados como `MAV_CMD_NAV_WAYPOINT`.

## Enviar para o controlador de voo

1. Em **Controlador de Voo**, selecione **Enviar**.
2. Confirme **Enviar Missão**. A caixa de diálogo avisa que isso substitui a missão no controlador de voo.
3. Você verá *Missão enviada para o controlador de voo*.

- **Ler** baixa para o planejador a missão que está no controlador de voo.
- **Limpar** remove os pontos de rota do planejador.

Para voar a missão, use **Iniciar** na aba **Ações** do Mapa de Voo ou mude para AUTO pelo seu transmissor ou estação de controle terrestre.

## Salvar e carregar arquivos

Em **Arquivos**:

- **Salvar** baixa a missão como `mission.waypoints`.
- **Carregar** abre um arquivo `.waypoints` ou `.txt` no formato QGC WPL, por exemplo um salvo pelo Mission Planner.

## Limitações

Este planejador trata apenas pontos de rota simples. **Carregar** mantém a posição, a altitude, o quadro e o raio de cada linha, mas transforma cada linha em um ponto de rota simples: comandos de decolagem, pouso, loiter e DO (acionamento de câmera, servo) não são mantidos, e um comando sem posição vira um ponto de rota em 0, 0. Para comandos de decolagem e pouso, comandos DO, grades de levantamento, cercas e pontos de reunião (rally), planeje e envie diretamente pelo Mission Planner ou pelo QGroundControl.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/mission-planner/

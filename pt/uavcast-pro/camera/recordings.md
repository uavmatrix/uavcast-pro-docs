# Gravações e revisão de voo

> Grave o vídeo da câmera e o log de telemetria MAVLink no drone com o UAVcast-Pro, automaticamente ao armar, no cartão SD ou em um SSD USB, e revise os voos com vídeo, mapa e dados.

O UAVcast-Pro grava cada voo no próprio drone: o vídeo da câmera e um registro de telemetria MAVLink (`.tlog`). A gravação usa o fluxo que já está codificado, por isso não custa CPU extra e nunca interrompe o vídeo ao vivo para a sua estação de controle terrestre. Como os arquivos são gravados no drone, você obtém vídeo com qualidade total mesmo quando o link celular cai. As gravações começam automaticamente ao armar ou manualmente pelo Mapa de Voo. Requer a versão 6.5.1 ou posterior.

Abra **Câmera → Gravações**. Ela tem duas abas: **Biblioteca** e **Configurações**.

![Biblioteca de gravações com uma barra de armazenamento e dois voos gravados, com durações e selos CAM 1 e Telemetria](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--recordings.webp)

*Câmera → Gravações → Biblioteca com dois voos gravados.*

## Gravar automaticamente ao armar

Isso já vem ativado por padrão. A gravação começa quando os motores são armados e para quando são desarmados. Se o link cair durante o voo, a gravação continua.

Antes de confiar nisso:

- Verifique o espaço livre em **Armazenamento de gravações** no Mapa de Voo ou em **Configurações**.
- A gravação não precisa de **Ativar Pré-visualização ao Vivo?**. Com a gravação ativada, a câmera mantém uma cópia do fluxo no servidor de mídia integrado mesmo quando a pré-visualização está desativada.

## Gravar manualmente

A barra superior do Mapa de Voo tem um grupo **Gravação**: **CAM 1** (e **CAM 2**, com transmissão dupla) para iniciar e parar o vídeo, e **Telemetria** para iniciar e parar um log de telemetria. Um ponto vermelho mostra o que está sendo gravado. Usuários somente leitura não podem iniciar gravações.

## Configurações de armazenamento

Abra **Câmera → Gravações → Configurações**.

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Local de armazenamento** | **Armazenamento interno** | Armazenamento interno, um pendrive ou SSD USB detectado, **Ou outra pasta** | Conecte um disco e selecione **Procurar discos novamente** para vê-lo. O armazenamento interno é `/opt/uavcast-pro/recordings/video`. |
| **Manter livre** | `2` GB | 0,5–1000 GB | A gravação nunca ocupa o disco além deste limite. O sistema também precisa de espaço. |
| **Excluir as gravações mais antigas quando o espaço acabar** | Ativado | Ativado, desativado | Como uma dashcam: a gravação nunca para por falta de espaço. Desativado: a gravação para em vez disso. |
| **Excluir gravações mais antigas que** | `0` dias | 0–3650 dias | `0` mantém as gravações até que o espaço seja necessário. |
| **Gravar automaticamente ao armar** | Ativado | Ativado, desativado |  |
| **Gravar câmera 1** | Ativado | Ativado, desativado | Aplica-se à gravação automática. |
| **Gravar câmera 2** | Ativado | Ativado, desativado | Somente com transmissão dupla ativa. |
| **Duração do arquivo** | `1` min | 1–30 min | O vídeo é salvo em partes desta duração. Partes menores perdem menos dados após uma queda de energia. |
| **Gravar telemetria** | **Enquanto armado** | **Enquanto armado**, **Sempre que conectado**, **Desligado** | O `.tlog` exibido ao lado do vídeo. **Sempre que conectado** também registra em solo e inicia um novo arquivo a cada armar, desarmar e hora. |

![Configurações de gravação com Armazenamento interno selecionado, 2 GB em Manter livre, excluir as gravações mais antigas ativado e gravar automaticamente ao armar ativado](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--recordings-settings.webp)

*Armazenamento interno selecionado, com gravação automática ao armar.*

> **Gravar em um SSD USB**
>
> Um SSD USB 3 é mais rápido e muito mais durável que um cartão microSD para vídeo contínuo. Conecte-o, selecione **Procurar discos novamente** e depois escolha-o em **Local de armazenamento**.

## Arquivos e formatos

- O vídeo é gravado em segmentos MP4 fragmentados, que continuam reproduzíveis se a energia for cortada durante o voo. Os downloads são em MP4.
- A telemetria é um `.tlog` MAVLink padrão, legível no Mission Planner, MAVExplorer, UAV Log Viewer e na [Análise de Voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-map/flight-analytics/).
- Uma gravação na biblioteca é um único clipe, desde que seus arquivos se sucedam sem intervalo maior que 15 segundos.

## Revisar um voo

Selecione **Reproduzir** em uma gravação para abrir a **Revisão do voo**: o vídeo, a trilha no mapa, a visão de cabine e os dados de voo em uma só linha do tempo.

- A linha do tempo marca **Armado**, **Desarmado** e as mudanças de modo de voo.
- **Voltar 10 segundos**, **Reproduzir**/**Pausar**, **Avançar 10 segundos** e **Velocidade de reprodução** (de 0,5× a 4×).
- Com duas câmeras, **Mudar layout do vídeo** alterna entre **Picture-in-picture** e **Lado a lado**; **Mostrar esta câmera em destaque** troca as duas.
- O painel de dados mostra **Altitude**, **Velocidade**, **Bateria**, **Satélites** e **Modo** no momento atual.
- **Baixar** salva o clipe em MP4.

![Player de revisão de voo com a área de vídeo, a trilha no mapa, a visão de cabine e uma linha do tempo com os controles de reprodução](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--flight-review.webp)

*Revisão de voo: vídeo, mapa, cabine e telemetria em uma só linha do tempo.*

Se o player exibir *Nenhum log de telemetria para esta gravação*, a telemetria não estava sendo gravada na hora (por padrão, ela só registra enquanto armado).

## Excluir gravações

Selecione **Excluir** em uma gravação. Se ela tiver um log de telemetria, escolha **Excluir somente o vídeo** ou **Excluir vídeo e telemetria**. A exclusão é permanente. Uma gravação ainda em andamento deve ser parada antes.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/

# Configurações da câmera

> Configure uma câmera Raspberry Pi ou uma webcam USB no UAVcast-Pro e transmita vídeo H.264 de baixa latência por UDP para QGroundControl ou Mission Planner. Resolução, FPS e taxa de bits.

O UAVcast-Pro captura vídeo de uma câmera CSI do Raspberry Pi ou de uma webcam USB, codifica-o em H.264 e o envia por RTP sobre UDP para cada estação de controle terrestre com **Ativar Vídeo** ligado. O Mission Planner e o QGroundControl o reproduzem diretamente na porta 5600. Uma cópia do fluxo alimenta a pré-visualização ao vivo na interface web e o gravador no drone. Abra **Câmera → Configurações da câmera**.

![Painel de Controle da Câmera com CAM 1 configurada para uma câmera Raspberry Pi, configurações de câmera para resolução, FPS, taxa de bits e Taxa de Recuperação do Stream, e o painel Visualização ao Vivo](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera.webp)

*Câmera → Configurações da câmera com uma câmera Raspberry Pi como CAM 1 em 1536×864 e 30 FPS, taxa de bits Automática. A Visualização ao Vivo está desligada aqui.*

## Configurar a câmera

1. Conecte a câmera e acesse **Câmera → Configurações da câmera**.
2. Defina **Ativar Câmera?** como **Sim**.
3. Clique no slot **CAM 1** e escolha a câmera. Câmeras CSI aparecem como *Raspberry Pi Camera - imx708 (CSI)* ou similar; câmeras USB pelo nome.
4. Em **Configurações da Câmera**, escolha uma **Resolução** que sua câmera suporte. Tamanhos não suportados são marcados.
5. Deixe **Selecionar FPS** em **Automático** e a **Taxa de Bits** em `0` (automático) para começar.
6. Em **Configurações de Stream**, marque **Ativar Pré-visualização ao Vivo?** e selecione **Iniciar**.
7. Em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/), ative **Ativar Vídeo** para cada estação que deve receber vídeo.

Se nenhuma câmera aparecer na lista, veja os **Registros de Ações** na parte inferior da página: eles mostram cada dispositivo que o detector de câmeras verificou e o motivo de tê-lo ignorado.

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Ativar Câmera?** | **Sim** | **Sim**, **Não** | **Não** interrompe o vídeo por completo. |
| **CAM 1** | Câmera Raspberry Pi | Câmeras detectadas, **Inserir Pipeline Personalizado** | Escolha **Inserir Pipeline Personalizado** para escrever seu próprio pipeline GStreamer. Veja [Pipeline personalizado](https://docs.uavmatrix.com/pt/uavcast-pro/camera/custom-pipeline/). |
| **Resolução** | `640x480` | Tamanhos que a câmera informa | Se a câmera não conseguir entregar o tamanho, o UAVcast-Pro usa o maior tamanho suportado e registra qual foi usado. |
| **Selecionar FPS** | **Automático** | **Automático** ou as taxas que a câmera suporta nessa resolução | **Automático** deixa a câmera escolher. |
| **Taxa de Bits** | `0` (**Automático**) | 0–10000 kbps, em passos de 100 | Defina um valor fixo para links celulares. |
| **Taxa de Recuperação do Stream** | **Auto** | **Auto** (0), 1, 5, 10, 15, 30, 60, 90, 120 quadros | Intervalo dos quadros-chave (keyframes). Valores menores se recuperam mais rápido após perda de pacotes e corrigem borrões cinzentos sobre a VPN, ao custo de largura de banda. |
| **Configurações de espelhamento** | Desativado | **Espelhar Verticalmente**, **Espelhar Horizontalmente** | Câmeras CSI. |
| **Rotação** | `0°` | 0°, 90°, 180°, 270° | Câmeras USB e outras câmeras não CSI. |
| **Ativar Pré-visualização ao Vivo?** | Ativado | Ativado, desativado | Pré-visualização nesta página e no Mapa de Voo. A gravação também usa esta cópia do stream. |

As configurações são salvas conforme você as altera. Se uma transmissão em execução não aplicar uma mudança, selecione **Reiniciar** em **Configurações de Stream**.

## Escolher configurações para o seu link

Não existe uma única configuração certa: a taxa de bits deve caber na parte mais lenta do link, deixando espaço para a telemetria. Pontos de partida para uma câmera:

| Link | Resolução | FPS | Taxa de Bits | Taxa de Recuperação do Stream |
| --- | --- | --- | --- | --- |
| Wi-Fi local ou Ethernet | 1920x1080 | 30 | 4000–6000 kbps | Auto |
| 4G/LTE bom | 1280x720 | 30 | 1500–2500 kbps | 30 quadros |
| 4G fraco ou longo alcance | 1280x720 ou 854x480 | 15–20 | 800–1200 kbps | 15 quadros |

Se a imagem travar ou ficar com borrões cinzentos após perda de pacotes, reduza primeiro a taxa de bits e depois reduza a **Taxa de Recuperação do Stream**, para que os quadros-chave venham com mais frequência.

### Carga da CPU

O indicador **Carga do sistema** mostra o quanto o codificador está trabalhando. No Raspberry Pi 5, todo fluxo é codificado por software (o Pi 5 não tem codificador H.264), então resoluções altas ou dois fluxos podem esgotar a CPU. Quando ele avisar *A CPU está perto do limite. Reduza a resolução ou a taxa de bits.*, faça isso antes de voar.

## Pré-visualização ao vivo

A **Visualização ao Vivo** reproduz o fluxo no navegador pelo servidor de mídia integrado (WebRTC na porta **8889**). Ela fica algumas centenas de milissegundos atrás do fluxo UDP que a sua estação de controle terrestre recebe, dependendo da rede. Use o botão de abrir em nova aba para assistir em tela cheia. Os navegadores iniciam a pré-visualização sem som; ative o som no player se você usar o [áudio](https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/).

A pré-visualização precisa que o navegador acesse a porta 8889 do drone diretamente. Ela funciona na rede local e pela VPN, mas não pelo **Open via Proxy** do Fleet Manager, que transporta apenas a interface web. Use **Open via VPN** para a pré-visualização.

## Como o fluxo é enviado

| Fluxo | Transporte | Porta na estação de controle terrestre |
| --- | --- | --- |
| Vídeo da Câmera 1 | H.264, RTP sobre UDP | **Porta de Vídeo** (padrão `5600`) |
| Vídeo da Câmera 2 (transmissão dupla) | H.264, RTP sobre UDP | **Porta de Vídeo (Câmera 2)**, padrão Porta de Vídeo + 1 (`5601`) |
| Áudio (opcional) | Opus, RTP sobre UDP | Porta de Vídeo + 2 (`5602`) |
| Pré-visualização | WebRTC | Do navegador ao drone, porta 8889 |

O drone envia o fluxo para a estação de controle terrestre. A estação não precisa solicitá-lo, e nada no drone fica escutando conexões de vídeo de entrada.

## Relacionados

- [Duas câmeras: troca por canal RC e transmissão dupla](https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/)
- [Áudio](https://docs.uavmatrix.com/pt/uavcast-pro/camera/audio/)
- [Gravações e revisão de voo](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/)
- [Pipeline GStreamer personalizado](https://docs.uavmatrix.com/pt/uavcast-pro/camera/custom-pipeline/)
- [Solução de problemas: câmera não detectada](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/)
- [Solução de problemas: vídeo travando ou atrasado](https://docs.uavmatrix.com/pt/troubleshooting/choppy-or-delayed-video/)

Source: https://docs.uavmatrix.com/pt/uavcast-pro/camera/

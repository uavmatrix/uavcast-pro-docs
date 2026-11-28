# Duas câmeras: troca por canal RC e transmissão dupla

> Conecte duas câmeras ao UAVcast-Pro e alterne entre elas pelo transmissor RC, ou transmita as duas ao mesmo tempo para QGroundControl ou Mission Planner em portas UDP separadas.

O UAVcast-Pro gerencia duas câmeras, por exemplo uma câmera FPV frontal e uma câmera voltada para baixo ou de gimbal. Você pode usá-las de duas formas:

- **Troca**: um fluxo, e você escolhe qual câmera o alimenta, pela interface web ou por um canal RC do seu transmissor. Usa a largura de banda e a CPU de um fluxo.
- **Transmissão dupla**: as duas câmeras transmitem ao mesmo tempo, cada uma para a sua própria porta UDP, cada uma com a sua própria resolução, FPS e taxa de bits. Usa o dobro da largura de banda e da CPU.

Combinações suportadas: CSI + USB, duas câmeras USB ou duas câmeras CSI em placas com dois conectores de câmera (Raspberry Pi 5, placas de expansão do Compute Module).

## Adicionar a segunda câmera

1. Acesse **Câmera → Configurações da câmera**. Certifique-se de que a **CAM 1** tenha uma câmera.
2. Selecione **Adicionar Câmera** ao lado da CAM 1 e escolha a segunda câmera. Ela aparece no slot **CAM 2**.
3. Clique em um slot para tornar aquela câmera a ativa (*Clique para mudar para a Câmera 2*).

No modo de troca, as duas câmeras compartilham a resolução e a taxa de quadros da Câmera 1 (*A resolução e o FPS da Câmera 1 serão usados*). Se a Câmera 2 não suportar esse tamanho, ela usa a resolução nativa e é redimensionada, a menos que você ative **Igualar Resolução da Câmera 1** para uma câmera que o suporte.

## Trocar de câmera pelo seu transmissor RC

**Troca por Canal RC** aparece quando duas câmeras estão configuradas e a transmissão dupla está desativada.

1. No seu transmissor, atribua uma chave de duas posições a um canal livre, por exemplo o canal 7. Confira no Mission Planner ou em **Mapa de Voo → Rádio** se o canal varia entre cerca de 1000 e 2000 µs.
2. Em **Troca por Canal RC**, ative **Ativar troca de câmera por canal RC**.
3. Escolha o **Canal RC**.
4. Acione a chave e observe o **PWM atual**. Abaixo de 1500 seleciona a Câmera 1; acima de 1500 seleciona a Câmera 2.

![Painel de Controle da Câmera com CAM 1 preenchida e um slot vazio Adicionar Câmera](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Os slots de câmera: CAM 1 em uso e Adicionar Câmera para a segunda câmera. A Troca por Canal RC aparece quando os dois slots estão preenchidos e a transmissão dupla está desativada.*

Enquanto a troca por RC estiver ativa, clicar em um slot de câmera não faz nada: o transmissor está no controle. Desative a troca por RC para escolher as câmeras manualmente.

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Ativar troca de câmera por canal RC** | Desativado | Ativado, desativado |  |
| **Canal RC** | Canal 7 | Canal 1–18 | Lido da entrada RC do controlador de voo. |
| Ponto de troca | 1500 µs | fixo | PWM < 1500 = Câmera 1, PWM > 1500 = Câmera 2. |

## Transmitir as duas câmeras ao mesmo tempo (transmissão dupla)

1. Com as duas câmeras configuradas, ative **Transmissão dupla** na página Câmera. O selo mostra **Ambas ao vivo**.
2. Em **Configurações por câmera**, defina a resolução, o FPS e a taxa de bits de cada câmera.
3. Em [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/), cada destino agora tem **Porta de Vídeo (Câmera 2)**. Deixe-a vazia para usar **Porta de Vídeo** + 1 (`5601`), ou informe outra porta. Com vários destinos em um mesmo computador, separe as portas de vídeo em 3 (`5600`, `5603` …) para que a câmera 2 e o áudio não caiam na porta de outro destino.
4. Configure um segundo receptor de vídeo na estação de controle terrestre para essa porta.

A Câmera 1 vai para a **Porta de Vídeo** de cada estação de controle terrestre (padrão `5600`), e a Câmera 2 para a **Porta de Vídeo (Câmera 2)** (padrão `5601`).

O QGroundControl mostra um fluxo de vídeo por vez. Para assistir à Câmera 2, execute um segundo receptor, por exemplo uma segunda instância do QGroundControl na porta 5601, o Mission Planner com uma fonte GStreamer na porta 5601, ou o próprio GStreamer:

```bash
gst-launch-1.0 udpsrc port=5601 caps="application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=(string)H264" ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false
```

> **Fique de olho na CPU e no link**
>
> Dois fluxos dobram a carga de codificação e a largura de banda. Fique de olho na **Carga do sistema** (*A CPU está perto do limite. Reduza a resolução ou a taxa de bits de um fluxo, ou desative o segundo fluxo.*) e mantenha a taxa de bits combinada bem abaixo do seu link celular de subida. Uma divisão comum é 1280x720 a 1500 kbps para a câmera principal e 854x480 a 600 kbps para a segunda.

O Mapa de Voo mostra uma janela de vídeo por fluxo ativo. As gravações podem incluir as duas câmeras: veja **Gravar câmera 2** em [Gravações](https://docs.uavmatrix.com/pt/uavcast-pro/camera/recordings/).

## Solução de problemas

- **Segunda câmera ausente da lista**: duas câmeras CSI precisam de uma placa com duas portas de câmera. Em um Raspberry Pi, reinicie após instalar o UAVcast-Pro: o instalador aumenta o pool de memória da câmera (CMA) para que duas câmeras possam funcionar juntas.
- **Imagem da Câmera 2 esticada**: a Câmera 2 é redimensionada para a resolução da Câmera 1 no modo de troca. Use câmeras com a mesma proporção de tela, ou ative **Igualar Resolução da Câmera 1**.
- **A troca não faz nada**: verifique o **PWM atual**. *Sem sinal* significa que o controlador de voo não está informando a entrada RC nesse canal.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/camera/multi-camera/

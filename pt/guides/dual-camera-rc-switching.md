# Duas câmeras: troca por RC ou transmissão dupla

> Conecte duas câmeras ao UAVcast-Pro e alterne entre elas pelo rádio de controle, ou transmita as duas ao mesmo tempo com a transmissão dupla. Configuração, portas e CPU.

O UAVcast-Pro lida com duas câmeras, por exemplo uma câmera frontal e uma câmera voltada para baixo ou de zoom. Você escolhe entre dois modos:

|  | **Troca** (padrão) | **Transmissão dupla** |
| --- | --- | --- |
| O que a estação de controle terrestre recebe | Um fluxo de vídeo, mostrando a câmera 1 ou a câmera 2 | Dois fluxos de vídeo ao mesmo tempo |
| Como você escolhe | Os indicadores de câmera na interface web, ou um canal RC | Ambas sempre ativas |
| Portas | **Porta de Vídeo** | Câmera 1 em **Porta de Vídeo**, câmera 2 em **Porta de Vídeo (Câmera 2)** (padrão: Porta de Vídeo + 1) |
| CPU e largura de banda | Uma codificação | Duas codificações, cerca de o dobro do uplink |

## 1. Adicione a segunda câmera

1. Conecte as duas câmeras. Duas câmeras CSI em um Pi 5, uma CSI e uma USB, ou duas câmeras USB funcionam.
2. Abra **Câmera → Configurações da câmera**. Os slots de câmera mostram **CAM 1** e **CAM 2**.
3. Clique em **Adicionar Câmera** no segundo slot e escolha a câmera.
4. No modo de troca, serão usadas a resolução e o FPS da Câmera 1. Se a câmera 2 suportar a resolução da câmera 1, ative **Igualar Resolução da Câmera 1**; caso contrário, a câmera 2 usa a própria resolução e é redimensionada para corresponder.

Se uma câmera não aparecer na lista, veja [Câmera não detectada](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/).

## 2a. Troque de câmera pelo seu rádio

1. Em **Troca por Canal RC**, ative **Ativar troca de câmera por canal RC**.
2. Escolha um canal livre em **Canal RC**. O padrão é o canal 7.
3. Mapeie uma chave de duas posições do seu rádio para esse canal.
4. Acione a chave e observe o **PWM atual**: abaixo de 1500 µs seleciona a câmera 1; acima de 1500 µs seleciona a câmera 2.

![Painel de Controle da Câmera com Ativar Câmera definido como Sim, CAM 1 preenchida e um slot vazio de Adicionar Câmera](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/camera--control-panel.webp)

*Painel de Controle da Câmera com uma câmera. O painel Troca por Canal RC aparece abaixo dele somente quando a CAM 2 é adicionada e a transmissão dupla está desativada.*

Enquanto a troca por RC estiver ativa, os indicadores de câmera na interface web não trocam de câmera. Desative a troca por RC para selecionar as câmeras manualmente novamente.

## 2b. Transmita as duas câmeras ao mesmo tempo

1. Ative **Transmissão dupla**. O indicador mostra **Ambas ao vivo**.
2. Cada câmera agora tem sua própria resolução, FPS e taxa de bits em **Configurações por câmera**.
3. Abra **Estações de Controle Terrestre**. Cada destino agora mostra **Porta de Vídeo (Câmera 2)**. Deixe-a vazia para usar **Porta de Vídeo** + 1 (5601), ou digite uma porta.
4. Na estação de controle terrestre, receba o segundo fluxo nessa porta, por exemplo com uma segunda fonte de vídeo no QGroundControl ou uma janela GStreamer: veja [Estações de controle terrestre e vídeo](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/#set-up-the-receiving-side) para QGroundControl, Mission Planner e GStreamer em cada sistema operacional.

> **Fique de olho na CPU**
>
> O UAVcast-Pro codifica o vídeo por software. Com dois fluxos, observe a **Carga do sistema**. Quando aparecer **"A CPU está perto do limite"**, reduza a resolução ou a taxa de bits de um fluxo, ou desative o segundo fluxo. Um Raspberry Pi 4 ou 5 é recomendado para a transmissão dupla.

O **Mapa de Voo** mostra uma janela de vídeo por fluxo ativo. Você pode ocultá-las como abas na parte inferior do mapa.

## Planejamento de portas

Com a transmissão dupla ativa, cada destino usa duas portas de vídeo, e o áudio (se **Enviar áudio para as estações de solo** estiver ativado) usa a porta de vídeo + 2. Se você adicionar mais destinos no mesmo computador, espace as portas de vídeo pelo menos três unidades, por exemplo 5600 e 5610.

## Gravando as duas câmeras

Em **Câmera → Gravações → Configurações**, **Gravar câmera 2** funciona somente quando a transmissão dupla está ativa. Veja [Grave voos e revise-os](https://docs.uavmatrix.com/pt/guides/recording-flight-review/).

Source: https://docs.uavmatrix.com/pt/guides/dual-camera-rc-switching/

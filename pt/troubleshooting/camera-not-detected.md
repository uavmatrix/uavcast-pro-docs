# Câmera não detectada

> O UAVcast-Pro mostra Nenhuma câmera disponível? Verifique o cabo flat CSI, o rpicam-hello, o suporte a câmera no Ubuntu e o v4l2-ctl para câmeras USB.

**Câmera → Configurações da câmera** mostra **Nenhuma câmera disponível** em **Selecionar Câmera**, a câmera que você quer não está na lista, ou os **Registros de Ações** mostram *No camera detected*.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Uma câmera CSI do Raspberry Pi (cabo flat) não aparece | Cabo, conector ou a pilha de software da câmera | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/#check-1) |
| Câmera CSI no Ubuntu | O Ubuntu não traz a pilha de câmera do Raspberry Pi por padrão | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/#check-2) |
| Uma câmera USB não aparece | Não vista pelo Linux, ou não é um dispositivo de captura de vídeo | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/#check-3) |
| Câmera listada, mas o vídeo nunca inicia | Resolução não suportada ou outro programa está usando a câmera | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/#check-4) |

## Verificação 1: câmera CSI do Raspberry Pi

1. Desligue o Pi. Reencaixe o cabo flat nas duas extremidades, com os contatos voltados para o lado correto, e feche as travas do conector. Um Pi 5 e um Pi Zero 2 W precisam do cabo mais estreito, de 22 pinos.

2. Ligue o Pi e execute no Pi:

   ```bash
   rpicam-hello --list-cameras
   ```

   Em imagens mais antigas do Raspberry Pi OS, o comando é `libcamera-hello --list-cameras`.

3. Se a câmera não aparecer aqui, o Linux não a enxerga. Teste outro cabo ou outra câmera antes de mexer em qualquer coisa no UAVcast-Pro.

4. Se ela aparecer, reinicie a câmera na página Câmera (**Reiniciar**, ou **Parar** e depois **Iniciar**) e abra **Selecionar Câmera** de novo. Cada câmera CSI aparece como uma entrada própria, por exemplo *CSI Camera 0 - imx708 (libcamera)*.

> **Duas câmeras CSI**
>
> Com duas câmeras, o driver precisa de mais memória. Desde a v6.2.2, o instalador aumenta automaticamente a memória CMA no `config.txt` para configurações com várias câmeras. Reinicie depois de instalar se você adicionou a segunda câmera depois.

## Verificação 2: câmera CSI no Ubuntu ou Debian

O UAVcast-Pro usa `rpicam-vid` para câmeras CSI. O instalador instala `rpicam-apps` (ou `rpicam-apps-core`) no Raspberry Pi OS e no Debian. No Ubuntu, a pilha de câmera do Raspberry Pi não é empacotada, e o log diz *CSI camera not available: Ubuntu requires building libcamera from source. USB cameras are supported.*

Use o Raspberry Pi OS de 64 bits se precisar de uma câmera CSI, ou use uma câmera USB no Ubuntu.

## Verificação 3: câmera USB

1. Conecte a câmera diretamente ao computador companheiro, não por um hub sem alimentação.

2. Execute:

   ```bash
   v4l2-ctl --list-devices
   ```

3. Se a câmera não aparecer, o Linux não a enxerga. Verifique com `lsusb` e teste outra porta e outro cabo.

4. Se ela aparecer, reinicie a câmera com **Reiniciar** na página Câmera e abra **Selecionar Câmera** de novo.

A maioria das webcams UVC funciona, por exemplo a Logitech C920 e a C615. Câmeras que só geram um formato que o codificador não aceita, ou dispositivos que não são de captura de vídeo (algumas placas de captura), não aparecem na lista.

## Verificação 4: aparece na lista, mas o vídeo não inicia

- Se o log disser *Camera … does not support …x… - streaming at …x… instead*, escolha em **Resolução** uma resolução que a câmera suporte.
- Feche qualquer outro programa que esteja usando a câmera. Só um programa pode abri-la por vez.
- Se **Ativar Câmera?** mostrar *Permissões insuficientes*, atualize para a v6.5.2 ou posterior, que corrigiu isso.

## Ainda não detectada?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **Todos os Logs** selecionado, adicione a saída de `rpicam-hello --list-cameras` ou `v4l2-ctl --list-devices`, e envie tudo para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Configurações da câmera](https://docs.uavmatrix.com/pt/uavcast-pro/camera/) · [Hardware compatível](https://docs.uavmatrix.com/pt/reference/supported-hardware/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/

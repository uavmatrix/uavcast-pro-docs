# Subtensão e throttling

> O UAVcast-Pro avisa Voltage too low ou Slowed down? Dimensione a fonte de energia para o Pi, o modem e a câmera, corrija cabos finos e o resfriamento, e evite reinicializações.

A linha **Fonte de alimentação** do painel mostra um aviso, o modem cai, a conexão do controlador de voo é reiniciada, ou o Pi reinicia em voo. Em um drone, uma fonte de energia subdimensionada causa mais falhas estranhas do que qualquer configuração de software.

![Cartão de status do painel com a linha Power supply em System, mostrando Stable](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/dashboard--status-card.webp)

*Painel → cartão de status. A linha Power supply fica em System; aqui mostra Stable. Os avisos substituem esse texto, conforme listado abaixo.*

| Linha Power supply | Significado |
| --- | --- |
| **Stable** | Nenhuma subtensão ou throttling desde a inicialização |
| **Voltage too low - use a stronger power supply** | A tensão da fonte está abaixo do que o Pi precisa no momento |
| **Voltage dropped since start-up** | Aconteceu antes, por exemplo quando o modem conectou ou quando os motores foram acionados |
| **Slowed down (heat or power)** | A CPU está rodando mais devagar para se proteger do calor ou da baixa tensão |

As leituras vêm do firmware do Raspberry Pi, então só estão disponíveis em um Raspberry Pi.

## Verificação 1: dimensione a fonte para tudo o que está ligado a ela

O Pi alimenta o modem e a câmera USB pelas suas portas USB. Um modem 4G puxa corrente de pico quando conecta e quando o sinal está fraco.

1. Use um BEC ou regulador de 5 V com capacidade bem acima da corrente total do Pi, do modem, da câmera e de qualquer outro item na mesma linha de alimentação. As especificações oficiais da fonte do Raspberry Pi listam o que cada modelo precisa.
2. Nunca alimente o Pi pela porta TELEM ou USB do controlador de voo.
3. Se o modem puxar mais do que o Pi consegue repassar, alimente o modem diretamente pelo regulador, por um hub USB alimentado ou por um cabo USB com alimentação separada.

## Verificação 2: cabos e conectores

Cabos finos ou longos perdem tensão sob carga. Use cabos de alimentação curtos e grossos e um bom cabo USB para o modem. Um cabo que serve para carregador de celular ainda pode causar subtensão na corrente de pico.

## Verificação 3: calor

**Temperature** em **System Information** mostra a temperatura da CPU. Um Pi que roda codificação de vídeo dentro de uma fuselagem fechada, ao sol, esquenta. Adicione um dissipador ou um pequeno ventilador, e dê ventilação ao gabinete. Um Pi 5 precisa de resfriamento ativo para codificação contínua.

## Verificação 4: confira depois da correção

**Voltage dropped since start-up** permanece até a próxima inicialização. Reinicie, execute uma missão típica na bancada (modem conectado, câmera transmitindo) e confirme que a linha continua **Stable**.

## Ainda vendo avisos?

O download dos logs inclui os eventos de energia e de USB do kernel em `diagnostics.txt`. [Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) e envie-os para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**, com uma foto da sua fiação de energia.

Relacionados: [Requisitos de hardware](https://docs.uavmatrix.com/pt/get-started/hardware-requirements/) · [Painel](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/undervoltage-and-throttling/

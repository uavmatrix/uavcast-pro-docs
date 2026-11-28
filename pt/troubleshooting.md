# Solução de problemas

> Corrija a falta de vídeo, a ausência de heartbeat MAVLink, problemas de modem e VPN, erros de licença e pareamento com o Fleet Manager. Comece pelo que você vê e siga as verificações.

Comece pelo sintoma. Cada página abaixo lista as causas prováveis na ordem em que acontecem em campo, com verificações numeradas que usam os rótulos exatos das interfaces do UAVcast-Pro e do Fleet Manager.

> **Verifique primeiro o painel**
>
> Abra o **Painel** no UAVcast-Pro. O cartão de status resume o drone em uma linha (**Todos os sistemas normais**, ou o número de problemas e avisos) e tem uma linha para cada um dos itens: **Controlador de voo**, **Estação de controle terrestre**, **Celular**, **VPN**, **Correções RTK**, **Vídeo** e **Fonte de alimentação**. A primeira linha vermelha costuma ser o ponto de partida.

![Painel do UAVcast-Pro com o cartão de status mostrando 2 problemas: GPS sem fixação e VPN não conectada](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/dashboard.webp)

*Painel → cartão de status. As linhas com problema ficam vermelhas e são contadas no selo de problemas; aqui, GPS (sem fixação) e VPN (não conectada).*

## Encontre o seu sintoma

| O que você vê | Causa provável | Vá para |
| --- | --- | --- |
| A telemetria funciona, mas a área de vídeo no QGroundControl ou no Mission Planner está preta | **Ativar Vídeo** está desligado para essa estação de controle terrestre, IP errado ou um firewall | [Sem vídeo na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-video-in-gcs/) |
| O vídeo congela, fica com manchas cinzas ou atrasa segundos | Bitrate alto demais para o link, ou keyframes distantes demais | [Vídeo travado ou atrasado](https://docs.uavmatrix.com/pt/troubleshooting/choppy-or-delayed-video/) |
| A página Controlador de Voo diz **Sem heartbeat**, **Aguardando dispositivo** ou **Detectando taxa de transmissão** | Cabo, fiação, porta ou taxa de transmissão | [Sem heartbeat MAVLink](https://docs.uavmatrix.com/pt/troubleshooting/no-mavlink-heartbeat/) |
| O UAVcast-Pro mostra o controlador de voo como **Conectado**, mas a estação espera uma conexão | A telemetria não é enviada para a estação, ou a estação não está escutando | [Sem telemetria na estação de controle terrestre](https://docs.uavmatrix.com/pt/troubleshooting/no-telemetry-in-gcs/) |
| **Nenhuma câmera disponível** em **Selecionar Câmera** | Pilha de câmera CSI ausente, cabo flat, ou câmera USB não vista | [Câmera não detectada](https://docs.uavmatrix.com/pt/troubleshooting/camera-not-detected/) |
| **Chave de licença inválida**, **Número máximo de ativações atingido** ou **Falha na ativação da licença** | Chave errada, nenhuma vaga de dispositivo livre ou nenhuma internet | [Licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/) |
| O modem mostra sinal e operadora, mas nada carrega | APN, prioridade de rede ou dados do SIM | [Modem conectado, sem internet](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/) |
| O navegador não alcança `http://<device-ip>/` depois da instalação | Endereço errado, serviço não executando ou porta alterada | [A interface web não abre](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/) |
| O instalador para com um erro | SO de 32 bits, sem internet ou pouco espaço em disco | [A instalação falha](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/) |
| ZeroTier ou Tailscale diz conectado, mas você não consegue fazer ping nem abrir o drone | Membro não autorizado, rede errada ou estação fora da VPN | [VPN conectada, mas não alcança o drone](https://docs.uavmatrix.com/pt/troubleshooting/vpn-cant-reach-drone/) |
| O status do NTRIP não é **Transmitindo correções**, ou a fixação nunca chega a **RTK Fixed** | Configurações do caster, GGA ou um receptor que não faz RTK | [Correções RTK não chegam](https://docs.uavmatrix.com/pt/troubleshooting/rtk-corrections-not-arriving/) |
| **Tensão baixa - use uma fonte de alimentação mais forte** ou **Reduzido (calor ou energia)** | Fonte ou cabo de energia fraco, superaquecimento | [Subtensão e limitação de CPU](https://docs.uavmatrix.com/pt/troubleshooting/undervoltage-and-throttling/) |
| O drone está **Offline** no Fleet Manager | Drone sem internet, porta MQTT bloqueada ou re-pair necessário | [Drone offline no Fleet Manager](https://docs.uavmatrix.com/pt/troubleshooting/drone-offline-fleet-manager/) |
| **Invalid pairing code**, **This pairing code has expired** ou **License is not owned by any member of this organization** | Código digitado errado ou antigo, ou licença que pertence a alguém fora da organização | [Código de pareamento inválido ou expirado](https://docs.uavmatrix.com/pt/troubleshooting/pairing-code-invalid/) |

## Ainda com problemas?

1. [Colete os arquivos de log](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/). O download inclui um snapshot `diagnostics.txt` das suas configurações e do hardware, então o suporte não precisa pedi-los.
2. Envie para **[support@uavmatrix.com](mailto:support@uavmatrix.com)** com a versão do UAVcast-Pro, o hardware que você usa e o que já tentou. Você também pode perguntar no [Discord da UAVmatrix](https://discord.gg/xwqMTXh).

Respostas curtas para perguntas comuns estão no [FAQ](https://docs.uavmatrix.com/pt/troubleshooting/faq/).

Source: https://docs.uavmatrix.com/pt/troubleshooting/

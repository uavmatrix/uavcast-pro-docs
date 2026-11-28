# Painel

> Consulte o painel do UAVcast-Pro para verificar o controlador de voo, GPS, bateria, link da estação de controle terrestre, celular, VPN, RTK, vídeo e a energia, temperatura e limitação de CPU do Raspberry Pi.

O painel é a checklist de pré-voo do computador companheiro. Um cartão de estado informa se o controlador de voo, GPS, bateria, link da estação de controle terrestre, modem, VPN, RTK, vídeo e fonte de alimentação estão saudáveis, com um resumo como *Todos os sistemas normais* ou *2 problemas*. Abaixo dele, você encontra informações do sistema, tráfego de rede, memória e armazenamento. Abra **Painel** na barra lateral.

![Painel do UAVcast-Pro com o cartão de estado mostrando 2 problemas, informações do sistema com temperatura e o gráfico de tráfego de rede](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/dashboard.webp)

*Painel em uma unidade de bancada: dois problemas (sem fixação de GPS, VPN não conectada), informações do sistema e tráfego de rede.*

## Cartão de estado

O cartão tem três grupos. Cada linha tem um ponto colorido: verde é normal, âmbar é um aviso, vermelho é um problema.

| Linha | Valores de exemplo | O que fazer se não estiver verde |
| --- | --- | --- |
| **Controlador de voo** | *Armado*, *Desarmado*, *Conexão parada*, *Conectando…* | Veja [Controlador de voo](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/). |
| **GPS** | *Fixação 3D · 14 satélites*, *RTK Fixed*, *Sem fixação*, *Sem GPS* | Aguarde uma fixação ao ar livre ou verifique a fiação do GPS. |
| **Bateria** | tensão e porcentagem | Carregue a bateria ou verifique a configuração do monitor de bateria do controlador de voo. |
| **Estação de controle terrestre** | *Enviando para 2 · 16 pacotes/s*, *Não enviando*, *1 configurada · aguardando controlador de voo*, *Nenhuma configurada* | Veja [Estações de controle terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/). |
| **Celular** | operadora e sinal, *Nenhum modem detectado* | Veja [Modem celular](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/cellular-modem/). |
| **VPN** | *Conectado*, *Não conectado*, *Desativado* | Veja [VPN](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/). |
| **Correções RTK** | *Conectando…*, *Erro - verifique as configurações*, *Desativado* | Veja [NTRIP / RTK](https://docs.uavmatrix.com/pt/uavcast-pro/flight-controller/ntrip-rtk/). |
| **Vídeo** | *Em execução*, *Parado*, *Desativado* | Veja [Câmera](https://docs.uavmatrix.com/pt/uavcast-pro/camera/). |
| **DNS Dinâmico** | *Em execução*, *Desativado* | Veja [DNS Dinâmico](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/dynamic-dns/). |
| **Fonte de alimentação** | *Estável*, *Tensão baixa demais - use uma fonte de alimentação mais potente*, *Reduzido (calor ou energia)*, *Tensão caiu desde a inicialização* | Veja [Energia](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/#power-and-temperature). |

*Falha no serviço - reiniciando* em qualquer linha significa que o serviço travou e está sendo reiniciado automaticamente. Se a mensagem continuar aparecendo, baixe os registros em **Aplicação → Registros**.

## Energia e temperatura

Em um Raspberry Pi, **Informações do Sistema** mostra **Energia**, **Limitação de CPU** e **Temperatura**:

- **Tensão baixa demais - use uma fonte de alimentação mais potente**: o Pi está com subtensão neste momento. Isso causa reinicializações do USB, e o modem ou o controlador de voo podem cair. Corrija a fonte antes de voar.
- **Tensão caiu desde a inicialização**: aconteceu em algum momento desde o boot. Costuma ser causado pelos picos de transmissão do modem.
- **Reduzido (calor ou energia)**: a CPU está com limitação. A codificação de vídeo é a primeira afetada. Adicione um dissipador ou ventilação, ou corrija a fonte.

A barra de temperatura fica vermelha conforme o Pi se aproxima do ponto de limitação.

## Outros cartões

| Cartão | Mostra |
| --- | --- |
| **Informações do Sistema** | **Sistema Operacional**, **Hardware** (CPU e núcleos), **Tempo de Atividade**, energia e **Temperatura**. |
| **Tráfego de Rede** | Totais e taxas de recebimento e transmissão por interface. Escolha de **Últimos 50** a **Últimos 1000** amostras. Útil para verificar quanto o vídeo consome no modem. |
| **Uso de Memória** | **Total**, **Usado** e **Livre**. Os dados são coletados a cada 10 segundos. |
| **Armazenamento** | **Total**, **Usado** e **Livre** por partição. |

Os gráficos precisam de alguns minutos de dados após a inicialização antes de exibir qualquer coisa.

## Tour guiado

Na primeira vez que abrir a interface web, um tour oferece para guiá-lo pelas principais páginas. Você pode **Pular Tour** ou escolher **Nunca mostrar novamente**. Inicie-o de novo em **Aplicação → Configurações → Fazer um Tour**.

Problemas de energia em detalhes: [Subtensão e limitação de CPU](https://docs.uavmatrix.com/pt/troubleshooting/undervoltage-and-throttling/).

Source: https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/

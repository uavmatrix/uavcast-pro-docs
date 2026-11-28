# Modem 4G conectado, mas sem internet

> Modem LTE mostra sinal e operadora, mas o drone não tem internet? Verifique o tipo de modem, o APN, o PIN e os dados do SIM, a prioridade de rede e a rota padrão.

A página **Modem** mostra sinal, uma operadora e talvez um endereço IP, mas o drone não consegue alcançar a internet: a VPN não conecta, a licença não pode ser verificada e o vídeo e a telemetria nunca chegam à estação de controle terrestre pelo LTE.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Nenhum Modem Conectado | O Linux não vê o modem, ou ele está sem energia | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/#check-1) |
| Erro que menciona um modem HiLink, ou nenhum botão Conectar para um pen drive USB | Tipo de modem errado | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/#check-2) |
| Registrado na rede, mas sem endereço IPv4 | APN errado, PIN errado ou sem dados no SIM | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/#check-3) |
| O modem tem um endereço IP, mas a internet continua passando pelo Wi-Fi | A prioridade de rede favorece o Wi-Fi | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/#check-4) |
| Funciona em casa, mas não em campo (ou o contrário) | Roaming, cobertura ou uma rede doméstica na sub-rede do modem | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/#check-5) |

![Página Modem do UAVcast-Pro com Tradicional (PPP) selecionado e o painel Nenhum Modem Conectado](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/modem.webp)

*Página Modem com Tradicional (PPP) selecionado e nenhum modem conectado. Com um modem conectado, o cartão à direita mostra a qualidade do sinal, o estado, a operadora e as informações IPv4.*

## Verificação 1: o modem é detectado?

Se a página disser **Nenhum Modem Conectado**:

1. Verifique se a luz de energia do modem está acesa e se ele está bem encaixado em uma porta USB.
2. Um modem pode consumir mais corrente do que a porta USB do Raspberry Pi fornece. Observe a linha **Fonte de alimentação** do painel. Se disser **Tensão baixa - use uma fonte de alimentação mais forte**, corrija a energia primeiro: [Subtensão e limitação de CPU](https://docs.uavmatrix.com/pt/troubleshooting/undervoltage-and-throttling/).
3. No Pi, execute `lsusb` para ver o modem, e `mmcli -L` para ver se o ModemManager o encontrou. Um modem HiLink não aparece no `mmcli`; ele aparece como uma interface de rede em `ip addr`.

O modem aparece na página sozinho assim que for detectado.

## Verificação 2: escolha o tipo de modem certo

Há dois tipos de modem USB, e o **Tipo de modem** precisa corresponder ao seu.

|  | **HiLink** | **Tradicional (PPP)** |
| --- | --- | --- |
| Como o Linux o enxerga | Um adaptador de rede (o modem é um pequeno roteador) | Um modem gerenciado pelo ModemManager |
| Quem conecta | O próprio modem, automaticamente | O UAVcast-Pro, com os botões **Conectar** e **Desconectar** |
| Exemplo Huawei | E3372**h** | E3372**s** |

Se você escolher **Tradicional (PPP)** para um modem HiLink, o log diz *HiLink modem detected … Please change your modem type to 'HiLink' in settings.* Mude o **Tipo de modem** e o erro desaparece.

## Verificação 3: APN, PIN e SIM

Para um modem **Tradicional (PPP)**:

1. Deixe **Nome do Ponto de Acesso (Opcional)** vazio primeiro. O UAVcast-Pro então tenta o APN padrão da sua rede e os APNs conhecidos para o SIM, e memoriza o que funciona (no log, *Found a working … it will be used from now on*).
2. Se isso falhar, digite o APN que a sua operadora fornece para dados móveis. Algumas operadoras também exigem **Nome de usuário (Opcional)** e **Senha (Opcional)**.
3. Se o SIM tiver PIN, digite-o em **Código PIN (Opcional)**, ou desative o PIN colocando o SIM em um celular. **Desbloqueio Necessário** em **Informações do Modem** mostra se o SIM está bloqueado.
4. Coloque o SIM em um celular e verifique se os dados móveis funcionam e se o plano ainda tem dados.

Para um modem **HiLink**, o APN é definido na própria página web do modem, geralmente em `http://192.168.8.1`. Abra-a pelo Pi, ou conecte o modem a um notebook.

> **O UAVcast-Pro continua tentando**
>
> Um modem Tradicional conecta na inicialização e reconecta sozinho após perda de sinal. Se um modem conectar sem obter um endereço, o UAVcast-Pro muda para o modo de IP puro e tenta de novo. Espere um minuto após ligar antes de alterar configurações.

## Verificação 4: torne o modem a rota padrão

Se o Pi também estiver no Wi-Fi ou na Ethernet, o tráfego sai pela interface com prioridade, não necessariamente pelo modem.

1. Vá em **Redes**.
2. Em **Prioridade de Rede**, escolha **Prioridade Modem (Modo Externo)** antes do voo. **Prioridade WiFi (Modo Interno)** economiza dados celulares em casa, mas envia tudo pelo Wi-Fi.
3. Em **Interfaces de Rede**, confirme que a interface do modem está marcada como **Padrão** e que o **Gateway Padrão** mostra *via* a interface do modem.

![Página Redes com Prioridade de Rede em Automático e a tabela de interfaces mostrando wlan0 como padrão](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/networks.webp)

*Página Redes com Automático (Padrão do Sistema) ativo e o Wi-Fi (wlan0) como rota padrão. Selecione Prioridade Modem (Modo Externo) aqui para rotear pelo modem.*

Teste a partir do Pi, somente pelo modem:

```bash
ping -c 3 -I wwan0 1.1.1.1   # Traditional modem (interface name may differ)
ip route                     # the first "default via" line is the route in use
```

## Verificação 5: problemas que só aparecem em campo

- **Roaming**: um SIM usado no exterior pode precisar de roaming habilitado pela operadora. Verifique em um celular com o mesmo SIM.
- **Cobertura**: observe **Qualidade do Sinal** e **Tecnologia**. Alguns SIMs de IoT só funcionam em certas bandas ou tecnologias.
- **Conflito de sub-rede**: modems HiLink distribuem endereços `192.168.8.x`. Se a sua rede doméstica ou de escritório também usa `192.168.8.0/24`, o roteamento quebra. Mude a LAN ou a sub-rede do modem.

## Ainda sem internet?

[Baixe os logs](https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/) com **Gerenciador de Modem** selecionado, adicione a saída de `mmcli -m 0` e `ip route`, e envie para **[support@uavmatrix.com](mailto:support@uavmatrix.com)** com o modelo do modem e a operadora.

Relacionado: [Modem celular](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/cellular-modem/) · [Redes](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/networks/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/modem-no-internet/

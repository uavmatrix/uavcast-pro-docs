# Redes

> Veja todas as interfaces de rede do drone e escolha se o Wi-Fi ou o modem 4G/LTE transporta o tráfego, para que o link permaneça na conexão celular quando você voar fora do alcance do Wi-Fi.

A página Redes mostra todas as interfaces de rede do drone (Ethernet, Wi-Fi, modem, VPN) e qual delas é a rota padrão. Também é aqui que você escolhe se o Wi-Fi ou o modem celular tem preferência quando ambos estão conectados. Abra **Redes** na barra lateral.

![Página Redes com cartões de resumo, Prioridade de Rede definida como Automático e a tabela de interfaces listando eth0 e wlan0](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/networks.webp)

*Redes com Automático (Padrão do Sistema) ativo e Wi-Fi como rota padrão.*

## Escolher a prioridade de rede

Quando o Wi-Fi e o modem estão conectados ao mesmo tempo, o Linux envia o tráfego pela interface com a menor métrica de rota. A **Prioridade de Rede** define essas métricas para você:

| Opção | Use quando | Efeito |
| --- | --- | --- |
| **Prioridade WiFi (Modo Interno)** | Na bancada ou em casa, para economizar dados móveis. | Métrica do Wi-Fi 100, métrica do modem 600. |
| **Prioridade Modem (Modo Externo)** | Antes de cada voo sobre conexão celular. | Métrica do modem 100, métrica do Wi-Fi 600. |
| **Automático (Padrão do Sistema)** | Você não quer que o UAVcast-Pro altere nada. | As métricas do próprio NetworkManager. |

> **Mude para Prioridade Modem antes da decolagem**
>
> Se o drone decolar com prioridade Wi-Fi, o link permanece no Wi-Fi até que o Wi-Fi seja perdido, e só então precisa migrar para o modem no ar. Isso causa uma falha na telemetria e no vídeo. Selecione **Prioridade Modem (Modo Externo)** em terra.

A mudança é aplicada às conexões ativas sem reiniciá-las (*Aplicando alterações...*).

> **Quais conexões são alteradas**
>
> A métrica do Wi-Fi é definida na conexão do NetworkManager chamada `preconfigured`, que é o nome que o Raspberry Pi Imager dá ao Wi-Fi informado durante a gravação do cartão. Um Wi-Fi configurado de outra forma mantém a sua própria métrica, e a Ethernet nunca é alterada.

## Informações das interfaces

Os cartões de resumo mostram **Interfaces Ativas**, **Gateway Padrão** (e a interface pela qual ele passa) e **Total de Interfaces**. **Interfaces de Rede** lista cada interface com **Nome**, **Endereço IP**, **Gateway**, **Status** (**Ativo**, **Inativo**, **VPN**), **Velocidade**, **Tipo** e qual delas é a **Padrão**.

Nomes comuns de interface:

| Nome | O que é |
| --- | --- |
| `eth0`, `end0` | Ethernet cabeada |
| `wlan0` | Wi-Fi |
| `ppp0`, `wwan0` | Modem tradicional |
| `usb0`, `eth1` | Modem HiLink |
| `zt…` | ZeroTier |
| `tailscale0` | Tailscale |

Source: https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/networks/

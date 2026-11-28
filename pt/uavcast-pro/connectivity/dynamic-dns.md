# DNS Dinâmico

> Mantenha um nome de host apontado para o IP público variável do drone com o DNS Dinâmico do UAVcast-Pro (No-IP, DynDNS, DuckDNS ou uma URL genérica) e saiba quando uma VPN é a melhor escolha.

O DNS Dinâmico mantém um nome de host, como `mydrone.ddns.net`, apontado para o endereço IP público atual do drone. O UAVcast-Pro verifica o IP público a cada 5 minutos e atualiza o seu provedor de DNS quando ele muda. Abra **DNS Dinâmico** na barra lateral.

> **A maioria dos links celulares precisa de uma VPN**
>
> O DNS Dinâmico só ajuda se o IP público do drone puder receber conexões de entrada. A maioria das operadoras móveis coloca os chips SIM atrás de NAT de operadora (CGNAT), então o IP público pertence à operadora, não ao seu drone. Use uma [VPN](https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/vpn/), a menos que o seu chip SIM tenha um endereço IP público (muitas vezes "estático" ou "M2M").

O DNS Dinâmico não altera para onde o UAVcast-Pro envia a telemetria e o vídeo: eles sempre vão para os endereços IP das [Estações de Controle Terrestre](https://docs.uavmatrix.com/pt/uavcast-pro/ground-stations/). Ele serve para acessar a interface web ou o SSH do drone a partir de fora.

## Configurar

1. Crie um nome de host com o seu provedor de DNS (No-IP, DynDNS ou DuckDNS).
2. No UAVcast-Pro, acesse **DNS Dinâmico**. Defina **Ativar DNS Dinâmico?** como **Sim**.
3. Escolha o seu **Sistema DNS**.
4. Digite o nome de usuário da sua conta (o campo está rotulado como **Dynamic DNS configuration**), a sua **Senha** e o nome de host em **Alias**. Para o DuckDNS, coloque o seu token no campo de nome de usuário e qualquer valor em **Senha** (o formulário exige, mas o DuckDNS o ignora). Os campos são salvos ao sair de cada um.
5. Selecione **Conectar** para iniciar o atualizador. Ele envia o IP atual imediatamente e depois verifica a cada 5 minutos. **Desconectar** interrompe o atualizador.

![Gerenciador de DNS Dinâmico com Ativar DNS Dinâmico? definido como Não, campos de nome de usuário, senha e alias vazios, e Sistema DNS noip](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/dynamic-dns.webp)

*Gerenciador de DNS Dinâmico antes de ser ativado.*

## Referência de configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Ativar DNS Dinâmico?** | **Não** | **Sim**, **Não** |  |
| **Sistema DNS** | **No-IP** | **No-IP**, **DynDNS**, **DuckDNS**, **Genérico** |  |
| **URL do DNS** | vazio | URL de atualização | Somente para **Genérico**. A URL de atualização compatível com DynDNS do provedor. |
| **Dynamic DNS configuration** (nome de usuário) | vazio |  | Seu nome de usuário na conta DNS, ou o seu token para o DuckDNS. A interface rotula este campo de forma estranha; ele é o nome de usuário. |
| **Senha** | vazio |  | A senha da sua conta DNS. Exigida pelo formulário; ignorada no DuckDNS. |
| **Alias** | vazio | nome de host | O nome de host a atualizar, por exemplo `mydrone.ddns.net`. |
| Intervalo de atualização | 5 minutos | fixo |  |

A linha **DNS Dinâmico** do [Painel](https://docs.uavmatrix.com/pt/uavcast-pro/dashboard/) mostra se o atualizador está em execução. Os **Registros de Ações** mostram cada atualização e a resposta do provedor.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/connectivity/dynamic-dns/

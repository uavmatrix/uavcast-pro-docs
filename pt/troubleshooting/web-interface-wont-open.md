# A interface web não abre

> Não consegue abrir o UAVcast-Pro em http://ip-do-dispositivo após a instalação? Encontre o endereço certo, verifique o serviço uavcast-web, a porta do servidor e a porta 80.

O instalador terminou, mas `http://<device-ip>/` expira, recusa a conexão ou mostra a página de outro programa.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| Tempo esgotado, ou a página nunca carrega | Endereço errado, ou seu computador está em outra rede | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/#check-1) |
| Conexão recusada | O serviço web não está em execução | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/#check-2) |
| Outra página web, por exemplo nginx ou Apache | Outro programa está usando a porta 80 | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/#check-3) |
| Funcionava antes, parou após uma mudança de configuração | A porta do servidor foi alterada | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/#check-4) |
| Carrega, mas todas as páginas vão para Aplicação | Ainda não há licença ativa | [Verificação 5](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/#check-5) |

## Verificação 1: use o endereço certo

A interface web roda na **porta 80** por padrão, então o endereço é apenas `http://<device-ip>/`.

1. Encontre o IP do dispositivo. O instalador o mostra no final. No dispositivo, você também pode executar `hostname -I`.
2. Em um Raspberry Pi com o nome de host padrão, tente `http://raspberrypi.local/`.
3. Use `http://`, não `https://`. A interface web não serve HTTPS.
4. Certifique-se de que seu computador está na mesma rede do dispositivo, ou na mesma VPN. Pelo 4G, você deve usar o endereço VPN do drone.

## Verificação 2: o serviço web está em execução?

No dispositivo, execute:

```bash
sudo systemctl status uavcast-web
```

Deve dizer **active (running)**. Se não disser, inicie-o e leia o motivo da parada:

```bash
sudo systemctl restart uavcast-web
journalctl -u uavcast-web --since "1 hour ago"
```

A interface web também precisa dos serviços em segundo plano. Verifique-os da mesma forma: `uavcast-factory`, `mavlink-manager`, `uavcast-camera` e `redis-server`. A lista completa está em [Serviços e arquivos](https://docs.uavmatrix.com/pt/reference/services-and-files/).

## Verificação 3: porta 80 já em uso

Se outro servidor web estiver instalado no dispositivo, ele pode estar usando a porta 80. Descubra quem está escutando:

```bash
sudo ss -ltnp | grep ':80 '
```

Pare e desative o outro servidor (`sudo systemctl disable --now nginx`, por exemplo) e depois reinicie o `uavcast-web`.

## Verificação 4: a porta do servidor foi alterada

**Aplicação → Configurações → Porta do Servidor** move a interface web para outra porta, e o endereço passa a ser `http://<device-ip>:<port>/`. Se você não lembrar a porta, leia-a no dispositivo:

```bash
grep SERVER_PORT /etc/systemd/system/uavcast-web.service
```

## Verificação 5: todas as páginas vão para Aplicação

Isso é esperado até que uma licença esteja ativa no dispositivo. Ative-a em **Aplicação → Gerenciador de Licença**. Se falhar, veja [A licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/).

## Verificação 6: o instalador não terminou

Se `uavcast-web` não existir (`Unit uavcast-web.service could not be found`), a instalação parou cedo. Veja [A instalação falha](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/).

## Ainda sem sucesso?

Envie a saída de `systemctl status uavcast-web` e de `journalctl -u uavcast-web --since yesterday`, além de `/opt/uavcast-pro/installer.log`, para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionados: [Instalar o UAVcast-Pro](https://docs.uavmatrix.com/pt/get-started/installation/) · [Configurações da aplicação](https://docs.uavmatrix.com/pt/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/

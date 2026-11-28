# A instalação falha

> Corrija erros do instalador do UAVcast-Pro, como No installation candidate found ou failed dependencies: verifique o SO de 64 bits, a internet, o disco e o log do instalador.

Você executou `curl -fsSL https://install.uavmatrix.com | sudo bash` e ele parou com um erro, travou ou terminou sem uma interface web funcionando.

| O que você vê | Causa provável | Comece em |
| --- | --- | --- |
| No installation candidate for … found! | SO de 32 bits ou arquitetura não suportada | [Verificação 1](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/#check-1) |
| Failed to update package lists, ou Failed to install dependencies | Sem internet, ou configuração do apt quebrada | [Verificação 2](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/#check-2) |
| Demora muito em um Pi Zero 2 W | Pouca memória e armazenamento lento | [Verificação 3](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/#check-3) |
| Service failed to start | Um componente não conseguiu iniciar após a instalação | [Verificação 4](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/#check-4) |

## Verificação 1: sistema operacional de 64 bits

O UAVcast-Pro v6 precisa de um SO de 64 bits: arm64 ou amd64 (PCs x86). Em arm64, placas que não são Raspberry Pi (Jetson e outras placas ARM) precisam do UAVcast-Pro 6.5.3 ou posterior; instaladores mais antigos param com *Device is not a Raspberry Pi*.

```bash
dpkg --print-architecture   # must print arm64 or amd64
uname -m                    # aarch64 or x86_64
```

Se você vir `armhf`, `armv7l` ou `i686`, está em um SO de 32 bits. Grave o **Raspberry Pi OS (64-bit)** com o Raspberry Pi Imager e instale de novo. Os sistemas suportados são Raspberry Pi OS, Debian e Ubuntu; veja [Hardware compatível](https://docs.uavmatrix.com/pt/reference/supported-hardware/).

## Verificação 2: internet e apt

O instalador baixa o UAVcast-Pro e os pacotes do sistema, e instala o ZeroTier e o Tailscale.

1. Verifique o acesso à internet: `curl -I https://install.uavmatrix.com`.
2. Execute `sudo apt update` manualmente e corrija os erros que aparecerem, por exemplo um repositório de terceiros com chave expirada.
3. Execute o instalador de novo. É seguro executá-lo mais de uma vez.

## Verificação 3: placas de baixa potência

Em um Raspberry Pi Zero 2 W, a instalação leva bem mais tempo do que em um Pi 4 ou 5, e o instalador mostra uma estimativa de tempo. Deixe terminar. Use um cartão SD rápido e uma fonte estável: um reset por subtensão durante a instalação deixa uma instalação pela metade.

## Verificação 4: leia o log do instalador

O instalador grava tudo em `/opt/uavcast-pro/installer.log`.

```bash
sudo tail -n 100 /opt/uavcast-pro/installer.log
```

Observe as últimas linhas de erro. Se o instalador falhar antes de conseguir criar `/opt/uavcast-pro`, o log fica em `/tmp/uavcast-installer.log`.

## Instale uma versão específica

Para listar as versões disponíveis para a sua arquitetura, ou para instalar uma delas:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l          # list versions
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2  # install 6.5.2
```

## Ainda falhando?

Envie `/opt/uavcast-pro/installer.log`, a saída de `cat /etc/os-release` e `dpkg --print-architecture`, e o modelo da sua placa para **[support@uavmatrix.com](mailto:support@uavmatrix.com)**.

Relacionado: [Instale o UAVcast-Pro](https://docs.uavmatrix.com/pt/get-started/installation/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/

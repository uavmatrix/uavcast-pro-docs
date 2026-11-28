# Instalar o UAVcast-Pro

> Instale o UAVcast-Pro com um único comando em um sistema Raspberry Pi OS, Debian ou Ubuntu de 64 bits (arm64 ou amd64), depois abra a interface web e crie um usuário administrador.

Instale com um único comando

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

Execute no computador de bordo (Raspberry Pi OS, Debian ou Ubuntu de 64 bits, com internet). As etapas abaixo explicam o que ele faz e como preparar o dispositivo.

> Você precisa de uma licença do UAVcast-Pro para ativar o drone. Compre uma na loja da UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

O UAVcast-Pro é instalado com um único comando em qualquer sistema Linux de 64 bits baseado em Debian: Raspberry Pi OS, Debian ou Ubuntu, em arm64 ou amd64. O instalador baixa a versão mais recente, instala suas dependências e serviços e exibe o endereço da interface web ao terminar. O processo leva cerca de 10 minutos, ou cerca de 30 minutos em uma Raspberry Pi Zero 2 W, 2 ou 3.

## Antes de começar

- Um SO de 64 bits no computador companheiro. Verifique com `uname -m`: ele deve exibir `aarch64` ou `x86_64`.
- Pelo menos 500 MB livres no disco raiz (`df -h /`).
- Acesso à internet no dispositivo durante a instalação.
- SSH ou teclado e monitor no dispositivo, e um usuário com direitos de `sudo`.

## Passo 1: Gravar o sistema operacional

**Raspberry Pi**

1. Abra o [Raspberry Pi Imager](https://www.raspberrypi.com/software/) e escolha o modelo da sua Pi.
2. Escolha **Raspberry Pi OS (64-bit)**. A versão **Lite** é suficiente e deixa mais CPU disponível para o vídeo.
3. Abra as configurações de personalização do SO. Defina um hostname, um nome de usuário e senha, sua rede Wi-Fi e país, e ative o SSH.
4. Grave o cartão, coloque-o na Pi e ligue-a.

O Ubuntu Server 64 bits para Raspberry Pi também funciona.

**Outras placas arm64**

Grave a imagem de 64 bits do Ubuntu ou Debian do fabricante (por exemplo, o Ubuntu do JetPack na NVIDIA Jetson), conclua a configuração do primeiro boot e ative o SSH.

Placas arm64 que não são Raspberry Pi precisam do UAVcast-Pro 6.5.3 ou posterior; instaladores antigos param com *Device is not a Raspberry Pi*.

**PC x86-64**

Instale um Debian ou Ubuntu de 64 bits (Server ou Desktop). O instalador não verifica a versão da distribuição, então use uma versão atual e com suporte, por exemplo Ubuntu 22.04 LTS ou mais recente.

Em seguida, faça login por SSH e atualize o sistema:

```bash
sudo apt update && sudo apt full-upgrade -y
```

## Passo 2: Executar o instalador

No drone:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash
```

O instalador:

1. Detecta a arquitetura e baixa a versão correspondente para `/opt/uavcast-pro`.
2. Instala os pacotes de sistema de que precisa: NetworkManager, ModemManager, GStreamer, v4l-utils, Redis, Python e outros.
3. Em uma Raspberry Pi, libera a UART GPIO para o controlador de voo (remove o console serial de `cmdline.txt` e move o Bluetooth para fora da UART) e aumenta o pool de memória da câmera para configurações com duas câmeras. Seus arquivos originais `config.txt` e `cmdline.txt` são salvos antes.
4. Instala ZeroTier, Tailscale, mavlink-router e MediaMTX.
5. Instala e inicia os serviços do UAVcast-Pro.
6. Verifica se as ferramentas principais estão presentes e exibe o endereço web.

Ao terminar, você verá:

```text
✅ Installation completed successfully!

Please reboot your device to complete the installation.

To access the UAVcast-Pro web interface, open your browser and navigate to:
http://192.168.1.50
```

Reinicie para que as alterações da UART e da câmera tenham efeito:

```bash
sudo reboot
```

> **Deixe placas lentas terminarem**
>
> Em uma Pi Zero 2 W, a barra de progresso pode ficar parada por minutos enquanto o apt trabalha. Não inicie uma segunda instalação: o instalador se recusa a rodar duas vezes, e uma segunda cópia só deixa a primeira mais lenta. O log completo está em `/opt/uavcast-pro/installer.log`.

### Instalar uma versão específica

Liste as versões disponíveis para a sua arquitetura:

```bash
curl -fsSL https://install.uavmatrix.com | bash -s -- -l
```

Instale uma delas com `-b`:

```bash
curl -fsSL https://install.uavmatrix.com | sudo bash -s -- -b 6.5.2
```

Você também pode trocar de versão depois pela interface web. Veja [Atualizar o UAVcast-Pro](https://docs.uavmatrix.com/pt/get-started/updating/).

## Passo 3: Abrir a interface web

Em um computador na mesma rede, abra um navegador e acesse o endereço exibido pelo instalador, por exemplo `http://192.168.1.50`. A interface web roda na porta **80**.

Se você não souber o endereço:

- Tente o hostname que você definiu no Raspberry Pi Imager, por exemplo `http://raspberrypi.local`. Isso requer mDNS, que funciona na maioria das redes domésticas e no macOS, Linux e Windows 10 ou mais recente.
- Procure o dispositivo na lista de clientes conectados do seu roteador.
- No dispositivo, execute `hostname -I`.

A primeira página que você verá é **Aplicação**, porque o UAVcast-Pro ainda não tem licença. A barra lateral permanece acinzentada (*Recurso requer licença*) até que o dispositivo seja licenciado.

## Passo 4: Ativar sua licença

Em **Aplicação → Gerenciador de Licença**, cole sua chave em **Digite a Chave de Licença** e selecione **Validar**. O dispositivo precisa de acesso à internet para isso. O fluxo completo, as vagas de dispositivos e a transferência de uma licença estão em [Licenciamento e ativação](https://docs.uavmatrix.com/pt/get-started/license-activation/).

## Passo 5: Criar um usuário administrador

Uma instalação nova não tem **nenhum usuário nem login**: qualquer pessoa que consiga acessar a interface web tem acesso total de administrador. Crie uma conta de administrador antes de o drone ser conectado a uma rede compartilhada ou à internet.

1. Vá em **Users** na barra lateral (em **Gerenciamento**).
2. Selecione **Add User**.
3. Digite um **Username** (pelo menos 3 caracteres) e uma **Password** (pelo menos 6 caracteres). O primeiro usuário é sempre **Admin**.
4. Selecione **Create User**.

A partir de agora, a interface web pede login. As sessões duram 7 dias. Veja [Usuários e acesso](https://docs.uavmatrix.com/pt/uavcast-pro/users/) para contas somente leitura.

## O que é instalado

| Item | Local |
| --- | --- |
| Aplicação, binários, banco de dados (`uavcast.db`), registros | `/opt/uavcast-pro` |
| Log do instalador | `/opt/uavcast-pro/installer.log` |
| Serviços systemd | `uavcast-web`, `uavcast-factory`, `mavlink-manager`, `uavcast-camera`, `uavcast-ntrip`, `uavcast-dns`, `mediamtx`, `internet-check` |
| Configuração do roteador MAVLink | `/etc/mavlink-router/main.conf` (gerado pelo UAVcast-Pro, não edite) |

Verifique se o serviço web está em execução:

```bash
sudo systemctl status uavcast-web
```

## Desinstalar

O binário do instalador tem um modo de desinstalação. Ele para e remove todos os serviços do UAVcast-Pro, o banco de dados de configurações e os arquivos do programa em `/opt/uavcast-pro`, e remove o ZeroTier, o Tailscale e o Redis se foram instalados pelo UAVcast-Pro. Pacotes gerais como NetworkManager, ModemManager e GStreamer permanecem.

```bash
sudo /opt/uavcast-pro/factory/ApplicationInstaller --uninstall
```

A partir do UAVcast-Pro 6.5.3, as gravações de voo em `/opt/uavcast-pro/recordings` são mantidas. Adicione `--delete-recordings` para removê-las também, ou `--purge-deps` para remover ainda o ZeroTier, o Tailscale e o Redis instalados antes do UAVcast-Pro. Em versões anteriores, a desinstalação apaga a pasta `/opt/uavcast-pro` inteira, incluindo as gravações, então copie antes as gravações que quiser manter.

> **Desregistre a licença primeiro**
>
> Desinstalar não libera a vaga da licença. Desregistre o dispositivo em **Aplicação → Gerenciador de Licença** antes de apagá-lo; caso contrário, você não conseguirá liberar a vaga sem usar outro dispositivo. Veja [Licenciamento e ativação](https://docs.uavmatrix.com/pt/get-started/license-activation/#unregister-a-device).

## Atualizando a partir do UAVcast-Pro 4.x ou 5.x

A versão 6 é uma reescrita completa e não pode importar configurações das versões 4.x ou 5.x. Anote suas configurações de estação de controle terrestre, câmera e modem, grave um SO novo de 64 bits e instale a versão 6.

Se o instalador exibir *An older version of UAVcast-Pro has been detected at /opt/UAVcast-Pro*, remova-a primeiro. Isso apaga as configurações antigas:

```bash
sudo rm -rf /opt/UAVcast-Pro
```

## Se a instalação falhar

| Mensagem ou sintoma | Solução |
| --- | --- |
| *No installation candidate for … found!* | O SO é de 32 bits ou a arquitetura não é suportada. Verifique `uname -m` e grave novamente com uma imagem de 64 bits. |
| *Not enough free space. … need 500MB* | Libere espaço ou use um cartão maior. |
| *Another process is currently using the system package manager* | Uma atualização automática está em execução. Aguarde alguns minutos e execute o instalador novamente. |
| *Another installer is already running* | Aguarde o primeiro instalador terminar. |
| *Installation completed with errors* com um ✗ vermelho | Execute o instalador novamente. Se o problema se repetir, envie `/opt/uavcast-pro/installer.log` para [support@uavmatrix.com](mailto:support@uavmatrix.com). |
| A página web não carrega | Verifique `sudo systemctl status uavcast-web`, tente o IP em vez do hostname e confirme que nada mais usa a porta 80. |

Mais soluções: [A instalação falha](https://docs.uavmatrix.com/pt/troubleshooting/installation-fails/) e [A interface web não abre](https://docs.uavmatrix.com/pt/troubleshooting/web-interface-wont-open/).

Source: https://docs.uavmatrix.com/pt/get-started/installation/

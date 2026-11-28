# Colete logs para o suporte

> Baixe o arquivo de logs do UAVcast-Pro com o diagnostics.txt em Aplicação, Registros ou por SSH, e envie para o suporte da UAVmatrix com os detalhes certos.

Um único download de logs responde à maioria das perguntas que o suporte faria. Cada arquivo inclui os serviços de log que você escolher, mais um snapshot `diagnostics.txt`: versão, SO e placa, configurações, a configuração gerada do roteador de telemetria, os dispositivos seriais e quem os está usando, e os eventos de energia e USB do kernel. Senhas, chaves e tokens nunca são incluídos.

## Baixe pela interface web

1. Vá em **Aplicação** e role até **Registros**.
2. Na primeira lista, mantenha **Todos os Logs**, ou escolha o serviço que corresponde ao problema (veja a tabela).
3. Na segunda lista, escolha um intervalo de tempo que cubra o problema. O padrão é **Últimas 2 horas**.
4. Pressione **Baixar**. Seu navegador salva um arquivo `.zip`.

![Cartão Registros na página Aplicação, com a lista de logs em Todos os Logs, o intervalo em Últimas 2 horas e o botão Baixar](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/application--logging.webp)

*Aplicação → Registros com Todos os Logs e Últimas 2 horas selecionados.*

| Problema | Escolha na lista de logs |
| --- | --- |
| Link com o controlador de voo, sem heartbeat, sem telemetria | **Gerenciador Mavlink** |
| Câmera, vídeo, pré-visualização | **Servidor de Câmera** |
| Modem, celular | **Gerenciador de Modem** |
| ZeroTier, Tailscale | **Gerenciador de VPN** |
| RTK, NTRIP | **Cliente NTRIP** |
| Licença | **Gerenciador de Licença** |
| DNS Dinâmico | **Gerenciador de DNS** |
| Instalação | **Instalador da Aplicação** |
| Não tem certeza | **Todos os Logs** |

Somente administradores podem baixar logs. **Limpar Todos os Logs** apaga todos os arquivos de log e não pode ser desfeito, então baixe primeiro.

## Pela linha de comando

Se a interface web não abrir, colete os logs por SSH:

```bash
sudo tar czf ~/uavcast-logs.tar.gz /opt/uavcast-pro/logs /opt/uavcast-pro/installer.log
journalctl -u uavcast-web -u uavcast-factory -u mavlink-manager -u uavcast-camera --since "2 hours ago" > ~/uavcast-journal.txt
```

Copie os dois arquivos para o seu computador, por exemplo com `scp`.

## Envie para o suporte

Envie um e-mail para **[support@uavmatrix.com](mailto:support@uavmatrix.com)** e inclua:

- o arquivo de logs,
- a versão do seu UAVcast-Pro (mostrada na parte inferior da barra lateral),
- a placa, o SO, o controlador de voo, a câmera e o modem que você usa,
- o que você esperava, o que aconteceu e o que já tentou a partir destas páginas.

Você também pode perguntar no [Discord da UAVmatrix](https://discord.gg/xwqMTXh). Não publique arquivos de log em público: eles contêm endereços IP e nomes de dispositivos.

Relacionado: [Configurações da aplicação](https://docs.uavmatrix.com/pt/uavcast-pro/application-settings/)

Source: https://docs.uavmatrix.com/pt/troubleshooting/collect-logs/

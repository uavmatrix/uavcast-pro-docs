# Configurações da aplicação, registros e backups

> Altere a porta web e o idioma do UAVcast-Pro, baixe registros para suporte com o modo de depuração e faça backup, restaure ou redefina o banco de dados de configurações pela página Aplicação.

A página **Aplicação** reúne tudo o que diz respeito ao próprio UAVcast-Pro: a licença, as atualizações, as configurações da interface, o download de registros e o banco de dados de configurações. Ela fica visível apenas para administradores e é a única página que funciona antes de o dispositivo ser licenciado. Abra **Gerenciamento → Aplicação**.

![Página Aplicação com Gerenciador de Licença e Atualizar Aplicação à esquerda, e os cartões Configurações, Registros e Banco de Dados à direita](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/application.webp)

*Gerenciamento → Aplicação.*

| Cartão | Documentado em |
| --- | --- |
| **Gerenciador de Licença** | [Licenciamento e ativação](https://docs.uavmatrix.com/pt/get-started/license-activation/) |
| **Atualizar Aplicação** | [Atualizar o UAVcast-Pro](https://docs.uavmatrix.com/pt/get-started/updating/) |
| **Configurações**, **Registros**, **Banco de Dados** | Esta página |

## Configurações

| Configuração | Padrão | Valores | Observações |
| --- | --- | --- | --- |
| **Fazer um Tour** |  |  | Reinicia o tour guiado pela interface. |
| **Tema Escuro** | Ativado | Ativado, desativado | Salvo por navegador. Também no botão de tema na barra superior. |
| **Porta do Servidor** | `80` | 1–65535 | Porta da interface web. Veja abaixo. |
| **Idioma** | Idioma do navegador; caso contrário, English | English, Español, 简体中文, 繁體中文, Italiano, Nederlands, Polski, Português, Русский, Türkçe | Também no menu do usuário na parte inferior da barra lateral. |

### Alterar a porta da interface web

1. Digite a nova porta em **Porta do Servidor**.
2. Selecione **Enviar e reiniciar servidor**. Uma caixa de diálogo mostra a **Nova URL**, por exemplo `http://192.168.1.50:8080`.
3. Aguarde alguns segundos e abra a nova URL.

Favoritos e links para o endereço antigo deixam de funcionar. Uma porta alterada exibe o aviso *A porta do servidor foi alterada da porta padrão 80.* A partir do UAVcast-Pro 6.5.3, a porta é mantida quando você atualiza; versões anteriores a redefinem para 80.

## Registros

O UAVcast-Pro registra cada serviço separadamente. Baixe os registros quando algo der errado e envie-os ao suporte.

1. Ative o **Modo de Depuração** para ver mais detalhes. Reproduza o problema.
2. Em **Selecione logs para download**, mantenha **Todos os Logs** ou escolha um serviço.
3. Em **Selecione o intervalo de tempo**, escolha uma janela que cubra o problema (de **Últimos 10 minutos** até **Todo o período**).
4. Selecione **Baixar**. Você recebe um arquivo zip.
5. Envie-o por e-mail para [support@uavmatrix.com](mailto:support@uavmatrix.com) com uma breve descrição do que aconteceu. Depois, desative o **Modo de Depuração** novamente.

O download inclui um instantâneo `diagnostics.txt` (configurações, portas seriais, eventos de energia e USB) que agiliza o suporte.

| Registro | Cobre |
| --- | --- |
| **Mavlink Manager**, **Mavlink Publisher** | Link com o controlador de voo e roteamento para as estações de controle terrestre |
| **Camera Server**, **Camera Detector** | Pipeline de vídeo e detecção de câmeras |
| **Modem Manager**, **Modem Detector** | Conexão do modem e tentativas de APN |
| **VPN Manager** | ZeroTier e Tailscale |
| **NTRIP Client** | Correções RTK |
| **DNS Manager** | Atualizações do DNS Dinâmico |
| **License Manager** | Ativação e a verificação de licença a cada 4 horas |
| **Application Updater**, **Application Installer** | Atualizações e instalações |
| **Backend API Server** | A API interna |

**Limpar Todos os Logs** apaga todos os arquivos de log. Não é possível desfazer a ação; faça isso antes de reproduzir um problema se quiser um registro limpo. No drone, os registros ficam em `/opt/uavcast-pro/logs`.

Todas as páginas também têm um console **Registros de Ações** que mostra o registro ao vivo do serviço daquela página.

## Banco de Dados

Todas as configurações (estações de controle terrestre, controlador de voo, câmera, modem, VPN, NTRIP, usuários, painéis, injetores e dados de licença) ficam em um único banco de dados SQLite, `/opt/uavcast-pro/uavcast.db`.

| Ação | O que faz |
| --- | --- |
| **Fazer Backup do Banco de Dados** | Baixa o banco de dados como `uavcast_backup.db`. |
| **Restaurar Banco de Dados** | Envia um backup `.db` e substitui as configurações atuais, incluindo os usuários. |
| **Redefinir Banco de Dados** | Redefine as configurações de estações de controle terrestre, controlador de voo, câmera, VPN e DNS Dinâmico para os valores padrão. Usuários, licença, modem, NTRIP, configurações de gravação, painéis, injetores e o pareamento com o Fleet Manager são mantidos. Não é possível desfazer. |

Use backups para manter uma configuração que funciona antes de fazer alterações, ou para configurar um segundo drone da mesma forma. Reinicie após uma restauração para que todos os serviços iniciem com as configurações restauradas.

> **Restaurando em outro hardware**
>
> Os dados de licença do banco de dados estão vinculados ao dispositivo de origem. Após restaurar um backup em outro Raspberry Pi ou cartão SD, ative a licença no novo dispositivo. A restauração também traz os usuários e as senhas do backup.

Source: https://docs.uavmatrix.com/pt/uavcast-pro/application-settings/

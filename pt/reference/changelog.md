# Registro de alterações

> O que mudou em cada versão v6 do UAVcast-Pro, desde a reescrita em Rust na v6.0.0 até gravação, revisão de voo, áudio, RTK via NTRIP e Fleet Manager.

Todas as versões v6 do UAVcast-Pro, da mais recente para a mais antiga. Atualize em **Aplicação → Atualizar Aplicação** ou execute o instalador novamente.

## v6.5.2 (21 nov 2026)

- Corrigido: ativar a câmera podia exibir **"Permissões insuficientes"**.
- Corrigido: a câmera parava quando a **visualização ao vivo** era desativada com a gravação ligada. O vídeo para a estação de controle terrestre agora continua em execução, e a visualização e a gravação voltam sozinhas quando o servidor de vídeo estiver disponível novamente.
- Corrigido: o serviço da câmera podia travar após um reinício automático do vídeo, até que o serviço fosse reiniciado.

## v6.5.1 (16 nov 2026)

**Novidades**

- **Gravação da câmera**: grave a câmera 1 e a câmera 2 com um clique no mapa de voo, ou automaticamente enquanto o drone estiver armado. A gravação usa o fluxo que já está codificado, por isso não consome CPU extra e nunca interrompe o vídeo ao vivo para a estação de controle terrestre.
- **Gerenciamento de armazenamento**: grave no disco interno ou em um pendrive ou SSD USB, mantenha uma reserva de espaço livre e remova automaticamente as gravações mais antigas antes que o disco fique cheio (ou pare a gravação).
- **Página Câmera → Gravações**: cada voo com seu vídeo e sua telemetria, miniaturas, um selo de ao vivo durante a gravação, downloads em MP4 e exclusão (somente do vídeo, ou do vídeo e da telemetria).
- **Player de revisão de voo**: o vídeo de um voo junto com o trajeto no mapa, a visão de cabine e os dados de voo em uma única linha do tempo, com marcadores de armar/desarmar e de modo de voo, velocidades de 0,5× a 4× e layouts de duas câmeras.
- Configuração **Gravar telemetria**: enquanto armado (padrão), sempre que conectado ou desligado.
- Botão **ARMAR / DESARMAR** no mapa de voo, sempre com confirmação. As próprias verificações de segurança do controlador de voo continuam decidindo.
- Lista de **Mensagens** no mapa de voo: todas as mensagens do controlador de voo, com os problemas atuais de pré-armamento exibidos separadamente. Mensagens que chegam em rajadas não são mais perdidas.
- **APN automático**: deixe o APN vazio e o UAVcast-Pro encontra o correto para o seu SIM e o memoriza.

**Melhorias**

- **Limpar missão** agora exclui a missão do controlador de voo e aguarda a confirmação; antes, apenas a ocultava no mapa.
- A altitude **AGL** agora mostra a altura acima do ponto de decolagem (antes mostrava a altura acima do nível do mar).
- Visão de cabine redesenhada para que nenhum texto se sobreponha em qualquer tamanho de painel; o painel lateral tem uma alça visível para redimensionamento.
- Janela da câmera redesenhada: mantém o formato original da câmera (sem barras pretas), com controles que aparecem ao passar o mouse.
- Menor latência de vídeo no Raspberry Pi 5: cerca de metade da CPU, sem buffer de quadros e taxa de quadros completa em câmeras CSI.
- A visualização ao vivo se recupera sozinha se o servidor de vídeo reiniciar.
- **Usuários somente leitura** podem ver tudo, mas não podem mais controlar o drone ou as gravações.
- Conexão automática do modem corrigida no Ubuntu e em outros sistemas com netplan; um modem conectado agora se conecta automaticamente por padrão.
- Conexões de modem mais robustas, inclusive as de modems que se conectaram sem obter um endereço de internet.
- A página do modem mostra suas informações assim que é aberta.
- A versão instalada agora aparece na barra lateral.

## v6.5.0 (9 nov 2026)

- Novo **áudio da câmera**: som de um microfone USB ou do microfone embutido de uma câmera USB, codificado em Opus. O microfone da câmera é escolhido automaticamente quando ela tem um.
- O áudio é transportado na **visualização ao vivo** (ative o som do player para ouvir) e pode ser enviado para cada estação de controle terrestre como um fluxo RTP/Opus separado, na **Porta de Vídeo + 2**, para receptores GStreamer ou VLC.
- Novo **indicador de áudio** na página Câmera: medidor de nível ao vivo, o dispositivo ativo e um motivo em linguagem simples caso o áudio não tenha podido iniciar. Um microfone com falha nunca interrompe o vídeo.
- Selecionar uma câmera que não consegue entregar a resolução configurada não interrompe mais o vídeo: o fluxo usa o maior tamanho suportado, e o registro informa qual resolução escolher.
- Um erro fatal de vídeo agora reinicia o pipeline automaticamente.
- **Recuperação mais rápida do NTRIP/RTK**: após uma breve queda de internet, as correções são retomadas em segundos, em vez de até cerca de 18 minutos. Uma conexão silenciosa com o caster é detectada em até 15 s e reconectada.
- **A opção de telemetria agora controla totalmente o acesso**: o roteador de telemetria não aceita mais conexões TCP na porta 5760, então uma estação de controle terrestre com telemetria desativada não recebe dados. Se você se conectou por TCP 5760, adicione seu PC como estação de controle terrestre e conecte-se por UDP.
- Desativar **Ativar Endpoint** em uma estação de controle terrestre agora também interrompe o vídeo e o áudio dela, não apenas a telemetria.
- As camadas claro e escuro do mapa de voo não exibem mais "chave de API necessária".
- Rótulos de altitude renomeados para termos aeronáuticos: **REL → AGL** e **MSL → AMSL**.
- Ações de serviço (alternar a visualização ao vivo, iniciar e parar a câmera) que falhavam em instalações de desenvolvimento foram corrigidas.

## v6.4.3 (2 out 2026)

- **Conexão com o controlador de voo reconstruída para mais confiabilidade**: o link se reconecta sozinho após uma reinicialização do controlador de voo, uma falha na USB ou uma energização tardia.
- Nova **detecção automática de porta e taxa de transmissão** (o padrão, também após a atualização): o UAVcast-Pro encontra o controlador de voo, memoriza o que funcionou e o acompanha se o nome do dispositivo mudar.
- Novo botão **Detectar automaticamente** e **Verificação de conexão** ao vivo na página Controlador de Voo, mostrando passo a passo se o dispositivo é encontrado, se os dados estão chegando e se a telemetria chega a cada estação de controle terrestre, com uma correção em linguagem simples para o primeiro problema encontrado.
- Telemetria e vídeo **iniciam ao ligar, sem esperar pela internet**, e começam a transmitir assim que a conexão estiver ativa, não importa quanto tempo o modem leve.
- Cartão de status do painel redesenhado, com um resumo geral de saúde, tipo de fixação de GPS, bateria, sinal celular, tráfego das estações de controle terrestre e um alerta de subtensão da fonte de alimentação.
- Os **downloads de registros** agora incluem um snapshot `diagnostics.txt` (configurações, portas seriais, eventos de energia e USB).
- Seleção do tipo de controlador removida (somente ArduPilot); as configurações de conexão são aplicadas instantaneamente, sem reinicialização.

## v6.4.2 (26 jul 2026)

- Instalações mais confiáveis em placas de baixo consumo (Pi Zero 2 W), com uma estimativa de tempo realista.
- Registro completo e persistente em todos os serviços, incluído no arquivo de registros para download, e registro de conexão com o controlador de voo mais claro.
- Corrigido: um endereço IP de destino ausente ou inválido podia quebrar a conexão com o controlador de voo. Esses endereços agora são rejeitados na interface e ignorados pelo roteador de telemetria.

## v6.4.1 (9 jul 2026)

- Nova **transmissão de duas câmeras**: transmita duas câmeras ao mesmo tempo, cada uma com sua própria resolução, FPS e taxa de bits.
- Novo **indicador de carga da CPU** na página Câmera, que avisa quando a codificação H.264 por software se aproxima do limite.
- O **mapa de voo** mostra uma janela de vídeo por fluxo ativo, que você pode ocultar como abas na parte inferior do mapa.
- O instalador resolve os pacotes de câmera renomeados (`rpicam-apps` → `rpicam-apps-core`) e os plugins do GStreamer, corrigindo instalações em versões mais recentes do Raspberry Pi OS e do Debian.
- A transmissão CSI usa como alternativa um pipeline GStreamer x264 quando o rpicam-apps não tem suporte a H.264 (Raspberry Pi OS Lite / Debian trixie no Pi 5).
- Transmissão de várias câmeras e transmissão dupla iniciam de forma confiável em todos os SOs suportados, com recuperação automática se o fluxo travar.
- Resoluções não suportadas não impedem mais a câmera de iniciar (inclusive com **Igualar Resolução da Câmera 1**): a captura usa uma alternativa e a saída é redimensionada.

## v6.4.0 (20 mai 2026)

- Nova página **Fluxos de Dados**: painéis de telemetria personalizados com gráficos, indicadores, linhas compactas e mosaicos numéricos vinculados a qualquer valor MAVLink ou sinal `NAMED_VALUE_FLOAT`. Vários painéis, layout com arrastar e redimensionar, e histórico mantido entre recarregamentos da página.
- Novos **Injetores de telemetria** (Controlador de Voo → Injetores): enviam dados de sensores externos para o fluxo MAVLink por HTTP, UDP ou serial, como `NAMED_VALUE_FLOAT` / `NAMED_VALUE_INT`. Os listeners iniciam na inicialização, sem a interface web aberta.
- Nova aba **NTRIP / RTK**: conecta a um caster NTRIP, navega pelos seus mountpoints e transmite correções RTCM para o controlador de voo, inclusive casters TLS.
- Obrigado a Bobby Russell pela solicitação de recurso e pelo feedback dos seus voos de balão de alta altitude, que inspiraram os Fluxos de Dados e os injetores.

## v6.3.2 (13 abr 2026)

- Atualizações de dependências por segurança e desempenho (Vite, Axios, bibliotecas do backend e do frontend, crates do Rust).

## v6.3.1 (20 mar 2026)

- Corrigido o instalador no Raspberry Pi Compute Module.
- Mais opções de taxa de transmissão para a telemetria serial.
- Melhor tratamento de erros e feedback.
- Atualizações de dependências.

## v6.3.0 (19 fev 2026)

- Novo **Fleet Management**: conecte dispositivos UAVcast-Pro ao Fleet Manager para monitorar e gerenciar toda a frota a partir de um único lugar.
- Visual consistente entre o UAVcast-Pro, o Fleet Manager e a loja.
- Visualização ao vivo de pipelines personalizados com fluxos RTSP na página Câmera.

## v6.2.3 (12 jan 2026)

- Várias câmeras CSI aparecem cada uma como um dispositivo separado (por exemplo "Raspberry Pi Camera 0 - imx219" e "Raspberry Pi Camera 1 - imx708").
- As resoluções e o FPS máximo das câmeras CSI são detectados a partir do sensor conectado.

## v6.2.2 (5 jan 2026)

- Categorias na barra lateral.
- Corrigida a restauração do aplicativo a partir de um backup do banco de dados.
- Ícones do mapa de voo aprimorados.
- Link para o registro de alterações no cartão de atualização.
- Corrigido o salvamento de gravações na pasta errada.
- O instalador adiciona `rpicam-apps` no Ubuntu e no Debian em Raspberry Pi para câmeras CSI, e aumenta a memória CMA (128 MB → 512 MB) em `config.txt` para configurações com várias câmeras.
- Corrigida a troca manual de câmera após desativar a troca por canal RC.
- Corrigido o carregamento de dados MAVLink nas abas Rádio e Inspetor sem recarregar a página.

## v6.2.1 (29 dez 2025)

- Idioma chinês (tradicional).
- Validação de licença aprimorada; alguns usuários não conseguiam desregistrar dispositivos antigos.

## v6.2.0 (20 dez 2025)

- **Suporte a arm64 e amd64**: o UAVcast-Pro não está mais limitado a Raspberry Pi e roda em NVIDIA Jetson, computadores x86/x64 e outros dispositivos arm64/amd64.

## v6.1.0 (7 dez 2025)

- **Suporte a duas câmeras** com troca instantânea pela interface ou por um canal RC (canais 1–18).

## v6.0.5

- Corrigido: a porta de telemetria não era salva quando era diferente de 14550.
- Corrigidos conflitos de nome de endpoint com vários destinos no mesmo IP e portas diferentes.

## v6.0.4

- Suporte a todos os tipos de veículo ArduPilot, inclusive VTOL.
- Tratamento de conexão MAVLink mais estável.

## v6.0.3

- Nova página **Análise de Voo** com dados MAVLink em gráficos.
- Gravação de MAVLink em arquivo para análise.
- Permissões mais restritas para usuários somente leitura.

## v6.0.2

- O ID de sistema MAVLink e a versão do MAVLink são detectados a partir do controlador de voo.

## v6.0.1

- Instalador mais confiável em dispositivos com poucos recursos, como o Raspberry Pi Zero 2 W.
- Configuração da UART aprimorada no Pi Zero 2 W.

## v6.0.0

- Versão principal: o backend foi reescrito em Rust para melhor desempenho e menor uso de recursos, e o pacote ficou cerca de 70% menor.
- Novas páginas **Mapa de Voo**, **Planejador de Missões**, **Inspetor MAVLink** e **Rádio**.
- Nova configuração de **prioridade de rede** para escolher entre Wi-Fi e modem.
- Novo **Gerenciamento de Usuários** com funções.
- Novo tratamento de câmera e visualização ao vivo baseado no MediaMTX.
- A v6 usa um novo banco de dados: configurações das versões v4 e v5 não podem ser importadas.

Source: https://docs.uavmatrix.com/pt/reference/changelog/

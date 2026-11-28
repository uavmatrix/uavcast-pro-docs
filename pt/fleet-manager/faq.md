# Perguntas frequentes do Fleet Manager

> Respostas para as perguntas comuns sobre o Fleet Manager: limites de drones, licenças, VPN, estações de controle terrestre, ArduPilot e PX4, retenção de dados e mudança de drones de organização.

### O que preciso para usar o Fleet Manager?

Uma conta na UAVmatrix e drones com o UAVcast-Pro e uma licença ativada. A licença de cada drone precisa pertencer a um membro da sua organização. Veja [Licenças e assentos](https://docs.uavmatrix.com/pt/fleet-manager/licenses/).

### O Fleet Manager tem custo extra?

Não. O Fleet Manager está incluído na sua licença do UAVcast-Pro. Não há assinatura separada, e os membros da equipe não pagam nada.

### Quantos drones posso gerenciar?

O próprio Fleet Manager não define limite. Cada drone precisa de sua própria ativação de licença do UAVcast-Pro, então o número de drones depende das licenças e dos slots de dispositivos que você possui.

### Os membros da equipe precisam de licença?

Não. Convide quantos Admins e Viewers forem necessários. Veja [Convide sua equipe](https://docs.uavmatrix.com/pt/fleet-manager/team/).

### Quais funções existem?

**Owner**, **Admin** e **Viewer**. Não existe a função "Member". Veja [Funções e permissões](https://docs.uavmatrix.com/pt/fleet-manager/team/roles-and-permissions/).

### De onde vem o código de pareamento?

Do drone. No UAVcast-Pro, abra **Fleet Management → Connect to Fleet Manager**. Ele mostra um código de 8 dígitos válido por 5 minutos. Você digita esse código no Fleet Manager, em **Fleet → Pair Device**. Veja [Adicione seu primeiro drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/).

### O Fleet Manager funciona em 4G/LTE?

Sim. O drone se conecta ao Fleet Manager na porta TCP 8883, então funciona atrás do NAT da operadora, sem IP público. A operadora não pode bloquear a porta 8883.

### Preciso da VPN?

Só para enviar vídeo e telemetria dos drones às estações de controle terrestre pelo Fleet Manager. O mapa, a telemetria, os comandos, as missões, o terminal e o acesso remoto ao UAVcast-Pro funcionam sem ela. Veja [Rede e VPN](https://docs.uavmatrix.com/pt/fleet-manager/network/).

### Uma estação de controle terrestre pode receber vários drones?

Sim. Cada [vinculação de fluxo](https://docs.uavmatrix.com/pt/fleet-manager/network/stream-bindings/) recebe seu próprio bloco de portas nessa estação, com espaço para uma segunda câmera e áudio. O primeiro drone usa 5600 / 14550.

### Posso continuar usando minha própria rede ZeroTier ou Tailscale?

Sim, se você não precisar das vinculações de fluxo do Fleet Manager. Você pode recusar a VPN ao parear. Se aceitar, um drone que já está em uma rede Tailscale é movido para a rede da sua organização. Um drone em uma rede ZeroTier mantém essa rede e entra também na rede da organização; a ZeroTier só é deixada quando você desparear o drone.

### Funciona com ArduPilot e PX4?

O Fleet Manager funciona com qualquer controlador de voo MAVLink com o qual o UAVcast-Pro se comunique, ArduPilot ou PX4: o mapa ao vivo, a telemetria, o status, o terminal e as vinculações de fluxo são os mesmos. Os controles de modo de voo usam os modos do ArduPilot para Copter, Plane, Rover e Sub, e a lista de comandos de missão segue a nomenclatura do ArduPilot. Por isso, no PX4, altere os modos e planeje as missões pela sua estação de controle terrestre.

### Posso pilotar um drone só pelo Fleet Manager?

O Fleet Manager pode alterar modos, armar e iniciar, pausar e parar missões. Ele não foi feito para controle manual com os sticks. Mantenha sempre um piloto com uma estação de controle terrestre ou um transmissor RC no controle, e siga as regras locais da sua região.

### Por quanto tempo o histórico de voos é mantido?

Até 1 ano, por padrão. Owners e Admins podem reduzir esse prazo para 7, 14, 30, 60 ou 90 dias, ou 6 meses. Veja [Histórico de voos](https://docs.uavmatrix.com/pt/fleet-manager/map/flight-history/#how-long-history-is-kept).

### Posso exportar os registros de voo?

Não por enquanto. O Fleet Manager reproduz os voos no mapa, mas não exporta arquivos nem armazena `.tlog`, DataFlash ou vídeo.

### O Fleet Manager envia alertas por e-mail?

Ainda não. O status é mostrado em tempo real no mapa, na lista da frota e nas páginas dos UAVs. Veja [Indicadores de status e notificações](https://docs.uavmatrix.com/pt/fleet-manager/alerts-and-status/).

### O que acontece quando um drone perde a conexão?

Depois de 20 segundos sem dados, ele aparece como **OFFLINE** e se reconecta sozinho quando o link voltar. Os failsafes do próprio controlador de voo decidem o que a aeronave faz; o Fleet Manager não envia nenhum comando quando a conexão é perdida.

### Como movo um drone para outra organização?

Remova o drone da organização atual (isso exclui o histórico dele ali) e depois pareie-o na nova organização. Veja [Remover ou transferir um drone](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/).

### Comprei licenças com outro e-mail. E agora?

Convide esse e-mail para a organização ou peça ao suporte para adicioná-lo como e-mail extra de licença na sua conta. Veja [Licenças compradas com outro e-mail](https://docs.uavmatrix.com/pt/fleet-manager/licenses/#licenses-bought-with-another-email).

### Existe aplicativo para celular?

Existe uma [visualização Lite](https://docs.uavmatrix.com/pt/fleet-manager/lite-view/), adaptada para celular, no navegador.

### Meus dados estão seguros?

Cada drone tem seu próprio certificado de cliente TLS, cada organização tem sua própria VPN criptografada, e as funções são aplicadas no servidor. Veja [Segurança e privacidade](https://docs.uavmatrix.com/pt/fleet-manager/security/).

Source: https://docs.uavmatrix.com/pt/fleet-manager/faq/

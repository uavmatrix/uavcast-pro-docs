# Licenciamento e ativação

> Como comprar uma licença do UAVcast-Pro, ativá-la em um drone, verificar as vagas de dispositivos, renová-la e movê-la para um novo Raspberry Pi ou cartão SD desregistrando o dispositivo antigo.

O UAVcast-Pro precisa de uma chave de licença ativada em cada drone. Você compra uma licença na loja da UAVmatrix, cola a chave em **Aplicação → Gerenciador de Licença** no drone e seleciona **Validar**. Cada licença tem um número de vagas de dispositivos. Ativar um drone usa uma vaga; desregistrá-lo libera a vaga para outro drone.

> Você precisa de uma licença do UAVcast-Pro para ativar o drone. Compre uma na loja da UAVmatrix.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

## Comprar uma licença

As licenças são vendidas em [uavmatrix.com/products](https://uavmatrix.com/products/). Toda licença inclui atualizações durante todo o seu período e o [Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/), incluindo sua VPN para acessar o drone via 4G.

| Plano | Vagas de dispositivos | Validade |
| --- | --- | --- |
| Basic | 1 | 1 ano |
| Silver | 2 | 1 ano |
| Gold | 4 | 2 anos |

A página da loja sempre mostra os planos e preços atuais. Não há licença de teste gratuita.

Após o pagamento, você recebe um e-mail de confirmação do pedido com a **chave de licença**, formada por cinco grupos de quatro caracteres.

A chave também fica na sua conta da loja, em **Licenças**, com as vagas de dispositivos e a data de expiração.

> **O período da licença começa na primeira ativação**
>
> Uma licença comprada hoje e ativada no mês que vem expira um período após a data de ativação, e não após a data da compra.

## Ativar a licença em um drone

O drone precisa de acesso à internet durante a ativação (Wi-Fi, Ethernet ou modem).

1. Abra a interface web do UAVcast-Pro. Um dispositivo sem licença sempre abre em **Aplicação**.
2. Em **Gerenciador de Licença**, cole a chave em **Digite a Chave de Licença**.
3. Selecione **Validar**. Você verá *Licença ativada com sucesso* e o restante da barra lateral será desbloqueado.

![Gerenciador de Licença do UAVcast-Pro mostrando uma licença ativa com nome registrado, dispositivos permitidos e restantes, data de expiração e a tabela de dispositivos ativados](https://docs.uavmatrix.com/pt/img/screenshots/uavcast-pro/application--license-activated.webp)

*Aplicação → Gerenciador de Licença após a ativação. O dispositivo atual aparece como Atual em Dispositivos Ativados.*

**Detalhes da Licença** mostra:

| Campo | Significado |
| --- | --- |
| **Nome Registrado** | A conta da loja à qual a licença pertence. |
| **Status da Licença** | **Ativa**, **Inativa** ou **Expirada**. |
| **Dispositivos Permitidos** | Total de vagas de dispositivos. |
| **Dispositivos Restantes** | Vagas livres. |
| **Data de Ativação** / **Data de Expiração** | Quando o período da licença começou e quando termina. |

**Dispositivos Ativados** lista todos os drones desta licença com seu **Nome do Dispositivo**, **Hostname** e **Data de Ativação**. O drone em que você está é marcado como **Atual**. Selecione **Editar** para dar ao dispositivo um nome que você reconheça.

### Erros de ativação

| Mensagem | O que fazer |
| --- | --- |
| *Limite de ativações atingido. Desative outro dispositivo primeiro ou faça upgrade da sua licença.* | Todas as vagas estão em uso. [Desregistre um dispositivo](https://docs.uavmatrix.com/pt/get-started/license-activation/#unregister-a-device) ou adicione vagas. |
| *Chave de licença inválida* | Verifique se há erros de digitação ou espaços extras. Copie a chave da sua conta na loja. |
| *Licença já ativada neste dispositivo* | Nada a fazer. Este dispositivo já tem uma vaga (por exemplo, após uma reinstalação no mesmo cartão SD). |
| *Erro de rede! Não foi possível obter os detalhes da licença…* | O dispositivo não tem acesso à internet. Verifique **Redes** e tente novamente. |

## Como a licença é verificada

- O drone verifica a licença com o servidor de licenças da UAVmatrix a cada **4 horas**.
- Se o servidor não puder ser acessado, o drone mantém o último status conhecido. Você pode voar sem nenhuma conexão com a internet; nada é bloqueado enquanto você está offline.
- Um dispositivo é identificado pelo número de série da CPU e pelo número de série do disco de boot (cartão SD ou SSD). Reinstalar na mesma Pi e no mesmo cartão mantém a mesma identidade e a mesma vaga. Um novo cartão SD ou SSD conta como um **novo dispositivo**.
- Os dados da licença no drone são criptografados com essa identidade; portanto, um [backup do banco de dados](https://docs.uavmatrix.com/pt/uavcast-pro/application-settings/#database) restaurado em outro hardware exige que a licença seja ativada novamente.

## Desregistrar um dispositivo

Desregistrar libera uma vaga imediatamente. Você pode desregistrar **qualquer** dispositivo da licença a partir de **qualquer** drone em que a licença esteja ativa, e não apenas do drone em que você está.

1. Vá em **Aplicação → Gerenciador de Licença → Dispositivos Ativados**.
2. Encontre o dispositivo e selecione **Desregistrar**. Você verá *Dispositivo desregistrado com sucesso*.

Se você desregistrar o drone em que está trabalhando, ele ficará sem licença, e a interface web ficará restrita à página **Aplicação** até que você ative uma chave novamente.

> **Não é possível desregistrar pela loja**
>
> A loja mostra os dispositivos registrados, mas não consegue removê-los. Desregistre pelo UAVcast-Pro em um dos dispositivos da licença. Se todos os dispositivos da licença forem perdidos ou apagados, envie um e-mail para [support@uavmatrix.com](mailto:support@uavmatrix.com) com sua chave de licença.

## Mover para um novo hardware

Use isto quando você trocar a Pi, substituir o cartão SD ou passar de uma bancada de testes para a aeronave.

1. No dispositivo **antigo**, vá em **Aplicação → Gerenciador de Licença** e selecione **Desregistrar** ao lado dele. Faça isso antes de apagar o cartão.
2. Instale o UAVcast-Pro no novo hardware. Veja [Instalação](https://docs.uavmatrix.com/pt/get-started/installation/).
3. Ative a mesma chave no novo dispositivo.

Se o dispositivo antigo estiver inoperante, desregistre-o a partir de outro drone da mesma licença ou entre em contato com o suporte.

## Renovar ou fazer upgrade

Na sua conta da loja, abra a licença e selecione **Opções de upgrade**:

- **Estender assinatura** adiciona outro período. Se a licença ainda estiver válida, o novo período é somado à data de expiração atual; se já tiver expirado, começa na data da renovação. A chave permanece a mesma.
- **Adicionar dispositivos** adiciona vagas à licença. Uma licença expirada precisa ser renovada primeiro.
- **Fazer upgrade de plano** muda a licença para um plano com mais vagas.

O drone obtém a nova data de expiração e as novas vagas na próxima verificação, em até 4 horas. Para atualizar imediatamente, selecione **Alterar** no **Gerenciador de Licença**, digite a mesma chave e selecione **Validar**.

## Quando uma licença expira

> **Uma licença expirada bloqueia o UAVcast-Pro**
>
> Quando uma licença expira, o UAVcast-Pro não pode mais ser usado em nenhum dos seus drones. Ele não continua funcionando na versão instalada.

Quando o servidor de licenças informa que a licença expirou, o drone se marca como sem licença: a interface web só abre **Aplicação**, e telemetria, vídeo, NTRIP e DNS Dinâmico param na próxima reinicialização dos seus serviços. Renove a licença antes da data de expiração para evitar interrupções e valide a chave novamente no drone (ou aguarde a próxima verificação, em até 4 horas) para desbloqueá-lo.

## Licenças e Fleet Manager

O Fleet Manager está incluído na sua licença do UAVcast-Pro e usa a mesma licença. Um drone só pode ser pareado com uma organização se a licença dele pertencer a um membro dessa organização. Se você comprou a licença com um e-mail diferente daquele com o qual entra no Fleet Manager, adicione esse e-mail no Fleet Manager (veja [Licenças no Fleet Manager](https://docs.uavmatrix.com/pt/fleet-manager/licenses/)). Veja [Parear um drone com o Fleet Manager](https://docs.uavmatrix.com/pt/uavcast-pro/fleet-pairing/).

Problemas de ativação: veja [Falha na ativação da licença](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/).

Source: https://docs.uavmatrix.com/pt/get-started/license-activation/

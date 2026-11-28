# Configure sua organização

> Entre no Fleet Manager com sua conta UAVmatrix, crie a organização à qual seus drones e sua equipe pertencem, e alterne, renomeie ou exclua essa organização.

Tudo no Fleet Manager pertence a uma organização: drones, missões, a rede VPN, as vinculações de fluxo e os membros da equipe. Crie uma antes de parear o seu primeiro drone.

## Entre

O Fleet Manager não tem senha separada. Ele faz o seu login com a sua conta UAVmatrix, a mesma que você usa em [uavmatrix.com](https://uavmatrix.com/) para comprar e gerenciar licenças do UAVcast-Pro.

1. Acesse [fleet-manager.uavmatrix.com](https://fleet-manager.uavmatrix.com/) e selecione **Sign In** (ou **Get Started**).
2. Entre na página da UAVmatrix para a qual você for enviado. Se ainda não tiver uma conta, crie-a ali.
3. Você volta ao **Dashboard** do Fleet Manager.

> **Entre com o e-mail que é proprietário das suas licenças**
>
> O Fleet Manager só aceita um drone quando a licença do UAVcast-Pro dele pertence a um membro da organização, comparada pelo e-mail. Entrar com a conta com a qual você comprou as licenças evita uma solicitação de suporte depois. Consulte [Licenças](https://docs.uavmatrix.com/pt/fleet-manager/licenses/).

Os dados do perfil (nome, e-mail e senha) são gerenciados na sua conta UAVmatrix, não no Fleet Manager. **Settings → Profile** leva até lá.

## Crie a organização

1. Abra o seletor de organização no topo da barra lateral e selecione **Create organization**. Se você ainda não tiver uma organização, páginas como **Fleet** e **Network** também mostram **No Organization Yet** com um botão **Create Organization**.
2. Digite um **Organization Name** (de 2 a 50 caracteres), por exemplo o nome da sua empresa ou "Survey Operations North". Adicione uma **Description (optional)**, se quiser.
3. Selecione **Create**.

![Caixa de diálogo Create Organization com os campos Organization Name e Description](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/onboarding--create-organization.webp)

*Caixa de diálogo Create Organization, preenchida com um nome de empresa, como Nordic Aerial Survey AS.*

Você se torna o **Owner** da organização. O Fleet Manager também cria, em segundo plano, uma rede VPN privada para a organização. Ela fica desativada até você [habilitar a VPN](https://docs.uavmatrix.com/pt/fleet-manager/network/).

> **Uma organização por proprietário**
>
> Cada usuário pode criar (ser dono de) uma organização. Se você tentar criar uma segunda, o Fleet Manager responde **You already own an organization**. Você ainda pode ser Admin ou Viewer em qualquer número de outras organizações, por exemplo de um cliente ou de um parceiro.

## Alterne entre organizações

Se você pertencer a mais de uma organização, o seletor no topo da barra lateral as lista em **Organizations**. A organização escolhida define o que **Fleet**, **Fleet Map**, **Missions**, **Network** e o painel mostram. O Fleet Manager lembra da sua escolha neste navegador.

![Seletor de organização aberto na barra lateral, listando duas organizações](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/dashboard--organization-switcher.webp)

*Seletor de organização aberto, listando Nordwind Aerial Services e Nordwind R&D Sandbox.*

## Renomeie ou exclua a organização

Acesse **Settings → Organizations**. A aba lista as organizações em que você é Owner ou Admin.

- **Renomear ou alterar a descrição:** Owner ou Admin. Edite **Name** ou **Description** e selecione **Save Changes**.
- **Excluir:** somente Owner. Selecione **Delete Organization** e confirme. Isso remove todos os drones, o histórico de telemetria, as missões, as vinculações de fluxo e as participações na equipe, e não pode ser desfeito.

![Aba Organizations das configurações com nome, descrição e botão Delete Organization](https://docs.uavmatrix.com/pt/img/screenshots/fleet-manager/settings--organizations.webp)

*Settings → Organizations para o Owner, com Save Changes e Delete Organization.*

> **Desparear os drones antes de excluir a organização**
>
> Excluir a organização não avisa os drones. Eles continuam tentando se reconectar até que você selecione **Disconnect from Fleet** no UAVcast-Pro em cada um. Remova os drones antes, pela página de cada UAV (consulte [Remova ou transfira um drone](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/)), para que o Fleet Manager os desparear por você.

Para transferir a organização para outra pessoa, [transfira a propriedade](https://docs.uavmatrix.com/pt/fleet-manager/team/#transfer-ownership).

## Próximos passos

- [Adicione seu primeiro drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/)
- [Convide sua equipe](https://docs.uavmatrix.com/pt/fleet-manager/team/)

Source: https://docs.uavmatrix.com/pt/fleet-manager/set-up-organization/

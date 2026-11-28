# Licenças e vagas

> Como as licenças do UAVcast-Pro e os Device Slots determinam quais drones você pode parear no Fleet Manager e como usar licenças compradas com outro e-mail.

O Fleet Manager está incluído na sua licença do UAVcast-Pro. Ele não tem assinatura, vagas ou planos próprios. O que você pode parear é definido pelas suas licenças do UAVcast-Pro da [loja UAVmatrix](https://uavmatrix.com/):

- **Drones:** todo drone pareado executa o UAVcast-Pro com uma licença ativada. Cada ativação usa um dos **Device Slots** da licença na loja ("2 of 5 device slots used"). Precisa de mais drones? Compre mais licenças ou slots. **Fleet → Need more devices? → View Plans** leva você à loja.
- **Membros da equipe:** sem custo. O Fleet Manager não limita quantas pessoas você convida, e os membros não precisam de uma licença própria.

> O Fleet Manager está incluído na licença do UAVcast-Pro. Cada drone que você parear precisa de uma.
>
> [Comprar UAVcast-Pro](https://uavmatrix.com/pt/checkout) · [Ver planos e preços](https://uavmatrix.com/pt/products)

## O que o Fleet Manager verifica ao parear

Ao digitar um código de pareamento, o Fleet Manager consulta a licença ativada nesse drone e verifica que:

1. a licença existe e está ativa, não expirada e não reembolsada, e
2. o **e-mail do proprietário** (a conta da loja que a comprou) pertence a um **membro da organização** na qual você está pareando, em qualquer função.

Se as duas condições forem verdadeiras, o drone é pareado. O Fleet Manager verifica novamente sempre que o drone for pareado de novo.

| Mensagem no assistente de pareamento | Significado |
| --- | --- |
| **License is not owned by any member of this organization** | A licença pertence a uma conta da loja cujo e-mail não é membro desta organização. |
| **License has expired** | A data de validade da licença já passou. |
| **License has been refunded** | A licença foi reembolsada. |
| **Invalid license key** | A loja não reconhece a licença do drone. Verifique a ativação no UAVcast-Pro. |

A licença também é verificada antes, quando o UAVcast-Pro pede um código de pareamento. Se o UAVcast-Pro mostrar **Invalid or inactive license** em vez de um código, a licença está expirada, reembolsada ou não vinculada a uma conta da loja.

Para problemas de ativação no próprio drone, veja [Ative sua licença](https://docs.uavmatrix.com/pt/get-started/license-activation/) e [A licença não ativa](https://docs.uavmatrix.com/pt/troubleshooting/license-activation-failed/).

## Quem deve ser o dono das licenças

O Fleet Manager faz a correspondência por e-mail, então planeje quem compra:

- **Mais simples:** o Owner da organização compra todas as licenças com o e-mail com que faz login no Fleet Manager.
- **Vários compradores:** as licenças de qualquer membro contam, inclusive as dos Viewers. Um colega que faz compras pode ser Viewer.
- **Drones de clientes:** se um cliente comprou as licenças, convide o e-mail da loja do cliente para a sua organização (Viewer basta).

## Licenças compradas com outro e-mail

Um caso comum: as licenças foram compradas com `purchasing@company.com`, mas o piloto faz login no Fleet Manager como `anna@company.com`. O pareamento falha com **License is not owned by any member of this organization**.

Há duas formas de resolver:

1. **Convide o e-mail de compra** para a organização. Essa conta precisa fazer login uma vez para aceitar o convite.
2. **Peça ao suporte da UAVmatrix para adicionar um e-mail de licença** à sua conta. O suporte pode adicionar um ou mais e-mails extras a um usuário do Fleet Manager. As licenças pertencentes a qualquer um desses e-mails passam a contar como do usuário no pareamento, em todas as organizações às quais ele pertence.

Para solicitar, abra um chamado pelo balão de suporte (categoria **General Inquiry**) ou envie um e-mail para [support@uavmatrix.com](mailto:support@uavmatrix.com) a partir do endereço com que você faz login, listando os outros e-mails com que as licenças foram compradas. Veja [Suporte](https://docs.uavmatrix.com/pt/fleet-manager/support/).

Bom saber:

- Os e-mails são comparados sem diferenciar maiúsculas de minúsculas.
- Cada e-mail extra pode pertencer a apenas um usuário do Fleet Manager.
- Somente o suporte da UAVmatrix pode adicionar ou remover esses e-mails. Eles não aparecem nas suas próprias configurações.
- As licenças permanecem na conta original da loja. Isso apenas altera quem o Fleet Manager considera o proprietário no momento do pareamento.

## Mover licenças entre drones

Uma licença é ativada por dispositivo no UAVcast-Pro, não no Fleet Manager. Para movê-la, libere o slot do dispositivo no UAVcast-Pro ou na loja, ative-a no novo drone e depois [pareie o novo drone](https://docs.uavmatrix.com/pt/fleet-manager/pair-uav/). Veja [Substitua o computador companheiro](https://docs.uavmatrix.com/pt/fleet-manager/fleet/remove-or-transfer/#replace-the-companion-computer).

Source: https://docs.uavmatrix.com/pt/fleet-manager/licenses/
